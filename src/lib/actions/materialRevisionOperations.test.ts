import { describe, it, expect, vi } from "vitest";
import {
  fetchTargetRevision,
  getOrCreateTopicMaterial,
  computeNextRevisionNumber,
  insertAuditedRevision,
  pointMaterialToRevision,
  assertNoRevisionConflict,
} from "./materialRevisionOperations";
import { SupabaseClient } from "@supabase/supabase-js";

function makeSupabaseMock(mockData: unknown): SupabaseClient {
  return mockData as unknown as SupabaseClient;
}

describe("materialRevisionOperations", () => {
  describe("fetchTargetRevision", () => {
    it("throws error when revision is not found", async () => {
      const supabase = makeSupabaseMock({
        from: vi.fn(() => ({
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: null }),
        })),
      });

      await expect(fetchTargetRevision(supabase, "rev-999")).rejects.toThrow(
        "Revisão com ID rev-999 não encontrada."
      );
    });

    it("returns revision details when found", async () => {
      const revData = {
        id: "rev-1",
        material_id: "mat-1",
        revision_number: 2,
        content_markdown: "# Hello",
      };
      const supabase = makeSupabaseMock({
        from: vi.fn(() => ({
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: revData }),
        })),
      });

      const result = await fetchTargetRevision(supabase, "rev-1");
      expect(result).toEqual(revData);
    });
  });

  describe("getOrCreateTopicMaterial", () => {
    it("returns existing material id if present", async () => {
      const supabase = makeSupabaseMock({
        from: vi.fn(() => ({
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: { id: "mat-existing" } }),
        })),
      });

      const id = await getOrCreateTopicMaterial(supabase, "topic-1");
      expect(id).toBe("mat-existing");
    });

    it("creates and returns new material id when absent", async () => {
      const supabase = makeSupabaseMock({
        from: vi.fn((table: string) => {
          if (table === "materials") {
            return {
              select: vi.fn().mockReturnThis(),
              eq: vi.fn().mockReturnThis(),
              maybeSingle: vi.fn().mockResolvedValue({ data: null }),
              insert: vi.fn().mockReturnValue({
                select: vi.fn().mockReturnValue({
                  single: vi.fn().mockResolvedValue({
                    data: { id: "mat-new" },
                    error: null,
                  }),
                }),
              }),
            };
          }
          return {};
        }),
      });

      const id = await getOrCreateTopicMaterial(supabase, "topic-1");
      expect(id).toBe("mat-new");
    });

    it("throws error when material creation fails", async () => {
      const supabase = makeSupabaseMock({
        from: vi.fn(() => ({
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: null }),
          insert: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: null,
                error: { message: "DB write failed" },
              }),
            }),
          }),
        })),
      });

      await expect(getOrCreateTopicMaterial(supabase, "topic-1")).rejects.toThrow(
        "DB write failed"
      );
    });
  });

  describe("computeNextRevisionNumber", () => {
    it("returns count + 1", async () => {
      const supabase = makeSupabaseMock({
        from: vi.fn(() => ({
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockResolvedValue({ count: 4 }),
        })),
      });

      const nextNum = await computeNextRevisionNumber(supabase, "mat-1");
      expect(nextNum).toBe(5);
    });

    it("returns 1 when count is null or 0", async () => {
      const supabase = makeSupabaseMock({
        from: vi.fn(() => ({
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockResolvedValue({ count: null }),
        })),
      });

      const nextNum = await computeNextRevisionNumber(supabase, "mat-1");
      expect(nextNum).toBe(1);
    });
  });

  describe("insertAuditedRevision", () => {
    it("inserts revision and returns new id", async () => {
      const supabase = makeSupabaseMock({
        from: vi.fn(() => ({
          insert: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { id: "rev-new" },
                error: null,
              }),
            }),
          }),
        })),
      });

      const newId = await insertAuditedRevision(supabase, {
        materialId: "mat-1",
        authorId: "user-1",
        revisionNumber: 3,
        contentMarkdown: "Content",
        changeSummary: "Summary",
      });

      expect(newId).toBe("rev-new");
    });

    it("throws error when insertion fails", async () => {
      const supabase = makeSupabaseMock({
        from: vi.fn(() => ({
          insert: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: null,
                error: { message: "insert failed" },
              }),
            }),
          }),
        })),
      });

      await expect(
        insertAuditedRevision(supabase, {
          materialId: "mat-1",
          authorId: "user-1",
          revisionNumber: 3,
          contentMarkdown: "Content",
          changeSummary: "Summary",
        })
      ).rejects.toThrow("insert failed");
    });
  });

  describe("pointMaterialToRevision", () => {
    it("updates current_revision_id on material", async () => {
      const eqMock = vi.fn().mockResolvedValue({ error: null });
      const updateMock = vi.fn().mockReturnValue({ eq: eqMock });
      const supabase = makeSupabaseMock({
        from: vi.fn(() => ({
          update: updateMock,
        })),
      });

      await pointMaterialToRevision(supabase, "mat-1", "rev-10");
      expect(updateMock).toHaveBeenCalled();
      expect(eqMock).toHaveBeenCalledWith("id", "mat-1");
    });
  });

  describe("assertNoRevisionConflict", () => {
    it("does nothing when baseRevisionNumber is null or undefined", async () => {
      const supabase = makeSupabaseMock({
        from: vi.fn(),
      });

      await expect(
        assertNoRevisionConflict(supabase, "mat-1", null)
      ).resolves.toBeUndefined();
      await expect(
        assertNoRevisionConflict(supabase, "mat-1", undefined)
      ).resolves.toBeUndefined();
    });

    it("does not throw when database revision number equals base", async () => {
      const supabase = makeSupabaseMock({
        from: vi.fn(() => ({
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          order: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: { revision_number: 3 } }),
        })),
      });

      await expect(
        assertNoRevisionConflict(supabase, "mat-1", 3)
      ).resolves.toBeUndefined();
    });

    it("throws error when database has newer revision than base", async () => {
      const supabase = makeSupabaseMock({
        from: vi.fn(() => ({
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          order: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: { revision_number: 5 } }),
        })),
      });

      await expect(
        assertNoRevisionConflict(supabase, "mat-1", 3)
      ).rejects.toThrow(
        "Conflito de concorrência: A versão atual no banco é #5, mas sua edição foi baseada na versão #3."
      );
    });
  });
});
