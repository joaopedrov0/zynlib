import { describe, it, expect, vi } from "vitest";
import { SupabaseCatalogRepository } from "./SupabaseCatalogRepository";
import { getCatalogRepository } from "./getCatalogRepository";
import { getSupabaseServerClient } from "@/lib/supabase/server";

import { SupabaseClient } from "@supabase/supabase-js";

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient: vi.fn(),
}));

const defaultSingleRow = { id: "item-1", name: "Sample", slug: "sample" };

const sampleSubjectPathRow = {
  id: "s1",
  slug: "s-slug",
  discipline: { id: "d1", slug: "d-slug" },
};

class FakeSupabaseQueryBuilder {
  private tableName: string;
  private shouldFail: boolean;
  private singleRow: unknown;

  constructor(tableName: string, shouldFail: boolean, singleRow: unknown) {
    this.tableName = tableName;
    this.shouldFail = shouldFail;
    this.singleRow = singleRow;
  }

  select() {
    return this;
  }

  order() {
    return this;
  }

  eq() {
    return this;
  }

  ilike() {
    return this;
  }

  limit() {
    return this;
  }

  async maybeSingle() {
    if (this.shouldFail) {
      return { data: null, error: { message: "Query failed", code: "PGRST001" } };
    }
    return { data: this.singleRow, error: null };
  }

  then(resolve: (val: unknown) => void) {
    if (this.shouldFail) {
      resolve({ data: null, error: { message: "Query failed", code: "PGRST001" } });
    } else {
      resolve({ data: [{ id: "item-1", name: "Sample", slug: "sample" }], error: null });
    }
  }
}

class FakeSupabaseClient {
  private shouldFail: boolean;
  private singleRow: unknown;

  constructor(shouldFail: boolean = false, singleRow: unknown = defaultSingleRow) {
    this.shouldFail = shouldFail;
    this.singleRow = singleRow;
  }

  from(table: string) {
    return new FakeSupabaseQueryBuilder(table, this.shouldFail, this.singleRow);
  }

  asClient(): SupabaseClient {
    return this as unknown as SupabaseClient;
  }
}

describe("SupabaseCatalogRepository", () => {
  it("lists disciplines successfully", async () => {
    const fakeClient = new FakeSupabaseClient().asClient();
    const repo = new SupabaseCatalogRepository(fakeClient);

    const disciplines = await repo.listDisciplines();
    expect(disciplines).toHaveLength(1);
    expect(disciplines[0].name).toBe("Sample");
  });

  it("throws error when listing disciplines fails", async () => {
    const fakeClient = new FakeSupabaseClient(true).asClient();
    const repo = new SupabaseCatalogRepository(fakeClient);

    await expect(repo.listDisciplines()).rejects.toThrow("Failed to list disciplines");
  });

  it("gets discipline by slug successfully", async () => {
    const fakeClient = new FakeSupabaseClient().asClient();
    const repo = new SupabaseCatalogRepository(fakeClient);

    const discipline = await repo.getDisciplineBySlug("sample");
    expect(discipline?.name).toBe("Sample");
  });

  it("throws error when getDisciplineBySlug fails", async () => {
    const fakeClient = new FakeSupabaseClient(true).asClient();
    const repo = new SupabaseCatalogRepository(fakeClient);

    await expect(repo.getDisciplineBySlug("sample")).rejects.toThrow("Failed to get discipline");
  });

  it("lists subjects and throws on error", async () => {
    const fakeClient = new FakeSupabaseClient().asClient();
    const repo = new SupabaseCatalogRepository(fakeClient);
    const subjects = await repo.listSubjects("d1");
    expect(subjects).toHaveLength(1);

    const failingRepo = new SupabaseCatalogRepository(new FakeSupabaseClient(true).asClient());
    await expect(failingRepo.listSubjects("d1")).rejects.toThrow("Failed to list subjects");
  });

  it("resolves a subject path in one query and throws on error", async () => {
    const fakeClient = new FakeSupabaseClient(false, sampleSubjectPathRow).asClient();
    const repo = new SupabaseCatalogRepository(fakeClient);
    const path = await repo.getSubjectPath("d-slug", "s-slug");
    expect(path?.discipline.id).toBe("d1");
    expect(path?.subject.id).toBe("s1");

    const failingRepo = new SupabaseCatalogRepository(new FakeSupabaseClient(true).asClient());
    await expect(failingRepo.getSubjectPath("d-slug", "s-slug")).rejects.toThrow(
      "Failed to get subject path 'd-slug/s-slug'",
    );
  });

  it("returns null when the subject path does not exist", async () => {
    const repo = new SupabaseCatalogRepository(new FakeSupabaseClient(false, null).asClient());
    expect(await repo.getSubjectPath("d-slug", "missing")).toBeNull();
  });

  it("lists topics and throws on error", async () => {
    const fakeClient = new FakeSupabaseClient().asClient();
    const repo = new SupabaseCatalogRepository(fakeClient);
    const topics = await repo.listTopics("s1");
    expect(topics).toHaveLength(1);

    const failingRepo = new SupabaseCatalogRepository(new FakeSupabaseClient(true).asClient());
    await expect(failingRepo.listTopics("s1")).rejects.toThrow("Failed to list topics");
  });

  it("resolves a topic path in one query and throws on error", async () => {
    const topicRow = { id: "t1", slug: "t-slug", subject: sampleSubjectPathRow };
    const repo = new SupabaseCatalogRepository(new FakeSupabaseClient(false, topicRow).asClient());
    const path = await repo.getTopicPath("d-slug", "s-slug", "t-slug");
    expect(path?.discipline.id).toBe("d1");
    expect(path?.subject.id).toBe("s1");
    expect(path?.topic.id).toBe("t1");

    const failingRepo = new SupabaseCatalogRepository(new FakeSupabaseClient(true).asClient());
    await expect(failingRepo.getTopicPath("d-slug", "s-slug", "t-slug")).rejects.toThrow(
      "Failed to get topic path 'd-slug/s-slug/t-slug'",
    );
  });

  it("returns null when the topic path does not exist", async () => {
    const repo = new SupabaseCatalogRepository(new FakeSupabaseClient(false, null).asClient());
    expect(await repo.getTopicPath("d-slug", "s-slug", "missing")).toBeNull();
  });

  it("gets material by topic id and throws on error", async () => {
    const fakeClient = new FakeSupabaseClient().asClient();
    const repo = new SupabaseCatalogRepository(fakeClient);
    const material = await repo.getMaterialByTopicId("t1");
    expect(material?.id).toBe("item-1");

    const failingRepo = new SupabaseCatalogRepository(new FakeSupabaseClient(true).asClient());
    await expect(failingRepo.getMaterialByTopicId("t1")).rejects.toThrow("Failed to get material");
  });

  it("lists material revisions and throws on error", async () => {
    const fakeClient = new FakeSupabaseClient().asClient();
    const repo = new SupabaseCatalogRepository(fakeClient);
    const revisions = await repo.listMaterialRevisions("m1");
    expect(revisions).toHaveLength(1);

    const failingRepo = new SupabaseCatalogRepository(new FakeSupabaseClient(true).asClient());
    await expect(failingRepo.listMaterialRevisions("m1")).rejects.toThrow("Failed to list revisions");
  });

  it("getCatalogRepository initializes with server client", async () => {
    vi.mocked(getSupabaseServerClient).mockResolvedValue(new FakeSupabaseClient().asClient());
    const repo = await getCatalogRepository();
    expect(repo).toBeInstanceOf(SupabaseCatalogRepository);
  });

  it("searches catalog across disciplines, subjects, and topics", async () => {
    const fakeClient = new FakeSupabaseClient().asClient();
    const repo = new SupabaseCatalogRepository(fakeClient);

    const empty = await repo.searchCatalog("   ");
    expect(empty).toEqual([]);

    const results = await repo.searchCatalog("calculo");
    expect(results.length).toBeGreaterThan(0);
  });
});
