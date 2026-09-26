import { describe, it, expect } from "vitest";
import type { Element, Root } from "hast";
import { BLOCK_CODE_CLASS, rehypeMarkBlockCode } from "./rehypeMarkBlockCode";

function element(tagName: string, className: string[] | undefined, children: Element[] = []): Element {
  return { type: "element", tagName, properties: className ? { className } : {}, children };
}

describe("rehypeMarkBlockCode", () => {
  it("marks code inside pre, keeping its language class", () => {
    const code = element("code", ["language-python"]);
    const tree: Root = { type: "root", children: [element("pre", undefined, [code])] };

    rehypeMarkBlockCode()(tree);

    expect(code.properties.className).toEqual(["language-python", BLOCK_CODE_CLASS]);
  });

  it("marks code inside pre even without a language", () => {
    const code = element("code", undefined);
    const tree: Root = { type: "root", children: [element("pre", undefined, [code])] };

    rehypeMarkBlockCode()(tree);

    expect(code.properties.className).toEqual([BLOCK_CODE_CLASS]);
  });

  it("leaves inline code untouched", () => {
    const code = element("code", undefined);
    const tree: Root = { type: "root", children: [element("p", undefined, [code])] };

    rehypeMarkBlockCode()(tree);

    expect(code.properties.className).toBeUndefined();
  });
});
