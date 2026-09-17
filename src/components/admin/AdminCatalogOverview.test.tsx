import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AdminCatalogOverview } from "./AdminCatalogOverview";
import { DisciplineCatalogSummary } from "@/lib/repositories/AdminRepository";

const MOCK_SUMMARIES: DisciplineCatalogSummary[] = [
  {
    disciplineId: "d-1",
    name: "Física",
    slug: "fisica",
    subjectsCount: 5,
    topicsCount: 22,
  },
  {
    disciplineId: "d-2",
    name: "Química",
    slug: "quimica",
    subjectsCount: 3,
    topicsCount: 14,
  },
];

describe("AdminCatalogOverview Component", () => {
  it("renders discipline summaries with their counts and links", () => {
    render(<AdminCatalogOverview summaries={MOCK_SUMMARIES} />);

    expect(screen.getByText("Física")).toBeDefined();
    expect(screen.getByText("5 assuntos")).toBeDefined();
    expect(screen.getByText("22 tópicos")).toBeDefined();

    expect(screen.getByText("Química")).toBeDefined();
    expect(screen.getByText("3 assuntos")).toBeDefined();
    expect(screen.getByText("14 tópicos")).toBeDefined();

    const link = screen.getByRole("link", { name: /Ver Física/i });
    expect(link.getAttribute("href")).toBe("/fisica");
  });

  it("renders empty state when no disciplines exist", () => {
    render(<AdminCatalogOverview summaries={[]} />);
    expect(screen.getByText(/Nenhuma disciplina cadastrada/i)).toBeDefined();
  });
});
