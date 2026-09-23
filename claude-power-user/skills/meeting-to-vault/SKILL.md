---
name: meeting-to-vault
description: Turn today's Granola meetings into structured Obsidian meeting notes, push my actions to Todoist, and update people notes. Use after meetings, or when I say "file my meetings" or "meeting wrap".
---

# Meeting to vault

For each Granola meeting today that doesn't yet have a note in `meetings/`:
1. Get the notes and transcript from the Granola connector.
2. Write `meetings/YYYY-MM-DD-<slug>.md`:
```
---
date: YYYY-MM-DD
type: meeting
attendees: [[Name]], [[Name]]
project: [[project]]
granola_id: <id>
---
## Summary (3 bullets)
## Decisions
## Actions
- [ ] Owner: action (due YYYY-MM-DD)
## Open questions
## Notable quotes / signals
```
3. For each action I own, create a Todoist task with a link back to the note.
4. For actions other people own, add them to the "Waiting on" section of `current-priorities.md`.
5. If I learned anything new about an attendee (role change, preference, personal detail they shared), propose a one-line addition to `people.md`.
6. Link the note from today's daily note under `## Log`.
7. If a follow-up email is obviously needed, draft it with write-like-me.
