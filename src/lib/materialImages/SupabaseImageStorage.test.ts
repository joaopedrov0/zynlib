import { describe, it, expect } from "vitest";
import { SupabaseClient } from "@supabase/supabase-js";
import { MATERIAL_IMAGES_BUCKET, SupabaseImageStorage } from "./SupabaseImageStorage";

interface RecordedUpload {
  bucket: string;
  storageKey: string;
  bytes: Uint8Array;
  options: { contentType: string; upsert: boolean };
}

class FakeStorageBucketClient {
  readonly uploads: RecordedUpload[] = [];
  private readonly uploadErrorMessage: string | null;

  constructor(uploadErrorMessage: string | null = null) {
    this.uploadErrorMessage = uploadErrorMessage;
  }

  readonly storage = {
    from: (bucket: string) => ({
      upload: async (storageKey: string, bytes: Uint8Array, options: RecordedUpload["options"]) => {
        this.uploads.push({ bucket, storageKey, bytes, options });
        const error = this.uploadErrorMessage ? { message: this.uploadErrorMessage } : null;
        return { data: error ? null : { path: storageKey }, error };
      },
      getPublicUrl: (storageKey: string) => ({
        data: { publicUrl: `https://projeto.supabase.co/storage/v1/object/public/${bucket}/${storageKey}` },
      }),
    }),
  };

  asSupabaseClient(): SupabaseClient {
    return this as unknown as SupabaseClient;
  }
}

describe("SupabaseImageStorage", () => {
  it("uploads to the material images bucket overwriting previous versions", async () => {
    const client = new FakeStorageBucketClient();
    const storage = new SupabaseImageStorage(client.asSupabaseClient());
    const bytes = new Uint8Array([1, 2, 3]);

    await storage.uploadImage("cc/ia/a.png", bytes, "image/png");

    expect(client.uploads).toEqual([
      {
        bucket: MATERIAL_IMAGES_BUCKET,
        storageKey: "cc/ia/a.png",
        bytes,
        options: { contentType: "image/png", upsert: true },
      },
    ]);
  });

  it("throws with the key, bucket and provider message when the upload fails", async () => {
    const client = new FakeStorageBucketClient("Bucket not found");
    const storage = new SupabaseImageStorage(client.asSupabaseClient(), "outro-bucket");

    await expect(storage.uploadImage("a.png", new Uint8Array(), "image/png")).rejects.toThrow(
      'Falha ao enviar "a.png" para o bucket "outro-bucket": Bucket not found',
    );
  });

  it("returns the public URL of a stored image", () => {
    const storage = new SupabaseImageStorage(new FakeStorageBucketClient().asSupabaseClient());

    expect(storage.getPublicImageUrl("cc/a.png")).toBe(
      "https://projeto.supabase.co/storage/v1/object/public/material-images/cc/a.png",
    );
  });
});
