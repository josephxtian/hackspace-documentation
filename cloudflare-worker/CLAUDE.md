# CLAUDE.md — cloudflare-worker

## What this is

GitHub OAuth proxy for Decap CMS. Decap needs a backend that exchanges a GitHub
OAuth code for an access token without exposing the client secret in the
browser; this worker is that backend. Deployed as `hacman-docs-oauth`
(`wrangler.toml`), URL set in `docs/admin/config.yml` (`backend.base_url`).

## Two halves of the flow — don't edit one without the other

1. **`oauth.js`** (this directory) — server side. `GET /auth` redirects to
   GitHub's authorize page; `GET /callback` exchanges the code for a token and
   redirects back to the admin page with the token in the URL hash.
2. **`docs/admin/index.html`** — client side relay script. This is the half
   that's actually fragile; read it before assuming a bug is in the worker.

## Why the client relay is complicated

Decap's normal flow assumes the popup can call `window.opener.postMessage`
back to the main window. GitHub's COOP headers null out `window.opener` once
the popup navigates to github.com, breaking that assumption. The relay works
around it with `BroadcastChannel` instead, but Decap CMS v3 also expects a
specific two-step handshake on top of that:

1. Popup sends `"authorizing:github"` → Decap's `handshakeCallback` sets up
   `authorizeCallback` and calls `authWindow.postMessage("authorizing:github", origin)` back to the popup.
2. Popup responds with `"authorization:github:success:{token}"` (string, not
   an object) → `authorizeCallback` processes the token and closes the popup.

`docs/admin/index.html` simulates both sides of this from the main window: it
intercepts `window.open` to capture the popup reference, dispatches step 1
itself, and overrides the popup's `postMessage` to intercept Decap's
handshake reply so it can fire the step-2 success event synthetically. The
popup must **stay open** (never call `window.close()` in the relay) until
Decap's own `authorizeCallback` closes it — closing early or on a timer makes
Decap silently discard the token. This history is in commits `04da134`,
`372da64`, `b314f94`, `a48767e` — each fixed one part of getting this
handshake right; if auth breaks again, re-read those diffs before re-deriving
the fix from scratch.

## Config / secrets

- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — Cloudflare **secrets** (not
  plain env vars), set via `wrangler secret put`, not in `wrangler.toml`
- `ADMIN_URL` — plain env var, full URL of the Decap admin page (e.g.
  `https://josephxtian.github.io/hackspace-documentation/admin/`)
- If the worker URL changes, update both `backend.base_url` in
  `docs/admin/config.yml` and `WORKER_ORIGIN` in `docs/admin/index.html` —
  they're not read from a shared source.
