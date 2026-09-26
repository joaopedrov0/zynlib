import { describe, it, expect } from "vitest";
import { buildScrollAnchors, mapScrollOffset } from "./scrollAnchors";

describe("mapScrollOffset", () => {
  const anchors = [
    { sourceOffset: 0, targetOffset: 0 },
    { sourceOffset: 100, targetOffset: 300 },
    { sourceOffset: 200, targetOffset: 400 },
  ];

  it("interpolates linearly between the surrounding anchors", () => {
    expect(mapScrollOffset(anchors, 50)).toBe(150);
    expect(mapScrollOffset(anchors, 150)).toBe(350);
  });

  it("returns the exact target on an anchor", () => {
    expect(mapScrollOffset(anchors, 100)).toBe(300);
  });

  it("clamps offsets outside the anchor range", () => {
    expect(mapScrollOffset(anchors, -10)).toBe(0);
    expect(mapScrollOffset(anchors, 999)).toBe(400);
  });

  it("returns 0 without anchors", () => {
    expect(mapScrollOffset([], 50)).toBe(0);
  });
});

describe("buildScrollAnchors", () => {
  it("pairs lines present on both sides between the start and end anchors", () => {
    const source = new Map([[1, 0], [3, 40], [5, 80]]);
    const target = new Map([[3, 150], [5, 260]]);

    expect(buildScrollAnchors(source, target, { sourceMax: 200, targetMax: 500 })).toEqual([
      { sourceOffset: 0, targetOffset: 0 },
      { sourceOffset: 40, targetOffset: 150 },
      { sourceOffset: 80, targetOffset: 260 },
      { sourceOffset: 200, targetOffset: 500 },
    ]);
  });

  it("drops anchors that would make the mapping go backwards or repeat", () => {
    const source = new Map([[1, 0], [3, 40], [5, 40], [7, 120]]);
    const target = new Map([[1, 0], [3, 150], [5, 180], [7, 100]]);

    expect(buildScrollAnchors(source, target, { sourceMax: 200, targetMax: 500 })).toEqual([
      { sourceOffset: 0, targetOffset: 0 },
      { sourceOffset: 40, targetOffset: 150 },
      { sourceOffset: 200, targetOffset: 500 },
    ]);
  });

  it("drops anchors beyond what either side can scroll to", () => {
    const source = new Map([[3, 40], [9, 250]]);
    const target = new Map([[3, 600], [9, 700]]);

    expect(buildScrollAnchors(source, target, { sourceMax: 200, targetMax: 500 })).toEqual([
      { sourceOffset: 0, targetOffset: 0 },
      { sourceOffset: 200, targetOffset: 500 },
    ]);
  });
});
