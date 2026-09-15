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
} from "./CatalogRepository";

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

  async getSubjectBySlug(
    disciplineId: string,
    slug: string,
  ): Promise<SubjectRecord | null> {
    const { data, error } = await this.client
      .from("subjects")
      .select("*")
      .eq("discipline_id", disciplineId)
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      throw new Error(
        `Failed to get subject slug '${slug}' for discipline '${disciplineId}': ${error.message}`,
      );
    }
    return data;
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

  async getTopicBySlug(
    subjectId: string,
    slug: string,
  ): Promise<TopicRecord | null> {
    const { data, error } = await this.client
      .from("topics")
      .select("*")
      .eq("subject_id", subjectId)
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      throw new Error(
        `Failed to get topic slug '${slug}' for subject '${subjectId}': ${error.message}`,
      );
    }
    return data;
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
}
