import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "./route";
import { getSupabaseServerClient } from "@/lib/supabase/server";

import { SupabaseClient } from "@supabase/supabase-js";

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient: vi.fn(),
}));

describe("Auth Callback Route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("exchanges code for session and redirects to next target", async () => {
    const mockExchange = vi.fn().mockResolvedValue({ error: null });
    vi.mocked(getSupabaseServerClient).mockResolvedValue({
      auth: { exchangeCodeForSession: mockExchange },
    } as unknown as SupabaseClient);

    const request = new Request("http://localhost:3000/auth/callback?code=abc123xyz&next=/comp/ed");
    const response = await GET(request);

    expect(mockExchange).toHaveBeenCalledWith("abc123xyz");
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/comp/ed");
  });

  it("redirects with error parameter when exchange fails", async () => {
    const mockExchange = vi.fn().mockResolvedValue({ error: { message: "Invalid code" } });
    vi.mocked(getSupabaseServerClient).mockResolvedValue({
      auth: { exchangeCodeForSession: mockExchange },
    } as unknown as SupabaseClient);

    const request = new Request("http://localhost:3000/auth/callback?code=bad_code");
    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toContain("/?auth_error=exchange_failed");
  });

  it("redirects with error parameter when no code is supplied", async () => {
    const request = new Request("http://localhost:3000/auth/callback");
    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toContain("/?auth_error=exchange_failed");
  });
});
