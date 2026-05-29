/**
 * Cloudflare Worker — GitHub OAuth proxy for Decap CMS
 *
 * Set these as Cloudflare Secrets (not plaintext env vars):
 *   GITHUB_CLIENT_ID     — from the GitHub OAuth App
 *   GITHUB_CLIENT_SECRET — from the GitHub OAuth App
 *
 * Set this as a plain Environment Variable:
 *   ADMIN_URL — full URL of the Decap CMS admin page
 *               e.g. https://josephxtian.github.io/hackspace-documentation/admin/
 *
 * Routes:
 *   GET /auth      → redirect to GitHub authorize
 *   GET /callback  → exchange code for token, redirect popup back to admin page
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
 * GitHub redirects here after the user authorizes. We exchange the code for a
 * token, then redirect the popup back to the admin page with the token in the
 * URL hash. The admin page relay script forwards it to Decap CMS via
 * BroadcastChannel, bypassing the window.opener COOP restriction.
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
    const adminUrl = new URL(env.ADMIN_URL);
    adminUrl.hash = `auth_error=${encodeURIComponent(err.message)}&auth_provider=github`;
    return Response.redirect(adminUrl.toString(), 302);
  }

  const adminUrl = new URL(env.ADMIN_URL);
  adminUrl.hash = `auth_token=${token}&auth_provider=github`;
  return Response.redirect(adminUrl.toString(), 302);
}
