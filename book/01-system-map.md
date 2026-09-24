# One ecosystem, three surfaces

Locate ChatGPT, Codex and the API in your architecture.

Reviewed: 2026-09-24

## Start with the user’s task

A conversational interface, a coding workspace and an application API solve different integration problems. Begin by deciding where the person will work and who operates the software. A standalone web app owns its frontend, backend, identity and persistence. A ChatGPT integration lives within a host experience. Codex works with the project and its engineering workflow.

## Documented boundary

OpenAI’s runtime guide distinguishes managed agent execution, application-owned orchestration and direct model requests. ChatGPT plugin documentation describes packaging tools and skills, with optional UI. Codex’s instruction guide explains how repository guidance is discovered. These public contracts do not disclose the complete internal architecture of ChatGPT or Codex.

## Engineering recommendation

Keep product logic in an application service that is independent of the conversational surface. Put authorization and validation beside that service. A browser route and an MCP tool can then call the same business operation without maintaining conflicting rules. Start with a single request path; add orchestration only when a measured workflow needs it.

```text
Browser or ChatGPT UI
  -> application identity and policy
  -> business operation
  -> OpenAI API or an approved tool
  -> validated result and audit event
```

## Apply this

- Choose the user-facing surface before the runtime.
- Write down which system owns identity and state.
- Keep business authorization outside prompts.
- Link claims to a public contract.
- Do not present an illustrative diagram as proprietary internals.

## Sources

- [Agent runtime options](https://developers.openai.com/api/docs/guides/agents)
- [ChatGPT plugins documentation](https://developers.openai.com/plugins)
- [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
