/**
 * Interface de acesso aos arquivos locais de um material (markdown e imagens).
 */
export interface MaterialFileSystem {
  readText(filePath: string): Promise<string>;
  writeText(filePath: string, content: string): Promise<void>;
  readBytes(filePath: string): Promise<Uint8Array>;
}
