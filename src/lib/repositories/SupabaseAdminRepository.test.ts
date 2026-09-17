import { describe, it, expect } from "vitest";
import { SupabaseClient } from "@supabase/supabase-js";
import { SupabaseAdminRepository } from "./SupabaseAdminRepository";

class FakeAdminQueryBuilder {
  private table: string;
  private scenario: "success" | "failure" | "sparse" | "empty";

  constructor(table: string, scenario: "success" | "failure" | "sparse" | "empty" = "success") {
    this.table = table;
    this.scenario = scenario;
  }

  select(_columns?: string, options?: { count?: string; head?: boolean }) {
    if (options?.head) {
      if (this.scenario === "failure") {
        return Promise.resolve({ count: null, error: { message: "Error" } });
      }
      if (this.scenario === "empty") {
        return Promise.resolve({ count: undefined, error: null });
      }
      return Promise.resolve({ count: 5, error: null });
    }
    return this;
  }

  order() {
    return this;
  }

  limit() {
    return this;
  }

  then(resolve: (val: unknown) => void) {
    if (this.scenario === "failure") {
      resolve({ data: null, error: { message: "Database query failed" } });
      return;
    }

    if (this.scenario === "empty") {
      resolve({ data: null, error: null });
      return;
    }

    if (this.scenario === "sparse") {
      if (this.table === "material_revisions") {
        resolve({
          data: [
            {
              id: "rev-sparse",
              revision_number: 1,
              change_summary: "Sem dados aninhados",
              created_at: "2026-09-01T00:00:00Z",
              author: null,
              materials: null,
            },
          ],
          error: null,
        });
        return;
      }
      if (this.table === "disciplines") {
        resolve({
          data: [
            {
              id: "d-sparse",
              name: "Vazia",
              slug: "vazia",
              subjects: [
                { id: "s-sparse", topics: null },
              ],
            },
          ],
          error: null,
        });
        return;
      }
    }

    if (this.table === "profiles") {
      resolve({
        data: [
          {
            id: "u-1",
            email: "admin@test.com",
            full_name: "Admin User",
            avatar_url: null,
            role: "admin",
            created_at: "2026-09-01T00:00:00Z",
            updated_at: "2026-09-01T00:00:00Z",
          },
        ],
        error: null,
      });
      return;
    }

    if (this.table === "material_revisions") {
      resolve({
        data: [
          {
            id: "rev-1",
            revision_number: 1,
            change_summary: "Primeira versão",
            created_at: "2026-09-01T00:00:00Z",
            author: { full_name: "Admin User", avatar_url: null },
            materials: {
              topics: {
                name: "Vetores",
                slug: "vetores",
                subjects: {
                  name: "Geometria",
                  slug: "geometria",
                  disciplines: { name: "Matemática", slug: "matematica" },
                },
              },
            },
          },
        ],
        error: null,
      });
      return;
    }

    if (this.table === "disciplines") {
      resolve({
        data: [
          {
            id: "d-1",
            name: "Matemática",
            slug: "matematica",
            subjects: [
              { id: "s-1", topics: [{ id: "t-1" }, { id: "t-2" }] },
            ],
          },
        ],
        error: null,
      });
      return;
    }

    resolve({ data: [], error: null });
  }
}

class FakeSupabaseClient {
  private scenario: "success" | "failure" | "sparse" | "empty";

  constructor(scenario: "success" | "failure" | "sparse" | "empty" = "success") {
    this.scenario = scenario;
  }

  from(table: string) {
    return new FakeAdminQueryBuilder(table, this.scenario);
  }
}

describe("SupabaseAdminRepository", () => {
  it("fetches overview metrics count correctly", async () => {
    const client = new FakeSupabaseClient() as unknown as SupabaseClient;
    const repo = new SupabaseAdminRepository(client);

    const metrics = await repo.getOverviewMetrics();
    expect(metrics.profilesCount).toBe(5);
    expect(metrics.disciplinesCount).toBe(5);
  });

  it("handles fallback to zero when count is undefined", async () => {
    const client = new FakeSupabaseClient("empty") as unknown as SupabaseClient;
    const repo = new SupabaseAdminRepository(client);

    const metrics = await repo.getOverviewMetrics();
    expect(metrics.profilesCount).toBe(0);
    expect(metrics.disciplinesCount).toBe(0);
  });

  it("lists user profiles and handles empty null data gracefully", async () => {
    const client = new FakeSupabaseClient() as unknown as SupabaseClient;
    const repo = new SupabaseAdminRepository(client);

    const profiles = await repo.listUserProfiles();
    expect(profiles.length).toBe(1);

    const emptyClient = new FakeSupabaseClient("empty") as unknown as SupabaseClient;
    const emptyRepo = new SupabaseAdminRepository(emptyClient);
    const emptyProfiles = await emptyRepo.listUserProfiles();
    expect(emptyProfiles).toEqual([]);
  });

  it("lists recent revisions and handles sparse/null relations with defaults", async () => {
    const client = new FakeSupabaseClient() as unknown as SupabaseClient;
    const repo = new SupabaseAdminRepository(client);

    const revisions = await repo.listRecentRevisions(5);
    expect(revisions[0].topicName).toBe("Vetores");
    expect(revisions[0].disciplineName).toBe("Matemática");
    expect(revisions[0].href).toBe("/matematica/geometria/vetores");

    const sparseClient = new FakeSupabaseClient("sparse") as unknown as SupabaseClient;
    const sparseRepo = new SupabaseAdminRepository(sparseClient);
    const sparseRevisions = await sparseRepo.listRecentRevisions(5);
    expect(sparseRevisions[0].topicName).toBe("Tópico Desconhecido");
    expect(sparseRevisions[0].authorName).toBe("Autor Anônimo");
    expect(sparseRevisions[0].href).toBe("///");

    const emptyClient = new FakeSupabaseClient("empty") as unknown as SupabaseClient;
    const emptyRepo = new SupabaseAdminRepository(emptyClient);
    const emptyRevisions = await emptyRepo.listRecentRevisions();
    expect(emptyRevisions).toEqual([]);
  });

  it("lists discipline summaries and handles sparse topic collections", async () => {
    const client = new FakeSupabaseClient() as unknown as SupabaseClient;
    const repo = new SupabaseAdminRepository(client);

    const summaries = await repo.listDisciplineSummaries();
    expect(summaries[0].subjectsCount).toBe(1);
    expect(summaries[0].topicsCount).toBe(2);

    const sparseClient = new FakeSupabaseClient("sparse") as unknown as SupabaseClient;
    const sparseRepo = new SupabaseAdminRepository(sparseClient);
    const sparseSummaries = await sparseRepo.listDisciplineSummaries();
    expect(sparseSummaries[0].subjectsCount).toBe(1);
    expect(sparseSummaries[0].topicsCount).toBe(0);

    const emptyClient = new FakeSupabaseClient("empty") as unknown as SupabaseClient;
    const emptyRepo = new SupabaseAdminRepository(emptyClient);
    const emptySummaries = await emptyRepo.listDisciplineSummaries();
    expect(emptySummaries).toEqual([]);
  });

  it("throws clear error message when query fails", async () => {
    const client = new FakeSupabaseClient("failure") as unknown as SupabaseClient;
    const repo = new SupabaseAdminRepository(client);

    await expect(repo.getOverviewMetrics()).rejects.toThrow(/Failed to fetch admin overview metrics/i);
    await expect(repo.listUserProfiles()).rejects.toThrow(/Failed to list user profiles/i);
    await expect(repo.listRecentRevisions()).rejects.toThrow(/Failed to list recent revisions/i);
    await expect(repo.listDisciplineSummaries()).rejects.toThrow(/Failed to list discipline summaries/i);
  });
});
