const pulseBlock = "rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80 motion-safe:animate-pulse";

/**
 * Esqueleto exibido pelos `loading.tsx` enquanto o Server Component da rota carrega.
 * Sem ele, o Next.js mantém a página anterior congelada até a resposta chegar,
 * e o clique parece não ter efeito.
 *
 * @example
 * // src/app/<segmento>/loading.tsx
 * export { PageLoadingSkeleton as default } from "@/components/layout/PageLoadingSkeleton";
 */
export function PageLoadingSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950"
    >
      <span className="sr-only">Carregando…</span>
      <div className="h-16 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80" />

      <main aria-hidden className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className={`${pulseBlock} h-4 w-48`} />
        <div className={`${pulseBlock} h-9 w-2/3 max-w-md`} />
        <div className={`${pulseBlock} h-4 w-full max-w-2xl`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          <div className={`${pulseBlock} h-40`} />
          <div className={`${pulseBlock} h-40`} />
          <div className={`${pulseBlock} h-40`} />
        </div>
      </main>
    </div>
  );
}
