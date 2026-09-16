import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ArbitraryRevisionComparator } from "./ArbitraryRevisionComparator";
import { MaterialRevisionWithAuthor } from "@/types/database";

const mockRevisions: MaterialRevisionWithAuthor[] = [
  {
    id: "rev-3",
    material_id: "m-1",
    author_id: "u-1",
    revision_number: 3,
    content_markdown: "# Versão 3\nConteúdo final",
    change_summary: "Terceira versão",
    created_at: "2026-09-15T12:00:00Z",
    author: {
      id: "u-1",
      email: "author1@test.com",
      full_name: "Alice",
      avatar_url: null,
      role: "writer",
      created_at: "",
      updated_at: "",
    },
  },
  {
    id: "rev-2",
    material_id: "m-1",
    author_id: "u-2",
    revision_number: 2,
    content_markdown: "# Versão 2\nConteúdo intermediário",
    change_summary: "Segunda versão",
    created_at: "2026-09-14T12:00:00Z",
    author: {
      id: "u-2",
      email: "author2@test.com",
      full_name: "Bob",
      avatar_url: null,
      role: "writer",
      created_at: "",
      updated_at: "",
    },
  },
  {
    id: "rev-1",
    material_id: "m-1",
    author_id: "u-1",
    revision_number: 1,
    content_markdown: "# Versão 1\nConteúdo inicial",
    change_summary: "Primeira versão",
    created_at: "2026-09-13T12:00:00Z",
    author: null,
  },
];

describe("ArbitraryRevisionComparator Component", () => {
  it("renders notice when fewer than 2 revisions exist", () => {
    render(<ArbitraryRevisionComparator revisions={[mockRevisions[0]]} />);
    expect(
      screen.getByText("São necessárias ao menos 2 revisões para comparar versões arbitrariamente.")
    ).toBeDefined();
  });

  it("renders comparator controls and diff viewer with default selections", () => {
    render(<ArbitraryRevisionComparator revisions={mockRevisions} />);
    expect(screen.getByLabelText("Revisão Base (De):")).toBeDefined();
    expect(screen.getByLabelText("Revisão Comparada (Para):")).toBeDefined();
    expect(screen.getByText("Comparação Arbitrária de Versões")).toBeDefined();
  });

  it("updates diff when user selects different revisions", () => {
    render(<ArbitraryRevisionComparator revisions={mockRevisions} />);

    const baseSelect = screen.getByLabelText("Revisão Base (De):");
    fireEvent.change(baseSelect, { target: { value: "rev-1" } });

    expect(screen.getByText(/- Revisão #1/)).toBeDefined();
    expect(screen.getByText(/\+ Revisão #3/)).toBeDefined();
  });

  it("swaps base and target revisions when swap button is clicked", () => {
    render(<ArbitraryRevisionComparator revisions={mockRevisions} />);

    const swapButton = screen.getByRole("button", { name: /inverter/i });
    fireEvent.click(swapButton);

    const baseSelect = screen.getByLabelText("Revisão Base (De):") as HTMLSelectElement;
    const targetSelect = screen.getByLabelText("Revisão Comparada (Para):") as HTMLSelectElement;

    expect(baseSelect.value).toBe("rev-3");
    expect(targetSelect.value).toBe("rev-2");
  });
});
