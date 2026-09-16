"use client";

import { useState } from "react";
import { ArrowLeftRight, GitCompare } from "lucide-react";
import { MaterialRevisionWithAuthor } from "@/types/database";
import { DiffViewer } from "@/components/diff/DiffViewer";

export interface ArbitraryRevisionComparatorProps {
  revisions: MaterialRevisionWithAuthor[];
}

function renderRevisionOptions(revisions: MaterialRevisionWithAuthor[]) {
  return revisions.map((rev) => {
    const dateStr = new Date(rev.created_at).toLocaleDateString("pt-BR");
    const label = `Revisão #${rev.revision_number} - ${rev.change_summary} (${dateStr})`;
    return (
      <option key={rev.id} value={rev.id}>
        {label}
      </option>
    );
  });
}

function resolveRevisionById(
  revisions: MaterialRevisionWithAuthor[],
  revisionId: string,
  fallbackIndex: number,
): MaterialRevisionWithAuthor {
  const found = revisions.find((r) => r.id === revisionId);
  return found ?? revisions[fallbackIndex] ?? revisions[0];
}

/**
 * Arbitrary revision comparator allowing users to inspect differences between any two revisions.
 *
 * @example
 * <ArbitraryRevisionComparator revisions={revisions} />
 */
export function ArbitraryRevisionComparator({
  revisions,
}: ArbitraryRevisionComparatorProps) {
  const [baseId, setBaseId] = useState<string>(
    revisions[1]?.id ?? revisions[0]?.id ?? "",
  );
  const [targetId, setTargetId] = useState<string>(revisions[0]?.id ?? "");

  if (revisions.length < 2) {
    return (
      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 text-xs text-zinc-500">
        São necessárias ao menos 2 revisões para comparar versões arbitrariamente.
      </div>
    );
  }

  const baseRev = resolveRevisionById(revisions, baseId, 1);
  const targetRev = resolveRevisionById(revisions, targetId, 0);

  const handleSwap = () => {
    setBaseId(targetId);
    setTargetId(baseId);
  };

  return (
    <section className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
        <GitCompare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h2 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
          Comparação Arbitrária de Versões
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto,1fr] gap-3 items-end">
        <div>
          <label
            htmlFor="base-rev-select"
            className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1"
          >
            Revisão Base (De):
          </label>
          <select
            id="base-rev-select"
            value={baseId}
            onChange={(e) => setBaseId(e.target.value)}
            className="w-full text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          >
            {renderRevisionOptions(revisions)}
          </select>
        </div>

        <button
          type="button"
          onClick={handleSwap}
          className="self-end px-3 py-2 text-xs font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition flex items-center justify-center gap-1 cursor-pointer"
          title="Inverter seleção de comparação"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Inverter</span>
        </button>

        <div>
          <label
            htmlFor="target-rev-select"
            className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1"
          >
            Revisão Comparada (Para):
          </label>
          <select
            id="target-rev-select"
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
            className="w-full text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          >
            {renderRevisionOptions(revisions)}
          </select>
        </div>
      </div>

      <div className="pt-2">
        <DiffViewer
          previousText={baseRev.content_markdown}
          incomingText={targetRev.content_markdown}
          previousLabel={`Revisão #${baseRev.revision_number}`}
          incomingLabel={`Revisão #${targetRev.revision_number}`}
        />
      </div>
    </section>
  );
}
