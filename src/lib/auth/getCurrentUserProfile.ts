import { getSupabaseServerClient } from "@/lib/supabase/server";
import { UserProfile } from "@/types/database";

/**
 * Recupera os dados de perfil do usuário atualmente autenticado na sessão do servidor.
 *
 * Retorna `null` caso o visitante não esteja autenticado ou as credenciais não estejam configuradas.
 *
 * Exemplo de uso:
 * ```ts
 * const profile = await getCurrentUserProfile();
 * ```
 */
export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  try {
    const supabase = await getSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    return (data as UserProfile) ?? null;
  } catch {
    return null;
  }
}
