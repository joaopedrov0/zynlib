import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { getCatalogRepository } from "@/lib/repositories/getCatalogRepository";
import { DisciplineRecord } from "@/types/database";
import { BookOpen, FolderTree, ArrowRight } from "lucide-react";

async function fetchDisciplinesSafe(): Promise<DisciplineRecord[]> {
  try {
    const catalog = await getCatalogRepository();
    return await catalog.listDisciplines();
  } catch {
    return [];
  }
}

function renderDisciplineCard(discipline: DisciplineRecord) {
  return (
    <Link
      key={discipline.id}
      href={`/${discipline.slug}`}
      className="group p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all hover:shadow-md hover:shadow-indigo-500/5 flex flex-col justify-between"
    >
      <div>
        <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
          <FolderTree className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {discipline.name}
        </h2>
        {discipline.description && (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
            {discipline.description}
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center text-xs font-medium text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
        <span>Explorar assuntos</span>
        <ArrowRight className="w-3.5 h-3.5 ml-1" />
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const profile = await getCurrentUserProfile();
  const disciplines = await fetchDisciplinesSafe();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader currentUserProfile={profile} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Catálogo Acadêmico
          </span>
          <h1 className="mt-1 text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Disciplinas do Conhecimento
          </h1>
          <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Navegue pelas grandes áreas de estudo para acessar assuntos, tópicos e materiais colaborativos com histórico auditável de edições.
          </p>
        </div>

        {disciplines.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30">
            <BookOpen className="w-12 h-12 mx-auto text-zinc-400 dark:text-zinc-600" />
            <h3 className="mt-4 text-base font-semibold text-zinc-800 dark:text-zinc-200">
              Nenhuma disciplina cadastrada ainda
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              Execute o script SQL contido em <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">docs/data-model.md</code> no seu Supabase para criar a estrutura e adicione suas primeiras disciplinas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {disciplines.map(renderDisciplineCard)}
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-xs text-zinc-500">
        <p>Zyn Library v2 &bull; Plataforma Aberta e Colaborativa de Conhecimento</p>
      </footer>
    </div>
  );
}
