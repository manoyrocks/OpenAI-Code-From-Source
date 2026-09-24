# Validation record

Verified locally on 2026-09-24.

- Python publisher generated 14 chapter pages, the GenAI 101 module landing page and six other supporting pages (21 pages total).
- Static checks passed for local page and asset links, unique HTML IDs, chapter source references, generated Markdown, module sources, template/source agreement and portable ZIP integrity.
- Ten Node tests passed: archive path safety, archive directory offsets, template completeness, static starter metadata/assets, Responses output extraction, missing configuration, cross-origin rejection, input validation, request contract and sanitized upstream errors.
- Browser checks on the prior release covered search/filter, denied tool actions, context budget arithmetic, release checklist, repository ZIP creation and desktop/narrow-screen layouts. This update was validated with static checks and generated-page link checks; the new module did not receive a separate visual browser inspection.

## Limits

No live OpenAI request was made. Responses tests use an injected mock upstream. No API key is configured in this guide. The starter requires an available API model and server-side credentials for live use.

The original Claude application was source-reviewed, not executed or benchmarked. Its research provenance and reported production process are attributed to its authors.

The private Sites deployment succeeded at https://openai-from-docs-fieldguide.randy-cabredo740150.chatgpt.site. The local repository and downloadable source include a separate manual GitHub Pages workflow; a GitHub remote has not been created.

The exported Responses application is a loopback-only development starter. Authentication, quotas, deployment operations and live integration acceptance remain required for public production use. The exporter produces a deterministic starter and brief, not arbitrary finished custom applications.
