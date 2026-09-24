# State without accidental memory

Separate model context from durable product records.

Reviewed: 2026-09-24

## Three different lifetimes

Request context, conversational history and business records have different retention needs. Responses supports explicit history and mechanisms for continuing conversations. None of those mechanisms should become your only record of an order, approval or deployment.

## Choose ownership deliberately

An application can assemble history itself or use documented conversation mechanisms. Whichever path you choose, attach conversation identifiers to an authenticated owner. Fetching a response by ID must never bypass the application’s resource authorization. Re-evaluate retention and deletion requirements before adding durable conversation storage.

## Restartable workflows

Our recommended job record stores a task ID, owner, stage, artifact references and error category. Store the minimum context needed to resume. Do not serialize credentials, hidden reasoning or complete customer documents into diagnostic events. Test a restart halfway through a tool operation and verify that the operation does not happen twice.

```text
// Application-owned job record
{ taskId, ownerId, stage, artifactIds,
  createdAt, updatedAt, errorCategory }
```

## Apply this

- Name the lifetime of every record.
- Authorize conversation access.
- Keep business state independently.
- Minimize logged content.
- Test restart and deletion paths.

## Sources

- [Conversation state](https://developers.openai.com/api/docs/guides/conversation-state)
