# Pipeline tracker — Wharton Outdoors Club dive trips

Owner: George (decides, books, pays). Agent: scheduled routine "Dive trips pipeline" (reads this file, sends only rows marked `send: approved`, logs replies, chases after 4 business days, updates pricing inputs, commits to branch `claude/wharton-outdoors-scuba-dec-5ley3f`). Nothing is ever booked or paid by the agent.

Milestone: a concrete, bookable option per trip (operator + lodging + flight hold, with written terms) that George can trigger.

Status values: draft | approved | sent | replied | chased | quoted | bookable | dropped. Dates are ISO. Update the `last_action` and `next_action` columns on every touch.

## Cozumel, Tue 8 – Mon 14 Dec 2026, 20–40 people (tentative, locked 2026-09-22)

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Dive Paradise | operator + Hotel Cozumel & Resort bundle | reservations@diveparadise.com | approved | draft | 2026-09-22 final email written (cozumel/outreach/final/dive-paradise.md) | send when email connector is live | Big boats; ask instructors for 10–20 students |
| Blue Note Scuba | operator | info@bluenotescuba.com | approved | draft | 2026-09-22 final email written | send | One 42-ft boat; capacity question |
| Sand Dollar Sports | operator (beginner training) | unknown; web form sanddollarsports.com/contact-us/ | approved | draft | 2026-09-22 final email written | find address or submit via form (George) | Shore site works in a norther |
| Aldora Divers | operator (certified/advanced) | frontdesk@aldora.com | approved | draft | 2026-09-22 final email written | send | 6 per boat cap |
| Casa Mexicana | hotel (downtown) | reservaciones@casamexicanacozumel.com | approved | draft | 2026-09-22 final email written | send | 88 rooms; sister hotels for overflow |
| Hotel Cozumel & Resort | hotel (resort, pool) | unknown; cozumelhotel.com.mx contact page; quoted via Dive Paradise | n/a | draft | 2026-09-22 | covered by Dive Paradise email | 180 rooms; only property that holds 40 |
| Salty Endeavors, ScubaTony | operators (reserve) | see cozumel/operators.csv | not yet | draft | 2026-09-21 drafts in cozumel/outreach/ | hold unless the first four cannot cover 30–40 | |
| Blue Magic Scuba | operator | see cozumel/operators.csv | no | dropped | 2026-09-21 | none | Business advertised for sale |
| Scuba Club Cozumel | dive resort | see cozumel/operators.csv | no | dropped | 2026-09-22 | none | Reported permanently closed (TripAdvisor snippet); verify only if needed |
| American Airlines Group Travel | flights PHL–CZM 8/14 Dec | groups.aa.com | not yet | draft | | George to request a 20-seat hold once headcount signal is in (target 2026-10-02) | |

## Thanksgiving, Wed 25 – Sun 29 Nov 2026, 8–12 certified divers (tentative)

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Paradise Scuba & Snorkeling Center | operator | unknown (thanksgiving/outreach/paradise-scuba.md) | awaiting George | draft | 2026-09-21 | George to approve send; agent to find address | USD 125 two-tank Wall |
| Taino Divers | Desecheo operator | unknown | awaiting George | draft | 2026-09-21 | as above | USD 120 + 20 fee |
| Parador Villa Parguera / Parguera Plaza | lodging | unknown | awaiting George | draft | 2026-09-21 | as above | 5–6 rooms |
| AA / Frontier group desk | flights PHL–SJU | | not yet | draft | | hold by 2026-10-09 | Thanksgiving fares are the swing |
| Neal Watson's Tiger Beach | opt-in variant | see thanksgiving/outreach/ | awaiting George | draft | 2026-09-21 | only if George keeps the variant | BAITED; sales final |

## Egypt, Sat 2 – Sat 9 Jan 2027, 15–25 people (tentative)

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Red Sea Diving Safari, Marsa Shagra | operator + lodging (primary) | unknown (january/outreach/red-sea-diving-safari.md) | awaiting George | draft | 2026-09-21 | George to approve send; agent to find address | Ask price list, feast-period rule, free places, capacity |
| Emperor Divers Port Ghalib | operator (fallback) | unknown | awaiting George | draft | 2026-09-21 | as above | 20% non-refundable deposit |
| Blue Ocean Abu Dabbab | operator (overflow) | unknown | awaiting George | draft | 2026-09-21 | as above | |
| Lufthansa Group desk | flights PHL–HRG | | not yet | draft | | request 15/20/25 hold by 2026-09-25 | pay within 7 days of confirmation |
| Insurer (Squaremouth/broker) | Egypt cancellation with CFAR | | not yet | draft | | ask before sign-up opens | known-event exclusion |

## Cross-cutting

| item | status | next_action | date |
|---|---|---|---|
| Email to MBA Student Life | draft (shared/email_student_life.md) | George sends | 2026-09-22 |
| Euroski 2027 dates | unknown | George asks Ski Club | 2026-09-22 |
| Colombia trek 2026 dates | unknown | George checks CampusGroups | 2026-09-22 |
| Web fetch in this environment | blocked | George changes environment network policy or pastes key pages into shared/sources/ | |
| Email connector | none attached | George connects Gmail or Outlook in claude.ai and enables it for this environment and the routine | |
| Scheduled routine | not created (permission block) | George creates it from ROUTINE.md or approves creation | |

## Log

- 2026-09-21: Phase 0 and Phase 1 delivered (memo, handover, workbook, CSVs, drafts).
- 2026-09-22: Three trips locked as tentative. Cozumel moved to 6 nights (Tue 8 – Mon 14). Five final Cozumel emails written with addresses; sending blocked until an email connector exists. Tracker and routine created.
