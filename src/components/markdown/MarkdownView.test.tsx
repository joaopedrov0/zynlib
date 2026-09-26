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

    const { container } = render(<MarkdownView content={markdown} />);
    expect(screen.getByText("Esta é uma citação importante")).toBeDefined();
    expect(screen.getByText("Primeiro passo")).toBeDefined();
    expect(screen.getByText("Segundo passo")).toBeDefined();
    expect(screen.getByText("codigo_inline")).toBeDefined();
    // O realce divide o código em vários spans, então o texto é conferido no bloco inteiro
    expect(container.querySelector("pre code")?.textContent).toContain("const zyn = 42;");
  });

  it("highlights code blocks by language and labels the language", () => {
    const markdown = "```python\ndef degrau(z):\n    return 1\n```";
    const { container } = render(<MarkdownView content={markdown} />);

    expect(container.querySelector("pre code .hljs-keyword")?.textContent).toBe("def");
    expect(screen.getByText("python")).toBeDefined();
  });

  it("renders fenced blocks without language as blocks, not inline code", () => {
    const { container } = render(<MarkdownView content={"```\nsem linguagem\n```"} />);

    const code = container.querySelector("pre code");
    expect(code?.textContent).toContain("sem linguagem");
    expect(code?.className).not.toContain("text-pink");
  });

  it("keeps inline code with the inline style", () => {
    render(<MarkdownView content="Use `degrau(z)` aqui" />);

    expect(screen.getByText("degrau(z)").className).toContain("text-pink");
  });

  it("styles links and opens external ones in a new tab", () => {
    render(<MarkdownView content="[interno](/fisica) e [externo](https://exemplo.com)" />);

    const internal = screen.getByRole("link", { name: "interno" });
    const external = screen.getByRole("link", { name: "externo" });
    expect(internal.className).toContain("text-indigo");
    expect(internal.getAttribute("target")).toBeNull();
    expect(external.getAttribute("target")).toBe("_blank");
    expect(external.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("marks top-level blocks with their source line only when asked", () => {
    const markdown = "## Título\n\nParágrafo\n\n| a |\n| - |\n| 1 |";
    const withLines = render(<MarkdownView content={markdown} withSourceLines />).container;
    const lines = [...withLines.querySelectorAll("[data-source-line]")].map((el) =>
      el.getAttribute("data-source-line"),
    );

    expect(lines).toEqual(["1", "3", "5"]);
    const withoutLines = render(<MarkdownView content={markdown} />).container;
    expect(withoutLines.querySelector("[data-source-line]")).toBeNull();
  });
});
