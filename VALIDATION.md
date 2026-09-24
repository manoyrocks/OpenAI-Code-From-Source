# Validation record

Verified locally on 2026-09-24.

- Python publisher generated 14 chapter pages, the GenAI 101 module landing page and six other supporting pages (21 pages total).
- Static checks passed for local page and asset links, unique HTML IDs, chapter source references, generated Markdown, module sources, template/source agreement and portable ZIP integrity.
- Ten Node tests passed: archive path safety, archive directory offsets, template completeness, static starter metadata/assets, Responses output extraction, missing configuration, cross-origin rejection, input validation, request contract and sanitized upstream errors.
- Browser checks on the prior release covered search/filter, denied tool actions, context budget arithmetic, release checklist, repository ZIP creation and desktop/narrow-screen layouts. This update was validated with static checks and generated-page link checks; the new module did not receive a separate visual browser inspection.
- GenAI journey checks verify four quest stages, one completion control per lesson, local progress/XP and badge wiring, four palette choices, and reduced-motion styling for the depth effects. These are static source checks; browser-storage persistence and visual behavior were not manually exercised in this validation pass.
- Offline chat checks verify three prompt/reply examples per journey topic, editable prompt fields, explicit preset-response disclosure, and local reveal controls. No remote request path is used by these demos.

## Limits

No live OpenAI request was made. Responses tests use an injected mock upstream. No API key is configured in this guide. The starter requires an available API model and server-side credentials for live use.

The original Claude application was source-reviewed, not executed or benchmarked. Its research provenance and reported production process are attributed to its authors.

The private Sites deployment succeeded at https://openai-from-docs-fieldguide.randy-cabredo740150.chatgpt.site. The source repository is published at https://github.com/manoyrocks/OpenAI-Code-From-Source; its manual GitHub Pages workflow still requires Pages to be configured for GitHub Actions.

The exported Responses application is a loopback-only development starter. Authentication, quotas, deployment operations and live integration acceptance remain required for public production use. The exporter produces a deterministic starter and brief, not arbitrary finished custom applications.
