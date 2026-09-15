import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Handler de callback OAuth para troca do código de autorização por sessão.
 *
 * Suporta redirecionamento dinâmico após o login via parâmetro `next`.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const authCode = searchParams.get("code");
  const nextTarget = searchParams.get("next") ?? "/";

  if (authCode) {
    const supabase = await getSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(authCode);

    if (!error) {
      const isExternal = nextTarget.startsWith("http");
      const targetUrl = isExternal ? nextTarget : `${origin}${nextTarget}`;
      return NextResponse.redirect(targetUrl);
    }
  }

  // Redireciona para home caso ocorra erro na troca do código
  return NextResponse.redirect(`${origin}/?auth_error=exchange_failed`);
}
