"use server";

import { getCatalogRepository } from "@/lib/repositories/getCatalogRepository";
import { SearchResultItem } from "@/lib/repositories/CatalogRepository";

/**
 * Searches disciplines, subjects, and topics matching user query.
 *
 * @example
 * const results = await searchCatalogAction("cálculo");
 */
export async function searchCatalogAction(
  query: string,
): Promise<SearchResultItem[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const repository = await getCatalogRepository();
  return await repository.searchCatalog(trimmed);
}
