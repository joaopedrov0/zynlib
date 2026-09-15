import { getSupabaseServerClient } from "@/lib/supabase/server";
import { UserProfile } from "@/types/database";

function buildDefaultProfile(user: {
  id: string;
  email?: string;
  user_metadata?: { full_name?: string; name?: string; avatar_url?: string };
}): UserProfile {
  const name =
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email?.split("@")[0] ??
    "Escritor";

  return {
    id: user.id,
    email: user.email ?? "",
    full_name: name,
    avatar_url: user.user_metadata?.avatar_url ?? null,
    role: "writer",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

/**
 * Recupera os dados de perfil do usuário atualmente autenticado na sessão do servidor.
 *
 * Caso o usuário esteja autenticado mas seu registro na tabela pública ainda não exista,
 * realiza a criação/sincronização automática com papel de escritor ('writer').
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

    if (!user) return null;

    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (existingProfile) {
      return existingProfile as UserProfile;
    }

    const newProfile = buildDefaultProfile(user);
    await supabase.from("profiles").upsert(newProfile);
    return newProfile;
  } catch {
    return null;
  }
}
