import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthButton } from "./AuthButton";
import { UserProfile } from "@/types/database";

const mockSignInWithOAuth = vi.fn();
const mockSignOut = vi.fn();
const mockUnsubscribe = vi.fn();

type AuthStateCallback = (event: string, session: { user: { id: string } } | null) => Promise<void>;
let authCallback: AuthStateCallback | null = null;

vi.mock("@/lib/supabase/client", () => ({
  getSupabaseBrowserClient: () => ({
    auth: {
      onAuthStateChange: vi.fn((cb) => {
        authCallback = cb;
        return {
          data: { subscription: { unsubscribe: mockUnsubscribe } },
        };
      }),
      signInWithOAuth: mockSignInWithOAuth,
      signOut: mockSignOut,
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({
        data: {
          id: "u-session",
          email: "session@test.com",
          full_name: "Session User",
          avatar_url: null,
          role: "writer",
        },
      }),
    })),
  }),
}));

describe("AuthButton Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login button when unauthenticated", () => {
    render(<AuthButton initialProfile={null} />);
    const loginButton = screen.getByText("Entrar com Google");
    expect(loginButton).toBeDefined();

    fireEvent.click(loginButton);
    expect(mockSignInWithOAuth).toHaveBeenCalledWith(
      expect.objectContaining({ provider: "google" })
    );
  });

  it("renders writer profile and handles logout", async () => {
    const profile: UserProfile = {
      id: "u-writer",
      email: "writer@example.com",
      full_name: "Writer User",
      avatar_url: null,
      role: "writer",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    render(<AuthButton initialProfile={profile} />);
    expect(screen.getByText("Writer User")).toBeDefined();
    expect(screen.getByText("Escritor")).toBeDefined();

    const logoutButton = screen.getByLabelText("Sair da conta");
    fireEvent.click(logoutButton);
    expect(mockSignOut).toHaveBeenCalled();
  });

  it("renders admin role badge correctly", () => {
    const adminProfile: UserProfile = {
      id: "u-admin",
      email: "admin@example.com",
      full_name: "Admin User",
      avatar_url: "https://example.com/avatar.png",
      role: "admin",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    render(<AuthButton initialProfile={adminProfile} />);
    expect(screen.getByText("Admin User")).toBeDefined();
    expect(screen.getByText("Admin")).toBeDefined();
  });

  it("handles auth state changes", async () => {
    render(<AuthButton initialProfile={null} />);
    expect(authCallback).toBeDefined();

    await authCallback("SIGNED_OUT", null);
    await authCallback("SIGNED_IN", { user: { id: "u-session" } });
  });

  it("handles error during login and logout", async () => {
    mockSignInWithOAuth.mockRejectedValueOnce(new Error("Login failed"));
    render(<AuthButton initialProfile={null} />);
    const loginButton = screen.getByText("Entrar com Google");
    fireEvent.click(loginButton);

    mockSignOut.mockRejectedValueOnce(new Error("Signout failed"));
    const writer: UserProfile = {
      id: "u-err",
      email: "err@test.com",
      full_name: "Err User",
      avatar_url: null,
      role: "writer",
      created_at: "",
      updated_at: "",
    };
    render(<AuthButton initialProfile={writer} />);
    const logoutBtn = screen.getByLabelText("Sair da conta");
    fireEvent.click(logoutBtn);
  });
});
