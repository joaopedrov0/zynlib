"use client";

import { useState, useTransition } from "react";
import { MarkdownView } from "@/components/markdown/MarkdownView";
import { saveMaterialRevision } from "@/lib/actions/saveMaterialRevision";
import { Eye, Edit2, Send } from "lucide-react";

interface MaterialEditorProps {
  topicId: string;
  disciplineSlug: string;
  subjectSlug: string;
  topicSlug: string;
  initialContent?: string;
  currentRevisionNumber?: number | null;
}

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
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage(null);

    if (!content.trim()) {
      setErrorMessage("O conteúdo do material não pode ser vazio.");
      return;
    }

    if (!summary.trim()) {
      setErrorMessage("Por favor, descreva brevemente a alteração realizada.");
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

      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === "edit"
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Editor Markdown</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === "preview"
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Pré-visualização</span>
          </button>
        </div>

        <span className="text-xs text-zinc-500">
          {currentRevisionNumber
            ? `Editando com base na Revisão #${currentRevisionNumber}`
            : "Criando primeira versão"}
        </span>
      </div>

      {activeTab === "edit" ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={16}
          placeholder="# Digite seu conteúdo em Markdown aqui..."
          className="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
        />
      ) : (
        <div className="min-h-[384px] p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
          <MarkdownView content={content || "*Nenhum conteúdo digitado ainda.*"} />
        </div>
      )}

      <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 space-y-3">
        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
          Resumo da Alteração (Auditável)
        </label>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Ex: Corrigido exemplo de código e adicionada explicação sobre balanceamento"
          className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>{isPending ? "Salvando Revisão..." : "Publicar Nova Revisão"}</span>
        </button>
      </div>
    </form>
  );
}
