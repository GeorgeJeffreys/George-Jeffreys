# Claude OS: router

This repo is my second brain and my Claude harness. It is also an Obsidian vault.

## Always
- Read `00-context/index.md` first, then load **only** the context files that the task needs.
- Use British English. Be direct. Lead with the answer or the recommendation.
- Draft, never send. Propose calendar changes, never make them. Money access is read-only.
- When I correct you or say "remember this", update the relevant file in `00-context/` or the relevant skill, and tell me in one line what you changed.

## Where things live
| Path | Contents | Rules |
|---|---|---|
| `00-context/` | Who I am, how I think, people, voice, priorities | Small files. Keep `index.md` current |
| `01-projects/<name>/` | Active projects, each with `README.md` (goal, status, next step) | One folder per project with a deadline |
| `02-areas/` | Ongoing responsibilities (health, finance, home, each org I work with) | |
| `03-resources/` | Reference material, reading notes | |
| `04-archive/` | Finished or dormant | Move here, never delete |
| `daily/YYYY-MM-DD.md` | Daily note: brief, log, wrap | Created by morning-brief |
| `meetings/YYYY-MM-DD-slug.md` | Meeting notes | Created by meeting-to-vault |
| `inbox/` | Unprocessed captures | Weekly review files these |

## Conventions
- Obsidian-flavoured markdown. Link people as `[[Firstname Lastname]]` and projects as `[[project-name]]`.
- Frontmatter on every note: `date`, `type`, `tags`, and `project` if relevant.
- Actions look like `- [ ] Owner: action (due YYYY-MM-DD)`. Mine also go to Todoist.
- Commit after every meaningful change, with a message like `claude: <what>`.
