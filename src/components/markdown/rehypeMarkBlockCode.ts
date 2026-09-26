import type { Element, Root, RootContent } from "hast";

/** Classe que distingue o `code` de um bloco do código inline. */
export const BLOCK_CODE_CLASS = "zyn-block-code";

function markCodeChildren(pre: Element): void {
  for (const child of pre.children) {
    if (child.type === "element" && child.tagName === "code") {
      const classes = Array.isArray(child.properties.className) ? child.properties.className : [];
      child.properties.className = [...classes, BLOCK_CODE_CLASS];
    }
  }
}

function visitElements(nodes: readonly RootContent[]): void {
  for (const node of nodes) {
    if (node.type !== "element") continue;
    if (node.tagName === "pre") markCodeChildren(node);
    visitElements(node.children);
  }
}

/**
 * Plugin rehype que marca o `code` de dentro de cada `pre` com `zyn-block-code`.
 * O react-markdown não informa mais se um `code` é inline, e a marcação no hast
 * funciona também em Server Components (onde contexto do React não existe).
 *
 * Exemplo de uso:
 * ```tsx
 * <ReactMarkdown rehypePlugins={[rehypeMarkBlockCode]}>{markdown}</ReactMarkdown>
 * ```
 */
export function rehypeMarkBlockCode() {
  return (tree: Root): void => {
    visitElements(tree.children);
  };
}
