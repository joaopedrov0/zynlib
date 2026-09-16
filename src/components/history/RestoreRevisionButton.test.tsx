import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RestoreRevisionButton } from "./RestoreRevisionButton";
import * as restoreActionModule from "@/lib/actions/restoreMaterialRevision";

vi.mock("@/lib/actions/restoreMaterialRevision", () => ({
  restoreMaterialRevision: vi.fn().mockResolvedValue(undefined),
}));

describe("RestoreRevisionButton Component", () => {
  const defaultProps = {
    topicId: "t1",
    disciplineSlug: "matematica",
    subjectSlug: "calculo-1",
    topicSlug: "limites",
    targetRevisionId: "rev-1",
    targetRevisionNumber: 1,
    isCurrentRevision: false,
    canRestore: true,
  };

  it("renders 'Versão Atual' badge when revision is already current", () => {
    render(<RestoreRevisionButton {...defaultProps} isCurrentRevision={true} />);
    expect(screen.getByText("Versão Atual")).toBeDefined();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("returns null when user cannot restore", () => {
    const { container } = render(
      <RestoreRevisionButton {...defaultProps} canRestore={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders restore button when user can restore and it is not current", () => {
    render(<RestoreRevisionButton {...defaultProps} />);
    const button = screen.getByRole("button", { name: /restaurar versão/i });
    expect(button).toBeDefined();
  });

  it("triggers restoreMaterialRevision on confirmation", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<RestoreRevisionButton {...defaultProps} />);

    const button = screen.getByRole("button", { name: /restaurar versão/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(restoreActionModule.restoreMaterialRevision).toHaveBeenCalledWith({
        topicId: "t1",
        disciplineSlug: "matematica",
        subjectSlug: "calculo-1",
        topicSlug: "limites",
        targetRevisionId: "rev-1",
      });
    });
  });

  it("does not trigger restore if user cancels confirmation", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);
    const restoreMock = vi.spyOn(restoreActionModule, "restoreMaterialRevision");
    render(<RestoreRevisionButton {...defaultProps} />);

    const button = screen.getByRole("button", { name: /restaurar versão/i });
    fireEvent.click(button);

    expect(restoreMock).not.toHaveBeenCalled();
  });
});
