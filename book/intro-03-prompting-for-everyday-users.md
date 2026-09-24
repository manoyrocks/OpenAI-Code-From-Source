# Prompting for everyday users

Plain-language instructions beat magic phrases. A small checklist makes everyday requests clearer and easier to review.

Reviewed: 2026-09-24

## A simple prompt recipe

Try Task + Context + Audience + Constraints + Output. Describe the job, provide only the background that matters, name who will use the result, add boundaries, and request a shape such as a table or short email. Not every prompt needs all five parts. Start with the smallest clear request and add detail where the answer needs it.

## From vague to workable

Vague: “Write about our launch.” Workable: “Draft a 120-word launch note for existing customers. The release adds saved filters to the dashboard. Use a warm, direct tone, avoid promises about future features, and finish with a link placeholder.” The improved version states the task, facts, audience, length, tone and boundary.

## Refine with evidence

If the output is off, say what to change: shorten the opening, keep the original terminology, or separate facts from recommendations. Paste a sample when style matters. For facts, point to source material and ask for claims to be tied to it. Role-play labels can guide tone, but they do not grant expertise or guarantee correctness.

## Keep the request safe and reviewable

Remove personal or confidential details unless the service and your policies allow them. Ask the model to leave unknown fields blank instead of inventing them. Before sharing the result, check names, dates, numbers, quotations and any claim that could affect someone’s rights, money or safety.

```text
Task: Draft a [kind of output].
Context: [relevant facts or pasted source].
Audience: [who will read/use it].
Constraints: [length, tone, must-include or must-avoid].
Output: [bullets, table, email, steps].
If a required fact is absent, flag it instead of making it up.
```

## Apply this

- Turn the request into a clear action verb.
- Add audience and relevant facts; omit unrelated history.
- Set only the constraints that matter for success.
- Request a reviewable format and mark missing facts explicitly.
- Revise by naming a concrete change, then check the result.

## Sources

- [Prompt engineering best practices for ChatGPT](https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt)
- [Prompt Engineering Guide](https://www.msudenver.edu/ai/prompt-engineering-guide/)
- [Generative AI for Beginners](https://github.com/microsoft/Generative-AI-for-beginners)
