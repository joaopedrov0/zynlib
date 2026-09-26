// SVG fica de fora de propósito: servido de um domínio público, pode carregar scripts.
const CONTENT_TYPE_BY_EXTENSION: Readonly<Record<string, string>> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

/**
 * Descobre o MIME type de uma imagem pela extensão, recusando formatos fora do bucket.
 *
 * Exemplo de uso:
 * ```ts
 * resolveImageContentType("grafico.png"); // "image/png"
 * ```
 */
export function resolveImageContentType(fileName: string): string {
  const extension = fileName.slice(fileName.lastIndexOf(".")).toLowerCase();
  const contentType = CONTENT_TYPE_BY_EXTENSION[extension];
  if (!contentType) {
    const accepted = Object.keys(CONTENT_TYPE_BY_EXTENSION).join(", ");
    throw new Error(`Formato de imagem não suportado: "${fileName}". Esperado: ${accepted}`);
  }
  return contentType;
}
