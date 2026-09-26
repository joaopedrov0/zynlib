import { readFile, writeFile } from "node:fs/promises";
import { MaterialFileSystem } from "./MaterialFileSystem";

/**
 * Acesso aos arquivos de um material no disco local.
 *
 * Exemplo de uso:
 * ```ts
 * const markdown = await new NodeMaterialFileSystem().readText("materiais/cc/ia/redes-neurais.md");
 * ```
 */
export class NodeMaterialFileSystem implements MaterialFileSystem {
  readText(filePath: string): Promise<string> {
    return readFile(filePath, "utf-8");
  }

  writeText(filePath: string, content: string): Promise<void> {
    return writeFile(filePath, content, "utf-8");
  }

  async readBytes(filePath: string): Promise<Uint8Array> {
    return new Uint8Array(await readFile(filePath));
  }
}
