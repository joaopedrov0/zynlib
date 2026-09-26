import { createClient } from "@supabase/supabase-js";
import { ImageStorage } from "./ImageStorage";
import { SupabaseImageStorage } from "./SupabaseImageStorage";

export interface ImagePublisherConfig {
  supabaseUrl: string;
  serviceRoleKey: string;
}

type EnvironmentVariables = Readonly<Partial<Record<string, string>>>;

const REQUIRED_VARIABLES = ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"] as const;

/**
 * Lê do ambiente o que o script de publicação precisa para escrever no bucket.
 * A service role key ignora o RLS, então só pode existir no .env.local de quem publica.
 *
 * Exemplo de uso:
 * ```ts
 * const config = readImagePublisherConfig(process.env);
 * ```
 */
export function readImagePublisherConfig(env: EnvironmentVariables): ImagePublisherConfig {
  const missing = REQUIRED_VARIABLES.filter((name) => !env[name]?.trim());
  if (missing.length > 0) {
    throw new Error(
      `Variáveis ausentes: ${missing.join(", ")}. ` +
        "Esperado: ambas definidas no .env.local (a service role key fica em Project Settings > API no Supabase)",
    );
  }
  return { supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL!, serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY! };
}

/**
 * Extrai o caminho do markdown dos argumentos de linha de comando.
 *
 * Exemplo de uso:
 * ```ts
 * const markdownPath = parsePublishImagesArgs(process.argv.slice(2));
 * ```
 */
export function parsePublishImagesArgs(args: readonly string[]): string {
  if (args.length !== 1) {
    throw new Error(
      `Argumentos recebidos: ${JSON.stringify(args)}. Esperado: npm run publish-images -- <caminho/do/material.md>`,
    );
  }
  return args[0];
}

/**
 * Cria o armazenamento de imagens autenticado com a service role key.
 *
 * Exemplo de uso:
 * ```ts
 * const storage = createSupabaseImageStorage(readImagePublisherConfig(process.env));
 * ```
 */
export function createSupabaseImageStorage(config: ImagePublisherConfig): ImageStorage {
  const client = createClient(config.supabaseUrl, config.serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return new SupabaseImageStorage(client);
}
