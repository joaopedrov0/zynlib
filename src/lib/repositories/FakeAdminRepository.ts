import { UserProfile } from "@/types/database";
import {
  AdminOverviewMetrics,
  AdminRepository,
  DisciplineCatalogSummary,
  RecentRevisionActivity,
} from "./AdminRepository";

const SEED_PROFILES: UserProfile[] = [
  {
    id: "u-1",
    email: "admin@zynlib.org",
    full_name: "Administrador Geral",
    avatar_url: null,
    role: "admin",
    created_at: "2026-09-01T10:00:00.000Z",
    updated_at: "2026-09-01T10:00:00.000Z",
  },
  {
    id: "u-2",
    email: "colaborador@zynlib.org",
    full_name: "Colaborador de Física",
    avatar_url: null,
    role: "writer",
    created_at: "2026-09-02T11:00:00.000Z",
    updated_at: "2026-09-02T11:00:00.000Z",
  },
];

const SEED_REVISIONS: RecentRevisionActivity[] = [
  {
    revisionId: "rev-2",
    revisionNumber: 2,
    topicName: "Cinemática Vetorial",
    subjectName: "Mecânica Clássica",
    disciplineName: "Física",
    changeSummary: "Adiciona equações de velocidade relativa",
    authorName: "Colaborador de Física",
    authorAvatarUrl: null,
    createdAt: "2026-09-10T14:30:00.000Z",
    href: "/fisica/mecanica-classica/cinematica-vetorial",
  },
  {
    revisionId: "rev-1",
    revisionNumber: 1,
    topicName: "Cinemática Vetorial",
    subjectName: "Mecânica Clássica",
    disciplineName: "Física",
    changeSummary: "Criação inicial do conteúdo",
    authorName: "Administrador Geral",
    authorAvatarUrl: null,
    createdAt: "2026-09-05T09:15:00.000Z",
    href: "/fisica/mecanica-classica/cinematica-vetorial",
  },
];

const SEED_SUMMARIES: DisciplineCatalogSummary[] = [
  {
    disciplineId: "d-1",
    name: "Física",
    slug: "fisica",
    subjectsCount: 3,
    topicsCount: 12,
  },
  {
    disciplineId: "d-2",
    name: "Matemática",
    slug: "matematica",
    subjectsCount: 4,
    topicsCount: 18,
  },
];

/**
 * Repositório falso em memória para testes de funcionalidades administrativas.
 *
 * @example
 * const repo = new FakeAdminRepository();
 * const metrics = await repo.getOverviewMetrics();
 */
export class FakeAdminRepository implements AdminRepository {
  private profiles: UserProfile[];
  private revisions: RecentRevisionActivity[];
  private summaries: DisciplineCatalogSummary[];

  constructor() {
    this.profiles = [...SEED_PROFILES];
    this.revisions = [...SEED_REVISIONS];
    this.summaries = [...SEED_SUMMARIES];
  }

  async getOverviewMetrics(): Promise<AdminOverviewMetrics> {
    const totalTopics = this.summaries.reduce((sum, d) => sum + d.topicsCount, 0);
    const totalSubjects = this.summaries.reduce((sum, d) => sum + d.subjectsCount, 0);

    return {
      profilesCount: this.profiles.length,
      disciplinesCount: this.summaries.length,
      subjectsCount: totalSubjects,
      topicsCount: totalTopics,
      materialsCount: totalTopics,
    };
  }

  async listUserProfiles(): Promise<UserProfile[]> {
    return [...this.profiles];
  }

  async listRecentRevisions(limit = 10): Promise<RecentRevisionActivity[]> {
    return this.revisions.slice(0, limit);
  }

  async listDisciplineSummaries(): Promise<DisciplineCatalogSummary[]> {
    return [...this.summaries];
  }
}
