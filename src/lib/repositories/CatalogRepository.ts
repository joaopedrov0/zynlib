import {
  DisciplineRecord,
  SubjectRecord,
  TopicRecord,
  MaterialRecord,
  MaterialRevisionRecord,
  MaterialRevisionWithAuthor,
} from "@/types/database";

export interface MaterialWithRevision extends MaterialRecord {
  current_revision: MaterialRevisionRecord | null;
}

export interface SearchResultItem {
  id: string;
  type: "discipline" | "subject" | "topic";
  title: string;
  description?: string | null;
  href: string;
}

export interface SubjectPath {
  discipline: DisciplineRecord;
  subject: SubjectRecord;
}

export interface TopicPath extends SubjectPath {
  topic: TopicRecord;
}

export interface CatalogRepository {
  listDisciplines(): Promise<DisciplineRecord[]>;
  getDisciplineBySlug(slug: string): Promise<DisciplineRecord | null>;
  listSubjects(disciplineId: string): Promise<SubjectRecord[]>;
  /** Resolve disciplina + assunto a partir dos slugs da URL numa única consulta. */
  getSubjectPath(
    disciplineSlug: string,
    subjectSlug: string,
  ): Promise<SubjectPath | null>;
  listTopics(subjectId: string): Promise<TopicRecord[]>;
  /** Resolve disciplina + assunto + tópico a partir dos slugs da URL numa única consulta. */
  getTopicPath(
    disciplineSlug: string,
    subjectSlug: string,
    topicSlug: string,
  ): Promise<TopicPath | null>;
  getMaterialByTopicId(topicId: string): Promise<MaterialWithRevision | null>;
  listMaterialRevisions(
    materialId: string,
  ): Promise<MaterialRevisionWithAuthor[]>;
  searchCatalog(query: string): Promise<SearchResultItem[]>;
}
