import { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { UserProfile } from "@/types/database";

interface SessionIdentity {
  id: string;
  email?: string;
  user_metadata?: { full_name?: string; name?: string; avatar_url?: string };
}

function buildDefaultProfile(user: SessionIdentity): UserProfile {
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
 * Lê a identidade do JWT da sessão. `getClaims()` valida a assinatura localmente
 * com a JWKS (chaves ES256 do projeto) em vez de chamar `/auth/v1/user`, o que
 * economizava ~150 ms por página. A renovação da sessão continua no middleware.
 */
async function readSessionIdentity(
  supabase: SupabaseClient,
): Promise<SessionIdentity | null> {
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data) return null;

  const { sub, email, user_metadata } = data.claims;
  return { id: sub, email, user_metadata };
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
    const user = await readSessionIdentity(supabase);
    return user ? await findOrCreateProfile(supabase, user) : null;
  } catch {
    return null;
  }
}

async function findOrCreateProfile(
  supabase: SupabaseClient,
  user: SessionIdentity,
): Promise<UserProfile> {
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
}
