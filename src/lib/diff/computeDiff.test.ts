import { describe, it, expect } from "vitest";
import { computeLineDiff } from "./computeDiff";

describe("computeLineDiff", () => {
  it("returns unchanged lines when contents are identical", () => {
    const originalText = "Linha 1\nLinha 2";
    const newText = "Linha 1\nLinha 2";

    const diffEntries = computeLineDiff(originalText, newText);

    expect(diffEntries).toHaveLength(2);
    expect(diffEntries[0]).toEqual({
      type: "unchanged",
      value: "Linha 1",
      oldLineNumber: 1,
      newLineNumber: 1,
    });
    expect(diffEntries[1]).toEqual({
      type: "unchanged",
      value: "Linha 2",
      oldLineNumber: 2,
      newLineNumber: 2,
    });
  });

  it("detects added lines correctly with appropriate line numbers", () => {
    const originalText = "Linha 1";
    const newText = "Linha 1\nLinha 2 adicionada";

    const diffEntries = computeLineDiff(originalText, newText);

    expect(diffEntries).toHaveLength(2);
    expect(diffEntries[1]).toEqual({
      type: "added",
      value: "Linha 2 adicionada",
      oldLineNumber: null,
      newLineNumber: 2,
    });
  });

  it("detects removed lines correctly", () => {
    const originalText = "Linha 1\nLinha para remover";
    const newText = "Linha 1";

    const diffEntries = computeLineDiff(originalText, newText);

    expect(diffEntries).toHaveLength(2);
    expect(diffEntries[1]).toEqual({
      type: "removed",
      value: "Linha para remover",
      oldLineNumber: 2,
      newLineNumber: null,
    });
  });

  it("handles empty initial text when creating the first version", () => {
    const originalText = "";
    const newText = "Primeira linha";

    const diffEntries = computeLineDiff(originalText, newText);

    expect(diffEntries).toHaveLength(1);
    expect(diffEntries[0]).toEqual({
      type: "added",
      value: "Primeira linha",
      oldLineNumber: null,
      newLineNumber: 1,
    });
  });
});
