import { describe, it, expect, vi } from "vitest";
import { searchCatalogAction } from "./searchCatalogAction";
import { getCatalogRepository } from "@/lib/repositories/getCatalogRepository";
import { CatalogRepository } from "@/lib/repositories/CatalogRepository";

vi.mock("@/lib/repositories/getCatalogRepository", () => ({
  getCatalogRepository: vi.fn(),
}));

describe("searchCatalogAction", () => {
  it("returns empty array when query is empty or blank", async () => {
    const results = await searchCatalogAction("   ");
    expect(results).toEqual([]);
    expect(getCatalogRepository).not.toHaveBeenCalled();
  });

  it("calls repository searchCatalog with trimmed query", async () => {
    const mockSearch = vi.fn().mockResolvedValue([
      {
        id: "d-1",
        type: "discipline",
        title: "Física",
        href: "/fisica",
      },
    ]);

    vi.mocked(getCatalogRepository).mockResolvedValue({
      searchCatalog: mockSearch,
    } as unknown as CatalogRepository);

    const results = await searchCatalogAction("  Física  ");
    expect(mockSearch).toHaveBeenCalledWith("Física");
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe("Física");
  });
});
