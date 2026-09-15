import { describe, it, expect } from "vitest";
import { generateSlug } from "./slug";

describe("generateSlug", () => {
  it("converts uppercase letters and spaces to lowercase hyphenated string", () => {
    const input = "Computer Science";
    const result = generateSlug(input);
    expect(result).toBe("computer-science");
  });

  it("removes accents and diacritics correctly", () => {
    const input = "Ciência da Computação";
    const result = generateSlug(input);
    expect(result).toBe("ciencia-da-computacao");
  });

  it("removes special characters and trims excess dashes", () => {
    const input = "  Árvores AVL & Grafos!  ";
    const result = generateSlug(input);
    expect(result).toBe("arvores-avl-grafos");
  });

  it("throws an error when input string is empty or whitespace", () => {
    expect(() => generateSlug("   ")).toThrow(
      "Slug generation requires non-empty string. Received: '   '",
    );
  });
});
