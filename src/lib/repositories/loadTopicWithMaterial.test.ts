import { describe, it, expect } from "vitest";
import { loadTopicWithMaterial } from "./loadTopicWithMaterial";
import { FakeCatalogRepository } from "./FakeCatalogRepository";

const created_at = "2026-01-01T00:00:00Z";

const material = {
  id: "m1",
  topic_id: "t1",
  current_revision_id: null,
  created_at,
  updated_at: created_at,
  current_revision: null,
};

function buildCatalog(): FakeCatalogRepository {
  return new FakeCatalogRepository(
    [{ id: "d1", name: "Matemática", slug: "matematica", description: null, created_at }],
    [{ id: "s1", discipline_id: "d1", name: "Cálculo", slug: "calculo", description: null, order_index: 0, created_at }],
    [{ id: "t1", subject_id: "s1", name: "Limites", slug: "limites", description: null, order_index: 0, created_at }],
    [material],
  );
}

describe("loadTopicWithMaterial", () => {
  it("returns the topic path together with its material", async () => {
    const view = await loadTopicWithMaterial(buildCatalog(), {
      disciplineSlug: "matematica",
      subjectSlug: "calculo",
      topicSlug: "limites",
    });

    expect(view?.discipline.id).toBe("d1");
    expect(view?.subject.id).toBe("s1");
    expect(view?.topic.id).toBe("t1");
    expect(view?.material).toEqual(material);
  });

  it("returns null when the topic path does not exist", async () => {
    const view = await loadTopicWithMaterial(buildCatalog(), {
      disciplineSlug: "matematica",
      subjectSlug: "calculo",
      topicSlug: "inexistente",
    });

    expect(view).toBeNull();
  });
});
