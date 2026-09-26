import { SupabaseClient } from "@supabase/supabase-js";
import {
  DisciplineRecord,
  SubjectRecord,
  TopicRecord,
  MaterialRevisionWithAuthor,
} from "@/types/database";
import {
  CatalogRepository,
  MaterialWithRevision,
  SearchResultItem,
  SubjectPath,
  TopicPath,
} from "./CatalogRepository";
import {
  SubjectPathRow,
  TopicPathRow,
  toSubjectPath,
  toTopicPath,
} from "./catalogPathRows";

// `!inner` faz o filtro por `discipline.slug` descartar a linha pai quando
// a disciplina não bate, em vez de só anular o objeto embutido.
const EMBEDDED_DISCIPLINE = "discipline:disciplines!discipline_id!inner(*)";

/**
 * Implementação do repositório de catálogo utilizando o Supabase como persistência.
 *
 * Exemplo de uso:
 * ```ts
 * const supabase = await getSupabaseServerClient();
 * const repo = new SupabaseCatalogRepository(supabase);
 * const disciplines = await repo.listDisciplines();
 * ```
 */
export class SupabaseCatalogRepository implements CatalogRepository {
  private client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.client = client;
  }

  async listDisciplines(): Promise<DisciplineRecord[]> {
    const { data, error } = await this.client
      .from("disciplines")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      throw new Error(
        `Failed to list disciplines: ${error.message} (code: ${error.code})`,
      );
    }
    return data ?? [];
  }

  async getDisciplineBySlug(slug: string): Promise<DisciplineRecord | null> {
    const { data, error } = await this.client
      .from("disciplines")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      throw new Error(
        `Failed to get discipline by slug '${slug}': ${error.message}`,
      );
    }
    return data;
  }

  async listSubjects(disciplineId: string): Promise<SubjectRecord[]> {
    const { data, error } = await this.client
      .from("subjects")
      .select("*")
      .eq("discipline_id", disciplineId)
      .order("order_index", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      throw new Error(
        `Failed to list subjects for discipline '${disciplineId}': ${error.message}`,
      );
    }
    return data ?? [];
  }

  async getSubjectPath(
    disciplineSlug: string,
    subjectSlug: string,
  ): Promise<SubjectPath | null> {
    const { data, error } = await this.client
      .from("subjects")
      .select(`*, ${EMBEDDED_DISCIPLINE}`)
      .eq("slug", subjectSlug)
      .eq("discipline.slug", disciplineSlug)
      .maybeSingle();

    if (error) {
      throw new Error(
        `Failed to get subject path '${disciplineSlug}/${subjectSlug}': ${error.message}`,
      );
    }
    return data ? toSubjectPath(data as SubjectPathRow) : null;
  }

  async listTopics(subjectId: string): Promise<TopicRecord[]> {
    const { data, error } = await this.client
      .from("topics")
      .select("*")
      .eq("subject_id", subjectId)
      .order("order_index", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      throw new Error(
        `Failed to list topics for subject '${subjectId}': ${error.message}`,
      );
    }
    return data ?? [];
  }

  async getTopicPath(
    disciplineSlug: string,
    subjectSlug: string,
    topicSlug: string,
  ): Promise<TopicPath | null> {
    // Um único round trip substitui a cascata disciplina → assunto → tópico,
    // que custava ~100 ms por consulta a cada navegação.
    const { data, error } = await this.client
      .from("topics")
      .select(`*, subject:subjects!subject_id!inner(*, ${EMBEDDED_DISCIPLINE})`)
      .eq("slug", topicSlug)
      .eq("subject.slug", subjectSlug)
      .eq("subject.discipline.slug", disciplineSlug)
      .maybeSingle();

    if (error) {
      throw new Error(
        `Failed to get topic path '${disciplineSlug}/${subjectSlug}/${topicSlug}': ${error.message}`,
      );
    }
    return data ? toTopicPath(data as TopicPathRow) : null;
  }

  async getMaterialByTopicId(
    topicId: string,
  ): Promise<MaterialWithRevision | null> {
    const { data, error } = await this.client
      .from("materials")
      .select(
        `
        id,
        topic_id,
        current_revision_id,
        created_at,
        updated_at,
        current_revision:material_revisions!current_revision_id(*)
      `,
      )
      .eq("topic_id", topicId)
      .maybeSingle();

    if (error) {
      throw new Error(
        `Failed to get material for topic '${topicId}': ${error.message}`,
      );
    }
    return (data as unknown as MaterialWithRevision) ?? null;
  }

  async listMaterialRevisions(
    materialId: string,
  ): Promise<MaterialRevisionWithAuthor[]> {
    const { data, error } = await this.client
      .from("material_revisions")
      .select(
        `
        id,
        material_id,
        author_id,
        revision_number,
        content_markdown,
        change_summary,
        created_at,
        author:profiles!author_id(id, full_name, avatar_url, role)
      `,
      )
      .eq("material_id", materialId)
      .order("revision_number", { ascending: false });

    if (error) {
      throw new Error(
        `Failed to list revisions for material '${materialId}': ${error.message}`,
      );
    }

    return (data as unknown as MaterialRevisionWithAuthor[]) ?? [];
  }

  async searchCatalog(query: string): Promise<SearchResultItem[]> {
    const trimmed = query.trim();
    if (!trimmed) return [];

    const pattern = `%${trimmed}%`;
    const [disciplines, subjects, topics] = await Promise.all([
      this.client.from("disciplines").select("id, name, slug, description").ilike("name", pattern).limit(8),
      this.client.from("subjects").select("id, name, slug, description, disciplines!discipline_id(slug)").ilike("name", pattern).limit(8),
      this.client.from("topics").select("id, name, slug, description, subjects!subject_id(slug, disciplines!discipline_id(slug))").ilike("name", pattern).limit(8),
    ]);

    const results: SearchResultItem[] = [];
    if (disciplines.data) {
      for (const d of disciplines.data) {
        results.push({ id: d.id, type: "discipline", title: d.name, description: d.description, href: `/${d.slug}` });
      }
    }
    if (subjects.data) {
      for (const s of subjects.data) {
        const discSlug = (s.disciplines as unknown as { slug: string })?.slug ?? "";
        results.push({ id: s.id, type: "subject", title: s.name, description: s.description, href: `/${discSlug}/${s.slug}` });
      }
    }
    if (topics.data) {
      for (const t of topics.data) {
        const subj = t.subjects as unknown as { slug: string; disciplines: { slug: string } };
        const discSlug = subj?.disciplines?.slug ?? "";
        const subjSlug = subj?.slug ?? "";
        results.push({ id: t.id, type: "topic", title: t.name, description: t.description, href: `/${discSlug}/${subjSlug}/${t.slug}` });
      }
    }
    return results;
  }
}
