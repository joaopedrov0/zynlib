import { describe, it, expect } from "vitest";
import { resolveImageContentType } from "./imageContentType";

describe("resolveImageContentType", () => {
  it.each([
    ["grafico.png", "image/png"],
    ["foto.jpg", "image/jpeg"],
    ["foto.JPEG", "image/jpeg"],
    ["anim.gif", "image/gif"],
    ["leve.webp", "image/webp"],
  ])("maps %s to %s", (fileName, expected) => {
    expect(resolveImageContentType(fileName)).toBe(expected);
  });

  it("rejects unsupported formats naming the file and the accepted extensions", () => {
    expect(() => resolveImageContentType("diagrama.svg")).toThrow(
      'Formato de imagem não suportado: "diagrama.svg". Esperado: .png, .jpg, .jpeg, .gif, .webp',
    );
  });
});
