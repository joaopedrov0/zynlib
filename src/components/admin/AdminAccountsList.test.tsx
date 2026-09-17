import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AdminAccountsList } from "./AdminAccountsList";
import { UserProfile } from "@/types/database";

const MOCK_PROFILES: UserProfile[] = [
  {
    id: "u-1",
    email: "joao@example.com",
    full_name: "João Silva",
    avatar_url: "https://example.com/avatar.jpg",
    role: "admin",
    created_at: "2026-09-01T12:00:00Z",
    updated_at: "2026-09-01T12:00:00Z",
  },
  {
    id: "u-2",
    email: "maria@example.com",
    full_name: "Maria Santos",
    avatar_url: null,
    role: "writer",
    created_at: "2026-09-05T15:30:00Z",
    updated_at: "2026-09-05T15:30:00Z",
  },
];

describe("AdminAccountsList Component", () => {
  it("renders table with account details and role badges", () => {
    render(<AdminAccountsList profiles={MOCK_PROFILES} />);

    expect(screen.getByText("João Silva")).toBeDefined();
    expect(screen.getByText("joao@example.com")).toBeDefined();
    expect(screen.getByText("Administrador")).toBeDefined();

    expect(screen.getByText("Maria Santos")).toBeDefined();
    expect(screen.getByText("maria@example.com")).toBeDefined();
    expect(screen.getByText("Escritor")).toBeDefined();
  });

  it("renders empty state message when no profiles exist", () => {
    render(<AdminAccountsList profiles={[]} />);
    expect(screen.getByText(/Nenhuma conta registrada/i)).toBeDefined();
  });
});
