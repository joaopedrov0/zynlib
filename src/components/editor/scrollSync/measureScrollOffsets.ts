/** Medidores de posição por linha do markdown; injetáveis para testar sem layout real. */
export interface EditorScrollMeasurers {
  measureSource(textarea: HTMLTextAreaElement): ReadonlyMap<number, number>;
  measureTarget(container: HTMLElement): ReadonlyMap<number, number>;
}

// Estilos que mudam onde o texto quebra dentro do textarea.
const TEXT_LAYOUT_PROPERTIES = [
  "fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "wordSpacing",
  "lineHeight", "textTransform", "textIndent", "tabSize",
  "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
] as const;

function createEditorMirror(textarea: HTMLTextAreaElement): HTMLDivElement {
  const mirror = document.createElement("div");
  const computed = window.getComputedStyle(textarea);
  for (const property of TEXT_LAYOUT_PROPERTIES) {
    mirror.style[property] = computed[property];
  }
  Object.assign(mirror.style, {
    position: "absolute", visibility: "hidden", top: "0", left: "-9999px",
    boxSizing: "border-box", width: `${textarea.clientWidth}px`,
    whiteSpace: "pre-wrap", overflowWrap: "break-word", border: "0",
  });
  return mirror;
}

/**
 * Mede a distância do topo do editor até o início de cada linha do markdown,
 * considerando a quebra visual de linhas longas (feita num espelho invisível do textarea).
 *
 * Exemplo de uso:
 * ```ts
 * measureEditorLineOffsets(textarea).get(12); // pixels até a linha 12
 * ```
 */
export function measureEditorLineOffsets(textarea: HTMLTextAreaElement): ReadonlyMap<number, number> {
  const mirror = createEditorMirror(textarea);
  const lineElements = textarea.value.split("\n").map((line) => {
    const lineElement = document.createElement("div");
    lineElement.textContent = line || "​"; // linha vazia ainda ocupa altura
    return mirror.appendChild(lineElement);
  });
  document.body.appendChild(mirror);
  const offsets = new Map(lineElements.map((lineElement, index) => [index + 1, lineElement.offsetTop]));
  mirror.remove();
  return offsets;
}

/**
 * Mede a posição de cada bloco da prévia marcado com `data-source-line`,
 * no mesmo referencial do `scrollTop` do contêiner.
 *
 * Exemplo de uso:
 * ```ts
 * measurePreviewLineOffsets(previewContainer).get(12); // pixels até o bloco da linha 12
 * ```
 */
export function measurePreviewLineOffsets(container: HTMLElement): ReadonlyMap<number, number> {
  const containerTop = container.getBoundingClientRect().top - container.scrollTop;
  const offsets = new Map<number, number>();
  for (const block of container.querySelectorAll<HTMLElement>("[data-source-line]")) {
    const line = Number(block.dataset.sourceLine);
    if (!offsets.has(line)) offsets.set(line, block.getBoundingClientRect().top - containerTop);
  }
  return offsets;
}

export const domScrollMeasurers: EditorScrollMeasurers = {
  measureSource: measureEditorLineOffsets,
  measureTarget: measurePreviewLineOffsets,
};
