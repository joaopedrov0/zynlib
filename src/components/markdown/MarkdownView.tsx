import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import { markdownRenderers } from "./markdownRenderers";
import { rehypeSourceLines } from "./rehypeSourceLines";

interface MarkdownViewProps {
  content: string;
  /** Marca os blocos com `data-source-line` (usado pela rolagem sincronizada do editor). */
  withSourceLines?: boolean;
}

const BASE_REHYPE_PLUGINS = [rehypeKatex, rehypeHighlight];
const REHYPE_PLUGINS_WITH_SOURCE_LINES = [...BASE_REHYPE_PLUGINS, rehypeSourceLines];

/**
 * Renderizador de Markdown com suporte completo a GFM (tabelas, listas, links),
 * fórmulas matemáticas LaTeX via KaTeX (inline $...$ e bloco $$...$$)
 * e realce de sintaxe nos blocos de código com linguagem declarada.
 *
 * Exemplo de uso:
 * ```tsx
 * <MarkdownView content="# Título\n\nFórmula $E = mc^2$" />
 * ```
 */
export function MarkdownView({ content, withSourceLines = false }: MarkdownViewProps) {
  return (
    <div className="prose-clean max-w-none text-zinc-800 dark:text-zinc-200">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={withSourceLines ? REHYPE_PLUGINS_WITH_SOURCE_LINES : BASE_REHYPE_PLUGINS}
        components={markdownRenderers}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
