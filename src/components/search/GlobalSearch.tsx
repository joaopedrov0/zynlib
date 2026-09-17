"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";
import { searchCatalogAction } from "@/lib/actions/searchCatalogAction";
import { SearchResultItem } from "@/lib/repositories/CatalogRepository";

function resolveBadgeColor(type: "discipline" | "subject" | "topic") {
  if (type === "discipline") {
    return "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300";
  }
  if (type === "subject") {
    return "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300";
  }
  return "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300";
}

function resolveBadgeLabel(type: "discipline" | "subject" | "topic") {
  if (type === "discipline") return "Disciplina";
  if (type === "subject") return "Assunto";
  return "Tópico";
}

function renderResultRow(item: SearchResultItem, onSelect: () => void) {
  return (
    <Link
      key={item.id}
      href={item.href}
      onClick={onSelect}
      className="block p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
    >
      <div className="flex items-center gap-2">
        <span
          className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${resolveBadgeColor(item.type)}`}
        >
          {resolveBadgeLabel(item.type)}
        </span>
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {item.title}
        </span>
      </div>
      {item.description && (
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
          {item.description}
        </p>
      )}
    </Link>
  );
}

/**
 * Global search input with instant autocomplete results for disciplines, subjects, and topics.
 *
 * @example
 * <GlobalSearch />
 */
export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const timer = setTimeout(() => {
      startTransition(async () => {
        const found = await searchCatalogAction(trimmed);
        setResults(found);
      });
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  const handleChange = (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm">
      <div className="relative flex items-center">
        <Search className="w-4 h-4 absolute left-3 text-zinc-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder="Buscar no catálogo... (Ctrl+K)"
          className="w-full pl-9 pr-8 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-zinc-950 transition"
        />
        {isPending ? (
          <Loader2 className="w-3.5 h-3.5 absolute right-2.5 text-zinc-400 animate-spin" />
        ) : query ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Limpar busca"
            className="absolute right-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : null}
      </div>

      {isOpen && query.trim() && (
        <div className="absolute top-full mt-2 left-0 right-0 z-50 p-2 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl max-h-80 overflow-y-auto space-y-1">
          {results.length === 0 && !isPending ? (
            <p className="p-3 text-xs text-zinc-500 dark:text-zinc-400 text-center">
              Nenhum resultado encontrado para &ldquo;{query}&rdquo;
            </p>
          ) : (
            results.map((item) => renderResultRow(item, () => setIsOpen(false)))
          )}
        </div>
      )}
    </div>
  );
}
