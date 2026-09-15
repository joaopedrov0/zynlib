import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";

describe("Breadcrumbs Component", () => {
  it("renders a list of breadcrumb links with the last one active and unlinked", () => {
    const items: BreadcrumbItem[] = [
      { label: "Disciplinas", href: "/" },
      { label: "Computação", href: "/d/computacao" },
      { label: "Algoritmos" },
    ];

    render(<Breadcrumbs items={items} />);

    const firstLink = screen.getByRole("link", { name: "Disciplinas" });
    const secondLink = screen.getByRole("link", { name: "Computação" });
    const activeText = screen.getByText("Algoritmos");

    expect(firstLink.getAttribute("href")).toBe("/");
    expect(secondLink.getAttribute("href")).toBe("/d/computacao");
    expect(activeText.tagName).toBe("SPAN");
  });

  it("renders nothing when items array is empty", () => {
    const { container } = render(<Breadcrumbs items={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
