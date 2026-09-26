import { describe, it, expect } from "vitest";
import { FakeImageStorage } from "./FakeImageStorage";

describe("FakeImageStorage", () => {
  it("keeps uploaded images in memory by key", async () => {
    const storage = new FakeImageStorage();
    const bytes = new Uint8Array([9]);

    await storage.uploadImage("cc/a.png", bytes, "image/png");

    expect(storage.storedImages.get("cc/a.png")).toEqual({ bytes, contentType: "image/png" });
  });

  it("builds a deterministic public URL from the key", () => {
    expect(new FakeImageStorage().getPublicImageUrl("cc/a.png")).toBe(
      "https://fake-storage.test/material-images/cc/a.png",
    );
  });
});
