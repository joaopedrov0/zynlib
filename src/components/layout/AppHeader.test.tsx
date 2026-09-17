import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AppHeader } from "./AppHeader";
import { UserProfile } from "@/types/database";

describe("AppHeader Component", () => {
  it("renders branding title, subtitle and search input", () => {
    render(<AppHeader />);

    expect(screen.getByText("Zyn Library")).toBeDefined();
    expect(screen.getByText("Base de Conhecimento Aberta")).toBeDefined();
    expect(screen.getByPlaceholderText(/Buscar no catálogo.../i)).toBeDefined();
  });

  it("passes profile to auth button correctly", () => {
    const profile: UserProfile = {
      id: "u1",
      email: "test@example.com",
      full_name: "Test User",
      avatar_url: "https://example.com/avatar.png",
      role: "writer",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    render(<AppHeader currentUserProfile={profile} />);
    expect(screen.getByText("Test User")).toBeDefined();
    expect(screen.queryByRole("link", { name: /Painel Admin/i })).toBeNull();
  });

  it("renders link to admin panel when user is admin", () => {
    const adminProfile: UserProfile = {
      id: "u-admin",
      email: "admin@example.com",
      full_name: "Admin User",
      avatar_url: null,
      role: "admin",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    render(<AppHeader currentUserProfile={adminProfile} />);
    const adminLink = screen.getByRole("link", { name: /Painel Admin/i });
    expect(adminLink).toBeDefined();
    expect(adminLink.getAttribute("href")).toBe("/admin");
  });
});
