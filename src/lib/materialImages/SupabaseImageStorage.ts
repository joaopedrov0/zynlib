import { SupabaseClient } from "@supabase/supabase-js";
import { ImageStorage } from "./ImageStorage";

// Precisa bater com o bucket criado em supabase/schema.sql.
export const MATERIAL_IMAGES_BUCKET = "material-images";

/**
 * Armazena as imagens dos materiais num bucket público do Supabase Storage.
 *
 * Exemplo de uso:
 * ```ts
 * const storage = new SupabaseImageStorage(supabase);
 * await storage.uploadImage("cc/ia/redes-neurais/imagens/a.png", bytes, "image/png");
 * ```
 */
export class SupabaseImageStorage implements ImageStorage {
  constructor(
    private readonly client: SupabaseClient,
    private readonly bucket: string = MATERIAL_IMAGES_BUCKET,
  ) {}

  async uploadImage(storageKey: string, bytes: Uint8Array, contentType: string): Promise<void> {
    // upsert: republicar um material troca a imagem antiga em vez de falhar
    const { error } = await this.client.storage
      .from(this.bucket)
      .upload(storageKey, bytes, { contentType, upsert: true });
    if (error) {
      throw new Error(`Falha ao enviar "${storageKey}" para o bucket "${this.bucket}": ${error.message}`);
    }
  }

  getPublicImageUrl(storageKey: string): string {
    return this.client.storage.from(this.bucket).getPublicUrl(storageKey).data.publicUrl;
  }
}
