import Link from "next/link";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { MarkdownView } from "@/components/markdown/MarkdownView";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { getCatalogRepository } from "@/lib/repositories/getCatalogRepository";
import { History, Edit3, PlusCircle } from "lucide-react";

interface TopicPageProps {
  params: Promise<{
    disciplineSlug: string;
    subjectSlug: string;
    topicSlug: string;
  }>;
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { disciplineSlug, subjectSlug, topicSlug } = await params;
  const catalog = await getCatalogRepository();
  const profile = await getCurrentUserProfile();

  const discipline = await catalog.getDisciplineBySlug(disciplineSlug);
  if (!discipline) notFound();

  const subject = await catalog.getSubjectBySlug(discipline.id, subjectSlug);
  if (!subject) notFound();

  const topic = await catalog.getTopicBySlug(subject.id, topicSlug);
  if (!topic) notFound();

  const material = await catalog.getMaterialByTopicId(topic.id);
  const currentRevision = material?.current_revision;
  const canEdit = Boolean(profile);

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
            { label: topic.name },
          ]}
        />

        <div className="my-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Tópico &bull; Material Canônico
            </span>
            <h1 className="mt-1 text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {topic.name}
            </h1>
            {topic.description && (
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {topic.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              href={`/${discipline.slug}/${subject.slug}/${topic.slug}/history`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <History className="w-3.5 h-3.5" />
              <span>Histórico</span>
            </Link>

            {canEdit ? (
              <Link
                href={`/${discipline.slug}/${subject.slug}/${topic.slug}/edit`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar</span>
              </Link>
            ) : null}
          </div>
        </div>

        {currentRevision ? (
          <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xs">
            <div className="mb-6 flex items-center justify-between text-xs text-zinc-500 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <span>Revisão #{currentRevision.revision_number}</span>
              <span>
                Última alteração:{" "}
                {new Date(currentRevision.created_at).toLocaleDateString("pt-BR")}
              </span>
            </div>

            <MarkdownView content={currentRevision.content_markdown} />
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30">
            <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
              Nenhum material publicado para este tópico ainda
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              {canEdit
                ? "Como escritor, você pode iniciar o material canônico deste tópico agora mesmo."
                : "Faça login com sua conta autorizada para escrever a primeira versão deste material."}
            </p>
            {canEdit && (
              <Link
                href={`/${discipline.slug}/${subject.slug}/${topic.slug}/edit`}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Criar primeira versão</span>
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
