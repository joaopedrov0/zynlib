import { describe, it, expect, vi } from "vitest";
import { assertWriterOrAdmin } from "./assertWriterOrAdmin";
import { SupabaseClient } from "@supabase/supabase-js";

function makeSupabaseMock(mockData: unknown): SupabaseClient {
  return mockData as unknown as SupabaseClient;
}

describe("assertWriterOrAdmin", () => {
  it("throws error when user is unauthenticated", async () => {
    const supabase = makeSupabaseMock({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
      },
    });

    await expect(assertWriterOrAdmin(supabase)).rejects.toThrow(
      "Autenticação necessária"
    );
  });

  it("throws error when profile has reader role", async () => {
    const supabase = makeSupabaseMock({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-1" } } }),
      },
      from: vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockResolvedValue({ data: { id: "u-1", role: "reader" } }),
      })),
    });

    await expect(assertWriterOrAdmin(supabase)).rejects.toThrow(
      "Permissão insuficiente"
    );
  });

  it("throws error when profile is not found", async () => {
    const supabase = makeSupabaseMock({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u-1" } } }),
      },
      from: vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockResolvedValue({ data: null }),
      })),
    });

    await expect(assertWriterOrAdmin(supabase)).rejects.toThrow(
      "Permissão insuficiente"
    );
  });

  it("returns user when profile has writer role", async () => {
    const user = { id: "u-writer" };
    const supabase = makeSupabaseMock({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user } }),
      },
      from: vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockResolvedValue({ data: { id: "u-writer", role: "writer" } }),
      })),
    });

    const result = await assertWriterOrAdmin(supabase);
    expect(result).toEqual(user);
  });

  it("returns user when profile has admin role", async () => {
    const user = { id: "u-admin" };
    const supabase = makeSupabaseMock({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user } }),
      },
      from: vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockResolvedValue({ data: { id: "u-admin", role: "admin" } }),
      })),
    });

    const result = await assertWriterOrAdmin(supabase);
    expect(result).toEqual(user);
  });
});
