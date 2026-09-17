import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AdminRecentUpdatesList } from "./AdminRecentUpdatesList";
import { RecentRevisionActivity } from "@/lib/repositories/AdminRepository";

const MOCK_REVISIONS: RecentRevisionActivity[] = [
  {
    revisionId: "rev-2",
    revisionNumber: 2,
    topicName: "Cinemática Vetorial",
    subjectName: "Mecânica Clássica",
    disciplineName: "Física",
    changeSummary: "Adiciona equações de velocidade relativa",
    authorName: "Carlos Souza",
    authorAvatarUrl: null,
    createdAt: "2026-09-10T14:30:00Z",
    href: "/fisica/mecanica-classica/cinematica-vetorial",
  },
];

describe("AdminRecentUpdatesList Component", () => {
  it("renders list of recent material revisions with link and hierarchy", () => {
    render(<AdminRecentUpdatesList revisions={MOCK_REVISIONS} />);

    expect(screen.getByText("Cinemática Vetorial")).toBeDefined();
    expect(screen.getByText(/Física > Mecânica Clássica/i)).toBeDefined();
    expect(screen.getByText(/#2/)).toBeDefined();
    expect(screen.getByText("Adiciona equações de velocidade relativa")).toBeDefined();
    expect(screen.getByText("Carlos Souza")).toBeDefined();

    const link = screen.getByRole("link", { name: /Acessar Material/i });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("/fisica/mecanica-classica/cinematica-vetorial");
  });

  it("renders empty state message when no revisions exist", () => {
    render(<AdminRecentUpdatesList revisions={[]} />);
    expect(screen.getByText(/Nenhuma atualização recente de material encontrada/i)).toBeDefined();
  });
});
