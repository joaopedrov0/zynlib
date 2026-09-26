// Captura `![alt](caminho "título opcional")`, separando o caminho para poder trocá-lo.
const IMAGE_LINK_PATTERN = /(!\[[^\]]*\]\()([^)\s]+)((?:\s+"[^"]*")?\))/g;

// Links já publicáveis: a Zyn Library só exibe imagens com URL pública.
const NON_LOCAL_PREFIX = /^(?:[a-z][a-z0-9+.-]*:|\/)/i;

function isLocalPath(imagePath: string): boolean {
  return !NON_LOCAL_PREFIX.test(imagePath);
}

/**
 * Lista, sem repetição, os caminhos relativos de imagens referenciadas no markdown.
 *
 * Exemplo de uso:
 * ```ts
 * findLocalImageLinks("![Neurônio](imagens/neuronio.png)"); // ["imagens/neuronio.png"]
 * ```
 */
export function findLocalImageLinks(markdown: string): string[] {
  const paths = new Set<string>();
  for (const match of markdown.matchAll(IMAGE_LINK_PATTERN)) {
    if (isLocalPath(match[2])) {
      paths.add(match[2]);
    }
  }
  return [...paths];
}

/**
 * Troca o caminho das imagens mapeadas pela URL correspondente, preservando alt e título.
 *
 * Exemplo de uso:
 * ```ts
 * rewriteImageLinks("![a](imagens/a.png)", new Map([["imagens/a.png", "https://cdn/a.png"]]));
 * ```
 */
export function rewriteImageLinks(
  markdown: string,
  urlByLocalPath: ReadonlyMap<string, string>,
): string {
  return markdown.replace(IMAGE_LINK_PATTERN, (whole, opening: string, imagePath: string, closing: string) => {
    const url = urlByLocalPath.get(imagePath);
    return url ? `${opening}${url}${closing}` : whole;
  });
}
