import { DisciplineRecord, SubjectRecord, TopicRecord } from "@/types/database";
import { SubjectPath, TopicPath } from "./CatalogRepository";

/** Linha de `subjects` com a disciplina embutida via `discipline:disciplines!inner(*)`. */
export interface SubjectPathRow extends SubjectRecord {
  discipline: DisciplineRecord;
}

/** Linha de `topics` com assunto e disciplina embutidos em cascata. */
export interface TopicPathRow extends TopicRecord {
  subject: SubjectPathRow;
}

/**
 * Separa a linha aninhada do PostgREST em registros planos de disciplina e assunto.
 *
 * Exemplo de uso:
 * ```ts
 * const { discipline, subject } = toSubjectPath(row);
 * ```
 */
export function toSubjectPath(row: SubjectPathRow): SubjectPath {
  const { discipline, ...subject } = row;
  return { discipline, subject };
}

/**
 * Separa a linha aninhada do PostgREST em registros planos de disciplina, assunto e tópico.
 *
 * Exemplo de uso:
 * ```ts
 * const { discipline, subject, topic } = toTopicPath(row);
 * ```
 */
export function toTopicPath(row: TopicPathRow): TopicPath {
  const { subject: subjectRow, ...topic } = row;
  return { ...toSubjectPath(subjectRow), topic };
}
