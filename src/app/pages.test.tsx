import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HomePage from "./page";
import DisciplinePage from "./[disciplineSlug]/page";
import SubjectPage from "./[disciplineSlug]/[subjectSlug]/page";
import TopicPage from "./[disciplineSlug]/[subjectSlug]/[topicSlug]/page";
import EditTopicPage from "./[disciplineSlug]/[subjectSlug]/[topicSlug]/edit/page";
import TopicHistoryPage from "./[disciplineSlug]/[subjectSlug]/[topicSlug]/history/page";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { getCatalogRepository } from "@/lib/repositories/getCatalogRepository";
import { CatalogRepository } from "@/lib/repositories/CatalogRepository";

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

describe("Server Component Pages", () => {
  const fakeDiscipline = {
    id: "d1",
    name: "Matemática",
    slug: "matematica",
    description: "Estudo dos números",
    created_at: new Date().toISOString(),
  };

  const fakeSubject = {
    id: "s1",
    discipline_id: "d1",
    name: "Cálculo",
    slug: "calculo",
    description: "Derivadas e integrais",
    order_index: 0,
    created_at: new Date().toISOString(),
  };

  const fakeTopic = {
    id: "t1",
    subject_id: "s1",
    name: "Limites",
    slug: "limites",
    description: "Conceito de limite",
    order_index: 0,
    created_at: new Date().toISOString(),
  };

  const fakeMaterial = {
    id: "m1",
    topic_id: "t1",
    current_revision_id: "r1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    current_revision: {
      id: "r1",
      material_id: "m1",
      author_id: "u1",
      revision_number: 1,
      content_markdown: "Conteúdo de Limites: $\\lim_{x \\to 0} x = 0$",
      change_summary: "Versão inicial",
      created_at: new Date().toISOString(),
      author: {
        id: "u1",
        full_name: "Professor",
        avatar_url: null,
        role: "writer",
      },
    },
  };

  const fakeRepo = {
    listDisciplines: vi.fn().mockResolvedValue([fakeDiscipline]),
    getDisciplineBySlug: vi.fn().mockImplementation((slug) =>
      slug === "matematica" ? Promise.resolve(fakeDiscipline) : Promise.resolve(null)
    ),
    listSubjects: vi.fn().mockResolvedValue([fakeSubject]),
    getSubjectBySlug: vi.fn().mockImplementation((_id, slug) =>
      slug === "calculo" ? Promise.resolve(fakeSubject) : Promise.resolve(null)
    ),
    listTopics: vi.fn().mockResolvedValue([fakeTopic]),
    getTopicBySlug: vi.fn().mockImplementation((_id, slug) =>
      slug === "limites" ? Promise.resolve(fakeTopic) : Promise.resolve(null)
    ),
    getMaterialByTopicId: vi.fn().mockResolvedValue(fakeMaterial),
    listMaterialRevisions: vi.fn().mockResolvedValue([fakeMaterial.current_revision]),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getCatalogRepository).mockResolvedValue(fakeRepo as unknown as CatalogRepository);
    vi.mocked(getCurrentUserProfile).mockResolvedValue(null);
  });

  it("renders HomePage with disciplines", async () => {
    const Component = await HomePage();
    render(Component);
    expect(screen.getByText("Matemática")).toBeDefined();
    expect(screen.getByText("Estudo dos números")).toBeDefined();
  });

  it("renders DisciplinePage with subjects", async () => {
    const Component = await DisciplinePage({
      params: Promise.resolve({ disciplineSlug: "matematica" }),
    });
    render(Component);
    expect(screen.getByText("Cálculo")).toBeDefined();
  });

  it("calls notFound in DisciplinePage if slug is unknown", async () => {
    await expect(
      DisciplinePage({
        params: Promise.resolve({ disciplineSlug: "inexistente" }),
      })
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("renders SubjectPage with topics", async () => {
    const Component = await SubjectPage({
      params: Promise.resolve({ disciplineSlug: "matematica", subjectSlug: "calculo" }),
    });
    render(Component);
    expect(screen.getByText("Limites")).toBeDefined();
  });

  it("calls notFound in SubjectPage if discipline or subject is missing", async () => {
    await expect(
      SubjectPage({
        params: Promise.resolve({ disciplineSlug: "inexistente", subjectSlug: "calculo" }),
      })
    ).rejects.toThrow("NEXT_NOT_FOUND");

    await expect(
      SubjectPage({
        params: Promise.resolve({ disciplineSlug: "matematica", subjectSlug: "inexistente" }),
      })
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("renders TopicPage with material markdown", async () => {
    const Component = await TopicPage({
      params: Promise.resolve({
        disciplineSlug: "matematica",
        subjectSlug: "calculo",
        topicSlug: "limites",
      }),
    });
    render(Component);
    expect(screen.getByText("Conteúdo de Limites:")).toBeDefined();
  });

  it("renders TopicPage empty state with write button when authenticated", async () => {
    fakeRepo.getMaterialByTopicId.mockResolvedValueOnce(null);
    vi.mocked(getCurrentUserProfile).mockResolvedValueOnce({
      id: "u1",
      email: "prof@test.com",
      full_name: "Prof",
      avatar_url: null,
      role: "writer",
      created_at: "",
      updated_at: "",
    });

    const Component = await TopicPage({
      params: Promise.resolve({
        disciplineSlug: "matematica",
        subjectSlug: "calculo",
        topicSlug: "limites",
      }),
    });
    render(Component);
    expect(
      screen.getByText("Nenhum material publicado para este tópico ainda")
    ).toBeDefined();
    expect(screen.getByText("Criar primeira versão")).toBeDefined();
  });

  it("calls notFound in TopicPage if topic is missing", async () => {
    await expect(
      TopicPage({
        params: Promise.resolve({
          disciplineSlug: "matematica",
          subjectSlug: "calculo",
          topicSlug: "inexistente",
        }),
      })
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("redirects unauthenticated user in EditTopicPage", async () => {
    await expect(
      EditTopicPage({
        params: Promise.resolve({
          disciplineSlug: "matematica",
          subjectSlug: "calculo",
          topicSlug: "limites",
        }),
      })
    ).rejects.toThrow("NEXT_REDIRECT:/matematica/calculo/limites");
  });

  it("renders EditTopicPage for authenticated user", async () => {
    vi.mocked(getCurrentUserProfile).mockResolvedValue({
      id: "u1",
      email: "prof@test.com",
      full_name: "Prof",
      avatar_url: null,
      role: "writer",
      created_at: "",
      updated_at: "",
    });

    const Component = await EditTopicPage({
      params: Promise.resolve({
        disciplineSlug: "matematica",
        subjectSlug: "calculo",
        topicSlug: "limites",
      }),
    });
    render(Component);
    expect(screen.getByText("Editar Material")).toBeDefined();
  });

  it("renders TopicHistoryPage with revisions", async () => {
    const Component = await TopicHistoryPage({
      params: Promise.resolve({
        disciplineSlug: "matematica",
        subjectSlug: "calculo",
        topicSlug: "limites",
      }),
    });
    render(Component);
    expect(screen.getByText("Histórico • Limites")).toBeDefined();
    expect(screen.getByText("Versão inicial")).toBeDefined();
  });

  it("renders TopicHistoryPage empty state when no revisions", async () => {
    fakeRepo.listMaterialRevisions.mockResolvedValueOnce([]);
    const Component = await TopicHistoryPage({
      params: Promise.resolve({
        disciplineSlug: "matematica",
        subjectSlug: "calculo",
        topicSlug: "limites",
      }),
    });
    render(Component);
    expect(screen.getByText("Nenhuma revisão registrada ainda")).toBeDefined();
  });

  it("renders HomePage empty state when no disciplines or error occurs", async () => {
    fakeRepo.listDisciplines.mockRejectedValueOnce(new Error("DB offline"));
    const Component = await HomePage();
    render(Component);
    expect(
      screen.getByText("Nenhuma disciplina cadastrada ainda")
    ).toBeDefined();
  });

  it("renders DisciplinePage and SubjectPage empty states", async () => {
    fakeRepo.listSubjects.mockResolvedValueOnce([]);
    const DiscComp = await DisciplinePage({
      params: Promise.resolve({ disciplineSlug: "matematica" }),
    });
    render(DiscComp);
    expect(
      screen.getByText("Nenhum assunto cadastrado nesta disciplina")
    ).toBeDefined();

    fakeRepo.listTopics.mockResolvedValueOnce([]);
    const SubjComp = await SubjectPage({
      params: Promise.resolve({ disciplineSlug: "matematica", subjectSlug: "calculo" }),
    });
    render(SubjComp);
    expect(
      screen.getByText("Nenhum tópico cadastrado neste assunto")
    ).toBeDefined();
  });

  it("renders TopicPage empty state for unauthenticated visitor", async () => {
    fakeRepo.getMaterialByTopicId.mockResolvedValueOnce(null);
    vi.mocked(getCurrentUserProfile).mockResolvedValueOnce(null);

    const Component = await TopicPage({
      params: Promise.resolve({
        disciplineSlug: "matematica",
        subjectSlug: "calculo",
        topicSlug: "limites",
      }),
    });
    render(Component);
    expect(
      screen.getByText(/Faça login com sua conta autorizada/)
    ).toBeDefined();
  });

  it("renders TopicHistoryPage with avatar and anonymous author", async () => {
    const revWithAvatar = {
      id: "r2",
      material_id: "m1",
      author_id: "u2",
      revision_number: 2,
      content_markdown: "v2",
      change_summary: "v2 summary",
      created_at: new Date().toISOString(),
      author: {
        id: "u2",
        full_name: "Author Avatar",
        avatar_url: "https://example.com/avatar.jpg",
        role: "writer",
      },
    };

    const revAnon = {
      id: "r1",
      material_id: "m1",
      author_id: "u-anon",
      revision_number: 1,
      content_markdown: "v1",
      change_summary: "v1 summary",
      created_at: new Date().toISOString(),
      author: null,
    };

    fakeRepo.listMaterialRevisions.mockResolvedValueOnce([revWithAvatar, revAnon]);

    const Component = await TopicHistoryPage({
      params: Promise.resolve({
        disciplineSlug: "matematica",
        subjectSlug: "calculo",
        topicSlug: "limites",
      }),
    });
    render(Component);
    expect(screen.getByText("Author Avatar")).toBeDefined();
    expect(screen.getByText("Autor anônimo")).toBeDefined();
  });
});
