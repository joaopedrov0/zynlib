import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface MarkdownViewProps {
  content: string;
}

const markdownRenderers: Components = {
  h1: ({ children }) => (
    <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-4 mt-6">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800/60 pb-1 mb-3 mt-6">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2 mt-4">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300 mb-4 pl-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-1 text-zinc-700 dark:text-zinc-300 mb-4 pl-2">
      {children}
    </ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-zinc-600 dark:text-zinc-400 my-4 bg-zinc-50 dark:bg-zinc-900/40 py-2 rounded-r">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className="block p-4 rounded-lg bg-zinc-900 text-zinc-100 text-xs sm:text-sm font-mono overflow-x-auto my-3">
          {children}
        </code>
      );
    }
    return (
      <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-pink-600 dark:text-pink-400 font-mono text-xs">
        {children}
      </code>
    );
  },
  table: ({ children }) => (
    <div className="overflow-x-auto my-6 border border-zinc-200 dark:border-zinc-800 rounded-lg">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 text-left font-semibold text-zinc-800 dark:text-zinc-200">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 border-t border-zinc-100 dark:border-zinc-800/80 text-zinc-700 dark:text-zinc-300">
      {children}
    </td>
  ),
};

/**
 * Renderizador de Markdown com suporte completo a GFM (tabelas, listas, links)
 * e fórmulas matemáticas LaTeX via KaTeX (inline $...$ e bloco $$...$$).
 *
 * Exemplo de uso:
 * ```tsx
 * <MarkdownView content="# Título\n\nFórmula $E = mc^2$" />
 * ```
 */
export function MarkdownView({ content }: MarkdownViewProps) {
  return (
    <div className="prose-clean max-w-none text-zinc-800 dark:text-zinc-200">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={markdownRenderers}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
