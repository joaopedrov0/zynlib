import { ComponentPropsWithoutRef, ElementType } from "react";
import type { Components, ExtraProps } from "react-markdown";
import { MarkdownCode, MarkdownPre } from "./MarkdownCode";
import { isExternalHref } from "./markdownElementHelpers";

type RendererProps<Tag extends ElementType> = ComponentPropsWithoutRef<Tag> & ExtraProps;

// Repassa os atributos do hast (ex.: data-source-line) sem vazar o `node` para o DOM.
function styled<Tag extends "h1" | "h2" | "h3" | "p" | "ul" | "ol" | "blockquote" | "th" | "td">(
  Tag: Tag,
  className: string,
) {
  function StyledMarkdownElement({ node, ...props }: RendererProps<Tag>) {
    void node;
    const Element = Tag as ElementType;
    return <Element {...props} className={className} />;
  }
  StyledMarkdownElement.displayName = `Markdown(${Tag})`;
  return StyledMarkdownElement;
}

function MarkdownTable({ node, children, ...props }: RendererProps<"table">) {
  void node;
  return (
    <div {...props} className="overflow-x-auto my-6 border border-zinc-200 dark:border-zinc-800 rounded-lg">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">{children}</table>
    </div>
  );
}

function MarkdownLink({ node, href, children, ...props }: RendererProps<"a">) {
  void node;
  const externalTarget = isExternalHref(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a
      {...props}
      {...externalTarget}
      href={href}
      className="font-medium text-indigo-600 dark:text-indigo-400 underline underline-offset-2 decoration-indigo-300 dark:decoration-indigo-700 hover:text-indigo-800 dark:hover:text-indigo-300 hover:decoration-2"
    >
      {children}
    </a>
  );
}

/**
 * Componentes visuais usados pelo `MarkdownView` para cada elemento do markdown.
 *
 * Exemplo de uso:
 * ```tsx
 * <ReactMarkdown components={markdownRenderers}>{markdown}</ReactMarkdown>
 * ```
 */
export const markdownRenderers: Components = {
  h1: styled("h1", "text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-4 mt-6"),
  h2: styled("h2", "text-xl sm:text-2xl font-bold text-zinc-800 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800/60 pb-1 mb-3 mt-6"),
  h3: styled("h3", "text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2 mt-4"),
  p: styled("p", "text-base text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4"),
  ul: styled("ul", "list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300 mb-4 pl-2"),
  ol: styled("ol", "list-decimal list-inside space-y-1 text-zinc-700 dark:text-zinc-300 mb-4 pl-2"),
  // As margens externas dos filhos (ex.: mb-4 do último <p>) somariam ao py-2; zerá-las deixa o padding simétrico.
  blockquote: styled("blockquote", "border-l-4 border-indigo-500 pl-4 italic text-zinc-600 dark:text-zinc-400 my-4 bg-zinc-50 dark:bg-zinc-900/40 py-2 rounded-r [&>:first-child]:mt-0 [&>:last-child]:mb-0"),
  th: styled("th", "px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 text-left font-semibold text-zinc-800 dark:text-zinc-200"),
  td: styled("td", "px-4 py-2 border-t border-zinc-100 dark:border-zinc-800/80 text-zinc-700 dark:text-zinc-300"),
  table: MarkdownTable,
  a: MarkdownLink,
  pre: MarkdownPre,
  code: MarkdownCode,
};
