import { UserProfile } from "@/types/database";

export interface AdminOverviewMetrics {
  profilesCount: number;
  disciplinesCount: number;
  subjectsCount: number;
  topicsCount: number;
  materialsCount: number;
}

export interface RecentRevisionActivity {
  revisionId: string;
  revisionNumber: number;
  topicName: string;
  subjectName: string;
  disciplineName: string;
  changeSummary: string;
  authorName: string;
  authorAvatarUrl: string | null;
  createdAt: string;
  href: string;
}

export interface DisciplineCatalogSummary {
  disciplineId: string;
  name: string;
  slug: string;
  subjectsCount: number;
  topicsCount: number;
}

/**
 * Interface de repositório para acesso aos dados administrativos e de auditoria da plataforma.
 */
export interface AdminRepository {
  getOverviewMetrics(): Promise<AdminOverviewMetrics>;
  listUserProfiles(): Promise<UserProfile[]>;
  listRecentRevisions(limit?: number): Promise<RecentRevisionActivity[]>;
  listDisciplineSummaries(): Promise<DisciplineCatalogSummary[]>;
}
