import { describe, it, expect } from "vitest";
import { isExternalHref, readCodeLanguage } from "./markdownElementHelpers";

describe("readCodeLanguage", () => {
  it("reads the language from a class list", () => {
    expect(readCodeLanguage(["hljs", "language-python"])).toBe("python");
  });

  it("reads the language from a class string", () => {
    expect(readCodeLanguage("language-cpp hljs")).toBe("cpp");
  });

  it("returns null when there is no language class", () => {
    expect(readCodeLanguage(undefined)).toBeNull();
    expect(readCodeLanguage(["hljs"])).toBeNull();
  });
});

describe("isExternalHref", () => {
  it.each([
    ["https://exemplo.com", true],
    ["http://exemplo.com", true],
    ["/fisica/mecanica", false],
    ["#perceptron", false],
    ["mailto:joaopedrov0.dev@gmail.com", false],
    [undefined, false],
  ])("classifies %s as external=%s", (href, expected) => {
    expect(isExternalHref(href)).toBe(expected);
  });
});
