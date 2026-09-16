import { SupabaseClient } from "@supabase/supabase-js";

export interface TargetRevisionData {
  id: string;
  material_id: string;
  revision_number: number;
  content_markdown: string;
}

export interface InsertRevisionParams {
  materialId: string;
  authorId: string;
  revisionNumber: number;
  contentMarkdown: string;
  changeSummary: string;
}

/**
 * Fetches target revision details by revision ID.
 *
 * @example
 * const rev = await fetchTargetRevision(supabase, "rev-123");
 */
export async function fetchTargetRevision(
  supabase: SupabaseClient,
  revisionId: string,
): Promise<TargetRevisionData> {
  const { data } = await supabase
    .from("material_revisions")
    .select("id, material_id, revision_number, content_markdown")
    .eq("id", revisionId)
    .maybeSingle();

  if (!data) {
    throw new Error(`Revisão com ID ${revisionId} não encontrada.`);
  }

  return data as TargetRevisionData;
}

/**
 * Finds existing canonical material for topic or creates a new one.
 *
 * @example
 * const materialId = await getOrCreateTopicMaterial(supabase, "topic-456");
 */
export async function getOrCreateTopicMaterial(
  supabase: SupabaseClient,
  topicId: string,
): Promise<string> {
  const { data: existing } = await supabase
    .from("materials")
    .select("id")
    .eq("topic_id", topicId)
    .maybeSingle();

  if (existing) return existing.id;

  const { data: created, error } = await supabase
    .from("materials")
    .insert({ topic_id: topicId })
    .select("id")
    .single();

  if (error || !created) {
    throw new Error(`Erro ao inicializar material: ${error?.message}`);
  }
  return created.id;
}

/**
 * Computes next incremental revision number for a given material.
 *
 * @example
 * const nextNumber = await computeNextRevisionNumber(supabase, "mat-789");
 */
export async function computeNextRevisionNumber(
  supabase: SupabaseClient,
  materialId: string,
): Promise<number> {
  const { count } = await supabase
    .from("material_revisions")
    .select("*", { count: "exact", head: true })
    .eq("material_id", materialId);

  return (count ?? 0) + 1;
}

/**
 * Inserts an immutable audit revision row into material_revisions.
 *
 * @example
 * const revId = await insertAuditedRevision(supabase, params);
 */
export async function insertAuditedRevision(
  supabase: SupabaseClient,
  params: InsertRevisionParams,
): Promise<string> {
  const { data, error } = await supabase
    .from("material_revisions")
    .insert({
      material_id: params.materialId,
      author_id: params.authorId,
      revision_number: params.revisionNumber,
      content_markdown: params.contentMarkdown,
      change_summary: params.changeSummary,
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(`Erro ao registrar revisão: ${error?.message}`);
  }
  return data.id;
}

/**
 * Updates canonical material pointer to the new active revision.
 *
 * @example
 * await pointMaterialToRevision(supabase, "mat-1", "rev-2");
 */
export async function pointMaterialToRevision(
  supabase: SupabaseClient,
  materialId: string,
  revisionId: string,
): Promise<void> {
  await supabase
    .from("materials")
    .update({
      current_revision_id: revisionId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", materialId);
}

/**
 * Asserts that no concurrent revision has been published beyond base revision number.
 *
 * @example
 * await assertNoRevisionConflict(supabase, "mat-1", 2);
 */
export async function assertNoRevisionConflict(
  supabase: SupabaseClient,
  materialId: string,
  baseRevisionNumber?: number | null,
): Promise<void> {
  if (baseRevisionNumber === undefined || baseRevisionNumber === null) return;

  const { data } = await supabase
    .from("material_revisions")
    .select("revision_number")
    .eq("material_id", materialId)
    .order("revision_number", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (data && data.revision_number > baseRevisionNumber) {
    throw new Error(
      `Conflito de concorrência: A versão atual no banco é #${data.revision_number}, mas sua edição foi baseada na versão #${baseRevisionNumber}.`,
    );
  }
}
