import { MutableRefObject, RefObject, useEffect, useRef } from "react";
import { domScrollMeasurers, EditorScrollMeasurers } from "./measureScrollOffsets";
import { buildScrollAnchors, mapScrollOffset } from "./scrollAnchors";

interface CachedSourceOffsets {
  key: string;
  offsets: ReadonlyMap<number, number>;
}

type SourceOffsetsCache = MutableRefObject<CachedSourceOffsets | null>;

// Medir o editor recria um espelho do texto inteiro; só vale refazer quando o texto ou a largura mudam.
function sourceOffsets(
  source: HTMLTextAreaElement,
  measurers: EditorScrollMeasurers,
  cache: SourceOffsetsCache,
): ReadonlyMap<number, number> {
  const key = `${source.clientWidth}:${source.value}`;
  if (cache.current?.key !== key) {
    cache.current = { key, offsets: measurers.measureSource(source) };
  }
  return cache.current.offsets;
}

function matchingTargetScroll(
  source: HTMLTextAreaElement,
  target: HTMLElement,
  measurers: EditorScrollMeasurers,
  cache: SourceOffsetsCache,
): number {
  const limits = {
    sourceMax: source.scrollHeight - source.clientHeight,
    targetMax: target.scrollHeight - target.clientHeight,
  };
  // A prévia é medida a cada rolagem porque imagens e fórmulas mudam de altura ao carregar.
  const anchors = buildScrollAnchors(sourceOffsets(source, measurers, cache), measurers.measureTarget(target), limits);
  return mapScrollOffset(anchors, source.scrollTop);
}

/**
 * Faz a prévia acompanhar a rolagem do editor, mantendo alinhado o bloco
 * que está no topo do editor com o bloco correspondente na prévia.
 *
 * Exemplo de uso:
 * ```tsx
 * useEditorScrollSync(textareaRef, previewRef, viewMode === "split");
 * ```
 */
export function useEditorScrollSync(
  sourceRef: RefObject<HTMLTextAreaElement | null>,
  targetRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  measurers: EditorScrollMeasurers = domScrollMeasurers,
): void {
  const cache = useRef<CachedSourceOffsets | null>(null);

  useEffect(() => {
    const source = sourceRef.current;
    const target = targetRef.current;
    if (!enabled || !source || !target) return;
    const syncTarget = () => {
      target.scrollTop = matchingTargetScroll(source, target, measurers, cache);
    };
    source.addEventListener("scroll", syncTarget);
    return () => source.removeEventListener("scroll", syncTarget);
  }, [enabled, sourceRef, targetRef, measurers]);
}
