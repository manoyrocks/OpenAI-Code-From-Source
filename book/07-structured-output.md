# Make output a contract

Validate structured results before accepting generated files.

Reviewed: 2026-09-24

## A schema is a starting point

Structured outputs can constrain supported model output to a supplied schema. This reduces formatting ambiguity, but a valid shape does not prove the contents are correct. Refusals and incomplete output need explicit branches before parsing or accepting an artifact.

## Repository generation is a compiler pipeline

For a code generator, ask for a manifest of relative paths and text contents. Independently reject absolute paths, parent traversal, duplicate paths, reserved names, oversized files and unexpected binary content. Generate into an isolated directory. Never let a model response choose shell commands that run automatically on the host.

## Acceptance is separate from generation

Our recommended gates are schema validation, file policy, dependency review, compilation, meaningful tests and human review of the diff. Store test evidence with the output. The website exports reviewed deterministic starter files; a project brief is included as input for Codex. It does not pretend that a browser download has already implemented or validated an arbitrary product.

```text
// Illustrative artifact contract
{ files: [{ path: "src/app.js", content: "..." }],
  assumptions: [], requiredChecks: [] }
```

## Apply this

- Validate shape and meaning separately.
- Reject unsafe paths.
- Set artifact size limits.
- Review dependency changes.
- Promote artifacts only after checks pass.

## Sources

- [Structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
