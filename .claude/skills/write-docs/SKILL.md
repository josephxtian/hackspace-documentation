---
name: write-docs
description: Contribute to the documentation matching the existing style and conventions. Use this skill if the user asks you to write docs, contribute to docs or make edits to docs. Do not use this skill to write developer docs for the platform infrastructure itself (e.g. mkdocs, python, etc.).
model: sonnet
---

# Writing docs
When generating text:
- Documentation should use UK english.
- Jargon is best avoided, however technical terminology is permitted when necessary, e.g. talking about a technical process or a tool in depth.
- mkdocs-material admonitions can be used to help break up large bodies of text and expanding admonitions can be used for supplementary information that isn't essential for every user.


## Tools and machines
When writing about tools and machines the tool's official manual should be the first source for information. Any instructions or advice about using the tool should not contradict our risk assessment for the tool.

## Adding media

### Hyperlinks
External links that are reused across multiple pages should be added to the `extra.links` section in `mkdocs.yml` rather than inlined.

### Videos
Videos can be embedded as MP4 files (via mkdocs-video), WebP/GIF, or YouTube iframes

# Editing docs

When asked to edit existing docs:
- Match the style of the existing content of the page.