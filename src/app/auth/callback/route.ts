import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { resolveCallbackTarget } from "@/lib/auth/resolveCallbackUrl";

/**
 * Handler de callback OAuth para troca do código de autorização por sessão.
 *
 * Suporta redirecionamento dinâmico após o login via parâmetro `next`.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authCode = searchParams.get("code");
  const nextTarget = searchParams.get("next") ?? "/";

  if (authCode) {
    const supabase = await getSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(authCode);

    if (!error) {
      return NextResponse.redirect(resolveCallbackTarget(request, nextTarget));
    }
  }

  // Redireciona para a origem correta em caso de falha
  return NextResponse.redirect(
    resolveCallbackTarget(request, "/?auth_error=exchange_failed"),
  );
}
