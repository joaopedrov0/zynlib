import { createHash } from "node:crypto";
import path from "node:path";
import { ImageStorage } from "./ImageStorage";
import { MaterialFileSystem } from "./MaterialFileSystem";
import { resolveImageContentType } from "./imageContentType";
import { buildImageStorageKey } from "./imageStorageKey";
import { findLocalImageLinks, rewriteImageLinks } from "./localImageLinks";

const PUBLISHED_SUFFIX = ".zyn.md";

export interface PublishMaterialImagesRequest {
  materialsRoot: string;
  markdownPath: string;
}

export interface PublishMaterialImagesDependencies {
  files: MaterialFileSystem;
  storage: ImageStorage;
}

export interface PublishedMaterialImage {
  localPath: string;
  storageKey: string;
  publicUrl: string;
}

export interface PublishMaterialImagesResult {
  outputPath: string;
  images: PublishedMaterialImage[];
}

/**
 * Caminho da cópia publicável de um material: `redes-neurais.md` → `redes-neurais.zyn.md`.
 *
 * Exemplo de uso:
 * ```ts
 * buildPublishedMarkdownPath("materiais/cc/redes-neurais.md"); // "materiais/cc/redes-neurais.zyn.md"
 * ```
 */
export function buildPublishedMarkdownPath(markdownPath: string): string {
  const parsed = path.parse(markdownPath);
  return path.join(parsed.dir, `${parsed.name}${PUBLISHED_SUFFIX}`);
}

function assertIsSourceMarkdown(markdownPath: string): void {
  if (markdownPath.endsWith(PUBLISHED_SUFFIX)) {
    throw new Error(
      `O arquivo "${markdownPath}" já é uma versão publicada. Esperado o markdown original (sem "${PUBLISHED_SUFFIX}")`,
    );
  }
}

// O bucket sobrescreve a mesma chave, mas a CDN guarda a URL antiga em cache;
// o hash do conteúdo na query força a imagem nova a aparecer.
function withContentVersion(publicUrl: string, bytes: Uint8Array): string {
  const version = createHash("sha256").update(bytes).digest("hex").slice(0, 12);
  return `${publicUrl}?v=${version}`;
}

async function publishImage(
  request: PublishMaterialImagesRequest,
  localPath: string,
  { files, storage }: PublishMaterialImagesDependencies,
): Promise<PublishedMaterialImage> {
  const bytes = await files.readBytes(path.join(path.dirname(request.markdownPath), localPath));
  const storageKey = buildImageStorageKey(request.materialsRoot, request.markdownPath, localPath);
  await storage.uploadImage(storageKey, bytes, resolveImageContentType(localPath));
  const publicUrl = withContentVersion(storage.getPublicImageUrl(storageKey), bytes);
  return { localPath, storageKey, publicUrl };
}

/**
 * Envia as imagens locais de um material para o armazenamento público e grava uma
 * cópia `.zyn.md` apontando para as URLs, pronta para colar na Zyn Library.
 * O markdown original não é alterado, para continuar funcionando localmente.
 *
 * Exemplo de uso:
 * ```ts
 * const result = await publishMaterialImages(
 *   { materialsRoot: "materiais", markdownPath: "materiais/cc/ia/redes-neurais.md" },
 *   { files: new NodeMaterialFileSystem(), storage: new SupabaseImageStorage(supabase) },
 * );
 * ```
 */
export async function publishMaterialImages(
  request: PublishMaterialImagesRequest,
  dependencies: PublishMaterialImagesDependencies,
): Promise<PublishMaterialImagesResult> {
  assertIsSourceMarkdown(request.markdownPath);
  const markdown = await dependencies.files.readText(request.markdownPath);
  const images: PublishedMaterialImage[] = [];
  for (const localPath of findLocalImageLinks(markdown)) {
    images.push(await publishImage(request, localPath, dependencies));
  }
  const urlByLocalPath = new Map(images.map((image) => [image.localPath, image.publicUrl]));
  const outputPath = buildPublishedMarkdownPath(request.markdownPath);
  await dependencies.files.writeText(outputPath, rewriteImageLinks(markdown, urlByLocalPath));
  return { outputPath, images };
}
