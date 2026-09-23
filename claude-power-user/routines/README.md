# Routines

**How to create one:** in claude.ai/code type `/schedule`, or ask Claude "create a routine that…". Cowork scheduled tasks live in Claude Desktop → Cowork → Scheduled. Cloud routines need the connectors named below attached and the `claude-os` repo selected as the source.

Run each one **manually for about 5 days and correct it** before you put it on a schedule.

| Routine | Schedule (local) | Where | Connectors |
|---|---|---|---|
| Morning brief | Weekdays 06:30 | Cloud | Gmail, Calendar, Todoist, GitHub (repo) |
| Inbox triage | Weekdays 07:00, 12:30, 16:30 | Cloud | Gmail, Calendar |
| Meeting wrap | Weekdays 18:00 | Cloud or Cowork | Granola, Todoist, Gmail |
| Weekly review | Fri 16:00 | Cloud | All of the above |
| Week ahead | Sun 19:00 | Cloud | Calendar, Gmail |
| Life admin sweep | 1st of month 09:00 | Cowork + Chrome | Gmail, Drive |

## Prompts (standalone, because each firing starts a fresh session)

**Morning brief**
> In the claude-os repo, run the `morning-brief` skill for today. Commit the daily note. Reply with the summary of 5 lines or fewer.

**Inbox triage**
> In the claude-os repo, run the `inbox-triage` skill. Commit the daily-note log line. Reply with only the "needs me" list. If it's empty, reply "Inbox clear".

**Meeting wrap**
> In the claude-os repo, run the `meeting-to-vault` skill for today's meetings, then write a 3-line `## Wrap` in today's daily note: done, open, tomorrow's first move. Commit.

**Weekly review**
> In the claude-os repo, run the `weekly-review` skill. Commit. Reply with the dropped-balls list and the proposed top 3 priorities for next week.

**Week ahead**
> Review my calendar for the next 7 days against `00-context/current-priorities.md`. Flag conflicts, meetings with no clear purpose, missing prep and days with no deep-work block. Propose (don't make) changes. Write the result to `daily/<next Monday>.md` under `## Week ahead`. Commit.

**Life admin sweep**
> Search Gmail for the last 30 days of receipts, renewals, bills, subscriptions and anything that needs filing or paying. Produce a table (item, amount, due date, action) and flag price rises and unused subscriptions. Write it to `02-areas/admin/YYYY-MM.md`. Don't pay or cancel anything.
