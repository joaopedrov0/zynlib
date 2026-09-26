import {
  CatalogRepository,
  MaterialWithRevision,
  TopicPath,
} from "./CatalogRepository";

export interface TopicSlugs {
  disciplineSlug: string;
  subjectSlug: string;
  topicSlug: string;
}

export interface TopicWithMaterial extends TopicPath {
  material: MaterialWithRevision | null;
}

/**
 * Resolve o tópico pelos slugs da URL e carrega seu material canônico.
 * Retorna `null` quando o caminho não existe, para a página chamar `notFound()`.
 *
 * Exemplo de uso:
 * ```ts
 * const view = await loadTopicWithMaterial(catalog, await params);
 * if (!view) notFound();
 * ```
 */
export async function loadTopicWithMaterial(
  catalog: CatalogRepository,
  slugs: TopicSlugs,
): Promise<TopicWithMaterial | null> {
  const { disciplineSlug, subjectSlug, topicSlug } = slugs;
  const topicPath = await catalog.getTopicPath(disciplineSlug, subjectSlug, topicSlug);
  if (!topicPath) return null;

  const material = await catalog.getMaterialByTopicId(topicPath.topic.id);
  return { ...topicPath, material };
}
