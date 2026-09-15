import { createBrowserClient } from "@supabase/ssr";

/**
 * Cria o cliente do Supabase para execução no navegador (Client Components).
 *
 * Exemplo de uso:
 * ```ts
 * const supabase = getSupabaseBrowserClient();
 * const { data } = await supabase.from('disciplines').select('*');
 * ```
 */
export function getSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      `Configuração ausente: NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY não informados.`,
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
