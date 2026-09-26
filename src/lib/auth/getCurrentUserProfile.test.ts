import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCurrentUserProfile } from "./getCurrentUserProfile";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { UserProfile } from "@/types/database";

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient: vi.fn(),
}));

interface FakeClaims {
  sub: string;
  email?: string;
  user_metadata?: { full_name?: string; name?: string; avatar_url?: string };
}

/** Cliente Supabase em memória com sessão (JWT) e tabela `profiles`. */
class FakeProfileSupabaseClient {
  readonly getUser = vi.fn();
  readonly upsert = vi.fn().mockResolvedValue({ error: null });
  readonly auth: { getClaims: () => Promise<unknown>; getUser: () => Promise<unknown> };

  constructor(
    claims: FakeClaims | null,
    private storedProfile: UserProfile | null = null,
    claimsError: Error | null = null,
  ) {
    const data = claims ? { claims } : null;
    this.auth = {
      getClaims: async () => ({ data: claimsError ? null : data, error: claimsError }),
      getUser: this.getUser,
    };
  }

  from() {
    return {
      select: () => ({
        eq: () => ({ maybeSingle: async () => ({ data: this.storedProfile }) }),
      }),
      upsert: this.upsert,
    };
  }

  asClient(): SupabaseClient {
    return this as unknown as SupabaseClient;
  }
}

function useFakeClient(fake: FakeProfileSupabaseClient): FakeProfileSupabaseClient {
  vi.mocked(getSupabaseServerClient).mockResolvedValue(fake.asClient());
  return fake;
}

describe("getCurrentUserProfile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when user is unauthenticated", async () => {
    useFakeClient(new FakeProfileSupabaseClient(null));

    expect(await getCurrentUserProfile()).toBeNull();
  });

  it("returns null when the session JWT cannot be verified", async () => {
    useFakeClient(
      new FakeProfileSupabaseClient({ sub: "u-1" }, null, new Error("invalid JWT")),
    );

    expect(await getCurrentUserProfile()).toBeNull();
  });

  it("returns existing profile if found", async () => {
    const existing: UserProfile = {
      id: "u-123",
      email: "user@test.com",
      full_name: "Existing User",
      avatar_url: "https://example.com/avatar.jpg",
      role: "admin",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    useFakeClient(new FakeProfileSupabaseClient({ sub: "u-123" }, existing));

    expect(await getCurrentUserProfile()).toEqual(existing);
  });

  it("identifies the user from verified JWT claims without calling the Auth API", async () => {
    const fake = useFakeClient(new FakeProfileSupabaseClient({ sub: "u-123" }));

    await getCurrentUserProfile();

    expect(fake.getUser).not.toHaveBeenCalled();
  });

  it("auto-creates writer profile when record not found", async () => {
    const fake = useFakeClient(
      new FakeProfileSupabaseClient({
        sub: "u-new",
        email: "novato@test.com",
        user_metadata: { full_name: "Novato Silva" },
      }),
    );

    const result = await getCurrentUserProfile();

    expect(result?.id).toBe("u-new");
    expect(result?.full_name).toBe("Novato Silva");
    expect(result?.role).toBe("writer");
    expect(fake.upsert).toHaveBeenCalled();
  });

  it("handles metadata name fallback and email fallback", async () => {
    useFakeClient(
      new FakeProfileSupabaseClient({
        sub: "u-name",
        email: "pedro@test.com",
        user_metadata: { name: "Pedro Dev" },
      }),
    );
    expect((await getCurrentUserProfile())?.full_name).toBe("Pedro Dev");

    useFakeClient(new FakeProfileSupabaseClient({ sub: "u-email", email: "joao@test.com" }));
    expect((await getCurrentUserProfile())?.full_name).toBe("joao");
  });

  it("returns null on unexpected error", async () => {
    vi.mocked(getSupabaseServerClient).mockRejectedValue(new Error("DB failure"));

    expect(await getCurrentUserProfile()).toBeNull();
  });
});
