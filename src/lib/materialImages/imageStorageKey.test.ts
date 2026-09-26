import { describe, it, expect } from "vitest";
import path from "node:path";
import { buildImageStorageKey } from "./imageStorageKey";

const ROOT = path.join("repo", "materiais");
const MATERIAL = path.join(ROOT, "ciencia-da-computacao", "ia", "redes-neurais.md");

describe("buildImageStorageKey", () => {
  it("mirrors the material path inside the materials root", () => {
    expect(buildImageStorageKey(ROOT, MATERIAL, "imagens/neuronio.png")).toBe(
      "ciencia-da-computacao/ia/redes-neurais/imagens/neuronio.png",
    );
  });

  it("normalizes windows separators and redundant segments in the image path", () => {
    expect(buildImageStorageKey(ROOT, MATERIAL, ".\\imagens\\neuronio.png")).toBe(
      "ciencia-da-computacao/ia/redes-neurais/imagens/neuronio.png",
    );
  });

  it("rejects materials outside the materials root", () => {
    const outside = path.join("repo", "outro", "texto.md");

    expect(() => buildImageStorageKey(ROOT, outside, "imagens/a.png")).toThrow(
      `Material fora da pasta de materiais: "${outside}". Esperado um arquivo .md dentro de "${ROOT}"`,
    );
  });

  it("rejects image paths that escape the material folder", () => {
    expect(() => buildImageStorageKey(ROOT, MATERIAL, "../segredo.png")).toThrow(
      'Caminho de imagem fora da pasta do material: "../segredo.png". Esperado um caminho relativo como "imagens/figura.png"',
    );
  });
});
