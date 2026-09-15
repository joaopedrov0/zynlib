import { describe, it, expect } from "vitest";
import { FakeCatalogRepository } from "./FakeCatalogRepository";
import { DisciplineRecord, SubjectRecord, TopicRecord } from "@/types/database";

describe("FakeCatalogRepository", () => {
  const sampleDiscipline: DisciplineRecord = {
    id: "disc-1",
    name: "Ciência da Computação",
    slug: "ciencia-da-computacao",
    description: "Área de computação",
    created_at: "2026-01-01T00:00:00Z",
  };

  const sampleSubject: SubjectRecord = {
    id: "subj-1",
    discipline_id: "disc-1",
    name: "Estruturas de Dados",
    slug: "estruturas-de-dados",
    description: "Estruturas fundamentais",
    order_index: 0,
    created_at: "2026-01-01T00:00:00Z",
  };

  const sampleTopic: TopicRecord = {
    id: "topic-1",
    subject_id: "subj-1",
    name: "Árvores AVL",
    slug: "arvores-avl",
    description: "Árvores balanceadas",
    order_index: 0,
    created_at: "2026-01-01T00:00:00Z",
  };

  it("lists all stored disciplines", async () => {
    const repository = new FakeCatalogRepository([sampleDiscipline]);
    const disciplines = await repository.listDisciplines();

    expect(disciplines).toHaveLength(1);
    expect(disciplines[0].name).toBe("Ciência da Computação");
  });

  it("finds discipline by slug", async () => {
    const repository = new FakeCatalogRepository([sampleDiscipline]);
    const found = await repository.getDisciplineBySlug("ciencia-da-computacao");

    expect(found).not.toBeNull();
    expect(found?.id).toBe("disc-1");
  });

  it("returns null when discipline slug does not exist", async () => {
    const repository = new FakeCatalogRepository([]);
    const found = await repository.getDisciplineBySlug("inexistente");

    expect(found).toBeNull();
  });

  it("filters subjects by discipline id", async () => {
    const repository = new FakeCatalogRepository(
      [sampleDiscipline],
      [sampleSubject],
    );
    const subjects = await repository.listSubjects("disc-1");

    expect(subjects).toHaveLength(1);
    expect(subjects[0].name).toBe("Estruturas de Dados");
  });

  it("filters topics by subject id", async () => {
    const repository = new FakeCatalogRepository(
      [sampleDiscipline],
      [sampleSubject],
      [sampleTopic],
    );
    const topics = await repository.listTopics("subj-1");

    expect(topics).toHaveLength(1);
    expect(topics[0].slug).toBe("arvores-avl");
  });
});
