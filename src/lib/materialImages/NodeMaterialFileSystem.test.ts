import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtemp, rm, writeFile, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { NodeMaterialFileSystem } from "./NodeMaterialFileSystem";

// Este é o adaptador de disco em si, então o teste usa uma pasta temporária real.
describe("NodeMaterialFileSystem", () => {
  let workDir: string;
  const files = new NodeMaterialFileSystem();

  beforeEach(async () => {
    workDir = await mkdtemp(path.join(os.tmpdir(), "zynlib-material-"));
  });

  afterEach(async () => {
    await rm(workDir, { recursive: true, force: true });
  });

  it("reads markdown as utf-8 text", async () => {
    const filePath = path.join(workDir, "texto.md");
    await writeFile(filePath, "Neurônio", "utf-8");

    expect(await files.readText(filePath)).toBe("Neurônio");
  });

  it("writes utf-8 text", async () => {
    const filePath = path.join(workDir, "saida.md");

    await files.writeText(filePath, "Época");

    expect(await readFile(filePath, "utf-8")).toBe("Época");
  });

  it("reads binary files as bytes", async () => {
    const filePath = path.join(workDir, "a.png");
    await writeFile(filePath, new Uint8Array([137, 80, 78, 71]));

    expect([...(await files.readBytes(filePath))]).toEqual([137, 80, 78, 71]);
  });
});
