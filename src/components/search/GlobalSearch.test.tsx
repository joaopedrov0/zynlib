import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { GlobalSearch } from "./GlobalSearch";
import * as searchActionModule from "@/lib/actions/searchCatalogAction";

vi.mock("@/lib/actions/searchCatalogAction", () => ({
  searchCatalogAction: vi.fn(),
}));

describe("GlobalSearch Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search input with placeholder", () => {
    render(<GlobalSearch />);
    const input = screen.getByPlaceholderText(/Buscar no catálogo.../i);
    expect(input).toBeDefined();
  });

  it("searches and displays results list on input", async () => {
    vi.mocked(searchActionModule.searchCatalogAction).mockResolvedValue([
      {
        id: "d-1",
        type: "discipline",
        title: "Física Quântica",
        description: "Mecânica quântica avançada",
        href: "/fisica-quantica",
      },
    ]);

    render(<GlobalSearch />);
    const input = screen.getByPlaceholderText(/Buscar no catálogo.../i);
    fireEvent.change(input, { target: { value: "quântica" } });

    await waitFor(() => {
      expect(searchActionModule.searchCatalogAction).toHaveBeenCalledWith("quântica");
      expect(screen.getByText("Física Quântica")).toBeDefined();
    });
  });

  it("shows empty state when no matches found", async () => {
    vi.mocked(searchActionModule.searchCatalogAction).mockResolvedValue([]);

    render(<GlobalSearch />);
    const input = screen.getByPlaceholderText(/Buscar no catálogo.../i);
    fireEvent.change(input, { target: { value: "inexistente" } });

    await waitFor(() => {
      expect(screen.getByText(/Nenhum resultado encontrado/i)).toBeDefined();
    });
  });

  it("clears input and results when clear button is clicked", async () => {
    vi.mocked(searchActionModule.searchCatalogAction).mockResolvedValue([
      {
        id: "d-1",
        type: "discipline",
        title: "Química",
        href: "/quimica",
      },
    ]);

    render(<GlobalSearch />);
    const input = screen.getByPlaceholderText(/Buscar no catálogo.../i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "quimica" } });

    await waitFor(() => {
      expect(screen.getByText("Química")).toBeDefined();
    });

    let clearButton!: HTMLElement;
    await waitFor(() => {
      clearButton = screen.getByRole("button", { name: /limpar busca/i });
      expect(clearButton).toBeDefined();
    });
    fireEvent.click(clearButton);

    expect(input.value).toBe("");
    expect(screen.queryByText("Química")).toBeNull();
  });

  it("handles keyboard shortcut Ctrl+K and Escape", async () => {
    render(<GlobalSearch />);
    const input = screen.getByPlaceholderText(/Buscar no catálogo.../i);

    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(document.activeElement).toBe(input);

    fireEvent.change(input, { target: { value: "teste" } });
    fireEvent.keyDown(window, { key: "Escape" });
  });

  it("renders subject and topic badges and handles click on result", async () => {
    vi.mocked(searchActionModule.searchCatalogAction).mockResolvedValue([
      { id: "s-1", type: "subject", title: "Álgebra", href: "/mat/alg" },
      { id: "t-1", type: "topic", title: "Matrizes", href: "/mat/alg/matrizes" },
    ]);

    render(<GlobalSearch />);
    const input = screen.getByPlaceholderText(/Buscar no catálogo.../i);
    fireEvent.change(input, { target: { value: "mat" } });

    await waitFor(() => {
      expect(screen.getByText("Assunto")).toBeDefined();
      expect(screen.getByText("Tópico")).toBeDefined();
    });

    const topicLink = screen.getByText("Matrizes");
    fireEvent.click(topicLink);
  });
});
