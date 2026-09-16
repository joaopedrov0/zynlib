import { SupabaseClient, User } from "@supabase/supabase-js";

/**
 * Asserts that the current session user has writer or admin privileges.
 *
 * @example
 * const user = await assertWriterOrAdmin(supabase);
 */
export async function assertWriterOrAdmin(
  supabase: SupabaseClient,
): Promise<User> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Autenticação necessária para publicar ou editar materiais.");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || !["admin", "writer"].includes(profile.role)) {
    throw new Error("Permissão insuficiente. Apenas escritores ou admins podem editar.");
  }

  return user;
}
