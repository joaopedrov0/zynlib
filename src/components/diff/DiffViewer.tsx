import { computeLineDiff, DiffLineEntry } from "@/lib/diff/computeDiff";

interface DiffViewerProps {
  previousText: string;
  incomingText: string;
  previousLabel?: string;
  incomingLabel?: string;
}

function resolveLineClass(type: DiffLineEntry["type"]): string {
  if (type === "added") {
    return "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-l-2 border-emerald-500";
  }
  if (type === "removed") {
    return "bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border-l-2 border-rose-500";
  }
  return "text-zinc-700 dark:text-zinc-300";
}

function resolvePrefix(type: DiffLineEntry["type"]): string {
  if (type === "added") return "+";
  if (type === "removed") return "-";
  return " ";
}

/**
 * Visualizador de diff linha a linha estilo Git com numeração e realce de adições e remoções.
 *
 * Exemplo de uso:
 * ```tsx
 * <DiffViewer previousText="texto antigo" incomingText="texto novo" />
 * ```
 */
export function DiffViewer({
  previousText,
  incomingText,
  previousLabel = "Versão Anterior",
  incomingLabel = "Versão Atual",
}: DiffViewerProps) {
  const diffEntries = computeLineDiff(previousText, incomingText);

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden font-mono text-xs bg-white dark:bg-zinc-950">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-sans font-medium text-xs">
        <span className="text-rose-600 dark:text-rose-400 font-mono">- {previousLabel}</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-mono">+ {incomingLabel}</span>
      </div>

      <div className="overflow-x-auto divide-y divide-zinc-100 dark:divide-zinc-900">
        {diffEntries.map((entry, index) => (
          <div
            key={index}
            className={`flex items-start px-2 py-0.5 font-mono leading-5 select-text ${resolveLineClass(
              entry.type,
            )}`}
          >
            <span className="w-8 text-right pr-2 text-zinc-400 select-none">
              {entry.oldLineNumber ?? ""}
            </span>
            <span className="w-8 text-right pr-2 text-zinc-400 select-none">
              {entry.newLineNumber ?? ""}
            </span>
            <span className="w-4 text-center select-none font-bold">
              {resolvePrefix(entry.type)}
            </span>
            <span className="flex-1 whitespace-pre-wrap break-all pl-1">
              {entry.value || " "}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
