function resolveBaseOrigin(request: Request): string {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  const { origin } = new URL(request.url);
  return origin;
}

function sanitizeTargetPath(rawPath: string): string {
  if (!rawPath || rawPath.startsWith("http://") || rawPath.startsWith("https://")) {
    return "/";
  }

  return rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
}

/**
 * Determina com segurança a URL absoluta de destino após o fluxo de autenticação OAuth,
 * garantindo compatibilidade com proxies reversos como o da Vercel e prevenindo open redirects.
 *
 * Exemplo de uso:
 * ```ts
 * const target = resolveCallbackTarget(request, "/topicos");
 * // target === "https://zynlib.vercel.app/topicos"
 * ```
 */
export function resolveCallbackTarget(
  request: Request,
  nextPath: string,
): string {
  const baseOrigin = resolveBaseOrigin(request);
  const safePath = sanitizeTargetPath(nextPath);

  return `${baseOrigin}${safePath}`;
}
