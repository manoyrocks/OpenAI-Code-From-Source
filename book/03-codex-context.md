# Give Codex a working contract

Use AGENTS.md to make repository expectations explicit.

Reviewed: 2026-09-24

## Instructions belong near the work

Codex discovers guidance through AGENTS.md and supported overrides. Its project search walks from the project root toward the working directory. More specific instructions can refine the rules for a subsystem. Keep the root focused on shared requirements and place service-specific commands close to that service.

## Make success observable

A useful instruction file names the supported runtime, the build command, meaningful tests, secret-handling rules and the expected evidence in a handoff. Avoid a long manifesto that competes with the task. The included starter asks the agent to consult public documentation, implement a bounded slice and report what was actually tested.

## Instructions do not enforce access

AGENTS.md expresses expectations; it is not a sandbox or authorization system. Enforce protected operations through runtime permissions, branch controls and deployment policy. Give Codex enough context to make a reviewable patch, then use executable checks to assess that patch. Test a repository instruction by asking the agent to summarize the applicable rules.

```text
# Project contract
Read current official OpenAI docs before API changes.
Keep API keys on the server.
Run npm test before handing off a change.
Report untested integrations explicitly.
Never execute generated code without review.
```

## Apply this

- Keep commands accurate.
- Use scoped overrides sparingly.
- State the definition of done.
- Separate instructions from permissions.
- Review generated changes as ordinary code.

## Sources

- [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [OpenAI Docs MCP](https://developers.openai.com/learn/docs-mcp)
