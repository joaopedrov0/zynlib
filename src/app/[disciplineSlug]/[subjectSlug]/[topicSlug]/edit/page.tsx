import { notFound, redirect } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { MaterialEditor } from "@/components/editor/MaterialEditor";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { getCatalogRepository } from "@/lib/repositories/getCatalogRepository";

interface EditTopicPageProps {
  params: Promise<{
    disciplineSlug: string;
    subjectSlug: string;
    topicSlug: string;
  }>;
}

export default async function EditTopicPage({ params }: EditTopicPageProps) {
  const { disciplineSlug, subjectSlug, topicSlug } = await params;
  const profile = await getCurrentUserProfile();

  if (!profile) {
    redirect(`/${disciplineSlug}/${subjectSlug}/${topicSlug}`);
  }

  const catalog = await getCatalogRepository();

  const discipline = await catalog.getDisciplineBySlug(disciplineSlug);
  if (!discipline) notFound();

  const subject = await catalog.getSubjectBySlug(discipline.id, subjectSlug);
  if (!subject) notFound();

  const topic = await catalog.getTopicBySlug(subject.id, topicSlug);
  if (!topic) notFound();

  const material = await catalog.getMaterialByTopicId(topic.id);
  const currentRevision = material?.current_revision;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader currentUserProfile={profile} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs
          items={[
            { label: "Início", href: "/" },
            { label: discipline.name, href: `/${discipline.slug}` },
            {
              label: subject.name,
              href: `/${discipline.slug}/${subject.slug}`,
            },
            {
              label: topic.name,
              href: `/${discipline.slug}/${subject.slug}/${topic.slug}`,
            },
            { label: "Editar Material" },
          ]}
        />

        <div className="my-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Editor Colaborativo
          </span>
          <h1 className="mt-1 text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {topic.name}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Edite o conteúdo em formato Markdown. Cada submissão gerará uma nova versão no histórico auditável.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xs">
          <MaterialEditor
            topicId={topic.id}
            disciplineSlug={discipline.slug}
            subjectSlug={subject.slug}
            topicSlug={topic.slug}
            initialContent={currentRevision?.content_markdown ?? ""}
            currentRevisionNumber={currentRevision?.revision_number ?? null}
          />
        </div>
      </main>
    </div>
  );
}
