"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";

interface SaveRevisionPayload {
  topicId: string;
  disciplineSlug: string;
  subjectSlug: string;
  topicSlug: string;
  contentMarkdown: string;
  changeSummary: string;
}

export async function saveMaterialRevision(payload: SaveRevisionPayload) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Autenticação necessária para publicar ou editar materiais.");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || !["admin", "writer"].includes(profile.role)) {
    throw new Error("Permissão insuficiente. Apenas escritores ou admins podem editar.");
  }

  const trimmedMarkdown = payload.contentMarkdown.trim();
  const trimmedSummary = payload.changeSummary.trim();

  if (!trimmedMarkdown) {
    throw new Error("O conteúdo do material não pode ser vazio.");
  }

  if (!trimmedSummary) {
    throw new Error("Informe um resumo descrevendo a alteração (mínimo 3 caracteres).");
  }

  // 1. Obtém ou cria o material canônico do tópico (1:1)
  let materialId: string;
  const { data: existingMaterial } = await supabase
    .from("materials")
    .select("id, current_revision_id")
    .eq("topic_id", payload.topicId)
    .maybeSingle();

  if (existingMaterial) {
    materialId = existingMaterial.id;
  } else {
    const { data: newMaterial, error: createError } = await supabase
      .from("materials")
      .insert({ topic_id: payload.topicId })
      .select("id")
      .single();

    if (createError || !newMaterial) {
      throw new Error(`Erro ao inicializar material: ${createError?.message}`);
    }
    materialId = newMaterial.id;
  }

  // 2. Calcula o próximo número de revisão
  const { count } = await supabase
    .from("material_revisions")
    .select("*", { count: "exact", head: true })
    .eq("material_id", materialId);

  const nextRevisionNumber = (count ?? 0) + 1;

  // 3. Cria a nova revisão auditável
  const { data: revision, error: revError } = await supabase
    .from("material_revisions")
    .insert({
      material_id: materialId,
      author_id: user.id,
      revision_number: nextRevisionNumber,
      content_markdown: trimmedMarkdown,
      change_summary: trimmedSummary,
    })
    .select("id")
    .single();

  if (revError || !revision) {
    throw new Error(`Erro ao registrar revisão: ${revError?.message}`);
  }

  // 4. Atualiza o ponteiro da revisão atual no material canônico
  await supabase
    .from("materials")
    .update({
      current_revision_id: revision.id,
      updated_at: new Date().toISOString(),
    })
    .eq("id", materialId);

  const targetPath = `/${payload.disciplineSlug}/${payload.subjectSlug}/${payload.topicSlug}`;
  revalidatePath(targetPath);
  redirect(targetPath);
}
