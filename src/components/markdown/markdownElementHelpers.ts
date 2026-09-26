type HastClassName = string | ReadonlyArray<string | number> | undefined;

const LANGUAGE_CLASS = /^language-(.+)$/;
const EXTERNAL_HREF = /^https?:\/\//i;

/**
 * Descobre a linguagem de um bloco de código a partir da classe `language-*`.
 *
 * Exemplo de uso:
 * ```ts
 * readCodeLanguage(["hljs", "language-python"]); // "python"
 * ```
 */
export function readCodeLanguage(className: HastClassName): string | null {
  const classes = typeof className === "string" ? className.split(/\s+/) : (className ?? []);
  for (const entry of classes) {
    const match = LANGUAGE_CLASS.exec(String(entry));
    if (match) return match[1];
  }
  return null;
}

/**
 * Indica se o link sai da plataforma (http/https), para abrir em nova aba.
 *
 * Exemplo de uso:
 * ```ts
 * isExternalHref("https://exemplo.com"); // true
 * ```
 */
export function isExternalHref(href: string | undefined): boolean {
  return href !== undefined && EXTERNAL_HREF.test(href);
}
