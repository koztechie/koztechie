// Netlify Edge Function — dynamic nonce-based Content-Security-Policy
// Injects a unique cryptographic nonce into every HTML response, replacing
// the static CSP header from netlify.toml with a per-request policy.

export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";

  // Pass through non-HTML responses unchanged
  if (!contentType.includes("text/html")) {
    return response;
  }

  // Generate 16-byte hex nonce
  const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

  // Inject nonce into script and style tags only if they lack one
  let body = await response.text();
  body = body.replace(
    /<(script|style)(?![^>]*\snonce=)([^>]*)>/gi,
    `<$1 nonce="${nonce}"$2>`
  );

  // Build headers
  const headers = new Headers(response.headers);
  headers.set("Content-Security-Policy",
    `default-src 'self'; ` +
    `script-src 'self' 'nonce-${nonce}'; ` +
    `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com; ` +
    `font-src 'self' https://fonts.gstatic.com; ` +
    `img-src 'self' data: https://koztechie.pp.ua; ` +
    `connect-src 'self'; ` +
    `base-uri 'self'; ` +
    `form-action 'self'; ` +
    `frame-ancestors 'none'; ` +
    `object-src 'none'; ` +
    `upgrade-insecure-requests;`
  );
  headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  headers.set("Cross-Origin-Embedder-Policy", "credentialless");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Resource-Policy", "same-origin");
  headers.set("Origin-Agent-Cluster", "?1");
  headers.set("Document-Policy", "force-load-at-top");

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};
