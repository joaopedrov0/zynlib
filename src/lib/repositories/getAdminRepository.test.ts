import { describe, it, expect, vi } from "vitest";
import { getAdminRepository } from "./getAdminRepository";
import { SupabaseAdminRepository } from "./SupabaseAdminRepository";
import { getSupabaseServerClient } from "@/lib/supabase/server";

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient: vi.fn().mockResolvedValue({}),
}));

describe("getAdminRepository", () => {
  it("resolves an instance of SupabaseAdminRepository with the server client", async () => {
    const repo = await getAdminRepository();
    expect(repo).toBeInstanceOf(SupabaseAdminRepository);
    expect(getSupabaseServerClient).toHaveBeenCalled();
  });
});
