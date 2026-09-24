Repository + published site / assessed 2026-09-23


# How the reference was engineered.


A technical publication with a static delivery layer and interactive teaching components. The transferable idea is the publishing pipeline, not a reconstruction of a vendor’s private internals.


Correcting the premise

The reference authors describe source-map analysis as the origin of the book. It was not built solely from Claude’s public documentation. The workflow and technology can be inspected; the authors’ production-time and agent-count claims cannot be independently established from this checkout.


## Scope and evidence


Repository inspected at commit `a6d5e452a8e0dd925c22c407c84611b1994562eb`. The live home page was also read. This is a source review and content assessment, not a penetration test, performance benchmark or full accessibility audit. The reference application was not built locally during this review.


The repository presents an 18-chapter book. Its README attributes the research to TypeScript embedded in shipped source maps and describes the published code blocks as original pseudocode. That is an author claim about provenance; this study did not obtain or analyze the underlying proprietary material. See the [repository](https://github.com/alejandrobalderas/claude-code-from-source) and [published account](https://claude-code-from-source.com/).


## The actual publishing architecture




 | Layer | Observed implementation | What it achieves


 | Authoring | `book/ch*.md`; `prompts/analyze-codebase-to-book.md`; `CLAUDE.md` | Separates narrative content, generation method and project conventions.


 | Content ingestion | `web/src/content.config.ts` loads Markdown with Astro’s glob loader from `../book`. | One chapter collection supports GitHub reading and website publishing.


 | Navigation model | `web/src/book.config.ts` supplies chapter metadata, parts and adjacent chapter helpers. | Editorial order is explicit rather than inferred from rendered headings.


 | Rendering | `web/src/pages/[...slug].astro` uses static paths and rendered collection entries. | Each chapter gets an HTML route with a shared reading layout.


 | Presentation | Astro 5, React 19, Tailwind 4, Source Serif 4 and JetBrains Mono are declared. D3 and Framer Motion support interactive components. | Long-form reading is combined with richer diagrams.


 | Interactive diagrams | A remark plugin replaces Mermaid fences with numbered slots. React components are rendered client-side and moved into matching slots. | GitHub can show Mermaid while the web edition substitutes interactive teaching views.


 | Reading experience | Sidebar, table of contents, previous/next links, theme persistence, focus mode, code copy and scroll progress. | Supports both sequential reading and targeted reference.


 | Delivery | GitHub Actions installs with Bun, builds `web`, uploads `web/dist` and deploys through GitHub Pages. | A push to main can regenerate the publication without an application backend.



Verify these findings in the [pinned web source](https://github.com/alejandrobalderas/claude-code-from-source/tree/a6d5e452a8e0dd925c22c407c84611b1994562eb/web), [deployment workflow](https://github.com/alejandrobalderas/claude-code-from-source/blob/a6d5e452a8e0dd925c22c407c84611b1994562eb/.github/workflows/deploy.yml) and [authoring prompt](https://github.com/alejandrobalderas/claude-code-from-source/blob/a6d5e452a8e0dd925c22c407c84611b1994562eb/prompts/analyze-codebase-to-book.md).


## The content engineering method


The reusable prompt separates exploration, audience definition, outline design, narrative writing, editorial review and revision. It asks authors to organize concepts in dependency order, give each concept one canonical home, explain tradeoffs and end chapters with transferable advice. The useful engineering lesson is that analysis notes and finished prose are separate artifacts, with review between them.


The authoring process is described in prose rather than a runnable, deterministic content-generation pipeline. The published story’s agent counts and elapsed time should therefore be treated as reported history, not reproducibility guarantees. A new project should retain its source ledger, review decisions and test results so its claims can be audited.


## What Claude’s public documentation supports


Claude’s [public overview](https://code.claude.com/docs/en/overview) describes codebase inspection, file editing, command execution and development-tool integration. Its [memory documentation](https://code.claude.com/docs/en/memory) explains project instructions and memory behavior, while its [skills documentation](https://code.claude.com/docs/en/skills) explains reusable instruction packages. These are valid public sources for user-facing behavior. They do not independently establish the reference book’s internal algorithms, hidden modes or private implementation details.


A public-docs edition should therefore teach documented interfaces and label architectural advice as advice. It should not take a source-map claim, attach a general documentation link and present the claim as vendor-confirmed.


## Strengths and maintenance risks


Strong separation of concerns. Markdown, navigation metadata, reading layout and interactive components have distinct roles. Static publishing is appropriate for a technical book. The same content remains useful in a repository, and diagrams make stateful concepts easier to inspect.


Diagram placement is order-dependent. The remark plugin assigns sequential slot numbers, and the component configuration targets slot indices. Inserting a Mermaid block can change those indices. This creates a maintenance risk even if each component still compiles. Prefer stable diagram identifiers and verify every chapter mapping.


Client-only replacements have a fallback cost. Mermaid source is replaced with an empty slot, while the selected React view requires JavaScript. A failed client script can leave missing instructional content. Preserve a text explanation or static diagram alongside interactive enhancement.


Reproducibility and verification can improve. The deployment workflow selects the latest Bun and invokes installation without an explicit frozen-lockfile flag. The inspected package exposes build and preview scripts but no test script. These observations do not prove a broken deployment; they identify opportunities for pinned runtime selection, content checks, route checks and interaction tests.


Some repository guidance is stale. CLAUDE.md still describes the web app as future work even though the source and deployment workflow exist. Treat instruction files as maintained product documentation. No root license file was found in the inspected checkout, so this project does not copy its code, prose or imagery.


## The OpenAI adaptation


OpenAI from Docs keeps the content-to-publication model but changes the evidence basis. Its four-lesson GenAI 101 path serves beginners and AI practitioners with public sources from Microsoft, Google Cloud, NIST, Anthropic, a university and OpenAI. Ten engineering chapters explain documented product boundaries, repository instructions, Responses requests, function calls, state, structured outputs, ChatGPT integrations, evaluation and release engineering. Every lesson and chapter links its sources. The explanations and examples are original.


The frontend is pre-rendered HTML with small JavaScript enhancements. A dependency-free Python publisher creates chapter pages and Markdown from a canonical content catalog. This is an intentional simplification for a compact guide: readers do not need a client framework to see the content. React or Astro remains a reasonable future choice if the editorial system grows; this implementation does not claim to reproduce the reference’s stack.


Three interactive labs teach authorization, context allocation and release evidence. Two starter repositories support the next engineering step: a local Responses web application and a Codex-ready static application. The browser assembles ZIP files locally and includes the user’s brief. It does not send that brief to a model or advertise template export as completed custom development.


## From a brief to a production application


The delivered workflow is: export the starter, open it in Codex, read the project contract and source ledger, implement the brief, run the checks and review the result. A complete autonomous generation service would additionally require server-side model access, authenticated jobs, isolated execution, artifact validation, build workers, tenant quotas and promotion controls. Those components are a separate product, not features secretly provided by a static documentation site.


Production readiness must be assessed per artifact. The documentation site can be statically hosted. The exported local API application still needs public-service authentication, quotas, live credentialed testing and deployment-specific operations. The architecture and starter checks support that work; they cannot certify arbitrary future model-generated code.
