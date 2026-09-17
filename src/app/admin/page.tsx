import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { AdminMetricsGrid } from "@/components/admin/AdminMetricsGrid";
import { AdminAccountsList } from "@/components/admin/AdminAccountsList";
import { AdminRecentUpdatesList } from "@/components/admin/AdminRecentUpdatesList";
import { AdminCatalogOverview } from "@/components/admin/AdminCatalogOverview";
import { getCurrentUserProfile } from "@/lib/auth/getCurrentUserProfile";
import { getAdminRepository } from "@/lib/repositories/getAdminRepository";
import { UserProfile } from "@/types/database";
import { ShieldAlert, ArrowLeft } from "lucide-react";

function renderRestrictedAccess(profile: UserProfile | null) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader currentUserProfile={profile} />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center">
        <div className="max-w-md w-full p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-md text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            Acesso Restrito
          </h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Esta área é reservada exclusivamente para administradores do sistema. Faça login com uma conta administrativa para acessar.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Início</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function renderDashboardHeading() {
  return (
    <div className="my-6">
      <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
        Painel de Controle
      </span>
      <h1 className="mt-1 text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
        Painel de Administração
      </h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Monitoramento de contas registradas, materiais atualizados recentemente e catálogo de conhecimento.
      </p>
    </div>
  );
}

interface SectionContainerProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

function SectionContainer({ title, subtitle, children }: SectionContainerProps) {
  return (
    <section className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs space-y-4">
      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          {subtitle}
        </p>
      </div>
      {children}
    </section>
  );
}

/**
 * Página do painel de administração com monitoramento de métricas, contas, revisões e catálogo.
 *
 * @example
 * <AdminDashboardPage />
 */
export default async function AdminDashboardPage() {
  const profile = await getCurrentUserProfile();

  if (!profile || profile.role !== "admin") {
    return renderRestrictedAccess(profile);
  }

  const adminRepo = await getAdminRepository();
  const [metrics, profiles, recentRevisions, summaries] = await Promise.all([
    adminRepo.getOverviewMetrics(),
    adminRepo.listUserProfiles(),
    adminRepo.listRecentRevisions(10),
    adminRepo.listDisciplineSummaries(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader currentUserProfile={profile} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        <Breadcrumbs
          items={[{ label: "Início", href: "/" }, { label: "Administração" }]}
        />

        {renderDashboardHeading()}

        <AdminMetricsGrid metrics={metrics} />

        <SectionContainer
          title="Contas Registradas"
          subtitle="Visão geral e papéis de acesso dos usuários cadastrados na plataforma."
        >
          <AdminAccountsList profiles={profiles} />
        </SectionContainer>

        <SectionContainer
          title="Atualizações Recentes de Materiais"
          subtitle="Histórico cronológico das últimas alterações colaborativas em tópicos."
        >
          <AdminRecentUpdatesList revisions={recentRevisions} />
        </SectionContainer>

        <SectionContainer
          title="Estrutura do Catálogo"
          subtitle="Disciplinas ativas com totalização de assuntos e tópicos associados."
        >
          <AdminCatalogOverview summaries={summaries} />
        </SectionContainer>
      </main>
    </div>
  );
}
