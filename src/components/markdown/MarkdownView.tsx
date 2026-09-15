interface MarkdownViewProps {
  content: string;
}

/**
 * Renderizador de Markdown estruturado com formatação limpa e legível.
 *
 * Exemplo de uso:
 * ```tsx
 * <MarkdownView content="# Título\n\nTexto de exemplo." />
 * ```
 */
export function MarkdownView({ content }: MarkdownViewProps) {
  // Divisão simples de blocos de Markdown para renderização sem dependência pesada
  const paragraphs = content.split(/\n\n+/);

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none space-y-4">
      {paragraphs.map((block, index) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("# ")) {
          return (
            <h1
              key={index}
              className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-800 pb-2"
            >
              {trimmed.replace("# ", "")}
            </h1>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={index}
              className="text-xl sm:text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mt-6 mb-2"
            >
              {trimmed.replace("## ", "")}
            </h2>
          );
        }
        if (trimmed.startsWith("### ")) {
          return (
            <h3
              key={index}
              className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-4"
            >
              {trimmed.replace("### ", "")}
            </h3>
          );
        }
        if (trimmed.startsWith("```")) {
          const codeBody = trimmed.replace(/^```[a-z]*\n?/, "").replace(/```$/, "");
          return (
            <pre
              key={index}
              className="p-4 rounded-lg bg-zinc-900 text-zinc-100 text-sm overflow-x-auto font-mono"
            >
              <code>{codeBody}</code>
            </pre>
          );
        }
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote
              key={index}
              className="border-l-4 border-indigo-500 pl-4 italic text-zinc-600 dark:text-zinc-400 py-1"
            >
              {trimmed.replace(/^>\s*/, "")}
            </blockquote>
          );
        }
        return (
          <p
            key={index}
            className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line"
          >
            {trimmed}
          </p>
        );
      })}
    </article>
  );
}
