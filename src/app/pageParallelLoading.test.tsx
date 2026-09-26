import { describe, it, expect, vi, beforeEach, type MockInstance } from "vitest";
import HomePage from "./page";
import DisciplinePage from "./[disciplineSlug]/page";
import SubjectPage from "./[disciplineSlug]/[subjectSlug]/page";
import TopicPage from "./[disciplineSlug]/[subjectSlug]/[topicSlug]/page";
import EditTopicPage from "./[disciplineSlug]/[subjectSlug]/[topicSlug]/edit/page";
import TopicHistoryPage from "./[disciplineSlug]/[subjectSlug]/[topicSlug]/history/page";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { getCatalogRepository } from "@/lib/repositories/getCatalogRepository";
import { FakeCatalogRepository } from "@/lib/repositories/FakeCatalogRepository";
import { UserProfile } from "@/types/database";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
}));

vi.mock("@/lib/auth/getCurrentUserProfile", () => ({
  getCurrentUserProfile: vi.fn(),
}));

vi.mock("@/lib/repositories/getCatalogRepository", () => ({
  getCatalogRepository: vi.fn(),
}));

const writerProfile: UserProfile = {
  id: "u1",
  email: "writer@test.com",
  full_name: "Writer",
  avatar_url: null,
  role: "writer",
  created_at: "",
  updated_at: "",
};

const topicParams = Promise.resolve({
  disciplineSlug: "matematica",
  subjectSlug: "calculo",
  topicSlug: "limites",
});

function buildCatalog(): FakeCatalogRepository {
  const created_at = "2026-01-01T00:00:00Z";
  return new FakeCatalogRepository(
    [{ id: "d1", name: "Matemática", slug: "matematica", description: null, created_at }],
    [{ id: "s1", discipline_id: "d1", name: "Cálculo", slug: "calculo", description: null, order_index: 0, created_at }],
    [{ id: "t1", subject_id: "s1", name: "Limites", slug: "limites", description: null, order_index: 0, created_at }],
  );
}

/** Mantém a busca de perfil pendente até `release` ser chamado. */
function holdProfileLookup(): () => void {
  let release: () => void = () => {};
  const pending = new Promise<UserProfile | null>((resolve) => {
    release = () => resolve(writerProfile);
  });
  vi.mocked(getCurrentUserProfile).mockReturnValueOnce(pending);
  return release;
}

async function expectCatalogQueriedBeforeProfile(
  renderPage: () => Promise<unknown>,
  catalogSpy: MockInstance<(...args: never[]) => unknown>,
): Promise<void> {
  const release = holdProfileLookup();
  const rendering = renderPage();

  await vi.waitFor(() => expect(catalogSpy).toHaveBeenCalled(), { timeout: 200 });
  release();
  await rendering;
}

describe("pages load the catalog in parallel with the user profile", () => {
  let catalog: FakeCatalogRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    catalog = buildCatalog();
    vi.mocked(getCatalogRepository).mockResolvedValue(catalog);
  });

  it("HomePage", async () => {
    const spy = vi.spyOn(catalog, "listDisciplines");
    await expectCatalogQueriedBeforeProfile(() => HomePage(), spy);
  });

  it("DisciplinePage", async () => {
    const spy = vi.spyOn(catalog, "listSubjects");
    const params = Promise.resolve({ disciplineSlug: "matematica" });
    await expectCatalogQueriedBeforeProfile(() => DisciplinePage({ params }), spy);
  });

  it("SubjectPage", async () => {
    const spy = vi.spyOn(catalog, "listTopics");
    const params = Promise.resolve({ disciplineSlug: "matematica", subjectSlug: "calculo" });
    await expectCatalogQueriedBeforeProfile(() => SubjectPage({ params }), spy);
  });

  it("TopicPage", async () => {
    const spy = vi.spyOn(catalog, "getMaterialByTopicId");
    await expectCatalogQueriedBeforeProfile(() => TopicPage({ params: topicParams }), spy);
  });

  it("EditTopicPage", async () => {
    const spy = vi.spyOn(catalog, "getMaterialByTopicId");
    await expectCatalogQueriedBeforeProfile(() => EditTopicPage({ params: topicParams }), spy);
  });

  it("TopicHistoryPage", async () => {
    const spy = vi.spyOn(catalog, "getMaterialByTopicId");
    await expectCatalogQueriedBeforeProfile(() => TopicHistoryPage({ params: topicParams }), spy);
  });
});
