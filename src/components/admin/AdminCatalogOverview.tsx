import Link from "next/link";
import { FolderTree, ArrowRight, Layers, FileText } from "lucide-react";
import { DisciplineCatalogSummary } from "@/lib/repositories/AdminRepository";

function renderDisciplineSummaryRow(item: DisciplineCatalogSummary) {
  return (
    <tr
      key={item.disciplineId}
      className="border-b border-zinc-100 dark:border-zinc-800/80 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition"
    >
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <FolderTree className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            {item.name}
          </span>
        </div>
      </td>
      <td className="py-3 px-4 text-xs text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{item.subjectsCount} assuntos</span>
        </div>
      </td>
      <td className="py-3 px-4 text-xs text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>{item.topicsCount} tópicos</span>
        </div>
      </td>
      <td className="py-3 px-4 text-right">
        <Link
          href={`/${item.slug}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          aria-label={`Ver ${item.name}`}
        >
          <span>Explorar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </td>
    </tr>
  );
}

interface AdminCatalogOverviewProps {
  summaries: DisciplineCatalogSummary[];
}

/**
 * Tabela de visão geral e estrutura das disciplinas, assuntos e tópicos cadastrados.
 *
 * @example
 * <AdminCatalogOverview summaries={disciplineSummaries} />
 */
export function AdminCatalogOverview({
  summaries,
}: AdminCatalogOverviewProps) {
  if (summaries.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
        Nenhuma disciplina cadastrada na plataforma ainda.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-500 font-semibold bg-zinc-50/60 dark:bg-zinc-900/60">
            <th className="py-3 px-4">Disciplina</th>
            <th className="py-3 px-4">Assuntos</th>
            <th className="py-3 px-4">Tópicos</th>
            <th className="py-3 px-4 text-right">Ação</th>
          </tr>
        </thead>
        <tbody>{summaries.map(renderDisciplineSummaryRow)}</tbody>
      </table>
    </div>
  );
}
