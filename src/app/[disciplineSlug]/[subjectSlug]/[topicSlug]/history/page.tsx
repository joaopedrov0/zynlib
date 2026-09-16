import { notFound } from "next/navigation";
import Image from "next/image";
import { AppHeader } from "@/components/layout/AppHeader";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { DiffViewer } from "@/components/diff/DiffViewer";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { getCatalogRepository } from "@/lib/repositories/getCatalogRepository";
import { MaterialRevisionWithAuthor } from "@/types/database";
import { History, GitCommit, User as UserIcon } from "lucide-react";

interface HistoryPageProps {
  params: Promise<{
    disciplineSlug: string;
    subjectSlug: string;
    topicSlug: string;
  }>;
}

function resolvePreviousContent(
  revisions: MaterialRevisionWithAuthor[],
  currentIndex: number,
): string {
  const previousRevision = revisions[currentIndex + 1];
  return previousRevision ? previousRevision.content_markdown : "";
}

function renderRevisionCard(
  rev: MaterialRevisionWithAuthor,
  index: number,
  allRevisions: MaterialRevisionWithAuthor[],
) {
  const previousContent = resolvePreviousContent(allRevisions, index);
  const previousRevNumber = allRevisions[index + 1]?.revision_number;

  return (
    <section
      key={rev.id}
      className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <GitCommit className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
            Revisão #{rev.revision_number}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono">
            {new Date(rev.created_at).toLocaleString("pt-BR")}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
          {rev.author?.avatar_url ? (
            <Image
              src={rev.author.avatar_url}
              alt={rev.author.full_name}
              width={20}
              height={20}
              unoptimized
              className="w-5 h-5 rounded-full object-cover"
            />
          ) : (
            <UserIcon className="w-3.5 h-3.5 text-zinc-400" />
          )}
          <span>{rev.author?.full_name ?? "Autor anônimo"}</span>
        </div>
      </div>

      <div>
        <span className="text-xs text-zinc-400 uppercase tracking-wide font-medium">
          Descrição da alteração:
        </span>
        <p className="mt-0.5 text-sm font-medium text-zinc-800 dark:text-zinc-200">
          {rev.change_summary}
        </p>
      </div>

      <div className="pt-2">
        <DiffViewer
          previousText={previousContent}
          incomingText={rev.content_markdown}
          previousLabel={
            previousRevNumber ? `Revisão #${previousRevNumber}` : "Início vazio"
          }
          incomingLabel={`Revisão #${rev.revision_number}`}
        />
      </div>
    </section>
  );
}

export default async function TopicHistoryPage({ params }: HistoryPageProps) {
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
  const revisions = material
    ? await catalog.listMaterialRevisions(material.id)
    : [];

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
            { label: "Histórico de Edições" },
          ]}
        />

        <div className="my-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Linha do Tempo Auditável
          </span>
          <h1 className="mt-1 text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Histórico &bull; {topic.name}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Compare todas as revisões colaborativas, autores e linhas modificadas com visualização estilo Git diff.
          </p>
        </div>

        {revisions.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30">
            <History className="w-12 h-12 mx-auto text-zinc-400 dark:text-zinc-600" />
            <h3 className="mt-4 text-base font-semibold text-zinc-800 dark:text-zinc-200">
              Nenhuma revisão registrada ainda
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              O histórico de alterações será preenchido conforme novas versões forem publicadas.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {revisions.map((rev, index) =>
              renderRevisionCard(rev, index, revisions),
            )}
          </div>
        )}
      </main>
    </div>
  );
}
