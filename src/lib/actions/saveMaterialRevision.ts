"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { assertWriterOrAdmin } from "@/lib/auth/assertWriterOrAdmin";
import {
  getOrCreateTopicMaterial,
  computeNextRevisionNumber,
  insertAuditedRevision,
  pointMaterialToRevision,
} from "./materialRevisionOperations";

export interface SaveRevisionPayload {
  topicId: string;
  disciplineSlug: string;
  subjectSlug: string;
  topicSlug: string;
  contentMarkdown: string;
  changeSummary: string;
}

function validateRevisionContent(contentMarkdown: string, changeSummary: string) {
  const trimmedMarkdown = contentMarkdown.trim();
  const trimmedSummary = changeSummary.trim();
  if (!trimmedMarkdown) {
    throw new Error("O conteúdo do material não pode ser vazio.");
  }
  if (!trimmedSummary) {
    throw new Error("Informe um resumo descrevendo a alteração (mínimo 3 caracteres).");
  }
  return { trimmedMarkdown, trimmedSummary };
}

/**
 * Saves a new revision of a topic's canonical material.
 *
 * @example
 * await saveMaterialRevision({ topicId: "t1", ... });
 */
export async function saveMaterialRevision(payload: SaveRevisionPayload) {
  const supabase = await getSupabaseServerClient();
  const user = await assertWriterOrAdmin(supabase);
  const { trimmedMarkdown, trimmedSummary } = validateRevisionContent(
    payload.contentMarkdown,
    payload.changeSummary,
  );

  const materialId = await getOrCreateTopicMaterial(supabase, payload.topicId);
  const nextNumber = await computeNextRevisionNumber(supabase, materialId);
  const revisionId = await insertAuditedRevision(supabase, {
    materialId,
    authorId: user.id,
    revisionNumber: nextNumber,
    contentMarkdown: trimmedMarkdown,
    changeSummary: trimmedSummary,
  });

  await pointMaterialToRevision(supabase, materialId, revisionId);

  const targetPath = `/${payload.disciplineSlug}/${payload.subjectSlug}/${payload.topicSlug}`;
  revalidatePath(targetPath);
  redirect(targetPath);
}
