import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getSupabaseBrowserClient } from "./client";
import { getSupabaseServerClient } from "./server";
import { updateSession } from "./middleware";
import { middleware } from "@/middleware";
import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { NextRequest } from "next/server";
vi.mock("next/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/server")>();
  return {
    ...actual,
    NextResponse: {
      next: vi.fn(() => ({
        cookies: {
          set: vi.fn(),
        },
      })),
    },
  };
});

vi.mock("@supabase/ssr", () => ({
  createBrowserClient: vi.fn(() => ({ browser: true })),
  createServerClient: vi.fn((_url, _key, options) => {
    // Invoke cookies callbacks to test coverage
    if (options?.cookies?.getAll) {
      options.cookies.getAll();
    }
    if (options?.cookies?.setAll) {
      options.cookies.setAll([{ name: "test", value: "val", options: {} }]);
    }
    return {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
      },
    };
  }),
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn(() => ({
    getAll: vi.fn(() => []),
    set: vi.fn(),
  })),
}));

describe("Supabase Clients and Middleware", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.clearAllMocks();
  });

  it("throws error in getSupabaseBrowserClient when env vars are missing", () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    expect(() => getSupabaseBrowserClient()).toThrow("Configuração ausente");
  });

  it("creates browser client when env vars are present", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";

    const client = getSupabaseBrowserClient();
    expect(createBrowserClient).toHaveBeenCalledWith(
      "https://example.supabase.co",
      "anon-key"
    );
    expect(client).toBeDefined();
  });

  it("throws error in getSupabaseServerClient when env vars are missing", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    await expect(getSupabaseServerClient()).rejects.toThrow("Configuração ausente");
  });

  it("creates server client when env vars are present", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";

    const client = await getSupabaseServerClient();
    expect(createServerClient).toHaveBeenCalled();
    expect(client).toBeDefined();
  });

  it("updateSession returns response directly if env vars are missing", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const request = new NextRequest("http://localhost:3000/teste");
    const response = await updateSession(request);
    expect(response).toBeDefined();
  });

  it("updateSession and root middleware refresh session when env vars exist", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";

    const request = new NextRequest("http://localhost:3000/teste");
    const response = await middleware(request);
    expect(response).toBeDefined();
    expect(createServerClient).toHaveBeenCalled();
  });
});
