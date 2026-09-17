import Link from "next/link";
import { GitCommit, ArrowRight, User } from "lucide-react";
import { RecentRevisionActivity } from "@/lib/repositories/AdminRepository";

function renderUpdateCard(item: RecentRevisionActivity) {
  return (
    <div
      key={item.revisionId}
      className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-850/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-500/30 transition"
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            {item.topicName}
          </span>
          <span className="text-[11px] text-zinc-400">
            {item.disciplineName} &gt; {item.subjectName}
          </span>
          <span className="inline-flex items-center gap-0.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
            <GitCommit className="w-3 h-3" />
            #{item.revisionNumber}
          </span>
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-1">
          {item.changeSummary}
        </p>

        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
          <User className="w-3 h-3" />
          <span>{item.authorName}</span>
          <span>&bull;</span>
          <span className="font-mono">
            {new Date(item.createdAt).toLocaleString("pt-BR")}
          </span>
        </div>
      </div>

      <Link
        href={item.href}
        className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
      >
        <span>Acessar Material</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

interface AdminRecentUpdatesListProps {
  revisions: RecentRevisionActivity[];
}

/**
 * Exibe a lista de revisões e atualizações recentes de materiais acadêmicos.
 *
 * @example
 * <AdminRecentUpdatesList revisions={recentRevisions} />
 */
export function AdminRecentUpdatesList({
  revisions,
}: AdminRecentUpdatesListProps) {
  if (revisions.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
        Nenhuma atualização recente de material encontrada.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {revisions.map(renderUpdateCard)}
    </div>
  );
}
