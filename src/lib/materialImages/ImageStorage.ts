/**
 * Interface do armazenamento público das imagens usadas nos materiais.
 */
export interface ImageStorage {
  uploadImage(storageKey: string, bytes: Uint8Array, contentType: string): Promise<void>;
  getPublicImageUrl(storageKey: string): string;
}
