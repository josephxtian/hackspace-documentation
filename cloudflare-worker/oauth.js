/**
 * Cloudflare Worker — GitHub OAuth proxy for Decap CMS
 *
 * Set these as Cloudflare Secrets (not plaintext env vars):
 *   GITHUB_CLIENT_ID     — from the GitHub OAuth App
 *   GITHUB_CLIENT_SECRET — from the GitHub OAuth App
 *
 * Routes:
 *   GET /auth      → redirect to GitHub authorize
 *   GET /callback  → exchange code for token, postMessage result back to CMS
 */

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/auth") return handleAuth(url, env);
    if (url.pathname === "/callback") return handleCallback(url, env);
    return new Response("Not found", { status: 404 });
  },
};

/**
 * GET /auth
 * Decap CMS opens this in a popup; we redirect to GitHub's authorization page.
 */
function handleAuth(url, env) {
  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    scope: "repo,user",
    ...(url.searchParams.has("state") && { state: url.searchParams.get("state") }),
  });
  return Response.redirect(`${GITHUB_AUTHORIZE_URL}?${params.toString()}`, 302);
}

/**
 * GET /callback
 * GitHub redirects here after the user authorizes. We exchange the temporary
 * code for an access token, then postMessage the result back to the CMS window.
 */
async function handleCallback(url, env) {
  const code = url.searchParams.get("code");
  if (!code) return new Response("Missing code parameter", { status: 400 });

  let token;
  try {
    const res = await fetch(GITHUB_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error_description || data.error);
    token = data.access_token;
  } catch (err) {
    return postMessagePage(
      `authorization:github:error:${JSON.stringify({ message: err.message })}`
    );
  }

  // This exact string format is required by Decap CMS
  return postMessagePage(
    `authorization:github:success:${JSON.stringify({ token, provider: "github" })}`
  );
}

/**
 * Returns an HTML page that calls window.opener.postMessage and closes itself.
 * Decap CMS listens for this message in the main window to complete the login.
 */
function postMessagePage(message) {
  const escaped = JSON.stringify(message);
  const html =
    `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>` +
    `<script>(function(){` +
    `var m=${escaped};` +
    `if(window.opener)window.opener.postMessage(m,"*");` +
    `window.close();` +
    `})()</s` + `cript></body></html>`;
  return new Response(html, {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  });
}
