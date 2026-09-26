import type { Root } from "hast";

/**
 * Plugin rehype que marca cada bloco de nível superior com a linha do markdown
 * que o originou (`data-source-line`), usado para sincronizar a rolagem do editor.
 *
 * Exemplo de uso:
 * ```tsx
 * <ReactMarkdown rehypePlugins={[rehypeSourceLines]}>{markdown}</ReactMarkdown>
 * ```
 */
export function rehypeSourceLines() {
  return (tree: Root): void => {
    for (const child of tree.children) {
      if (child.type === "element" && child.position) {
        child.properties.dataSourceLine = child.position.start.line;
      }
    }
  };
}
