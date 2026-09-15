import { describe, it, expect } from "vitest";
import { resolveCallbackTarget } from "./resolveCallbackUrl";

describe("resolveCallbackTarget", () => {
  it("uses x-forwarded-host and https protocol when in production behind a proxy", () => {
    const request = new Request("http://localhost:3000/auth/callback?code=abc", {
      headers: {
        "x-forwarded-host": "zynlib.vercel.app",
        "x-forwarded-proto": "https",
      },
    });

    const target = resolveCallbackTarget(request, "/ciencia-da-computacao");
    expect(target).toBe("https://zynlib.vercel.app/ciencia-da-computacao");
  });

  it("falls back to request origin when x-forwarded-host is absent", () => {
    const request = new Request("http://localhost:3000/auth/callback?code=abc");

    const target = resolveCallbackTarget(request, "/");
    expect(target).toBe("http://localhost:3000/");
  });

  it("appends query parameters when redirecting with error", () => {
    const request = new Request("http://localhost:3000/auth/callback", {
      headers: {
        "x-forwarded-host": "zynlib.vercel.app",
      },
    });

    const target = resolveCallbackTarget(
      request,
      "/?auth_error=exchange_failed",
    );
    expect(target).toBe("https://zynlib.vercel.app/?auth_error=exchange_failed");
  });

  it("prevents open redirects to external untrusted domains", () => {
    const request = new Request("http://localhost:3000/auth/callback", {
      headers: {
        "x-forwarded-host": "zynlib.vercel.app",
      },
    });

    const target = resolveCallbackTarget(
      request,
      "https://evil-site.com/steal-token",
    );
    // Deve neutralizar redirect externo e manter no host oficial
    expect(target).toBe("https://zynlib.vercel.app/");
  });
});
