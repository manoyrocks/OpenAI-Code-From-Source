# Validation record

Verified locally on 2026-09-23.

- Python publisher generated 10 chapter pages and 6 supporting pages.
- Static checks passed for local asset/page links, unique HTML IDs, chapter source references, generated Markdown, template/source agreement and portable ZIP integrity.
- Ten Node tests passed: archive path safety, archive directory offsets, template completeness, static starter metadata/assets, Responses output extraction, missing configuration, cross-origin rejection, input validation, request contract and sanitized upstream errors.
- Browser checks passed: empty search state, three-chapter application-runtime filter, denied tool action stopping before execution, context over-budget arithmetic, release checklist counting, repository ZIP creation and visible success state.
- Desktop and narrow-screen layouts were inspected. The 390px viewport had no document horizontal overflow.

## Limits

No live OpenAI request was made. Responses tests use an injected mock upstream. No API key is configured in this guide. The starter requires an available API model and server-side credentials for live use.

The original Claude application was source-reviewed, not executed or benchmarked. Its research provenance and reported production process are attributed to its authors.

The private Sites deployment succeeded at https://openai-from-docs-fieldguide.randy-cabredo740150.chatgpt.site. The deployed source commit is `d899ef4dd467b93031d4ce4f1b33d804058d13c0`. The local repository and downloadable source include a separate manual GitHub Pages workflow; a GitHub remote has not been created.

The exported Responses application is a loopback-only development starter. Authentication, quotas, deployment operations and live integration acceptance remain required for public production use. The exporter produces a deterministic starter and brief, not arbitrary finished custom applications.
