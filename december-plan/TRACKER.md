# Pipeline tracker — Wharton Outdoors Club dive trips

Owner: George (decides, books, pays). Agent: scheduled routine "Dive trips pipeline" (reads this file, sends only rows marked `send: approved`, logs replies, chases after 4 business days, updates pricing inputs, commits to branch `claude/wharton-outdoors-scuba-dec-5ley3f`). Nothing is ever booked or paid by the agent.

Milestone: a concrete, bookable option per trip (operator + lodging + flight hold, with written terms) that George can trigger.

Status values: draft | approved | sent | replied | chased | quoted | bookable | dropped. Dates are ISO. Update the `last_action` and `next_action` columns on every touch.

## Cozumel, Tue 8 – Mon 14 Dec 2026, 20–40 people (tentative, locked 2026-09-22)

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Dive Paradise | operator + Hotel Cozumel & Resort bundle | reservations@diveparadise.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca55da573b85a | chase 2026-09-28 if no reply | Big boats; ask instructors for 10–20 students |
| Blue Note Scuba | operator | info@bluenotescuba.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca55e7f19ae79 | chase 2026-09-28 if no reply | One 42-ft boat; capacity question |
| Sand Dollar Sports | operator (beginner training) | sds@sanddollarsports.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca5674e6c857a | chase 2026-09-28 if no reply | Shore site works in a norther |
| Aldora Divers | operator (certified/advanced) | frontdesk@aldora.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca55f8e267357 | chase 2026-09-28 if no reply | 6 per boat cap |
| Casa Mexicana | hotel (downtown) | reservaciones@casamexicanacozumel.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca560b2f3f88a | chase 2026-09-28 if no reply | 88 rooms; sister hotels for overflow |
| Hotel Cozumel & Resort | hotel (resort, pool) | unknown; cozumelhotel.com.mx contact page; quoted via Dive Paradise | n/a | draft | 2026-09-22 | covered by Dive Paradise email | 180 rooms; only property that holds 40 |
| Salty Endeavors, ScubaTony | operators (reserve) | see cozumel/operators.csv | not yet | draft | 2026-09-21 drafts in cozumel/outreach/ | hold unless the first four cannot cover 30–40 | |
| Blue Magic Scuba | operator | see cozumel/operators.csv | no | dropped | 2026-09-21 | none | Business advertised for sale |
| Scuba Club Cozumel | dive resort | see cozumel/operators.csv | no | dropped | 2026-09-22 | none | Reported permanently closed (TripAdvisor snippet); verify only if needed |
| American Airlines Group Travel | flights PHL–CZM 8/14 Dec | groups.aa.com | not yet | draft | | George to request a 20-seat hold once headcount signal is in (target 2026-10-02) | |

## Thanksgiving, Wed 25 – Sun 29 Nov 2026, 8–12 certified divers (tentative)

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Paradise Scuba & Snorkeling Center | operator | paradisescubapr@gmail.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca716dc6c7ebd | chase 2026-09-28 if no reply | USD 125 two-tank Wall |
| Taino Divers | Desecheo operator | tainodivers@gmail.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca717fcf5d4cf | chase 2026-09-28 if no reply | USD 120 + 20 fee |
| Parador Villa Parguera | lodging | hotel@villaparguerapr.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca718db8b088d | chase 2026-09-28 if no reply | 5–6 rooms |
| AA / Frontier group desk | flights PHL–SJU | | not yet | draft | | hold by 2026-10-09 | Thanksgiving fares are the swing |
| Neal Watson's Tiger Beach | opt-in variant | see thanksgiving/outreach/ | no | dropped | 2026-09-22 | none unless George revives the variant | BAITED; sales final |

## Egypt, Sat 2 – Sat 9 Jan 2027, 15–25 people (tentative)

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Red Sea Diving Safari, Marsa Shagra | operator + lodging (primary) | reservations.ma@redsea-divingsafari.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca71a4aee743e | chase 2026-09-28 if no reply | Ask price list, feast-period rule, free places, capacity |
| Emperor Divers Port Ghalib | operator (fallback) | info@emperordivers.com (address inferred from an obfuscated snippet; watch for a bounce) | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca7227f5db287 | chase 2026-09-28 if no reply; if bounced, use emperordivers.com/contact | 20% non-refundable deposit |
| Blue Ocean Abu Dabbab | operator (overflow) | info@blueocean-eg.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca7212c991ce4 | chase 2026-09-28 if no reply | |
| Lufthansa Group desk | flights PHL–HRG | | not yet | draft | | request 15/20/25 hold by 2026-09-25 | pay within 7 days of confirmation |
| Insurer (Squaremouth/broker) | Egypt cancellation with CFAR | | not yet | draft | | ask before sign-up opens | known-event exclusion |

## Cross-cutting

| item | status | next_action | date |
|---|---|---|---|
| Email to MBA Student Life | sent 2026-09-22 via Gmail, thread 1a0ca71cf070351f (shortened to 8 questions; Cozumel dates 8–14 Dec) | log the reply under Needs George; the routine must not email Student Life | 2026-09-22 |
| Euroski 2027 dates | unknown | George asks Ski Club | 2026-09-22 |
| Colombia trek 2026 dates | unknown | George checks CampusGroups | 2026-09-22 |
| Web fetch in this environment | George reports opened 2026-09-22; still blocked in the original session; routine tests it each run | confirm from the routine's first-run report | |
| Email connector | Gmail connected 2026-09-22 | none | |
| Scheduled routine | live: trig_01VjhzqZFLBuAb3E5cQaRP3a, weekdays 09:00 ET, Gmail and Google Drive attached; prompt updated 2026-09-22 with Drive upload and fetch test | first run fired 2026-09-22 18:24 UTC; it created the Drive folder but pushed no commit; verify repo access | |

## Log

- 2026-09-21: Phase 0 and Phase 1 delivered (memo, handover, workbook, CSVs, drafts).
- 2026-09-22: Three trips locked as tentative. Cozumel moved to 6 nights (Tue 8 – Mon 14). Five final Cozumel emails written with addresses; sending blocked until an email connector exists. Tracker and routine created.
- 2026-09-22 (later): Gmail connected. Five Cozumel emails sent from emailgeorgej@gmail.com (Dive Paradise, Blue Note, Aldora, Casa Mexicana, Sand Dollar). Norther wording removed from outreach at George's request.

- 2026-09-22 (evening): George approved everything. Sent: Paradise Scuba, Taino Divers, Parador Villa Parguera (Thanksgiving); Red Sea Diving Safari, Blue Ocean, Emperor Divers (Egypt); MBA Student Life. Tiger Beach variant dropped. Routine prompt updated with Drive upload and fetch test. Drive folder "Wharton dive trips" exists (created by the routine's first run).

## Needs George

- Nothing pending from George as of 2026-09-22 evening. Replies will be logged here by the routine.
