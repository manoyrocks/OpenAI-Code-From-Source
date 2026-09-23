# Bring tools into ChatGPT

Design a host integration around clear tool contracts.

Reviewed: 2026-09-23

## A host integration is its own surface

The public ChatGPT plugin documentation describes skills, MCP tools and optional UI. During this review, the former Apps SDK entry URL redirected to the plugins documentation. Use the currently documented interface and record the migration boundary instead of preserving an old SDK example uncritically.

## Keep tools narrow

Our design recommendation is one tool for one meaningful user operation. Name the action, define its input contract and return a result the UI can render without interpreting prose. Use an authenticated application service behind the tool. A tool description helps the model select an operation; it does not replace authorization.

## Separate development from distribution

A functioning local MCP service is only one part of a host integration. Authentication, host testing, metadata, packaging and publication requirements still apply. This field guide provides a design brief for that work rather than claiming a ready-to-publish ChatGPT plugin. Recheck official host documentation before implementing a new integration.

```text
ChatGPT
  -> named MCP tool
  -> authenticated application service
  -> structured business result
  -> optional host UI
```

## Apply this

- Confirm the current host contract.
- Use precise tool descriptions.
- Authorize each business operation.
- Test inside the host.
- Treat publication as a separate release gate.

## Sources

- [ChatGPT plugins documentation](https://developers.openai.com/plugins)
