import { describe, it, expect } from "vitest";
import { useRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { EditorScrollMeasurers } from "./measureScrollOffsets";
import { useEditorScrollSync } from "./useEditorScrollSync";

class FakeScrollMeasurer implements EditorScrollMeasurers {
  sourceMeasurements = 0;

  constructor(
    private readonly sourceOffsets: ReadonlyMap<number, number>,
    private readonly targetOffsets: ReadonlyMap<number, number>,
  ) {}

  measureSource(): ReadonlyMap<number, number> {
    this.sourceMeasurements += 1;
    return this.sourceOffsets;
  }

  measureTarget(): ReadonlyMap<number, number> {
    return this.targetOffsets;
  }
}

function ScrollSyncHarness({ measurers, enabled }: { measurers: EditorScrollMeasurers; enabled: boolean }) {
  const sourceRef = useRef<HTMLTextAreaElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  useEditorScrollSync(sourceRef, targetRef, enabled, measurers);
  return (
    <>
      <textarea data-testid="editor" ref={sourceRef} defaultValue={"## A\n\ntexto\n\n## B"} />
      <div data-testid="preview" ref={targetRef} />
    </>
  );
}

// O jsdom não calcula layout, então as dimensões de rolagem são definidas à mão.
function setScrollBox(element: HTMLElement, scrollHeight: number, clientHeight: number) {
  Object.defineProperty(element, "scrollHeight", { value: scrollHeight, configurable: true });
  Object.defineProperty(element, "clientHeight", { value: clientHeight, configurable: true });
  Object.defineProperty(element, "scrollTop", { value: 0, writable: true, configurable: true });
}

function renderHarness(enabled = true) {
  const measurer = new FakeScrollMeasurer(new Map([[3, 500]]), new Map([[3, 1500]]));
  const view = render(<ScrollSyncHarness measurers={measurer} enabled={enabled} />);
  const editor = screen.getByTestId("editor") as HTMLTextAreaElement;
  const preview = screen.getByTestId("preview");
  setScrollBox(editor, 1200, 200);
  setScrollBox(preview, 2200, 200);
  return { measurer, editor, preview, view };
}

function scrollEditorTo(editor: HTMLTextAreaElement, offset: number) {
  editor.scrollTop = offset;
  fireEvent.scroll(editor);
}

describe("useEditorScrollSync", () => {
  it("scrolls the preview to the position matching the editor", () => {
    const { editor, preview } = renderHarness();

    scrollEditorTo(editor, 250);
    expect(preview.scrollTop).toBe(750);

    scrollEditorTo(editor, 750);
    expect(preview.scrollTop).toBe(1750);
  });

  it("does nothing while disabled", () => {
    const { editor, preview } = renderHarness(false);

    scrollEditorTo(editor, 250);

    expect(preview.scrollTop).toBe(0);
  });

  it("measures the editor again only after the text changes", () => {
    const { editor, measurer } = renderHarness();

    scrollEditorTo(editor, 100);
    scrollEditorTo(editor, 200);
    expect(measurer.sourceMeasurements).toBe(1);

    fireEvent.change(editor, { target: { value: "novo texto" } });
    scrollEditorTo(editor, 300);
    expect(measurer.sourceMeasurements).toBe(2);
  });

  it("stops listening after unmount", () => {
    const { editor, preview, view } = renderHarness();
    view.unmount();

    scrollEditorTo(editor, 250);

    expect(preview.scrollTop).toBe(0);
  });
});
