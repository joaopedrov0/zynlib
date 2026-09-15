import Link from "next/link";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { getCatalogRepository } from "@/lib/repositories/getCatalogRepository";
import { TopicRecord } from "@/types/database";
import { FileText, ArrowRight } from "lucide-react";

interface SubjectPageProps {
  params: Promise<{ disciplineSlug: string; subjectSlug: string }>;
}

function renderTopicCard(
  topic: TopicRecord,
  disciplineSlug: string,
  subjectSlug: string,
) {
  return (
    <Link
      key={topic.id}
      href={`/${disciplineSlug}/${subjectSlug}/${topic.slug}`}
      className="group p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all hover:shadow-md hover:shadow-indigo-500/5 flex flex-col justify-between"
    >
      <div>
        <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
          <FileText className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {topic.name}
        </h2>
        {topic.description && (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
            {topic.description}
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center text-xs font-medium text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
        <span>Acessar material</span>
        <ArrowRight className="w-3.5 h-3.5 ml-1" />
      </div>
    </Link>
  );
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { disciplineSlug, subjectSlug } = await params;
  const catalog = await getCatalogRepository();
  const profile = await getCurrentUserProfile();

  const discipline = await catalog.getDisciplineBySlug(disciplineSlug);
  if (!discipline) {
    notFound();
  }

  const subject = await catalog.getSubjectBySlug(discipline.id, subjectSlug);
  if (!subject) {
    notFound();
  }

  const topics = await catalog.listTopics(subject.id);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader currentUserProfile={profile} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs
          items={[
            { label: "Início", href: "/" },
            { label: discipline.name, href: `/${discipline.slug}` },
            { label: subject.name },
          ]}
        />

        <div className="my-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Assunto
          </span>
          <h1 className="mt-1 text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {subject.name}
          </h1>
          {subject.description && (
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
              {subject.description}
            </p>
          )}
        </div>

        {topics.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30">
            <FileText className="w-12 h-12 mx-auto text-zinc-400 dark:text-zinc-600" />
            <h3 className="mt-4 text-base font-semibold text-zinc-800 dark:text-zinc-200">
              Nenhum tópico cadastrado neste assunto
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              Crie tópicos associados a este assunto para disponibilizar materiais de estudo colaborativos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) =>
              renderTopicCard(topic, discipline.slug, subject.slug),
            )}
          </div>
        )}
      </main>
    </div>
  );
}
