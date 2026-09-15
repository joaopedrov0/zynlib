import {
  DisciplineRecord,
  SubjectRecord,
  TopicRecord,
  MaterialRecord,
  MaterialRevisionRecord,
} from "@/types/database";

export interface MaterialWithRevision extends MaterialRecord {
  current_revision: MaterialRevisionRecord | null;
}

export interface CatalogRepository {
  listDisciplines(): Promise<DisciplineRecord[]>;
  getDisciplineBySlug(slug: string): Promise<DisciplineRecord | null>;
  listSubjects(disciplineId: string): Promise<SubjectRecord[]>;
  getSubjectBySlug(
    disciplineId: string,
    slug: string,
  ): Promise<SubjectRecord | null>;
  listTopics(subjectId: string): Promise<TopicRecord[]>;
  getTopicBySlug(subjectId: string, slug: string): Promise<TopicRecord | null>;
  getMaterialByTopicId(topicId: string): Promise<MaterialWithRevision | null>;
}
