import { getSupabaseServerClient } from "@/lib/supabase/server";
import { SupabaseCatalogRepository } from "./SupabaseCatalogRepository";
import { CatalogRepository } from "./CatalogRepository";

/**
 * Fornece uma instância do repositório de catálogo configurada com o cliente Supabase do servidor.
 *
 * Exemplo de uso:
 * ```ts
 * const catalog = await getCatalogRepository();
 * const disciplines = await catalog.listDisciplines();
 * ```
 */
export async function getCatalogRepository(): Promise<CatalogRepository> {
  const supabase = await getSupabaseServerClient();
  return new SupabaseCatalogRepository(supabase);
}
