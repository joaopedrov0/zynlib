import Image from "next/image";
import { UserProfile, UserRole } from "@/types/database";
import { User, Shield, PenTool } from "lucide-react";

function resolveRoleBadge(role: UserRole) {
  if (role === "admin") {
    return {
      label: "Administrador",
      className: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
      icon: Shield,
    };
  }
  return {
    label: "Escritor",
    className: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    icon: PenTool,
  };
}

function renderProfileAvatar(profile: UserProfile) {
  if (profile.avatar_url) {
    return (
      <Image
        src={profile.avatar_url}
        alt={profile.full_name}
        width={32}
        height={32}
        unoptimized
        className="w-8 h-8 rounded-full object-cover shrink-0"
      />
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 shrink-0">
      <User className="w-4 h-4" />
    </div>
  );
}

function renderAccountRow(profile: UserProfile) {
  const badge = resolveRoleBadge(profile.role);
  const BadgeIcon = badge.icon;

  return (
    <tr
      key={profile.id}
      className="border-b border-zinc-100 dark:border-zinc-800/80 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition"
    >
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          {renderProfileAvatar(profile)}
          <div>
            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              {profile.full_name}
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
              {profile.id.slice(0, 8)}...
            </p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-xs text-zinc-600 dark:text-zinc-300 font-mono">
        {profile.email}
      </td>
      <td className="py-3 px-4">
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badge.className}`}
        >
          <BadgeIcon className="w-3 h-3" />
          {badge.label}
        </span>
      </td>
      <td className="py-3 px-4 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
        {new Date(profile.created_at).toLocaleDateString("pt-BR")}
      </td>
    </tr>
  );
}

interface AdminAccountsListProps {
  profiles: UserProfile[];
}

/**
 * Tabela de monitoramento de contas registradas na plataforma.
 *
 * @example
 * <AdminAccountsList profiles={userProfiles} />
 */
export function AdminAccountsList({ profiles }: AdminAccountsListProps) {
  if (profiles.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
        Nenhuma conta registrada ainda.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-500 font-semibold bg-zinc-50/60 dark:bg-zinc-900/60">
            <th className="py-3 px-4">Usuário</th>
            <th className="py-3 px-4">E-mail</th>
            <th className="py-3 px-4">Papel</th>
            <th className="py-3 px-4">Cadastro</th>
          </tr>
        </thead>
        <tbody>{profiles.map(renderAccountRow)}</tbody>
      </table>
    </div>
  );
}
