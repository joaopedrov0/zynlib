import { SupabaseClient } from "@supabase/supabase-js";
import { UserProfile } from "@/types/database";
import {
  AdminOverviewMetrics,
  AdminRepository,
  DisciplineCatalogSummary,
  RecentRevisionActivity,
} from "./AdminRepository";

interface RevisionHierarchyQueryResult {
  id: string;
  revision_number: number;
  change_summary: string;
  created_at: string;
  author: { full_name: string; avatar_url: string | null } | null;
  materials: {
    topics: {
      name: string;
      slug: string;
      subjects: {
        name: string;
        slug: string;
        disciplines: { name: string; slug: string } | null;
      } | null;
    } | null;
  } | null;
}

interface DisciplineSummaryQueryResult {
  id: string;
  name: string;
  slug: string;
  subjects: Array<{
    id: string;
    topics: Array<{ id: string }> | null;
  }> | null;
}

function mapRevisionToActivity(
  record: RevisionHierarchyQueryResult,
): RecentRevisionActivity {
  const topic = record.materials?.topics;
  const subject = topic?.subjects;
  const discipline = subject?.disciplines;

  const discSlug = discipline?.slug ?? "";
  const subjSlug = subject?.slug ?? "";
  const topicSlug = topic?.slug ?? "";

  return {
    revisionId: record.id,
    revisionNumber: record.revision_number,
    topicName: topic?.name ?? "Tópico Desconhecido",
    subjectName: subject?.name ?? "Assunto Desconhecido",
    disciplineName: discipline?.name ?? "Disciplina Desconhecida",
    changeSummary: record.change_summary,
    authorName: record.author?.full_name ?? "Autor Anônimo",
    authorAvatarUrl: record.author?.avatar_url ?? null,
    createdAt: record.created_at,
    href: `/${discSlug}/${subjSlug}/${topicSlug}`,
  };
}

function mapDisciplineSummary(
  record: DisciplineSummaryQueryResult,
): DisciplineCatalogSummary {
  const subjectsList = record.subjects ?? [];
  const totalTopics = subjectsList.reduce(
    (sum, s) => sum + (s.topics?.length ?? 0),
    0,
  );

  return {
    disciplineId: record.id,
    name: record.name,
    slug: record.slug,
    subjectsCount: subjectsList.length,
    topicsCount: totalTopics,
  };
}

/**
 * Implementação do repositório administrativo usando Supabase como persistência.
 *
 * @example
 * const adminRepo = new SupabaseAdminRepository(supabaseClient);
 * const metrics = await adminRepo.getOverviewMetrics();
 */
export class SupabaseAdminRepository implements AdminRepository {
  private client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.client = client;
  }

  async getOverviewMetrics(): Promise<AdminOverviewMetrics> {
    const responses = await Promise.all([
      this.client.from("profiles").select("*", { count: "exact", head: true }),
      this.client.from("disciplines").select("*", { count: "exact", head: true }),
      this.client.from("subjects").select("*", { count: "exact", head: true }),
      this.client.from("topics").select("*", { count: "exact", head: true }),
      this.client.from("materials").select("*", { count: "exact", head: true }),
    ]);

    const failed = responses.find((res) => res.error);
    if (failed?.error) {
      throw new Error(
        `Failed to fetch admin overview metrics: ${failed.error.message}`,
      );
    }

    const [profiles, disciplines, subjects, topics, materials] = responses;
    return {
      profilesCount: profiles.count ?? 0,
      disciplinesCount: disciplines.count ?? 0,
      subjectsCount: subjects.count ?? 0,
      topicsCount: topics.count ?? 0,
      materialsCount: materials.count ?? 0,
    };
  }

  async listUserProfiles(): Promise<UserProfile[]> {
    const { data, error } = await this.client
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to list user profiles: ${error.message}`);
    }

    return (data as unknown as UserProfile[]) ?? [];
  }

  async listRecentRevisions(limit = 10): Promise<RecentRevisionActivity[]> {
    const { data, error } = await this.client
      .from("material_revisions")
      .select(`
        id,
        revision_number,
        change_summary,
        created_at,
        author:profiles!author_id(full_name, avatar_url),
        materials!material_id(
          topics!topic_id(
            name,
            slug,
            subjects!subject_id(
              name,
              slug,
              disciplines!discipline_id(name, slug)
            )
          )
        )
      `)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to list recent revisions: ${error.message}`);
    }

    const records = (data as unknown as RevisionHierarchyQueryResult[]) ?? [];
    return records.map(mapRevisionToActivity);
  }

  async listDisciplineSummaries(): Promise<DisciplineCatalogSummary[]> {
    const { data, error } = await this.client
      .from("disciplines")
      .select(`
        id,
        name,
        slug,
        subjects:subjects(id, topics:topics(id))
      `)
      .order("name", { ascending: true });

    if (error) {
      throw new Error(`Failed to list discipline summaries: ${error.message}`);
    }

    const records = (data as unknown as DisciplineSummaryQueryResult[]) ?? [];
    return records.map(mapDisciplineSummary);
  }
}
