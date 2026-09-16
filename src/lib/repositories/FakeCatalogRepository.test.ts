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

  it("finds subject and topic by slug or returns null", async () => {
    const repository = new FakeCatalogRepository(
      [sampleDiscipline],
      [sampleSubject],
      [sampleTopic],
    );

    const subj = await repository.getSubjectBySlug("disc-1", "estruturas-de-dados");
    expect(subj?.name).toBe("Estruturas de Dados");

    const missingSubj = await repository.getSubjectBySlug("disc-1", "inexistente");
    expect(missingSubj).toBeNull();

    const topic = await repository.getTopicBySlug("subj-1", "arvores-avl");
    expect(topic?.name).toBe("Árvores AVL");

    const missingTopic = await repository.getTopicBySlug("subj-1", "inexistente");
    expect(missingTopic).toBeNull();
  });

  it("handles materials and revisions", async () => {
    const sampleMaterial = {
      id: "mat-1",
      topic_id: "topic-1",
      current_revision_id: "rev-1",
      created_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-01-01T00:00:00Z",
      current_revision: null,
    };

    const sampleRevision = {
      id: "rev-1",
      material_id: "mat-1",
      author_id: "u-1",
      revision_number: 1,
      content_markdown: "# Conteúdo",
      change_summary: "Inicial",
      created_at: "2026-01-01T00:00:00Z",
      author: null,
    };

    const repository = new FakeCatalogRepository(
      [sampleDiscipline],
      [sampleSubject],
      [sampleTopic],
      [sampleMaterial],
      [sampleRevision],
    );

    const mat = await repository.getMaterialByTopicId("topic-1");
    expect(mat?.id).toBe("mat-1");

    const missingMat = await repository.getMaterialByTopicId("inexistente");
    expect(missingMat).toBeNull();

    const revs = await repository.listMaterialRevisions("mat-1");
    expect(revs).toHaveLength(1);
    expect(revs[0].revision_number).toBe(1);
  });
});
