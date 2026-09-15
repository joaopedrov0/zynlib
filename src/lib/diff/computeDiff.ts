import * as Diff from "diff";

export type DiffChangeType = "added" | "removed" | "unchanged";

export interface DiffLineEntry {
  type: DiffChangeType;
  value: string;
  oldLineNumber: number | null;
  newLineNumber: number | null;
}

interface LineCounterState {
  oldCounter: number;
  newCounter: number;
}

function resolveChangeType(change: Diff.Change): DiffChangeType {
  if (change.added) return "added";
  if (change.removed) return "removed";
  return "unchanged";
}

function processSingleLine(
  line: string,
  changeType: DiffChangeType,
  counters: LineCounterState,
): DiffLineEntry {
  const isAdded = changeType === "added";
  const isRemoved = changeType === "removed";

  return {
    type: changeType,
    value: line,
    oldLineNumber: isAdded ? null : counters.oldCounter++,
    newLineNumber: isRemoved ? null : counters.newCounter++,
  };
}

function splitLines(content: string): string[] {
  if (content === "") return [];
  const normalized = content.replace(/\r\n/g, "\n");
  const splitted = normalized.split("\n");
  // Remove trailing empty line caused by standard newline at end of file
  if (splitted.length > 0 && splitted[splitted.length - 1] === "") {
    splitted.pop();
  }
  return splitted;
}

function ensureTerminalNewline(rawContent: string): string {
  if (rawContent === "" || rawContent.endsWith("\n")) {
    return rawContent;
  }
  return `${rawContent}\n`;
}

/**
 * Compara dois textos Markdown linha por linha e produz um array estruturado de diferenças com numeração de linhas.
 *
 * Exemplo de uso:
 * ```ts
 * const diffs = computeLineDiff("Linha 1", "Linha 1\nLinha 2");
 * // diffs contem entradas com type "unchanged" e "added"
 * ```
 */
export function computeLineDiff(
  previousText: string,
  incomingText: string,
): DiffLineEntry[] {
  const normalizedPrev = ensureTerminalNewline(previousText);
  const normalizedIncoming = ensureTerminalNewline(incomingText);
  const rawDiffChanges = Diff.diffLines(normalizedPrev, normalizedIncoming);
  const counters: LineCounterState = { oldCounter: 1, newCounter: 1 };
  const formattedEntries: DiffLineEntry[] = [];

  for (const chunk of rawDiffChanges) {
    const changeType = resolveChangeType(chunk);
    const chunkLines = splitLines(chunk.value);

    for (const singleLine of chunkLines) {
      formattedEntries.push(
        processSingleLine(singleLine, changeType, counters),
      );
    }
  }

  return formattedEntries;
}
