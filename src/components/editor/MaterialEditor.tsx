"use client";

import { useState, useTransition, useRef } from "react";
import { MarkdownView } from "@/components/markdown/MarkdownView";
import { saveMaterialRevision } from "@/lib/actions/saveMaterialRevision";
import {
  Eye,
  Edit3,
  Columns,
  Bold,
  Italic,
  Heading2,
  Code,
  Table as TableIcon,
  Sigma,
  Send,
  Quote,
} from "lucide-react";

interface MaterialEditorProps {
  topicId: string;
  disciplineSlug: string;
  subjectSlug: string;
  topicSlug: string;
  initialContent?: string;
  currentRevisionNumber?: number | null;
}

type ViewMode = "split" | "edit" | "preview";

export function MaterialEditor({
  topicId,
  disciplineSlug,
  subjectSlug,
  topicSlug,
  initialContent = "",
  currentRevisionNumber = null,
}: MaterialEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [summary, setSummary] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function insertFormatting(prefix: string, suffix: string = "") {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end) || "texto";
    const replacement = `${prefix}${selected}${suffix}`;

    const updated =
      content.substring(0, start) + replacement + content.substring(end);
    setContent(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selected.length,
      );
    }, 10);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage(null);

    if (!content.trim()) {
      setErrorMessage("O conteúdo do material não pode ser vazio.");
      return;
    }

    if (!summary.trim()) {
      setErrorMessage("Por favor, informe um resumo descrevendo a alteração.");
      return;
    }

    startTransition(async () => {
      try {
        await saveMaterialRevision({
          topicId,
          disciplineSlug,
          subjectSlug,
          topicSlug,
          contentMarkdown: content,
          changeSummary: summary,
          baseRevisionNumber: currentRevisionNumber,
        });
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Falha inesperada ao salvar revisão.");
        }
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-sm">
          {errorMessage}
        </div>
      )}

      {/* Barra superior com modo de visualização e versão base */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setViewMode("split")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === "split"
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Lado a Lado</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("edit")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === "edit"
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("preview")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === "preview"
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview KaTeX</span>
          </button>
        </div>

        <span className="text-xs text-zinc-500 font-mono">
          {currentRevisionNumber
            ? `Editando sobre Revisão #${currentRevisionNumber}`
            : "Iniciando versão inicial"}
        </span>
      </div>

      {/* Barra de atalhos rápidos de formatação Markdown e KaTeX */}
      {viewMode !== "preview" && (
        <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300">
          <button
            type="button"
            title="Negrito"
            onClick={() => insertFormatting("**", "**")}
            className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Itálico"
            onClick={() => insertFormatting("*", "*")}
            className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Título Secundário (H2)"
            onClick={() => insertFormatting("\n## ", "\n")}
            className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Fórmula KaTeX Inline"
            onClick={() => insertFormatting("$", "$")}
            className="px-2 py-1 text-xs font-mono rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 font-semibold"
          >
            $x^2$
          </button>
          <button
            type="button"
            title="Fórmula KaTeX em Bloco"
            onClick={() => insertFormatting("\n$$\n", "\n$$\n")}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-mono rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 font-semibold"
          >
            <Sigma className="w-3.5 h-3.5" />
            <span>$$</span>
          </button>
          <button
            type="button"
            title="Bloco de Código"
            onClick={() => insertFormatting("\n```javascript\n", "\n```\n")}
            className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Citação"
            onClick={() => insertFormatting("\n> ", "\n")}
            className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Tabela"
            onClick={() =>
              insertFormatting(
                "\n| Coluna 1 | Coluna 2 |\n| :--- | :--- |\n| Dado 1 | Dado 2 |\n",
              )
            }
            className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            <TableIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Área de edição / visualização conforme viewMode */}
      <div
        className={
          viewMode === "split"
            ? "grid grid-cols-1 lg:grid-cols-2 gap-4 items-start"
            : "block"
        }
      >
        {viewMode !== "preview" && (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            placeholder="# Digite o conteúdo do tópico em Markdown...\n\nVocê pode usar fórmulas como $E = mc^2$ ou tabelas e códigos."
            className="w-full h-[520px] p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-mono text-sm leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        )}

        {viewMode !== "edit" && (
          <div className="h-[520px] p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-y-auto shadow-inner">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-3">
              Pré-visualização Dinâmica
            </span>
            <MarkdownView
              content={
                content.trim() ||
                "*Nenhum conteúdo digitado. Digite ou use a barra de atalhos para começar.*"
              }
            />
          </div>
        )}
      </div>

      {/* Caixa de resumo da alteração (auditável) */}
      <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 space-y-2">
        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
          Resumo da Alteração &bull; Mensagem de Auditoria
        </label>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Ex: Adicionada explicação sobre complexidade temporal e fórmulas matemáticas"
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Botão de submissão */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-zinc-500 font-mono">
          {content.length} caracteres
        </span>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm hover:shadow-indigo-500/20 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>{isPending ? "Gravando Revisão..." : "Publicar Nova Revisão"}</span>
        </button>
      </div>
    </form>
  );
}
