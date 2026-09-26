import path from "node:path";
import { MaterialFileSystem } from "./MaterialFileSystem";

type FakeFileContent = string | Uint8Array;

/**
 * Sistema de arquivos em memória, para testes sem tocar no disco.
 *
 * Exemplo de uso:
 * ```ts
 * const files = new FakeMaterialFileSystem({ "materiais/a.md": "![x](imagens/x.png)" });
 * await files.readText("materiais/a.md");
 * ```
 */
export class FakeMaterialFileSystem implements MaterialFileSystem {
  private readonly contentByPath = new Map<string, FakeFileContent>();

  constructor(initialFiles: Readonly<Record<string, FakeFileContent>> = {}) {
    for (const [filePath, content] of Object.entries(initialFiles)) {
      this.contentByPath.set(path.normalize(filePath), content);
    }
  }

  async readText(filePath: string): Promise<string> {
    const content = this.read(filePath);
    if (typeof content !== "string") {
      throw new Error(`Arquivo "${filePath}" contém bytes, não texto. Esperado um arquivo de texto`);
    }
    return content;
  }

  async writeText(filePath: string, content: string): Promise<void> {
    this.contentByPath.set(path.normalize(filePath), content);
  }

  async readBytes(filePath: string): Promise<Uint8Array> {
    const content = this.read(filePath);
    return typeof content === "string" ? new TextEncoder().encode(content) : content;
  }

  private read(filePath: string): FakeFileContent {
    const normalized = path.normalize(filePath);
    const content = this.contentByPath.get(normalized);
    if (content === undefined) {
      throw new Error(`Arquivo não encontrado: "${normalized}". Esperado um arquivo existente no disco`);
    }
    return content;
  }
}
