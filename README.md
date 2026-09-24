# OpenAI from Docs

An independent public-documentation-based field guide to generative AI, ChatGPT, Codex and the OpenAI API. Includes a four-lesson GenAI 101 introduction, ten engineering chapters, three interactive labs, two downloadable repository starters and an engineering study of Claude Code from Source.

## Run and verify

Python 3.12+ and Node.js 22+; no third-party build dependencies.

```sh
python scripts/build.py
python scripts/package.py
python scripts/check.py
node --test scripts/export.test.mjs
node --test templates/responses/server.test.mjs templates/codex/site.test.mjs
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173. Chapter content is pre-rendered; search, theme, labs and export are progressive JavaScript features. Serve over HTTP rather than opening index.html as a local file because the exporter fetches its template catalog.

## Repository map

```text
content.json                 Canonical original content + official sources
modules/introduction.json    Four beginner-to-practitioner lessons + public sources
book/                        Generated Markdown chapters
dist/                        Static website, client scripts and downloads
research/study.html          Source-based reference engineering study
research/engineering-report.md  Portable written evaluation and design
prompts/                     Reusable docs-to-product workflows
templates/responses/         Local Responses web app and mock-upstream tests
templates/codex/             Runnable Codex static app starter
scripts/                     Build, packaging and content checks
.github/workflows/           Checks and manual GitHub Pages publication
```

Edit content.json or modules/introduction.json then rebuild. Edit shared presentation in scripts/build.py and dist/style.css. dist is deliberately tracked for buildless static hosting. scripts/package.py generates shared template instructions and the downloadable source bundle. Run packaging after edits so exports match their source.

## Hosting

Publish dist/ on a static host. Relative asset and page URLs support a GitHub project subpath. The manual GitHub Pages workflow requires a GitHub repository with Pages configured for GitHub Actions. The source ZIP excludes the original private Sites identity; never reuse someone else’s hosting configuration.

## What works and what remains application-specific

The guide is a deployable static web application. The exporter creates deterministic ZIPs entirely in the browser and includes the user's project brief. No live model is called by the guide. A brief does not change template implementation; give BUILD-PROMPT.md to Codex to implement it.

The Responses starter has a real server-side Responses integration, tested with a mock upstream. It needs credentials and a selected model for a live test. It is loopback-only; add authentication, quotas, HTTPS, deployment-specific operations and live tests before public use. The Codex starter is a working minimal static app to extend. Neither starter certifies future AI-generated code as production-ready.

## Provenance

Sources reviewed 2026-09-24. The introduction combines public resources from Microsoft, Google Cloud, NIST, Anthropic, Metropolitan State University of Denver and OpenAI. Read the source ledger and reference study before reusing claims. The reference repository was inspected at a6d5e452a8e0dd925c22c407c84611b1994562eb; its authors say their content came from source maps, not solely public documentation. This project copies none of that project's prose, code or imagery. Vendor marks identify technologies; there is no affiliation or endorsement.
