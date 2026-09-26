import { describe, it, expect } from "vitest";
import path from "node:path";
import { FakeMaterialFileSystem } from "./FakeMaterialFileSystem";

describe("FakeMaterialFileSystem", () => {
  it("reads text and bytes seeded in the constructor, normalizing paths", async () => {
    const files = new FakeMaterialFileSystem({
      "materiais/a.md": "texto",
      "materiais/imagens/a.png": new Uint8Array([1]),
    });

    expect(await files.readText(path.join("materiais", "a.md"))).toBe("texto");
    expect(await files.readBytes("materiais/./imagens/a.png")).toEqual(new Uint8Array([1]));
  });

  it("encodes seeded text as utf-8 when read as bytes", async () => {
    const files = new FakeMaterialFileSystem({ "a.md": "é" });

    expect([...(await files.readBytes("a.md"))]).toEqual([0xc3, 0xa9]);
  });

  it("stores written text so it can be read back", async () => {
    const files = new FakeMaterialFileSystem();

    await files.writeText("saida.md", "novo");

    expect(await files.readText("saida.md")).toBe("novo");
  });

  it("throws naming the missing path", async () => {
    const files = new FakeMaterialFileSystem();

    await expect(files.readBytes("nada.png")).rejects.toThrow(
      `Arquivo não encontrado: "${path.normalize("nada.png")}". Esperado um arquivo existente no disco`,
    );
  });

  it("refuses to read binary content as text", async () => {
    const files = new FakeMaterialFileSystem({ "a.png": new Uint8Array([1]) });

    await expect(files.readText("a.png")).rejects.toThrow(
      'Arquivo "a.png" contém bytes, não texto. Esperado um arquivo de texto',
    );
  });
});
