import { describe, it, expect, vi, beforeEach } from "vitest";
import { saveMaterialRevision } from "./saveMaterialRevision";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { SupabaseClient } from "@supabase/supabase-js";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient: vi.fn(),
}));

function makeSupabaseMock(mockData: unknown): SupabaseClient {
  return mockData as unknown as SupabaseClient;
}

describe("saveMaterialRevision Action", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws error if user is unauthenticated", async () => {
    vi.mocked(getSupabaseServerClient).mockResolvedValue(
      makeSupabaseMock({
        auth: {
          getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
        },
      })
    );

    await expect(
      saveMaterialRevision({
        topicId: "t1",
        disciplineSlug: "disc",
        subjectSlug: "subj",
        topicSlug: "top",
        contentMarkdown: "Content",
        changeSummary: "Summary",
      })
    ).rejects.toThrow("Autenticação necessária");
  });

  it("throws error if user role is insufficient", async () => {
    vi.mocked(getSupabaseServerClient).mockResolvedValue(
      makeSupabaseMock({
        auth: {
          getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-reader" } } }),
        },
        from: vi.fn(() => ({
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: { id: "u-reader", role: "reader" } }),
        })),
      })
    );

    await expect(
      saveMaterialRevision({
        topicId: "t1",
        disciplineSlug: "disc",
        subjectSlug: "subj",
        topicSlug: "top",
        contentMarkdown: "Content",
        changeSummary: "Summary",
      })
    ).rejects.toThrow("Permissão insuficiente");
  });

  it("validates empty content and summary", async () => {
    vi.mocked(getSupabaseServerClient).mockResolvedValue(
      makeSupabaseMock({
        auth: {
          getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-writer" } } }),
        },
        from: vi.fn(() => ({
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: { id: "u-writer", role: "writer" } }),
        })),
      })
    );

    await expect(
      saveMaterialRevision({
        topicId: "t1",
        disciplineSlug: "disc",
        subjectSlug: "subj",
        topicSlug: "top",
        contentMarkdown: "   ",
        changeSummary: "Summary",
      })
    ).rejects.toThrow("conteúdo do material não pode ser vazio");

    await expect(
      saveMaterialRevision({
        topicId: "t1",
        disciplineSlug: "disc",
        subjectSlug: "subj",
        topicSlug: "top",
        contentMarkdown: "Valid content",
        changeSummary: "   ",
      })
    ).rejects.toThrow("Informe um resumo");
  });

  it("creates revision and redirects successfully", async () => {
    const mockUpdate = vi.fn().mockReturnThis();
    const mockEq = vi.fn().mockResolvedValue({ error: null });
    mockUpdate.mockReturnValue({ eq: mockEq });

    vi.mocked(getSupabaseServerClient).mockResolvedValue(
      makeSupabaseMock({
        auth: {
          getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-writer" } } }),
        },
      from: vi.fn((table: string) => {
        if (table === "profiles") {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            maybeSingle: vi.fn().mockResolvedValue({ data: { id: "u-writer", role: "writer" } }),
          };
        }
        if (table === "materials") {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            maybeSingle: vi.fn().mockResolvedValue({ data: { id: "m1", current_revision_id: "r0" } }),
            update: mockUpdate,
          };
        }
        if (table === "material_revisions") {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockResolvedValue({ count: 2 }),
            insert: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({ data: { id: "r3" }, error: null }),
          };
        }
        return {};
      }),
    })
  );

  await saveMaterialRevision({
    topicId: "t1",
    disciplineSlug: "disc",
    subjectSlug: "subj",
    topicSlug: "top",
    contentMarkdown: "Conteúdo atualizado",
    changeSummary: "Nova versão",
  });

    expect(revalidatePath).toHaveBeenCalledWith("/disc/subj/top");
    expect(redirect).toHaveBeenCalledWith("/disc/subj/top");
  });

  it("creates new material record when none exists", async () => {
    vi.mocked(getSupabaseServerClient).mockResolvedValue(
      makeSupabaseMock({
        auth: {
          getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-writer" } } }),
        },
        from: vi.fn((table: string) => {
          if (table === "profiles") {
            return {
              select: vi.fn().mockReturnThis(),
              eq: vi.fn().mockReturnThis(),
              maybeSingle: vi.fn().mockResolvedValue({ data: { id: "u-writer", role: "writer" } }),
            };
          }
          if (table === "materials") {
            return {
              select: vi.fn().mockReturnThis(),
              eq: vi.fn().mockReturnThis(),
              maybeSingle: vi.fn().mockResolvedValue({ data: null }),
              insert: vi.fn().mockReturnThis(),
              single: vi.fn().mockResolvedValue({ data: { id: "m-new" }, error: null }),
              update: vi.fn().mockReturnValue({ eq: vi.fn().mockResolvedValue({ error: null }) }),
            };
          }
          if (table === "material_revisions") {
            return {
              select: vi.fn().mockReturnThis(),
              eq: vi.fn().mockResolvedValue({ count: 0 }),
              insert: vi.fn().mockReturnThis(),
              single: vi.fn().mockResolvedValue({ data: { id: "r-initial" }, error: null }),
            };
          }
          return {};
        }),
      })
    );

    await saveMaterialRevision({
      topicId: "t-new",
      disciplineSlug: "disc",
      subjectSlug: "subj",
      topicSlug: "top",
      contentMarkdown: "Primeiro conteúdo",
      changeSummary: "Versão inicial",
    });

    expect(redirect).toHaveBeenCalledWith("/disc/subj/top");
  });

  it("throws error when revision insert fails", async () => {
    vi.mocked(getSupabaseServerClient).mockResolvedValue(
      makeSupabaseMock({
        auth: {
          getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-writer" } } }),
        },
        from: vi.fn((table: string) => {
          if (table === "profiles") {
            return {
              select: vi.fn().mockReturnThis(),
              eq: vi.fn().mockReturnThis(),
              maybeSingle: vi.fn().mockResolvedValue({ data: { id: "u-writer", role: "writer" } }),
            };
          }
          if (table === "materials") {
            return {
              select: vi.fn().mockReturnThis(),
              eq: vi.fn().mockReturnThis(),
              maybeSingle: vi.fn().mockResolvedValue({ data: { id: "m1" } }),
            };
          }
          if (table === "material_revisions") {
            return {
              select: vi.fn().mockReturnThis(),
              eq: vi.fn().mockResolvedValue({ count: 0 }),
              insert: vi.fn().mockReturnThis(),
              single: vi.fn().mockResolvedValue({ data: null, error: { message: "Falha de disco" } }),
            };
          }
          return {};
        }),
      })
    );

    await expect(
      saveMaterialRevision({
        topicId: "t1",
        disciplineSlug: "disc",
        subjectSlug: "subj",
        topicSlug: "top",
        contentMarkdown: "Primeiro conteúdo",
        changeSummary: "Versão inicial",
      })
    ).rejects.toThrow("Erro ao registrar revisão");
  });

  it("throws error when material creation fails", async () => {
    vi.mocked(getSupabaseServerClient).mockResolvedValue(
      makeSupabaseMock({
        auth: {
          getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-writer" } } }),
        },
        from: vi.fn((table: string) => {
          if (table === "profiles") {
            return {
              select: vi.fn().mockReturnThis(),
              eq: vi.fn().mockReturnThis(),
              maybeSingle: vi.fn().mockResolvedValue({ data: { id: "u-writer", role: "writer" } }),
            };
          }
          if (table === "materials") {
            return {
              select: vi.fn().mockReturnThis(),
              eq: vi.fn().mockReturnThis(),
              maybeSingle: vi.fn().mockResolvedValue({ data: null }),
              insert: vi.fn().mockReturnThis(),
              single: vi.fn().mockResolvedValue({ data: null, error: { message: "Erro DDL" } }),
            };
          }
          return {};
        }),
      })
    );

    await expect(
      saveMaterialRevision({
        topicId: "t1",
        disciplineSlug: "disc",
        subjectSlug: "subj",
        topicSlug: "top",
        contentMarkdown: "Primeiro conteúdo",
        changeSummary: "Versão inicial",
      })
    ).rejects.toThrow("Erro ao inicializar material");
  });
});
