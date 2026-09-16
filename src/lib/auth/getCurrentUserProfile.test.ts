import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCurrentUserProfile } from "./getCurrentUserProfile";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient: vi.fn(),
}));

function makeSupabaseMock(mockData: unknown): SupabaseClient {
  return mockData as unknown as SupabaseClient;
}

describe("getCurrentUserProfile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when user is unauthenticated", async () => {
    vi.mocked(getSupabaseServerClient).mockResolvedValue(
      makeSupabaseMock({
        auth: {
          getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
        },
      })
    );

    const result = await getCurrentUserProfile();
    expect(result).toBeNull();
  });

  it("returns existing profile if found", async () => {
    const existing = {
      id: "u-123",
      email: "user@test.com",
      full_name: "Existing User",
      avatar_url: "https://example.com/avatar.jpg",
      role: "admin",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    vi.mocked(getSupabaseServerClient).mockResolvedValue(
      makeSupabaseMock({
        auth: {
          getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-123" } } }),
        },
        from: vi.fn(() => ({
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: existing }),
        })),
      })
    );

    const result = await getCurrentUserProfile();
    expect(result).toEqual(existing);
  });

  it("auto-creates writer profile when record not found", async () => {
    const upsertMock = vi.fn().mockResolvedValue({ error: null });

    vi.mocked(getSupabaseServerClient).mockResolvedValue(
      makeSupabaseMock({
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: {
              user: {
                id: "u-new",
                email: "novato@test.com",
                user_metadata: { full_name: "Novato Silva" },
              },
            },
          }),
        },
        from: vi.fn((table: string) => {
          if (table === "profiles") {
            return {
              select: vi.fn().mockReturnThis(),
              eq: vi.fn().mockReturnThis(),
              maybeSingle: vi.fn().mockResolvedValue({ data: null }),
              upsert: upsertMock,
            };
          }
          return {};
        }),
      })
    );

    const result = await getCurrentUserProfile();
    expect(result?.full_name).toBe("Novato Silva");
    expect(result?.role).toBe("writer");
    expect(upsertMock).toHaveBeenCalled();
  });

  it("handles metadata name fallback and email fallback", async () => {
    vi.mocked(getSupabaseServerClient).mockResolvedValue(
      makeSupabaseMock({
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: {
              user: {
                id: "u-name",
                email: "pedro@test.com",
                user_metadata: { name: "Pedro Dev" },
              },
            },
          }),
        },
        from: vi.fn(() => ({
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: null }),
          upsert: vi.fn().mockResolvedValue({ error: null }),
        })),
      })
    );

    const result = await getCurrentUserProfile();
    expect(result?.full_name).toBe("Pedro Dev");

    // Test email split fallback
    vi.mocked(getSupabaseServerClient).mockResolvedValue(
      makeSupabaseMock({
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: {
              user: {
                id: "u-email",
                email: "joao@test.com",
              },
            },
          }),
        },
        from: vi.fn(() => ({
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          maybeSingle: vi.fn().mockResolvedValue({ data: null }),
          upsert: vi.fn().mockResolvedValue({ error: null }),
        })),
      })
    );

    const resultEmail = await getCurrentUserProfile();
    expect(resultEmail?.full_name).toBe("joao");
  });

  it("returns null on unexpected error", async () => {
    vi.mocked(getSupabaseServerClient).mockRejectedValue(new Error("DB failure"));

    const result = await getCurrentUserProfile();
    expect(result).toBeNull();
  });
});
