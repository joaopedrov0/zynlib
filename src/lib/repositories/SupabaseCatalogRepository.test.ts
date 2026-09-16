import { describe, it, expect, vi } from "vitest";
import { SupabaseCatalogRepository } from "./SupabaseCatalogRepository";
import { getCatalogRepository } from "./getCatalogRepository";
import { getSupabaseServerClient } from "@/lib/supabase/server";

import { SupabaseClient } from "@supabase/supabase-js";

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient: vi.fn(),
}));

class FakeSupabaseQueryBuilder {
  private tableName: string;
  private shouldFail: boolean;

  constructor(tableName: string, shouldFail: boolean = false) {
    this.tableName = tableName;
    this.shouldFail = shouldFail;
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

  async maybeSingle() {
    if (this.shouldFail) {
      return { data: null, error: { message: "Query failed", code: "PGRST001" } };
    }
    return { data: { id: "item-1", name: "Sample", slug: "sample" }, error: null };
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

  constructor(shouldFail: boolean = false) {
    this.shouldFail = shouldFail;
  }

  from(table: string) {
    return new FakeSupabaseQueryBuilder(table, this.shouldFail);
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

  it("gets subject by slug and throws on error", async () => {
    const fakeClient = new FakeSupabaseClient().asClient();
    const repo = new SupabaseCatalogRepository(fakeClient);
    const subject = await repo.getSubjectBySlug("d1", "sample");
    expect(subject?.name).toBe("Sample");

    const failingRepo = new SupabaseCatalogRepository(new FakeSupabaseClient(true).asClient());
    await expect(failingRepo.getSubjectBySlug("d1", "sample")).rejects.toThrow("Failed to get subject");
  });

  it("lists topics and throws on error", async () => {
    const fakeClient = new FakeSupabaseClient().asClient();
    const repo = new SupabaseCatalogRepository(fakeClient);
    const topics = await repo.listTopics("s1");
    expect(topics).toHaveLength(1);

    const failingRepo = new SupabaseCatalogRepository(new FakeSupabaseClient(true).asClient());
    await expect(failingRepo.listTopics("s1")).rejects.toThrow("Failed to list topics");
  });

  it("gets topic by slug and throws on error", async () => {
    const fakeClient = new FakeSupabaseClient().asClient();
    const repo = new SupabaseCatalogRepository(fakeClient);
    const topic = await repo.getTopicBySlug("s1", "sample");
    expect(topic?.name).toBe("Sample");

    const failingRepo = new SupabaseCatalogRepository(new FakeSupabaseClient(true).asClient());
    await expect(failingRepo.getTopicBySlug("s1", "sample")).rejects.toThrow("Failed to get topic");
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
});
