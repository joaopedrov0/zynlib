"use client";

import { useTransition } from "react";
import { RotateCcw, CheckCircle2 } from "lucide-react";
import { restoreMaterialRevision } from "@/lib/actions/restoreMaterialRevision";

export interface RestoreRevisionButtonProps {
  topicId: string;
  disciplineSlug: string;
  subjectSlug: string;
  topicSlug: string;
  targetRevisionId: string;
  targetRevisionNumber: number;
  isCurrentRevision: boolean;
  canRestore: boolean;
}

function handleRestore(
  props: RestoreRevisionButtonProps,
  startTransition: (fn: () => void) => void,
) {
  const confirmed = window.confirm(
    `Deseja restaurar a revisão #${props.targetRevisionNumber} como a versão ativa?`,
  );
  if (!confirmed) return;

  startTransition(async () => {
    await restoreMaterialRevision({
      topicId: props.topicId,
      disciplineSlug: props.disciplineSlug,
      subjectSlug: props.subjectSlug,
      topicSlug: props.topicSlug,
      targetRevisionId: props.targetRevisionId,
    });
  });
}

/**
 * Renders a button allowing authorized editors to rollback to a past revision.
 *
 * @example
 * <RestoreRevisionButton topicId="1" targetRevisionId="rev-1" ... />
 */
export function RestoreRevisionButton(props: RestoreRevisionButtonProps) {
  const [isPending, startTransition] = useTransition();

  if (props.isCurrentRevision) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Versão Atual
      </span>
    );
  }

  if (!props.canRestore) return null;

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => handleRestore(props, startTransition)}
      className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-lg text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 transition disabled:opacity-50 cursor-pointer"
    >
      <RotateCcw className="w-3.5 h-3.5" />
      {isPending ? "Restaurando..." : `Restaurar Versão #${props.targetRevisionNumber}`}
    </button>
  );
}
