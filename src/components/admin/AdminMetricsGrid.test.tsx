import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AdminMetricsGrid } from "./AdminMetricsGrid";

describe("AdminMetricsGrid Component", () => {
  it("renders all metric cards with their counts and labels", () => {
    render(
      <AdminMetricsGrid
        metrics={{
          profilesCount: 15,
          disciplinesCount: 3,
          subjectsCount: 12,
          topicsCount: 45,
          materialsCount: 40,
        }}
      />
    );

    expect(screen.getByText("Contas Criadas")).toBeDefined();
    expect(screen.getByText("15")).toBeDefined();

    expect(screen.getByText("Disciplinas")).toBeDefined();
    expect(screen.getByText("3")).toBeDefined();

    expect(screen.getByText("Assuntos")).toBeDefined();
    expect(screen.getByText("12")).toBeDefined();

    expect(screen.getByText("Tópicos")).toBeDefined();
    expect(screen.getByText("45")).toBeDefined();

    expect(screen.getByText("Materiais")).toBeDefined();
    expect(screen.getByText("40")).toBeDefined();
  });
});
