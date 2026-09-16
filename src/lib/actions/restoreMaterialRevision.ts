"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { assertWriterOrAdmin } from "@/lib/auth/assertWriterOrAdmin";
import {
  fetchTargetRevision,
  computeNextRevisionNumber,
  insertAuditedRevision,
  pointMaterialToRevision,
} from "./materialRevisionOperations";

export interface RestoreRevisionPayload {
  topicId: string;
  disciplineSlug: string;
  subjectSlug: string;
  topicSlug: string;
  targetRevisionId: string;
  customSummary?: string;
}

/**
 * Restores a historical material revision by publishing a new non-destructive audit revision.
 *
 * @example
 * await restoreMaterialRevision({ topicId: "t1", ... });
 */
export async function restoreMaterialRevision(payload: RestoreRevisionPayload) {
  const supabase = await getSupabaseServerClient();
  const user = await assertWriterOrAdmin(supabase);
  const target = await fetchTargetRevision(supabase, payload.targetRevisionId);
  const nextNum = await computeNextRevisionNumber(supabase, target.material_id);
  const summary =
    payload.customSummary?.trim() ||
    `Restauração para a revisão #${target.revision_number}`;

  const newRevisionId = await insertAuditedRevision(supabase, {
    materialId: target.material_id,
    authorId: user.id,
    revisionNumber: nextNum,
    contentMarkdown: target.content_markdown,
    changeSummary: summary,
  });

  await pointMaterialToRevision(supabase, target.material_id, newRevisionId);

  const topicPath = `/${payload.disciplineSlug}/${payload.subjectSlug}/${payload.topicSlug}`;
  revalidatePath(topicPath);
  revalidatePath(`${topicPath}/history`);
  redirect(topicPath);
}
