import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createDisciplineAction,
  createSubjectAction,
  createTopicAction,
  deleteHierarchyAction,
} from "./hierarchyActions";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { SupabaseClient } from "@supabase/supabase-js";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient: vi.fn(),
}));

function makeSupabaseMock(mockData: unknown): SupabaseClient {
  return mockData as unknown as SupabaseClient;
}

describe("hierarchyActions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createDisciplineAction", () => {
    it("throws error if name is empty", async () => {
      await expect(
        createDisciplineAction({ name: "   " })
      ).rejects.toThrow("Nome da disciplina não pode ser vazio.");
    });

    it("inserts discipline and revalidates home path", async () => {
      const singleMock = vi.fn().mockResolvedValue({
        data: { id: "d-1", slug: "fisica" },
        error: null,
      });
      const insertMock = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({ single: singleMock }),
      });

      vi.mocked(getSupabaseServerClient).mockResolvedValue(
        makeSupabaseMock({
          auth: {
            getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-1" } } }),
          },
          from: vi.fn((table: string) => {
            if (table === "profiles") {
              return {
                select: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                maybeSingle: vi.fn().mockResolvedValue({
                  data: { id: "u-1", role: "writer" },
                }),
              };
            }
            if (table === "disciplines") {
              return { insert: insertMock };
            }
            return {};
          }),
        })
      );

      const result = await createDisciplineAction({
        name: "Física",
        description: "Fundamentos de física",
      });

      expect(result).toEqual({ id: "d-1", slug: "fisica" });
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });
  });

  describe("createSubjectAction", () => {
    it("inserts subject and revalidates discipline path", async () => {
      const singleMock = vi.fn().mockResolvedValue({
        data: { id: "s-1", slug: "mecanica" },
        error: null,
      });
      const insertMock = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({ single: singleMock }),
      });

      vi.mocked(getSupabaseServerClient).mockResolvedValue(
        makeSupabaseMock({
          auth: {
            getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-1" } } }),
          },
          from: vi.fn((table: string) => {
            if (table === "profiles") {
              return {
                select: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                maybeSingle: vi.fn().mockResolvedValue({
                  data: { id: "u-1", role: "admin" },
                }),
              };
            }
            if (table === "subjects") {
              return { insert: insertMock };
            }
            return {};
          }),
        })
      );

      const result = await createSubjectAction({
        disciplineId: "d-1",
        disciplineSlug: "fisica",
        name: "Mecânica",
      });

      expect(result).toEqual({ id: "s-1", slug: "mecanica" });
      expect(revalidatePath).toHaveBeenCalledWith("/fisica");
    });
  });

  describe("createTopicAction", () => {
    it("inserts topic and revalidates subject path", async () => {
      const singleMock = vi.fn().mockResolvedValue({
        data: { id: "t-1", slug: "cinematica" },
        error: null,
      });
      const insertMock = vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({ single: singleMock }),
      });

      vi.mocked(getSupabaseServerClient).mockResolvedValue(
        makeSupabaseMock({
          auth: {
            getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-1" } } }),
          },
          from: vi.fn((table: string) => {
            if (table === "profiles") {
              return {
                select: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                maybeSingle: vi.fn().mockResolvedValue({
                  data: { id: "u-1", role: "writer" },
                }),
              };
            }
            if (table === "topics") {
              return { insert: insertMock };
            }
            return {};
          }),
        })
      );

      const result = await createTopicAction({
        subjectId: "s-1",
        disciplineSlug: "fisica",
        subjectSlug: "mecanica",
        name: "Cinemática",
      });

      expect(result).toEqual({ id: "t-1", slug: "cinematica" });
      expect(revalidatePath).toHaveBeenCalledWith("/fisica/mecanica");
    });
  });

  describe("deleteHierarchyAction", () => {
    it("deletes record from database and revalidates path", async () => {
      const eqMock = vi.fn().mockResolvedValue({ error: null });
      const deleteMock = vi.fn().mockReturnValue({ eq: eqMock });

      vi.mocked(getSupabaseServerClient).mockResolvedValue(
        makeSupabaseMock({
          auth: {
            getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-1" } } }),
          },
          from: vi.fn((table: string) => {
            if (table === "profiles") {
              return {
                select: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                maybeSingle: vi.fn().mockResolvedValue({
                  data: { id: "u-1", role: "admin" },
                }),
              };
            }
            return { delete: deleteMock };
          }),
        })
      );

      await deleteHierarchyAction({
        table: "disciplines",
        id: "d-1",
        redirectPath: "/",
      });

      expect(deleteMock).toHaveBeenCalled();
      expect(eqMock).toHaveBeenCalledWith("id", "d-1");
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });

    it("throws error when db delete fails", async () => {
      vi.mocked(getSupabaseServerClient).mockResolvedValue(
        makeSupabaseMock({
          auth: {
            getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-1" } } }),
          },
          from: vi.fn((table: string) => {
            if (table === "profiles") {
              return {
                select: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                maybeSingle: vi.fn().mockResolvedValue({
                  data: { id: "u-1", role: "admin" },
                }),
              };
            }
            return {
              delete: vi.fn().mockReturnValue({
                eq: vi.fn().mockResolvedValue({ error: { message: "FK violation" } }),
              }),
            };
          }),
        })
      );

      await expect(
        deleteHierarchyAction({
          table: "disciplines",
          id: "d-1",
          redirectPath: "/",
        })
      ).rejects.toThrow("Falha ao excluir item: FK violation");
    });
  });

  describe("custom slug and error handling in creation", () => {
    it("handles custom slug in createDisciplineAction", async () => {
      const singleMock = vi.fn().mockResolvedValue({
        data: { id: "d-2", slug: "custom-slug" },
        error: null,
      });

      vi.mocked(getSupabaseServerClient).mockResolvedValue(
        makeSupabaseMock({
          auth: {
            getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-1" } } }),
          },
          from: vi.fn((table: string) => {
            if (table === "profiles") {
              return {
                select: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                maybeSingle: vi.fn().mockResolvedValue({
                  data: { id: "u-1", role: "admin" },
                }),
              };
            }
            return {
              insert: vi.fn().mockReturnValue({
                select: vi.fn().mockReturnValue({ single: singleMock }),
              }),
            };
          }),
        })
      );

      const result = await createDisciplineAction({
        name: "Custom",
        slug: "custom-slug",
      });
      expect(result.slug).toBe("custom-slug");
    });

    it("throws error when createDisciplineAction db insert fails", async () => {
      vi.mocked(getSupabaseServerClient).mockResolvedValue(
        makeSupabaseMock({
          auth: {
            getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-1" } } }),
          },
          from: vi.fn((table: string) => {
            if (table === "profiles") {
              return {
                select: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                maybeSingle: vi.fn().mockResolvedValue({
                  data: { id: "u-1", role: "admin" },
                }),
              };
            }
            return {
              insert: vi.fn().mockReturnValue({
                select: vi.fn().mockReturnValue({
                  single: vi.fn().mockResolvedValue({
                    data: null,
                    error: { message: "Duplicate key" },
                  }),
                }),
              }),
            };
          }),
        })
      );

      await expect(
        createDisciplineAction({ name: "Duplicate" })
      ).rejects.toThrow("Falha ao criar disciplina: Duplicate key");
    });

    it("throws error when createSubjectAction db insert fails", async () => {
      vi.mocked(getSupabaseServerClient).mockResolvedValue(
        makeSupabaseMock({
          auth: {
            getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-1" } } }),
          },
          from: vi.fn((table: string) => {
            if (table === "profiles") {
              return {
                select: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                maybeSingle: vi.fn().mockResolvedValue({
                  data: { id: "u-1", role: "admin" },
                }),
              };
            }
            return {
              insert: vi.fn().mockReturnValue({
                select: vi.fn().mockReturnValue({
                  single: vi.fn().mockResolvedValue({
                    data: null,
                    error: { message: "Subject error" },
                  }),
                }),
              }),
            };
          }),
        })
      );

      await expect(
        createSubjectAction({
          disciplineId: "d1",
          disciplineSlug: "disc",
          name: "Subj",
        })
      ).rejects.toThrow("Falha ao criar assunto: Subject error");
    });

    it("throws error when createTopicAction db insert fails", async () => {
      vi.mocked(getSupabaseServerClient).mockResolvedValue(
        makeSupabaseMock({
          auth: {
            getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-1" } } }),
          },
          from: vi.fn((table: string) => {
            if (table === "profiles") {
              return {
                select: vi.fn().mockReturnThis(),
                eq: vi.fn().mockReturnThis(),
                maybeSingle: vi.fn().mockResolvedValue({
                  data: { id: "u-1", role: "admin" },
                }),
              };
            }
            return {
              insert: vi.fn().mockReturnValue({
                select: vi.fn().mockReturnValue({
                  single: vi.fn().mockResolvedValue({
                    data: null,
                    error: { message: "Topic error" },
                  }),
                }),
              }),
            };
          }),
        })
      );

      await expect(
        createTopicAction({
          subjectId: "s1",
          disciplineSlug: "disc",
          subjectSlug: "subj",
          name: "Top",
        })
      ).rejects.toThrow("Falha ao criar tópico: Topic error");
    });
  });
});
