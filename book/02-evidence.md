# Build from evidence

Turn documentation into a traceable engineering input.

Reviewed: 2026-09-24

## A source is an input, not an authority to execute

The Docs MCP server exposes public OpenAI documentation for retrieval. It is useful during research and implementation; it does not provision your app or grant access to customer systems. Retrieved material should inform the implementation, while project instructions and explicit requirements govern the work.

## Keep a claim ledger

For each important behavior, record the source URL, review date, topic and the application component that depends on it. Mark explanations as documented behavior, engineering recommendation or illustrative example. A dated ledger lets a maintainer identify which code needs review when a contract changes.

## A reproducible documentation pipeline

Our recommended pipeline selects sources, extracts a small claim set, writes original explanations, implements the contract and checks the outcome. Archive your own notes and hashes rather than mirroring entire vendor manuals. Reject unsupported model names, inferred pricing and guessed API fields during review. A broken or redirected source should create a maintenance issue, not silently rewrite production code.

```text
[mcp_servers.openaiDeveloperDocs]
url = "https://developers.openai.com/mcp"
```

## Apply this

- Record retrieval dates.
- Keep sources beside dependent content.
- Distinguish evidence from interpretation.
- Review redirects before changing guidance.
- Require a code check after updating an API claim.

## Sources

- [OpenAI Docs MCP](https://developers.openai.com/learn/docs-mcp)
