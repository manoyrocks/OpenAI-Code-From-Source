# Responses local web app

Requires Node.js 22 or newer. No package installation is necessary.

1. Copy `.env.example` to `.env`.
2. Set `OPENAI_API_KEY` to your server-side key and `OPENAI_MODEL` to a model available to your API project. Never commit `.env`.
3. Run `npm test` and then `npm start`.
4. Open the loopback URL printed in the terminal.

This starter makes real billed API requests only when you submit the form after configuring credentials. Tests use a fake upstream and do not spend tokens.

It provides input validation, an upstream timeout, safe text rendering, bounded output and generic error handling. It binds to 127.0.0.1 and enforces same-origin JSON requests. It is a local development starter, not a publicly deployable service.

Before public deployment: add authenticated users, per-tenant authorization and distributed quotas, HTTPS and host policy, retention policy, a secret manager, monitored error handling, load testing and rollback. Run a live smoke test with the selected model and verify its output-token requirements. No live model test was performed when this template was authored.

Use BUILD-PROMPT.md with Codex to implement PROJECT-BRIEF.md. Do not execute unreviewed generated code. See SOURCES.md for documented contracts.
