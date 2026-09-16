import { describe, it, expect, vi, beforeEach } from "vitest";
import { restoreMaterialRevision } from "./restoreMaterialRevision";
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

describe("restoreMaterialRevision Action", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws error if user is not authenticated", async () => {
    vi.mocked(getSupabaseServerClient).mockResolvedValue(
      makeSupabaseMock({
        auth: {
          getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
        },
      })
    );

    await expect(
      restoreMaterialRevision({
        topicId: "t1",
        disciplineSlug: "disc",
        subjectSlug: "subj",
        topicSlug: "top",
        targetRevisionId: "rev-old",
      })
    ).rejects.toThrow("Autenticação necessária");
  });

  it("restores revision successfully as a new audit revision and redirects", async () => {
    const user = { id: "u-writer" };
    const targetRev = {
      id: "rev-old",
      material_id: "mat-1",
      revision_number: 2,
      content_markdown: "# Restored Content",
    };

    const updateEqMock = vi.fn().mockResolvedValue({ error: null });
    const updateMock = vi.fn().mockReturnValue({ eq: updateEqMock });

    vi.mocked(getSupabaseServerClient).mockResolvedValue(
      makeSupabaseMock({
        auth: {
          getUser: vi.fn().mockResolvedValue({ data: { user } }),
        },
        from: vi.fn((table: string) => {
          if (table === "profiles") {
            return {
              select: vi.fn().mockReturnThis(),
              eq: vi.fn().mockReturnThis(),
              maybeSingle: vi.fn().mockResolvedValue({
                data: { id: "u-writer", role: "writer" },
              }),
            };
          }
          if (table === "material_revisions") {
            return {
              select: vi.fn((cols: string) => {
                if (cols.includes("count")) {
                  return {
                    eq: vi.fn().mockResolvedValue({ count: 5 }),
                  };
                }
                return {
                  eq: vi.fn().mockReturnThis(),
                  maybeSingle: vi.fn().mockResolvedValue({ data: targetRev }),
                };
              }),
              insert: vi.fn().mockReturnValue({
                select: vi.fn().mockReturnValue({
                  single: vi.fn().mockResolvedValue({
                    data: { id: "rev-new" },
                    error: null,
                  }),
                }),
              }),
            };
          }
          if (table === "materials") {
            return {
              update: updateMock,
            };
          }
          return {};
        }),
      })
    );

    await restoreMaterialRevision({
      topicId: "t1",
      disciplineSlug: "disc",
      subjectSlug: "subj",
      topicSlug: "top",
      targetRevisionId: "rev-old",
    });

    expect(revalidatePath).toHaveBeenCalledWith("/disc/subj/top");
    expect(revalidatePath).toHaveBeenCalledWith("/disc/subj/top/history");
    expect(redirect).toHaveBeenCalledWith("/disc/subj/top");
  });
});
