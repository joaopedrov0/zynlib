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
} from "./CatalogRepository";

/**
 * Implementação em memória para testes unitários isolados da camada de dados.
 *
 * Exemplo de uso:
 * ```ts
 * const repository = new FakeCatalogRepository([disciplina1], [assunto1]);
 * const disciplines = await repository.listDisciplines();
 * ```
 */
export class FakeCatalogRepository implements CatalogRepository {
  private disciplines: DisciplineRecord[];
  private subjects: SubjectRecord[];
  private topics: TopicRecord[];
  private materials: MaterialWithRevision[];
  private revisions: MaterialRevisionWithAuthor[];

  constructor(
    disciplines: DisciplineRecord[] = [],
    subjects: SubjectRecord[] = [],
    topics: TopicRecord[] = [],
    materials: MaterialWithRevision[] = [],
    revisions: MaterialRevisionWithAuthor[] = [],
  ) {
    this.disciplines = [...disciplines];
    this.subjects = [...subjects];
    this.topics = [...topics];
    this.materials = [...materials];
    this.revisions = [...revisions];
  }

  async listDisciplines(): Promise<DisciplineRecord[]> {
    return [...this.disciplines];
  }

  async getDisciplineBySlug(slug: string): Promise<DisciplineRecord | null> {
    const matched = this.disciplines.find((item) => item.slug === slug);
    return matched ?? null;
  }

  async listSubjects(disciplineId: string): Promise<SubjectRecord[]> {
    return this.subjects.filter((item) => item.discipline_id === disciplineId);
  }

  async getSubjectBySlug(
    disciplineId: string,
    slug: string,
  ): Promise<SubjectRecord | null> {
    const matched = this.subjects.find(
      (item) => item.discipline_id === disciplineId && item.slug === slug,
    );
    return matched ?? null;
  }

  async listTopics(subjectId: string): Promise<TopicRecord[]> {
    return this.topics.filter((item) => item.subject_id === subjectId);
  }

  async getTopicBySlug(
    subjectId: string,
    slug: string,
  ): Promise<TopicRecord | null> {
    const matched = this.topics.find(
      (item) => item.subject_id === subjectId && item.slug === slug,
    );
    return matched ?? null;
  }

  async getMaterialByTopicId(
    topicId: string,
  ): Promise<MaterialWithRevision | null> {
    const matched = this.materials.find((item) => item.topic_id === topicId);
    return matched ?? null;
  }

  async listMaterialRevisions(
    materialId: string,
  ): Promise<MaterialRevisionWithAuthor[]> {
    return this.revisions.filter((item) => item.material_id === materialId);
  }

  async searchCatalog(query: string): Promise<SearchResultItem[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const results: SearchResultItem[] = [];

    for (const d of this.disciplines) {
      if (d.name.toLowerCase().includes(q) || d.description?.toLowerCase().includes(q)) {
        results.push({ id: d.id, type: "discipline", title: d.name, description: d.description, href: `/${d.slug}` });
      }
    }

    for (const s of this.subjects) {
      const disc = this.disciplines.find((d) => d.id === s.discipline_id);
      if (s.name.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q)) {
        results.push({ id: s.id, type: "subject", title: s.name, description: s.description, href: `/${disc?.slug ?? ""}/${s.slug}` });
      }
    }

    for (const t of this.topics) {
      const s = this.subjects.find((subj) => subj.id === t.subject_id);
      const disc = this.disciplines.find((d) => d.id === s?.discipline_id);
      if (t.name.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q)) {
        results.push({ id: t.id, type: "topic", title: t.name, description: t.description, href: `/${disc?.slug ?? ""}/${s?.slug ?? ""}/${t.slug}` });
      }
    }

    return results;
  }
}
