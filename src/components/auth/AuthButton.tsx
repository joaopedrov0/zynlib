"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { UserProfile } from "@/types/database";
import { LogIn, LogOut, User as UserIcon } from "lucide-react";

interface AuthButtonProps {
  initialProfile?: UserProfile | null;
}

function resolveRoleBadge(role: string) {
  if (role === "admin") {
    return (
      <span className="px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 rounded-full">
        Admin
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 rounded-full">
      Escritor
    </span>
  );
}

/**
 * Botão de autenticação via Google OAuth e exibição do perfil do usuário logado.
 *
 * Exemplo de uso:
 * ```tsx
 * <AuthButton initialProfile={currentUserProfile} />
 * ```
 */
export function AuthButton({ initialProfile = null }: AuthButtonProps) {
  const [profile, setProfile] = useState<UserProfile | null>(initialProfile);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (!session?.user) {
          setProfile(null);
          return;
        }

        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .maybeSingle();

        setProfile(data);
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch {
      // Ignora erro caso variáveis do Supabase ainda não estejam configuradas localmente
    }
  }, []);

  async function handleGoogleLogin() {
    setIsLoading(true);
    try {
      const supabase = getSupabaseBrowserClient();
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
            window.location.pathname,
          )}`,
        },
      });
    } catch (error) {
      console.error("Falha ao iniciar login com Google:", error);
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    setIsLoading(true);
    try {
      const supabase = getSupabaseBrowserClient();
      await supabase.auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error("Falha ao efetuar logout:", error);
      setIsLoading(false);
    }
  }

  if (profile) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.full_name}
              width={32}
              height={32}
              unoptimized
              className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300">
              <UserIcon className="w-4 h-4" />
            </div>
          )}
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-tight">
              {profile.full_name}
            </span>
            <div className="mt-0.5">{resolveRoleBadge(profile.role)}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          aria-label="Sair da conta"
          className="p-1.5 text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 transition-colors rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
          title="Sair"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700"
    >
      <LogIn className="w-4 h-4" />
      <span>{isLoading ? "Conectando..." : "Entrar com Google"}</span>
    </button>
  );
}
