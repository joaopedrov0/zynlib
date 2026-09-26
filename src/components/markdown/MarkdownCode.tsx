import { ComponentPropsWithoutRef } from "react";
import type { ExtraProps } from "react-markdown";
import { readCodeLanguage } from "./markdownElementHelpers";
import { BLOCK_CODE_CLASS } from "./rehypeMarkBlockCode";

type PreProps = ComponentPropsWithoutRef<"pre"> & ExtraProps;
type CodeProps = ComponentPropsWithoutRef<"code"> & ExtraProps;

function languageOf(node: PreProps["node"]): string | null {
  const firstChild = node?.children[0];
  return firstChild?.type === "element" ? readCodeLanguage(firstChild.properties.className as string[]) : null;
}

/**
 * Bloco de código com rótulo da linguagem; o realce vem do rehype-highlight.
 *
 * Exemplo de uso:
 * ```tsx
 * <ReactMarkdown components={{ pre: MarkdownPre, code: MarkdownCode }}>{markdown}</ReactMarkdown>
 * ```
 */
export function MarkdownPre({ node, children, ...props }: PreProps) {
  const language = languageOf(node);
  return (
    <div className="my-4 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
      {language && (
        <div className="px-4 py-1.5 text-[11px] font-mono uppercase tracking-wider text-zinc-400 bg-zinc-950/60 border-b border-zinc-800">
          {language}
        </div>
      )}
      <pre {...props} className="p-4 overflow-x-auto text-xs sm:text-sm leading-relaxed">
        {children}
      </pre>
    </div>
  );
}

/**
 * Código inline destacado, ou o conteúdo de um bloco quando marcado por `rehypeMarkBlockCode`.
 *
 * Exemplo de uso:
 * ```tsx
 * <ReactMarkdown components={{ code: MarkdownCode }}>{"Use `degrau(z)`"}</ReactMarkdown>
 * ```
 */
export function MarkdownCode({ node, className, children, ...props }: CodeProps) {
  void node;
  if (className?.split(" ").includes(BLOCK_CODE_CLASS)) {
    return (
      <code {...props} className={`${className} block font-mono text-zinc-100`}>
        {children}
      </code>
    );
  }
  return (
    <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-pink-600 dark:text-pink-400 font-mono text-xs">
      {children}
    </code>
  );
}
