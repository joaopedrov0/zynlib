import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DiffViewer } from "./DiffViewer";

describe("DiffViewer Component", () => {
  it("renders labels and diff lines correctly", () => {
    render(
      <DiffViewer
        previousText={`linha 1\nlinha 2`}
        incomingText={`linha 1\nlinha 2 alterada`}
        previousLabel="v1"
        incomingLabel="v2"
      />
    );

    expect(screen.getByText("- v1")).toBeDefined();
    expect(screen.getByText("+ v2")).toBeDefined();
    expect(screen.getByText("linha 1")).toBeDefined();
    expect(screen.getByText("linha 2")).toBeDefined();
    expect(screen.getByText("linha 2 alterada")).toBeDefined();
  });

  it("handles empty lines and default labels", () => {
    render(<DiffViewer previousText="" incomingText="nova linha" />);

    expect(screen.getByText("- Versão Anterior")).toBeDefined();
    expect(screen.getByText("+ Versão Atual")).toBeDefined();
    expect(screen.getByText("nova linha")).toBeDefined();
  });

  it("handles blank line values", () => {
    const { container } = render(<DiffViewer previousText="\n\n" incomingText="\n\n" />);
    expect(container.querySelectorAll(".font-mono").length).toBeGreaterThan(0);
  });
});
