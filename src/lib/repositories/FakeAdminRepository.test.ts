import { describe, it, expect, beforeEach } from "vitest";
import { FakeAdminRepository } from "./FakeAdminRepository";

describe("FakeAdminRepository", () => {
  let repo: FakeAdminRepository;

  beforeEach(() => {
    repo = new FakeAdminRepository();
  });

  it("returns overview metrics correctly", async () => {
    const metrics = await repo.getOverviewMetrics();
    expect(metrics.profilesCount).toBeGreaterThan(0);
    expect(metrics.disciplinesCount).toBeGreaterThan(0);
    expect(metrics.subjectsCount).toBeGreaterThan(0);
    expect(metrics.topicsCount).toBeGreaterThan(0);
    expect(metrics.materialsCount).toBeGreaterThan(0);
  });

  it("lists all user profiles", async () => {
    const profiles = await repo.listUserProfiles();
    expect(profiles.length).toBeGreaterThan(0);
    expect(profiles[0].id).toBeDefined();
    expect(profiles[0].email).toBeDefined();
  });

  it("lists recent revisions respecting the limit", async () => {
    const revisions = await repo.listRecentRevisions(2);
    expect(revisions.length).toBeLessThanOrEqual(2);
    if (revisions.length > 0) {
      expect(revisions[0].revisionNumber).toBeDefined();
      expect(revisions[0].topicName).toBeDefined();
      expect(revisions[0].href).toContain("/");
    }
  });

  it("lists discipline summaries with subject and topic counts", async () => {
    const summaries = await repo.listDisciplineSummaries();
    expect(summaries.length).toBeGreaterThan(0);
    expect(summaries[0].name).toBeDefined();
    expect(typeof summaries[0].subjectsCount).toBe("number");
    expect(typeof summaries[0].topicsCount).toBe("number");
  });
});
