# From a tool call to an action

Walk through the model–tool feedback loop.

Reviewed: 2026-09-24

## A request to act

With function calling, a model can request a named operation with arguments. Your application executes the operation and returns a result associated with the call. The model’s choice is not permission to act. Validate the schema, user identity, resource scope and operation policy before invoking the handler.

## Keep the loop explicit

A useful state machine is request, inspect, authorize, execute, return and continue. Stop on a completed answer, a refusal, a denied action, a timeout or a step limit. Preserve the call identifier so a result cannot accidentally satisfy a different request. The interactive lab is a teaching simulation of these states; it makes no API calls.

## Retries need business semantics

Read-only lookups and money-moving writes have different failure consequences. Our recommendation is to assign an idempotency key to consequential actions and record their result before retrying. Parallelize independent reads only when the underlying system permits it. Serializing a write is simpler than repairing a duplicate external action.

```text
// Illustrative policy, not a complete executor
if (!allowedTools.has(call.name)) deny();
const args = validateArguments(call);
await authorize(user, call.name, args);
const result = await executeOnce(call.id, args);
return toolResult(call.id, result);
```

## Apply this

- Allowlist operations.
- Authorize outside the model.
- Correlate results to call IDs.
- Limit steps and elapsed time.
- Make external writes idempotent.

## Sources

- [Function calling](https://developers.openai.com/api/docs/guides/function-calling)
