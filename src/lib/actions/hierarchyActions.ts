"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { assertWriterOrAdmin } from "@/lib/auth/assertWriterOrAdmin";
import { generateSlug } from "@/lib/utils/slug";

export interface CreateDisciplinePayload {
  name: string;
  slug?: string;
  description?: string;
}

export interface CreateSubjectPayload {
  disciplineId: string;
  disciplineSlug: string;
  name: string;
  slug?: string;
  description?: string;
}

export interface CreateTopicPayload {
  subjectId: string;
  disciplineSlug: string;
  subjectSlug: string;
  name: string;
  slug?: string;
  description?: string;
}

export interface DeleteHierarchyPayload {
  table: "disciplines" | "subjects" | "topics";
  id: string;
  redirectPath: string;
}

function sanitizeNameAndSlug(name: string, customSlug?: string) {
  const trimmedName = name.trim();
  if (!trimmedName) {
    throw new Error("Nome da disciplina não pode ser vazio.");
  }
  const slug = customSlug?.trim() ? generateSlug(customSlug) : generateSlug(trimmedName);
  return { trimmedName, slug };
}

/**
 * Creates a new discipline within the catalog.
 *
 * @example
 * const disc = await createDisciplineAction({ name: "Física" });
 */
export async function createDisciplineAction(payload: CreateDisciplinePayload) {
  const { trimmedName, slug } = sanitizeNameAndSlug(payload.name, payload.slug);
  const supabase = await getSupabaseServerClient();
  await assertWriterOrAdmin(supabase);

  const { data, error } = await supabase
    .from("disciplines")
    .insert({
      name: trimmedName,
      slug,
      description: payload.description?.trim() || null,
    })
    .select("id, slug")
    .single();

  if (error || !data) {
    throw new Error(`Falha ao criar disciplina: ${error?.message}`);
  }

  revalidatePath("/");
  return data;
}

/**
 * Creates a new subject under a parent discipline.
 *
 * @example
 * const subj = await createSubjectAction({ disciplineId: "d1", ... });
 */
export async function createSubjectAction(payload: CreateSubjectPayload) {
  const { trimmedName, slug } = sanitizeNameAndSlug(payload.name, payload.slug);
  const supabase = await getSupabaseServerClient();
  await assertWriterOrAdmin(supabase);

  const { data, error } = await supabase
    .from("subjects")
    .insert({
      discipline_id: payload.disciplineId,
      name: trimmedName,
      slug,
      description: payload.description?.trim() || null,
    })
    .select("id, slug")
    .single();

  if (error || !data) {
    throw new Error(`Falha ao criar assunto: ${error?.message}`);
  }

  revalidatePath(`/${payload.disciplineSlug}`);
  return data;
}

/**
 * Creates a new topic under a parent subject.
 *
 * @example
 * const top = await createTopicAction({ subjectId: "s1", ... });
 */
export async function createTopicAction(payload: CreateTopicPayload) {
  const { trimmedName, slug } = sanitizeNameAndSlug(payload.name, payload.slug);
  const supabase = await getSupabaseServerClient();
  await assertWriterOrAdmin(supabase);

  const { data, error } = await supabase
    .from("topics")
    .insert({
      subject_id: payload.subjectId,
      name: trimmedName,
      slug,
      description: payload.description?.trim() || null,
    })
    .select("id, slug")
    .single();

  if (error || !data) {
    throw new Error(`Falha ao criar tópico: ${error?.message}`);
  }

  revalidatePath(`/${payload.disciplineSlug}/${payload.subjectSlug}`);
  return data;
}

/**
 * Deletes a discipline, subject or topic from the catalog.
 *
 * @example
 * await deleteHierarchyAction({ table: "topics", id: "t1", redirectPath: "/" });
 */
export async function deleteHierarchyAction(payload: DeleteHierarchyPayload) {
  const supabase = await getSupabaseServerClient();
  await assertWriterOrAdmin(supabase);

  const { error } = await supabase
    .from(payload.table)
    .delete()
    .eq("id", payload.id);

  if (error) {
    throw new Error(`Falha ao excluir item: ${error.message}`);
  }

  revalidatePath(payload.redirectPath);
}
