"use client";

import { useState, useTransition } from "react";
import { Plus, X } from "lucide-react";
import {
  createDisciplineAction,
  createSubjectAction,
  createTopicAction,
} from "@/lib/actions/hierarchyActions";

export interface CreateItemModalProps {
  type: "discipline" | "subject" | "topic";
  triggerLabel: string;
  canCreate: boolean;
  disciplineId?: string;
  disciplineSlug?: string;
  subjectId?: string;
  subjectSlug?: string;
}

function resolveModalTitle(type: "discipline" | "subject" | "topic") {
  if (type === "discipline") return "Criar Nova Disciplina";
  if (type === "subject") return "Criar Novo Assunto";
  return "Criar Novo Tópico";
}

async function executeCreation(
  props: CreateItemModalProps,
  name: string,
  slug?: string,
  description?: string,
) {
  if (props.type === "discipline") {
    await createDisciplineAction({ name, slug, description });
    return;
  }
  if (props.type === "subject" && props.disciplineId && props.disciplineSlug) {
    await createSubjectAction({
      disciplineId: props.disciplineId,
      disciplineSlug: props.disciplineSlug,
      name,
      slug,
      description,
    });
    return;
  }
  if (props.type === "topic" && props.subjectId && props.disciplineSlug && props.subjectSlug) {
    await createTopicAction({
      subjectId: props.subjectId,
      disciplineSlug: props.disciplineSlug,
      subjectSlug: props.subjectSlug,
      name,
      slug,
      description,
    });
  }
}

function sanitizeTriggerLabel(rawLabel: string): string {
  return rawLabel.replace(/^\+\s*/, "").trim();
}

/**
 * Modal dialog component for creating disciplines, subjects, or topics.
 *
 * @example
 * <CreateItemModal type="discipline" triggerLabel="Nova Disciplina" canCreate={true} />
 */
export function CreateItemModal(props: CreateItemModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();

  if (!props.canCreate) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await executeCreation(
        props,
        name,
        slug.trim() || undefined,
        description.trim() || undefined,
      );
      setIsOpen(false);
      setName("");
      setSlug("");
      setDescription("");
    });
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-xs cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        {sanitizeTriggerLabel(props.triggerLabel)}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl max-w-md w-full p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
            {resolveModalTitle(props.type)}
          </h3>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="item-name-input"
              className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1"
            >
              Nome: *
            </label>
            <input
              id="item-name-input"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Física"
              className="w-full text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label
              htmlFor="item-slug-input"
              className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1"
            >
              Slug URL (opcional):
            </label>
            <input
              id="item-slug-input"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Ex: fisica (gerado automaticamente se vazio)"
              className="w-full text-xs font-mono rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label
              htmlFor="item-desc-input"
              className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1"
            >
              Descrição (opcional):
            </label>
            <textarea
              id="item-desc-input"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve resumo sobre o conteúdo..."
              className="w-full text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <button
              type="button"
              disabled={isPending}
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-xs font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition disabled:opacity-50"
            >
              {isPending ? "Criando..." : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
