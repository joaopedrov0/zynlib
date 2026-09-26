import { ImageStorage } from "./ImageStorage";

export interface StoredFakeImage {
  bytes: Uint8Array;
  contentType: string;
}

/**
 * Armazenamento de imagens em memória, para testes sem acesso ao Supabase.
 *
 * Exemplo de uso:
 * ```ts
 * const storage = new FakeImageStorage();
 * await storage.uploadImage("a.png", bytes, "image/png");
 * storage.storedImages.get("a.png");
 * ```
 */
export class FakeImageStorage implements ImageStorage {
  readonly storedImages = new Map<string, StoredFakeImage>();

  async uploadImage(storageKey: string, bytes: Uint8Array, contentType: string): Promise<void> {
    this.storedImages.set(storageKey, { bytes, contentType });
  }

  getPublicImageUrl(storageKey: string): string {
    return `https://fake-storage.test/material-images/${storageKey}`;
  }
}
