import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AppHeader } from "./AppHeader";
import { UserProfile } from "@/types/database";

describe("AppHeader Component", () => {
  it("renders branding title and subtitle", () => {
    render(<AppHeader />);

    expect(screen.getByText("Zyn Library")).toBeDefined();
    expect(screen.getByText("Base de Conhecimento Aberta")).toBeDefined();
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
  });
});
