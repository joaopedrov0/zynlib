"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteHierarchyAction } from "@/lib/actions/hierarchyActions";

export interface DeleteItemButtonProps {
  table: "disciplines" | "subjects" | "topics";
  id: string;
  itemName: string;
  redirectPath: string;
  canDelete: boolean;
}

function handleDelete(
  props: DeleteItemButtonProps,
  startTransition: (fn: () => void) => void,
) {
  const confirmed = window.confirm(
    `Tem certeza que deseja excluir "${props.itemName}"? Esta ação removerá também todos os filhos vinculados.`,
  );
  if (!confirmed) return;

  startTransition(async () => {
    await deleteHierarchyAction({
      table: props.table,
      id: props.id,
      redirectPath: props.redirectPath,
    });
  });
}

/**
 * Button to delete a discipline, subject, or topic with confirmation.
 *
 * @example
 * <DeleteItemButton table="disciplines" id="d-1" itemName="Física" redirectPath="/" canDelete={true} />
 */
export function DeleteItemButton(props: DeleteItemButtonProps) {
  const [isPending, startTransition] = useTransition();

  if (!props.canDelete) return null;

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => handleDelete(props, startTransition)}
      className="p-1.5 text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition disabled:opacity-50 cursor-pointer"
      title={`Excluir ${props.itemName}`}
      aria-label={`Excluir ${props.itemName}`}
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}
