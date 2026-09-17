import { getSupabaseServerClient } from "@/lib/supabase/server";
import { SupabaseAdminRepository } from "./SupabaseAdminRepository";
import { AdminRepository } from "./AdminRepository";

/**
 * Fornece uma instância do repositório administrativo configurada com o cliente Supabase do servidor.
 *
 * Exemplo de uso:
 * ```ts
 * const adminRepo = await getAdminRepository();
 * const metrics = await adminRepo.getOverviewMetrics();
 * ```
 */
export async function getAdminRepository(): Promise<AdminRepository> {
  const supabase = await getSupabaseServerClient();
  return new SupabaseAdminRepository(supabase);
}
