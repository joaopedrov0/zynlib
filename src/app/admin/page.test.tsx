import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AdminDashboardPage from "./page";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { getAdminRepository } from "@/lib/repositories/getAdminRepository";
import { FakeAdminRepository } from "@/lib/repositories/FakeAdminRepository";

vi.mock("@/lib/auth/getCurrentUserProfile", () => ({
  getCurrentUserProfile: vi.fn(),
}));

vi.mock("@/lib/repositories/getAdminRepository", () => ({
  getAdminRepository: vi.fn(),
}));

describe("AdminDashboardPage", () => {
  let fakeAdminRepo: FakeAdminRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    fakeAdminRepo = new FakeAdminRepository();
    vi.mocked(getAdminRepository).mockResolvedValue(fakeAdminRepo);
  });

  it("renders restricted access message when user is unauthenticated", async () => {
    vi.mocked(getCurrentUserProfile).mockResolvedValue(null);

    const component = await AdminDashboardPage();
    render(component);

    expect(screen.getByText("Acesso Restrito")).toBeDefined();
    expect(
      screen.getByText(/Esta área é reservada exclusivamente para administradores/i)
    ).toBeDefined();
  });

  it("renders restricted access message when user is a writer", async () => {
    vi.mocked(getCurrentUserProfile).mockResolvedValue({
      id: "u-writer",
      email: "writer@example.com",
      full_name: "Writer User",
      avatar_url: null,
      role: "writer",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    const component = await AdminDashboardPage();
    render(component);

    expect(screen.getByText("Acesso Restrito")).toBeDefined();
    expect(screen.queryByText("Painel de Administração")).toBeNull();
  });

  it("renders complete dashboard when user is an admin", async () => {
    vi.mocked(getCurrentUserProfile).mockResolvedValue({
      id: "u-admin",
      email: "admin@example.com",
      full_name: "Admin User",
      avatar_url: null,
      role: "admin",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    const component = await AdminDashboardPage();
    render(component);

    expect(screen.getByText("Painel de Administração")).toBeDefined();
    expect(screen.getByText("Contas Criadas")).toBeDefined();
    expect(screen.getByText("Contas Registradas")).toBeDefined();
    expect(screen.getByText("Atualizações Recentes de Materiais")).toBeDefined();
    expect(screen.getByText("Estrutura do Catálogo")).toBeDefined();
  });
});
