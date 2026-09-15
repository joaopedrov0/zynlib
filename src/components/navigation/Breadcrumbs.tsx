import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

function renderBreadcrumbItem(
  item: BreadcrumbItem,
  index: number,
  isLast: boolean,
) {
  if (isLast || !item.href) {
    return (
      <span className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
        {item.label}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
    >
      {item.label}
    </Link>
  );
}

/**
 * Componente de navegação estruturada (Breadcrumbs) para orientar o usuário na hierarquia de conhecimento.
 *
 * Exemplo de uso:
 * ```tsx
 * <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Computação" }]} />
 * ```
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-sm text-zinc-500 overflow-x-auto py-2"
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 mx-1 text-zinc-400 shrink-0" />
              )}
              {renderBreadcrumbItem(item, index, isLast)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
