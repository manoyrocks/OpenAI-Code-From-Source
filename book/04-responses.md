# The request boundary

Make a server-side Responses request with a bounded failure path.

Reviewed: 2026-09-24

## The smallest useful vertical slice

A browser sends a bounded task to your server. The server validates it, selects an allowed model, calls the Responses endpoint and translates the result into an application response. Keep the API key in an environment variable or secret manager. The browser should never receive it.

## Read the whole outcome

An HTTP success does not necessarily mean a useful completed answer. Handle incomplete responses, refusals, empty output and upstream errors. The API response contains typed output items; raw HTTP clients should collect output_text content from message items rather than assume the first item is text. SDK helpers can simplify text access.

## Bound time and cost

The exported local starter has input limits, an upstream timeout and a configured output limit. It is intentionally bound to loopback. A public deployment also needs real authentication, tenant-aware quotas and operational monitoring. Never turn a local proxy into an unauthenticated public endpoint. Select an available model through OPENAI_MODEL instead of baking a changing recommendation into the code.

```text
// Request body sent by your server
{
  model: process.env.OPENAI_MODEL,
  input: validatedPrompt,
  max_output_tokens: 1200,
  store: false
}
```

## Apply this

- Keep keys out of browser bundles.
- Validate before spending tokens.
- Set an explicit timeout.
- Check status and output types.
- Measure latency and usage without logging private prompts.

## Sources

- [Text generation / Responses API](https://developers.openai.com/api/docs/guides/text)
- [Production best practices](https://developers.openai.com/api/docs/guides/production-best-practices)
