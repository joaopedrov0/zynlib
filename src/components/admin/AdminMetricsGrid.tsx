import { Users, FolderTree, Layers, FileText, BookOpen } from "lucide-react";
import { AdminOverviewMetrics } from "@/lib/repositories/AdminRepository";

interface MetricCardProps {
  label: string;
  value: number;
  icon: typeof Users;
  colorClass: string;
}

function MetricCard({ label, value, icon: Icon, colorClass }: MetricCardProps) {
  return (
    <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs flex items-center justify-between">
      <div>
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
          {value}
        </p>
      </div>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}

interface AdminMetricsGridProps {
  metrics: AdminOverviewMetrics;
}

/**
 * Exibe a grade de métricas principais do sistema no painel administrativo.
 *
 * @example
 * <AdminMetricsGrid metrics={overviewMetrics} />
 */
export function AdminMetricsGrid({ metrics }: AdminMetricsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <MetricCard
        label="Contas Criadas"
        value={metrics.profilesCount}
        icon={Users}
        colorClass="bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
      />
      <MetricCard
        label="Disciplinas"
        value={metrics.disciplinesCount}
        icon={FolderTree}
        colorClass="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
      />
      <MetricCard
        label="Assuntos"
        value={metrics.subjectsCount}
        icon={Layers}
        colorClass="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
      />
      <MetricCard
        label="Tópicos"
        value={metrics.topicsCount}
        icon={FileText}
        colorClass="bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
      />
      <MetricCard
        label="Materiais"
        value={metrics.materialsCount}
        icon={BookOpen}
        colorClass="bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400"
      />
    </div>
  );
}
