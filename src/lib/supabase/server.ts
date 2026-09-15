import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Cria o cliente do Supabase para Server Components e Server Actions.
 *
 * Exemplo de uso:
 * ```ts
 * const supabase = await getSupabaseServerClient();
 * const { data: { user } } = await supabase.auth.getUser();
 * ```
 */
export async function getSupabaseServerClient() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      `Configuração ausente: NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY não informados.`,
    );
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // O método setAll foi chamado de um Server Component.
          // Ignora caso seja apenas leitura no componente.
        }
      },
    },
  });
}
