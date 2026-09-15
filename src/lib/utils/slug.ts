/**
 * Converte um texto arbitrário em um identificador slug URL-friendly.
 *
 * Exemplo de uso:
 * ```ts
 * const slug = generateSlug("Ciência da Computação");
 * // slug === "ciencia-da-computacao"
 * ```
 */
export function generateSlug(rawTitle: string): string {
  const trimmedText = rawTitle.trim();
  if (!trimmedText) {
    throw new Error(
      `Slug generation requires non-empty string. Received: '${rawTitle}'`,
    );
  }

  return trimmedText
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
