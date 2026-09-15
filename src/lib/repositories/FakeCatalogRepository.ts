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
}
