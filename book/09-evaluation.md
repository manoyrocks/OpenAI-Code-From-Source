# Quality you can measure

Design evaluations around the behavior your users need.

Reviewed: 2026-09-23

## A demo is not a baseline

OpenAI’s evaluation guidance emphasizes task-specific evaluations and continuous measurement. A coding product needs more than a fluent response. Its artifacts must build, preserve requirements and survive realistic failure cases. Start with examples that represent actual user tasks, then add difficult and adversarial inputs.

## Two kinds of checks

Use deterministic checks for file policies, schema conformance and compilation. Use a reviewed rubric for requirement coverage, useful explanations and maintainability. Keep a held-out set so the prompt cannot simply memorize the examples used during development. A model-based judge should be calibrated against human review.

## Release on evidence

Our suggested release report names the model configuration, prompt revision, fixture version, pass rate, latency and failure categories. Define thresholds before looking at results. Run the same fixtures when changing a model or source contract. A failing test should block promotion or force an explicit exception with an owner.

```text
Acceptance fixture
input: a concrete user task
expected: observable product behavior
checks: build + policy + scenario tests
rubric: correctness, coverage, clarity
```

## Apply this

- Use representative tasks.
- Include negative cases.
- Version fixtures and prompts.
- Calibrate subjective grading.
- Compare changes against a baseline.

## Sources

- [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
