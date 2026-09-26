// Uso: npm run publish-images -- materiais/<disciplina>/<assunto>/<material>.md
// Envia as imagens do material para o bucket público e gera <material>.zyn.md com as URLs.
import { NodeMaterialFileSystem } from "@/lib/materialImages/NodeMaterialFileSystem";
import {
  createSupabaseImageStorage,
  parsePublishImagesArgs,
  readImagePublisherConfig,
} from "@/lib/materialImages/imagePublisherSetup";
import { publishMaterialImages } from "@/lib/materialImages/publishMaterialImages";

const MATERIALS_ROOT = "materiais";

async function main(): Promise<void> {
  const markdownPath = parsePublishImagesArgs(process.argv.slice(2));
  const storage = createSupabaseImageStorage(readImagePublisherConfig(process.env));
  const result = await publishMaterialImages(
    { materialsRoot: MATERIALS_ROOT, markdownPath },
    { files: new NodeMaterialFileSystem(), storage },
  );
  for (const image of result.images) {
    console.log(`enviada: ${image.localPath} -> ${image.publicUrl}`);
  }
  console.log(`\n${result.images.length} imagem(ns) publicada(s). Cole na Zyn Library: ${result.outputPath}`);
}

main().catch((error: Error) => {
  console.error(`Erro: ${error.message}`);
  process.exitCode = 1;
});
