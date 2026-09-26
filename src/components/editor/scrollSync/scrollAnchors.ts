/** Um ponto conhecido da correspondência: rolar o editor até `sourceOffset` equivale a rolar a prévia até `targetOffset`. */
export interface ScrollAnchor {
  sourceOffset: number;
  targetOffset: number;
}

export interface ScrollLimits {
  sourceMax: number;
  targetMax: number;
}

function extendsMapping(previous: ScrollAnchor, candidate: ScrollAnchor, limits: ScrollLimits): boolean {
  return (
    candidate.sourceOffset > previous.sourceOffset &&
    candidate.targetOffset >= previous.targetOffset &&
    candidate.sourceOffset < limits.sourceMax &&
    candidate.targetOffset < limits.targetMax
  );
}

/**
 * Monta as âncoras de rolagem a partir da posição de cada linha do markdown no editor
 * e do bloco correspondente na prévia. Âncoras que fariam a prévia voltar enquanto o
 * editor avança são descartadas, para a rolagem nunca "pular para trás".
 *
 * Exemplo de uso:
 * ```ts
 * const anchors = buildScrollAnchors(editorOffsets, previewOffsets, { sourceMax: 800, targetMax: 2400 });
 * ```
 */
export function buildScrollAnchors(
  sourceOffsetByLine: ReadonlyMap<number, number>,
  targetOffsetByLine: ReadonlyMap<number, number>,
  limits: ScrollLimits,
): ScrollAnchor[] {
  const anchors: ScrollAnchor[] = [{ sourceOffset: 0, targetOffset: 0 }];
  const lines = [...targetOffsetByLine.keys()].filter((line) => sourceOffsetByLine.has(line)).sort((a, b) => a - b);
  for (const line of lines) {
    const candidate = { sourceOffset: sourceOffsetByLine.get(line)!, targetOffset: targetOffsetByLine.get(line)! };
    if (extendsMapping(anchors[anchors.length - 1], candidate, limits)) anchors.push(candidate);
  }
  anchors.push({ sourceOffset: limits.sourceMax, targetOffset: limits.targetMax });
  return anchors;
}

/**
 * Converte a rolagem do editor na rolagem da prévia, interpolando entre as âncoras vizinhas.
 *
 * Exemplo de uso:
 * ```ts
 * preview.scrollTop = mapScrollOffset(anchors, textarea.scrollTop);
 * ```
 */
export function mapScrollOffset(anchors: readonly ScrollAnchor[], sourceOffset: number): number {
  if (anchors.length === 0) return 0;
  const nextIndex = anchors.findIndex((anchor) => anchor.sourceOffset >= sourceOffset);
  if (nextIndex === -1) return anchors[anchors.length - 1].targetOffset;
  if (nextIndex === 0) return anchors[0].targetOffset;
  const previous = anchors[nextIndex - 1];
  const next = anchors[nextIndex];
  const progress = (sourceOffset - previous.sourceOffset) / (next.sourceOffset - previous.sourceOffset);
  return previous.targetOffset + progress * (next.targetOffset - previous.targetOffset);
}
