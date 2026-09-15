import Link from "next/link";
import { BookOpen } from "lucide-react";
import { AuthButton } from "@/components/auth/AuthButton";
import { UserProfile } from "@/types/database";

interface AppHeaderProps {
  currentUserProfile?: UserProfile | null;
}

/**
 * Cabeçalho global do Zyn Library contendo identificação da marca e ações de autenticação.
 *
 * Exemplo de uso:
 * ```tsx
 * <AppHeader currentUserProfile={userProfile} />
 * ```
 */
export function AppHeader({ currentUserProfile }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-opacity hover:opacity-90"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base text-zinc-900 dark:text-zinc-50 tracking-tight leading-none">
              Zyn Library
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight mt-0.5">
              Base de Conhecimento Aberta
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <AuthButton initialProfile={currentUserProfile} />
        </div>
      </div>
    </header>
  );
}
