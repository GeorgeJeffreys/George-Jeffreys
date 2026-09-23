---
name: morning-brief
description: Produce my daily morning brief from calendar, email, tasks and notes, and write it to today's daily note. Use when I ask for my brief or morning update, or "what's on today".
---

# Morning brief

Gather in parallel (use subagents if available):
- **Calendar:** today and tomorrow morning. For each meeting: who's attending (check `people.md`), purpose, last related meeting note or email thread, and anything I promised to bring.
- **Email:** unread or flagged from the last 24h. Rank by VIP status, deadlines and direct asks. Ignore newsletters and notifications.
- **Tasks:** Todoist items that are overdue or due today, plus open `- [ ]` actions assigned to me in `meetings/` from the last 14 days.
- **Priorities:** `00-context/current-priorities.md`.

Write `daily/YYYY-MM-DD.md`:
```
---
date: YYYY-MM-DD
type: daily
---
## Brief
**3 things that matter today:** (tied to current priorities)
**Decisions I need to make:** (with your recommendation for each)
**Meetings:** time · title · one-line prep · link to context
**Needs a reply:** sender · ask · drafted? (link to Gmail draft)
**Slipping:** overdue items and promises
## Log
## Wrap
```
Finish with a summary of **5 lines or fewer**, suitable for a push notification.
