import { describe, it, expect, afterEach } from "vitest";
import { measureEditorLineOffsets, measurePreviewLineOffsets } from "./measureScrollOffsets";

afterEach(() => {
  document.body.innerHTML = "";
});

function stubTop(element: Element, top: number) {
  element.getBoundingClientRect = () => ({ top }) as DOMRect;
}

describe("measurePreviewLineOffsets", () => {
  it("maps each source line to its block offset inside the scrolled container", () => {
    const container = document.createElement("div");
    container.innerHTML = '<h2 data-source-line="1"></h2><p data-source-line="3"></p><p>sem linha</p>';
    Object.defineProperty(container, "scrollTop", { value: 100 });
    stubTop(container, 50);
    stubTop(container.children[0], 60);
    stubTop(container.children[1], 250);

    expect(measurePreviewLineOffsets(container)).toEqual(new Map([[1, 110], [3, 300]]));
  });
});

describe("measureEditorLineOffsets", () => {
  it("returns an offset for every line and cleans up its measuring element", () => {
    const textarea = document.createElement("textarea");
    textarea.value = "## Título\n\nparágrafo";
    document.body.appendChild(textarea);

    const offsets = measureEditorLineOffsets(textarea);

    expect([...offsets.keys()]).toEqual([1, 2, 3]);
    expect(document.body.children).toHaveLength(1);
  });
});
