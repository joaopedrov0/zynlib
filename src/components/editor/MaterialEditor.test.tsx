import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MaterialEditor } from "./MaterialEditor";
import { saveMaterialRevision } from "@/lib/actions/saveMaterialRevision";

vi.mock("@/lib/actions/saveMaterialRevision", () => ({
  saveMaterialRevision: vi.fn(),
}));

describe("MaterialEditor Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders initial content and version badge", () => {
    render(
      <MaterialEditor
        topicId="t1"
        disciplineSlug="comp"
        subjectSlug="ed"
        topicSlug="arvores"
        initialContent="# Título Inicial"
        currentRevisionNumber={3}
      />
    );

    expect(screen.getByDisplayValue("# Título Inicial")).toBeDefined();
    expect(screen.getByText("Editando sobre Revisão #3")).toBeDefined();
  });

  it("switches view modes correctly", () => {
    render(
      <MaterialEditor
        topicId="t1"
        disciplineSlug="comp"
        subjectSlug="ed"
        topicSlug="arvores"
        initialContent="conteúdo"
      />
    );

    const editOnlyBtn = screen.getByText("Editor");
    fireEvent.click(editOnlyBtn);

    const previewOnlyBtn = screen.getByText("Preview KaTeX");
    fireEvent.click(previewOnlyBtn);

    const splitBtn = screen.getByText("Lado a Lado");
    fireEvent.click(splitBtn);
  });

  it("inserts formatting with toolbar buttons", () => {
    render(
      <MaterialEditor
        topicId="t1"
        disciplineSlug="comp"
        subjectSlug="ed"
        topicSlug="arvores"
        initialContent="alvo"
      />
    );

    const boldBtn = screen.getByTitle("Negrito");
    fireEvent.click(boldBtn);

    const italicBtn = screen.getByTitle("Itálico");
    fireEvent.click(italicBtn);

    const h2Btn = screen.getByTitle("Título Secundário (H2)");
    fireEvent.click(h2Btn);

    const katexInlineBtn = screen.getByTitle("Fórmula KaTeX Inline");
    fireEvent.click(katexInlineBtn);

    const katexBlockBtn = screen.getByTitle("Fórmula KaTeX em Bloco");
    fireEvent.click(katexBlockBtn);

    const codeBtn = screen.getByTitle("Bloco de Código");
    fireEvent.click(codeBtn);

    const quoteBtn = screen.getByTitle("Citação");
    fireEvent.click(quoteBtn);

    const tableBtn = screen.getByTitle("Tabela");
    fireEvent.click(tableBtn);
  });

  it("handles error during submission", async () => {
    vi.mocked(saveMaterialRevision).mockRejectedValueOnce(new Error("Erro no servidor"));

    render(
      <MaterialEditor
        topicId="t1"
        disciplineSlug="comp"
        subjectSlug="ed"
        topicSlug="arvores"
        initialContent="Texto válido"
      />
    );

    const summaryInput = screen.getByPlaceholderText(/Ex: Adicionada explicação/);
    fireEvent.change(summaryInput, { target: { value: "Tentativa com erro" } });

    const submitBtn = screen.getByText("Publicar Nova Revisão");
    fireEvent.click(submitBtn);

    expect(await screen.findByText("Erro no servidor")).toBeDefined();
  });

  it("handles non-Error rejection during submission", async () => {
    vi.mocked(saveMaterialRevision).mockRejectedValueOnce("Erro genérico");

    render(
      <MaterialEditor
        topicId="t1"
        disciplineSlug="comp"
        subjectSlug="ed"
        topicSlug="arvores"
        initialContent="Texto válido"
      />
    );

    const summaryInput = screen.getByPlaceholderText(/Ex: Adicionada explicação/);
    fireEvent.change(summaryInput, { target: { value: "Tentativa não-error" } });

    const submitBtn = screen.getByText("Publicar Nova Revisão");
    fireEvent.click(submitBtn);

    expect(
      await screen.findByText("Falha inesperada ao salvar revisão.")
    ).toBeDefined();
  });

  it("validates empty content on submission", () => {
    render(
      <MaterialEditor
        topicId="t1"
        disciplineSlug="comp"
        subjectSlug="ed"
        topicSlug="arvores"
        initialContent=""
      />
    );

    const submitBtn = screen.getByText("Publicar Nova Revisão");
    fireEvent.click(submitBtn);

    expect(
      screen.getByText("O conteúdo do material não pode ser vazio.")
    ).toBeDefined();
  });

  it("validates empty summary on submission", () => {
    render(
      <MaterialEditor
        topicId="t1"
        disciplineSlug="comp"
        subjectSlug="ed"
        topicSlug="arvores"
        initialContent="Texto válido"
      />
    );

    const submitBtn = screen.getByText("Publicar Nova Revisão");
    fireEvent.click(submitBtn);

    expect(
      screen.getByText("Por favor, informe um resumo descrevendo a alteração.")
    ).toBeDefined();
  });

  it("submits valid revision successfully", async () => {
    vi.mocked(saveMaterialRevision).mockResolvedValueOnce({
      revisionId: "r1",
      revisionNumber: 4,
    });

    render(
      <MaterialEditor
        topicId="t1"
        disciplineSlug="comp"
        subjectSlug="ed"
        topicSlug="arvores"
        initialContent="Texto válido"
      />
    );

    const summaryInput = screen.getByPlaceholderText(
      /Ex: Adicionada explicação/
    );
    fireEvent.change(summaryInput, { target: { value: "Correção de typo" } });

    const submitBtn = screen.getByText("Publicar Nova Revisão");
    fireEvent.click(submitBtn);

    expect(saveMaterialRevision).toHaveBeenCalledWith(
      expect.objectContaining({
        topicId: "t1",
        contentMarkdown: "Texto válido",
        changeSummary: "Correção de typo",
      })
    );
  });

  it("passes baseRevisionNumber and handles concurrency conflict error", async () => {
    vi.mocked(saveMaterialRevision).mockRejectedValueOnce(
      new Error("Conflito de concorrência: A versão atual no banco é #5, mas sua edição foi baseada na versão #3.")
    );

    render(
      <MaterialEditor
        topicId="t1"
        disciplineSlug="comp"
        subjectSlug="ed"
        topicSlug="arvores"
        initialContent="Texto"
        currentRevisionNumber={3}
      />
    );

    const summaryInput = screen.getByPlaceholderText(/Ex: Adicionada explicação/);
    fireEvent.change(summaryInput, { target: { value: "Tentativa" } });

    const submitBtn = screen.getByText("Publicar Nova Revisão");
    fireEvent.click(submitBtn);

    expect(saveMaterialRevision).toHaveBeenCalledWith(
      expect.objectContaining({
        baseRevisionNumber: 3,
      })
    );

    expect(
      await screen.findByText(/Conflito de concorrência/i)
    ).toBeDefined();
  });
});
