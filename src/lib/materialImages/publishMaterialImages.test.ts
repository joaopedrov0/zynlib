import { describe, it, expect } from "vitest";
import path from "node:path";
import { FakeImageStorage } from "./FakeImageStorage";
import { FakeMaterialFileSystem } from "./FakeMaterialFileSystem";
import { buildPublishedMarkdownPath, publishMaterialImages } from "./publishMaterialImages";

const ROOT = "materiais";
const MARKDOWN = path.join(ROOT, "cc", "ia", "redes-neurais.md");
const OUTPUT = path.join(ROOT, "cc", "ia", "redes-neurais.zyn.md");
const SOURCE = "## Perceptron\n\n![Neurônio](imagens/neuronio.png)\n\n![Gráfico](imagens/portas.png)";

function buildFiles(extra: Record<string, string | Uint8Array> = {}) {
  return new FakeMaterialFileSystem({
    [MARKDOWN]: SOURCE,
    [path.join(ROOT, "cc", "ia", "imagens", "neuronio.png")]: new Uint8Array([1]),
    [path.join(ROOT, "cc", "ia", "imagens", "portas.png")]: new Uint8Array([2]),
    ...extra,
  });
}

describe("publishMaterialImages", () => {
  it("uploads every referenced image under the material key", async () => {
    const storage = new FakeImageStorage();

    await publishMaterialImages({ materialsRoot: ROOT, markdownPath: MARKDOWN }, { files: buildFiles(), storage });

    expect([...storage.storedImages.keys()]).toEqual([
      "cc/ia/redes-neurais/imagens/neuronio.png",
      "cc/ia/redes-neurais/imagens/portas.png",
    ]);
    expect(storage.storedImages.get("cc/ia/redes-neurais/imagens/neuronio.png")?.contentType).toBe("image/png");
  });

  it("writes a .zyn.md copy pointing to versioned public URLs and keeps the source intact", async () => {
    const files = buildFiles();

    const result = await publishMaterialImages(
      { materialsRoot: ROOT, markdownPath: MARKDOWN },
      { files, storage: new FakeImageStorage() },
    );

    const published = await files.readText(OUTPUT);
    expect(result.outputPath).toBe(OUTPUT);
    expect(published).toMatch(
      /!\[Neurônio\]\(https:\/\/fake-storage\.test\/material-images\/cc\/ia\/redes-neurais\/imagens\/neuronio\.png\?v=[0-9a-f]{12}\)/,
    );
    expect(await files.readText(MARKDOWN)).toBe(SOURCE);
  });

  it("changes the version when the image content changes", async () => {
    const run = async (bytes: Uint8Array) => {
      const files = buildFiles({ [path.join(ROOT, "cc", "ia", "imagens", "neuronio.png")]: bytes });
      const result = await publishMaterialImages(
        { materialsRoot: ROOT, markdownPath: MARKDOWN },
        { files, storage: new FakeImageStorage() },
      );
      return result.images[0].publicUrl;
    };

    expect(await run(new Uint8Array([1]))).not.toBe(await run(new Uint8Array([7])));
  });

  it("reports each published image", async () => {
    const result = await publishMaterialImages(
      { materialsRoot: ROOT, markdownPath: MARKDOWN },
      { files: buildFiles(), storage: new FakeImageStorage() },
    );

    expect(result.images.map((image) => [image.localPath, image.storageKey])).toEqual([
      ["imagens/neuronio.png", "cc/ia/redes-neurais/imagens/neuronio.png"],
      ["imagens/portas.png", "cc/ia/redes-neurais/imagens/portas.png"],
    ]);
  });

  it("does not write the output when an image is missing", async () => {
    const files = new FakeMaterialFileSystem({ [MARKDOWN]: SOURCE });

    await expect(
      publishMaterialImages({ materialsRoot: ROOT, markdownPath: MARKDOWN }, { files, storage: new FakeImageStorage() }),
    ).rejects.toThrow("Arquivo não encontrado");
    await expect(files.readText(OUTPUT)).rejects.toThrow("Arquivo não encontrado");
  });

  it("refuses to publish an already published file", async () => {
    await expect(
      publishMaterialImages(
        { materialsRoot: ROOT, markdownPath: OUTPUT },
        { files: buildFiles(), storage: new FakeImageStorage() },
      ),
    ).rejects.toThrow(
      `O arquivo "${OUTPUT}" já é uma versão publicada. Esperado o markdown original (sem ".zyn.md")`,
    );
  });
});

describe("buildPublishedMarkdownPath", () => {
  it("adds the .zyn suffix before the extension", () => {
    expect(buildPublishedMarkdownPath(path.join("a", "b.md"))).toBe(path.join("a", "b.zyn.md"));
  });
});
