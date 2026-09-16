import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RootLayout, { metadata } from "./layout";

describe("RootLayout Component", () => {
  it("has metadata configured", () => {
    expect(metadata.title).toContain("Zyn Library");
  });

  it("renders children inside layout", () => {
    render(
      <RootLayout>
        <div>Filho de teste</div>
      </RootLayout>
    );

    expect(screen.getByText("Filho de teste")).toBeDefined();
  });
});
