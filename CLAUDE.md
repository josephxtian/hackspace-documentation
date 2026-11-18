# CLAUDE.md

## What this is

A new Documentation website for Manchester Hackspace, to be published at https://docs.hacman.org.uk. Built with MkDocs + Material theme. All content is Markdown files under `docs/`.

## Background
Manchester Hackspace is a not-for-profit community makerspace centring around a physical premises in central Manchester, UK. It is a membership organisation that provides access to workshop facilities including woodwork, metalwork, 3d printing, electronics, laser cutting, sewing and CNC, to name a few.

There are several Hackspaces in the UK, but these are not affiliated.

These docs serve as the one-stop-shop for information on Manchester Hackspace. It has two main threads:
1. Governance, Policies and processes
2. Using the Workshops, tools and facilities

## Audience
We have over 400 members of all ages (18+), backgrounds and technical ability.
The docs are mainly maintained by the management team, but some more engaged volunteers help to keep it up to date.

## Status of Project
This repo is a project to overhaul our out of date docs that are currently live at https://docs.hacman.org.uk.
The docs in this repository are not yet published, and are still in development.
The old documentation site is being replaced for several reasons:
- The information is out of date, and often incorrect.
- The size of the repository has ballooned to nearly 1GB.
- It is difficult to navigate, and information is not laid out logically for users to find.
- It is difficult for the majority of members to update as it does not have any CMS interface.

## Development commands

If a virtual environment is present in the repo, always activate it before installing dependencies or executing python code.

```bash
# Install dependencies
pip install -r requirements.txt

# Serve locally with live reload (http://127.0.0.1:8000)
python build.py serve
# or
tox serve

# Build for production
python build.py build

# Clean build output
python build.py clean
```

There are no tests. CI simply builds the site and checks it succeeds.

## Architecture

- `mkdocs.yml` — site config: theme, plugins, navigation tabs, and the `links` extra (global external link macros usable in any page via `{{ links.foo }}`)
- `docs/navigation_structure.yml` — controls sidebar nav order via the `mkdocs-awesome-nav` plugin; new pages need entries here to appear in navigation
- `docs/` — all content as Markdown; subdirectory structure matches URL structure
- `.github/workflows/ci.yml` — builds on PRs, uploads artifact preview
- `.github/workflows/deploy.yml` — builds and deploys to GitHub Pages on merge to `master`

## Content conventions

- Email addresses in content are protected from scrapers by the mkdocs-emailprotect plugin — write them normally in Markdown
- The git-revision-date plugin auto-adds "last updated" timestamps; no manual date maintenance needed
- Folders and markdown files should be named in snake_case.

## Decap CMS
- This docs system is managed and updated by both technical and non-technical users, to make this simple a CMS provides an easy editing interface for users.
- If you need more information on using Decap CMS, this can be found at https://decapcms.org/docs
- OAuth is handled via a cloudflare worker; see `cloudflare-worker/CLAUDE.md` for the full auth flow (it's non-obvious and fragile — read it before touching auth)
- `docs/admin/config.yml` is the source of truth for CMS collections; `site/admin/config.yml` is generated build output (gitignored) — never edit it directly
- Each top-level `docs/` folder that should be CMS-editable needs its own `collections` entry in `docs/admin/config.yml` (folder path, fields); adding a new content directory in nav also means adding a matching collection here, or it won't appear in the CMS
- `publish_mode: editorial_workflow` — CMS saves open a PR against `master` rather than pushing directly, since `master` has PR-review protection; the `backend.repo` field currently points at a dev fork and must be switched to the production repo before go-live
- `nested.depth` is set per-collection and varies (2 for `getting_involved`, 4 for `workshop_info`/`governance`, absent elsewhere) — copy the depth from a collection with a similarly deep folder structure, not just any example
- `rules_policies` has `create: false` — CMS users can edit existing policy pages there but not create new ones, unlike every other collection
- Every collection's `title` field must be present in a page's frontmatter or the CMS list view breaks (see commit 6d70a21); when adding pages outside the CMS, still set `title` in frontmatter

## Docs Layout
The docs are laid out to be easy to navigate, helping new members find what they need quickly, while also providing more detail for users who are looking for it.

It is broken into distint areas:

### Getting Started
docs/getting_started
Equip new members with the essential knowledge they need for their first few visits to Hackspace.

## General Info
docs/general_info
General information on how we operate, where things are and our processes.

### Rules & Policies
docs/rules_policies
The more formal area covering our rules, and policies, including:
- our 10 essential rules
- disciplinary processes
- Essential health & safety information
- Membership terms and conditions
- Storage rules

### Workshop Info
docs/workshop_info
Information on each of our different workshops and the equipment you might find in them.

### Quick Links
A page with link to all the pages and websites members may frequently need to visit.
