import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CreateItemModal } from "./CreateItemModal";
import * as hierarchyActions from "@/lib/actions/hierarchyActions";

vi.mock("@/lib/actions/hierarchyActions", () => ({
  createDisciplineAction: vi.fn().mockResolvedValue({ id: "d-new", slug: "quimica" }),
  createSubjectAction: vi.fn().mockResolvedValue({ id: "s-new", slug: "organica" }),
  createTopicAction: vi.fn().mockResolvedValue({ id: "t-new", slug: "hidrocarbonetos" }),
}));

describe("CreateItemModal Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not render trigger if canCreate is false", () => {
    const { container } = render(
      <CreateItemModal
        type="discipline"
        triggerLabel="+ Nova Disciplina"
        canCreate={false}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("opens modal and submits new discipline", async () => {
    render(
      <CreateItemModal
        type="discipline"
        triggerLabel="+ Nova Disciplina"
        canCreate={true}
      />
    );

    const openBtn = screen.getByRole("button", { name: "+ Nova Disciplina" });
    fireEvent.click(openBtn);

    expect(screen.getByText("Criar Nova Disciplina")).toBeDefined();

    const nameInput = screen.getByLabelText(/Nome:/i);
    fireEvent.change(nameInput, { target: { value: "Química" } });

    const submitBtn = screen.getByRole("button", { name: "Criar" });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(hierarchyActions.createDisciplineAction).toHaveBeenCalledWith({
        name: "Química",
        slug: undefined,
        description: undefined,
      });
    });
  });

  it("submits new subject when type is subject", async () => {
    render(
      <CreateItemModal
        type="subject"
        triggerLabel="+ Novo Assunto"
        canCreate={true}
        disciplineId="d-1"
        disciplineSlug="quimica"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "+ Novo Assunto" }));
    fireEvent.change(screen.getByLabelText(/Nome:/i), { target: { value: "Orgânica" } });
    fireEvent.click(screen.getByRole("button", { name: "Criar" }));

    await waitFor(() => {
      expect(hierarchyActions.createSubjectAction).toHaveBeenCalledWith({
        disciplineId: "d-1",
        disciplineSlug: "quimica",
        name: "Orgânica",
        slug: undefined,
        description: undefined,
      });
    });
  });

  it("submits new topic when type is topic", async () => {
    render(
      <CreateItemModal
        type="topic"
        triggerLabel="+ Novo Tópico"
        canCreate={true}
        disciplineSlug="quimica"
        subjectId="s-1"
        subjectSlug="organica"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "+ Novo Tópico" }));
    fireEvent.change(screen.getByLabelText(/Nome:/i), { target: { value: "Hidrocarbonetos" } });
    fireEvent.click(screen.getByRole("button", { name: "Criar" }));

    await waitFor(() => {
      expect(hierarchyActions.createTopicAction).toHaveBeenCalledWith({
        subjectId: "s-1",
        disciplineSlug: "quimica",
        subjectSlug: "organica",
        name: "Hidrocarbonetos",
        slug: undefined,
        description: undefined,
      });
    });
  });

  it("closes modal on cancel", () => {
    render(
      <CreateItemModal
        type="discipline"
        triggerLabel="+ Nova Disciplina"
        canCreate={true}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "+ Nova Disciplina" }));
    expect(screen.getByText("Criar Nova Disciplina")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(screen.queryByText("Criar Nova Disciplina")).toBeNull();
  });
});
