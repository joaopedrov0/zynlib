import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MarkdownView } from "./MarkdownView";

describe("MarkdownView Component", () => {
  it("renders standard Markdown headings and lists", () => {
    const markdown = "# Introdução\n\n- Item 1\n- Item 2";
    render(<MarkdownView content={markdown} />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toBe("Introdução");
    expect(screen.getByText("Item 1")).toBeDefined();
    expect(screen.getByText("Item 2")).toBeDefined();
  });

  it("renders GFM tables correctly", () => {
    const tableMarkdown = `
| Termo | Definição |
| :--- | :--- |
| Árvore | Estrutura hierárquica |
`.trim();

    render(<MarkdownView content={tableMarkdown} />);
    expect(screen.getByText("Termo")).toBeDefined();
    expect(screen.getByText("Definição")).toBeDefined();
    expect(screen.getByText("Estrutura hierárquica")).toBeDefined();
  });

  it("renders inline and block KaTeX math formulas", () => {
    const mathMarkdown = "A fórmula de energia é $E = mc^2$ e o limite é:\n\n$$f(x) = x^2$$";
    const { container } = render(<MarkdownView content={mathMarkdown} />);

    // Elementos do KaTeX geram nós com classe katex
    const katexNodes = container.querySelectorAll(".katex");
    expect(katexNodes.length).toBeGreaterThan(0);
  });

  it("renders blockquotes, ordered lists, inline code and code blocks", () => {
    const markdown = [
      "> Esta é uma citação importante",
      "",
      "1. Primeiro passo",
      "2. Segundo passo",
      "",
      "Texto com `codigo_inline` e bloco:",
      "",
      "```typescript",
      "const zyn = 42;",
      "```",
    ].join("\n");

    render(<MarkdownView content={markdown} />);
    expect(screen.getByText("Esta é uma citação importante")).toBeDefined();
    expect(screen.getByText("Primeiro passo")).toBeDefined();
    expect(screen.getByText("Segundo passo")).toBeDefined();
    expect(screen.getByText("codigo_inline")).toBeDefined();
    expect(screen.getByText(/const zyn = 42;/)).toBeDefined();
  });
});
