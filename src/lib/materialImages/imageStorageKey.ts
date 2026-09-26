import path from "node:path";

function toPosix(filePath: string): string {
  return filePath.replaceAll("\\", "/");
}

function materialKeyPrefix(materialsRoot: string, markdownPath: string): string {
  const relative = toPosix(path.relative(materialsRoot, markdownPath));
  if (relative.startsWith("..") || path.isAbsolute(relative) || !relative.endsWith(".md")) {
    throw new Error(
      `Material fora da pasta de materiais: "${markdownPath}". Esperado um arquivo .md dentro de "${materialsRoot}"`,
    );
  }
  return relative.slice(0, -".md".length);
}

function normalizedImagePath(imagePath: string): string {
  const normalized = path.posix.normalize(toPosix(imagePath));
  if (normalized.startsWith("..")) {
    throw new Error(
      `Caminho de imagem fora da pasta do material: "${imagePath}". Esperado um caminho relativo como "imagens/figura.png"`,
    );
  }
  return normalized;
}

/**
 * Monta a chave da imagem no bucket espelhando a hierarquia do material,
 * para que materiais diferentes nunca sobrescrevam as imagens uns dos outros.
 *
 * Exemplo de uso:
 * ```ts
 * buildImageStorageKey("materiais", "materiais/cc/ia/redes-neurais.md", "imagens/a.png");
 * // "cc/ia/redes-neurais/imagens/a.png"
 * ```
 */
export function buildImageStorageKey(
  materialsRoot: string,
  markdownPath: string,
  imagePath: string,
): string {
  return `${materialKeyPrefix(materialsRoot, markdownPath)}/${normalizedImagePath(imagePath)}`;
}
