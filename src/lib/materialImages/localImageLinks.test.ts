import { describe, it, expect } from "vitest";
import { findLocalImageLinks, rewriteImageLinks } from "./localImageLinks";

describe("findLocalImageLinks", () => {
  it("returns relative image paths in order of appearance", () => {
    const markdown = "![a](imagens/um.png)\n\ntexto\n\n![b](imagens/dois.png)";

    expect(findLocalImageLinks(markdown)).toEqual(["imagens/um.png", "imagens/dois.png"]);
  });

  it("ignores remote, absolute and data URLs", () => {
    const markdown = [
      "![r](https://exemplo.com/x.png)",
      "![h](http://exemplo.com/y.png)",
      "![abs](/public/z.png)",
      "![d](data:image/png;base64,AAAA)",
    ].join("\n");

    expect(findLocalImageLinks(markdown)).toEqual([]);
  });

  it("deduplicates repeated images", () => {
    const markdown = "![a](imagens/um.png) e de novo ![a](imagens/um.png)";

    expect(findLocalImageLinks(markdown)).toEqual(["imagens/um.png"]);
  });

  it("ignores regular links that are not images", () => {
    expect(findLocalImageLinks("[texto](imagens/um.png)")).toEqual([]);
  });

  it("supports an optional title after the path", () => {
    expect(findLocalImageLinks('![a](imagens/um.png "Título")')).toEqual(["imagens/um.png"]);
  });
});

describe("rewriteImageLinks", () => {
  it("replaces mapped local paths and keeps alt text and title", () => {
    const markdown = '![Neurônio](imagens/um.png "Título") e [link](imagens/um.png)';
    const urls = new Map([["imagens/um.png", "https://cdn/um.png"]]);

    expect(rewriteImageLinks(markdown, urls)).toBe(
      '![Neurônio](https://cdn/um.png "Título") e [link](imagens/um.png)',
    );
  });

  it("keeps images without a mapped URL untouched", () => {
    const markdown = "![a](imagens/outra.png)";

    expect(rewriteImageLinks(markdown, new Map())).toBe(markdown);
  });
});
