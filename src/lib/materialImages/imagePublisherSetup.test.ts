import { describe, it, expect } from "vitest";
import {
  createSupabaseImageStorage,
  parsePublishImagesArgs,
  readImagePublisherConfig,
} from "./imagePublisherSetup";

describe("readImagePublisherConfig", () => {
  it("reads the project URL and the service role key", () => {
    const config = readImagePublisherConfig({
      NEXT_PUBLIC_SUPABASE_URL: "https://projeto.supabase.co",
      SUPABASE_SERVICE_ROLE_KEY: "service-key",
    });

    expect(config).toEqual({ supabaseUrl: "https://projeto.supabase.co", serviceRoleKey: "service-key" });
  });

  it("lists every missing variable and where to put them", () => {
    expect(() => readImagePublisherConfig({})).toThrow(
      "Variáveis ausentes: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY. " +
        "Esperado: ambas definidas no .env.local (a service role key fica em Project Settings > API no Supabase)",
    );
  });

  it("treats blank values as missing", () => {
    expect(() =>
      readImagePublisherConfig({ NEXT_PUBLIC_SUPABASE_URL: "https://p.supabase.co", SUPABASE_SERVICE_ROLE_KEY: " " }),
    ).toThrow("Variáveis ausentes: SUPABASE_SERVICE_ROLE_KEY.");
  });
});

describe("parsePublishImagesArgs", () => {
  it("returns the markdown path given on the command line", () => {
    expect(parsePublishImagesArgs(["materiais/cc/redes-neurais.md"])).toBe("materiais/cc/redes-neurais.md");
  });

  it("explains the expected usage when the path is missing", () => {
    expect(() => parsePublishImagesArgs([])).toThrow(
      "Argumentos recebidos: []. Esperado: npm run publish-images -- <caminho/do/material.md>",
    );
  });

  it("rejects extra arguments", () => {
    expect(() => parsePublishImagesArgs(["a.md", "b.md"])).toThrow('Argumentos recebidos: ["a.md","b.md"].');
  });
});

describe("createSupabaseImageStorage", () => {
  it("builds public URLs on the configured project", () => {
    const storage = createSupabaseImageStorage({
      supabaseUrl: "https://projeto.supabase.co",
      serviceRoleKey: "service-key",
    });

    expect(storage.getPublicImageUrl("cc/a.png")).toBe(
      "https://projeto.supabase.co/storage/v1/object/public/material-images/cc/a.png",
    );
  });
});
