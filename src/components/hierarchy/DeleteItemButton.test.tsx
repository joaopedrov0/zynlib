import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DeleteItemButton } from "./DeleteItemButton";
import * as hierarchyActions from "@/lib/actions/hierarchyActions";

vi.mock("@/lib/actions/hierarchyActions", () => ({
  deleteHierarchyAction: vi.fn().mockResolvedValue(undefined),
}));

describe("DeleteItemButton Component", () => {
  it("returns null when canDelete is false", () => {
    const { container } = render(
      <DeleteItemButton
        table="disciplines"
        id="d-1"
        itemName="Física"
        redirectPath="/"
        canDelete={false}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("calls deleteHierarchyAction on confirmation", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);

    render(
      <DeleteItemButton
        table="disciplines"
        id="d-1"
        itemName="Física"
        redirectPath="/"
        canDelete={true}
      />
    );

    const btn = screen.getByRole("button", { name: /excluir/i });
    fireEvent.click(btn);

    await waitFor(() => {
      expect(hierarchyActions.deleteHierarchyAction).toHaveBeenCalledWith({
        table: "disciplines",
        id: "d-1",
        redirectPath: "/",
      });
    });
  });

  it("does not call delete when canceled", () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);
    const deleteSpy = vi.spyOn(hierarchyActions, "deleteHierarchyAction");

    render(
      <DeleteItemButton
        table="disciplines"
        id="d-1"
        itemName="Física"
        redirectPath="/"
        canDelete={true}
      />
    );

    const btn = screen.getByRole("button", { name: /excluir/i });
    fireEvent.click(btn);

    expect(deleteSpy).not.toHaveBeenCalled();
  });
});
