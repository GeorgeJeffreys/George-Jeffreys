# Pipeline tracker — Wharton Outdoors Club dive trips

Owner: George (decides, books, pays). Agent: scheduled routine "Dive trips pipeline check-in" (twice daily 09:00 and 17:00 ET; hands-off mode from 22 Sep night: replies to operators itself on facts and quote-chasing, chases after 2 business days, sends the reserve wave the same day, escalates only money, commitments, choices and Wharton/Penn mail to George as drafts under Needs George, updates pricing inputs, commits to branch `claude/wharton-outdoors-scuba-dec-5ley3f`). Nothing is ever booked or paid by the agent. The agent never emails MBA Student Life or anyone at Wharton or Penn (George's instruction, 22 Sep).

Milestone: by Tue 29 Sep 2026, three viable planned trips: for each, ONE dive centre that can take all divers (beginners and certified together, so George is in charge of every diver) and one lodging, both replied with capacity confirmed and indicative pricing. George's standing decisions, 22 Sep: never split a trip across centres; participants book their own flights (no group holds); paper quotes first, no calls unless George asks.

## Week plan, Tue 22 – Tue 29 Sep

| day | action | owner |
|---|---|---|
| Tue 22 | First wave sent: 5 Cozumel, 3 Thanksgiving, 3 Egypt contacts. Same day: Blue Note, Aldora, Sand Dollar and Paradise Scuba replied; Emperor acknowledged. Suggested replies drafted for George | done |
| Wed 23 | Routine run: log any replies, draft suggested replies, research price pages | routine |
| Thu 24 | Two business days without reply: chase first wave, send reserve wave (below) | routine |
| Fri 25 | Week summary to George | routine |
| Mon 28 | Chase reserve wave; if a trip still has no operator reply, propose further candidates for George | routine |
| Tue 29 | Viability check per trip against the milestone; George picks the operator and lodging to book | routine / George |

Status values: draft | approved | sent | replied | chased | quoted | bookable | dropped. Dates are ISO. Update the `last_action` and `next_action` columns on every touch.

## Cozumel, Tue 8 – Mon 14 Dec 2026, 20–40 people (tentative, locked 2026-09-22)

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Dive Paradise | operator + Hotel Cozumel & Resort bundle | reservations@diveparadise.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca55da573b85a | chase 2026-09-24 if no reply | Big boats; ask instructors for 10–20 students |
| Blue Note Scuba | operator | info@bluenotescuba.com | approved | replied | 2026-09-22 Doug replied (thread 1a0ca55e7f19ae79): 2–4 boats by level, quote with comps to follow, asks about pool and hotel; suggested reply drafted | reply sent 2026-09-22 22:40 UTC (no pool, one centre, quote at 20/30/40, hotel quotes); await quote | cozumel/replies/blue-note-2026-09-22.md |
| Sand Dollar Sports | operator (beginner training) | sds@sanddollarsports.com | approved | quoted | 2026-09-22 Angelica replied (thread 1a0ca5674e6c857a): 16 OW at a time, OW USD 350 all-in incl. gear, wetsuit, DAN training cover; park fee USD 14/boat day; one free diver; suggested reply drafted | reply sent 2026-09-22 22:40 UTC (PADI, no pool, second cohort?, certified package, deposit terms); await answer | cozumel/replies/sand-dollar-2026-09-22.md |
| Aldora Divers | operator (certified/advanced) | frontdesk@aldora.com | approved | quoted | 2026-09-22 Amanda replied (thread 1a0ca55f8e267357): multi-boat parallel, 2-tank USD 110 incl. steel tanks, nitrox USD 11, 1 comp at 10+ paid, block deposit, 15–30 day cut-off; suggested reply drafted | reply sent 2026-09-22 22:40 UTC (block quote 10/15/20, AOW, OW capacity question, deposit size); await quote | cozumel/replies/aldora-2026-09-22.md |
| Casa Mexicana | hotel (downtown) | reservaciones@casamexicanacozumel.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca560b2f3f88a | chase 2026-09-24 if no reply | 88 rooms; sister hotels for overflow |
| Hotel Cozumel & Resort | hotel (resort, pool) | unknown; cozumelhotel.com.mx contact page; quoted via Dive Paradise | n/a | draft | 2026-09-22 | covered by Dive Paradise email | 180 rooms; only property that holds 40 |
| Salty Endeavors, ScubaTony | operators (reserve) | see cozumel/operators.csv | not yet | draft | 2026-09-21 drafts in cozumel/outreach/ | hold unless the first four cannot cover 30–40 | |
| Blue Magic Scuba | operator | see cozumel/operators.csv | no | dropped | 2026-09-21 | none | Business advertised for sale |
| Scuba Club Cozumel | dive resort | see cozumel/operators.csv | no | dropped | 2026-09-22 | none | Reported permanently closed (TripAdvisor snippet); verify only if needed |
| Flights PHL–CZM | individual bookings | n/a | no | dropped | 2026-09-22 George: people book their own flights | keep the fare band in the workbook current | |

Reserve contacts, Cozumel (send on 2026-09-24 if the first wave is silent):

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Salty Endeavors | operator (3 boats x 8, two departures, cheapest AOW) | letsgodiving@saltyendeavors.com | approved-after-2026-09-24 | draft | 2026-09-22 address found (ADVERTISED snippet, cozumelscuba.com/contact-salty-endeavors) | send with reserve wave | template: cozumel/outreach/final/blue-note-scuba.md, swap the operator line |
| ScubaTony | operator (all-in pricing, 18 seats) | info@scubatony.com | approved-after-2026-09-24 | draft | 2026-09-22 address found (ADVERTISED snippet, scubatony.com/contactus.aspx) | send with reserve wave | fits the 20-person case |
| Casa del Mar Cozumel Hotel & Dive Resort | hotel (resort, next to Sand Dollar, triples allowed) | reservations@casadelmarcozumel.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0cb3a2f3032070 (George asked for it early) | chase 2026-09-24 if no reply | now a first-wave hotel |
| Hotel Cozumel & Resort (direct) | hotel (180 rooms, pool) | unknown (cozumelhotel.com.mx/es/contact-us.php) | approved-after-2026-09-24 | draft | 2026-09-22 | routine to find address; else George submits the form | also quoted via Dive Paradise |

## Thanksgiving, Wed 25 – Sun 29 Nov 2026, 8–12 certified divers (tentative)

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Paradise Scuba & Snorkeling Center | operator | paradisescubapr@gmail.com | approved | quoted | 2026-09-22 Kiko replied (thread 1a0ca716dc6c7ebd): 12 on one vessel, dates open, Wall USD 145 + tax, 15% group discount, leader free, gear 25, no nitrox, 50% deposit, 30-day refund; suggested reply drafted | reply sent 2026-09-22 22:40 UTC (pencil Thu–Sat for 12, tax, Thanksgiving Day, night dive, bio bay, invoicing); await answer | thanksgiving/replies/paradise-scuba-2026-09-22.md |
| Taino Divers | Desecheo operator | tainodivers@gmail.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca717fcf5d4cf | chase 2026-09-24 if no reply | USD 120 + 20 fee |
| Parador Villa Parguera | lodging | hotel@villaparguerapr.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca718db8b088d | chase 2026-09-24 if no reply | 5–6 rooms |
| Flights PHL–SJU | individual bookings | n/a | no | dropped | 2026-09-22 George: people book their own flights | keep the fare band current; Thanksgiving fares are the swing | |
| Neal Watson's Tiger Beach | opt-in variant | see thanksgiving/outreach/ | no | dropped | 2026-09-22 | none unless George revives the variant | BAITED; sales final |

Reserve contacts, Thanksgiving (send on 2026-09-24 if the first wave is silent):

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Parguera Plaza Hotel | lodging (adults only, opened 2023) | ventaspargueraplaza@gmail.com (routine found 2026-09-22, ADVERTISED snippet) | approved-after-2026-09-24 | draft | 2026-09-22 | send with reserve wave | template: parador-villa-parguera |
| West Divers | operator (second boat, La Parguera) | unknown (phone 787-899-3223 only) | approved-after-2026-09-24 | draft | 2026-09-22 | routine to find address; else George calls | |
| Rincón Diving & Snorkeling / Aquatica Dive & Surf | Desecheo back-ups | unknown | approved-after-2026-09-24 | draft | 2026-09-22 | routine to find addresses | only if Taino Divers is silent |

## Egypt, Sat 2 – Sat 9 Jan 2027, 15–25 people (tentative)

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Red Sea Diving Safari, Marsa Shagra | operator + lodging (primary) | reservations.ma@redsea-divingsafari.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca71a4aee743e | chase 2026-09-24 if no reply | Ask price list, feast-period rule, free places, capacity |
| Emperor Divers Port Ghalib | operator (fallback) | info@emperordivers.com (routes to reservations@emperordivers.com) | approved | replied (acknowledgement) | 2026-09-22 Rose Regules (thread 1a0ca7227f5db287): will review and revert | chase 2026-09-25 if nothing substantive | january/replies/emperor-2026-09-22.md |
| Blue Ocean Abu Dabbab | operator (overflow) | info@blueocean-eg.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca7212c991ce4 | chase 2026-09-24 if no reply | |
| Flights PHL–HRG | individual bookings | n/a | no | dropped | 2026-09-22 George: people book their own flights | keep the fare band current | |
| Insurer (Squaremouth/broker) | Egypt cancellation with CFAR | | not yet | draft | | ask before sign-up opens | known-event exclusion |

Reserve contacts, Egypt (send on 2026-09-24 if the first wave is silent):

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Camel Dive Club & Hotel, Sharm | operator + hotel (SSI; groups from 10) | info@cameldive.com | approved-after-2026-09-24 | draft | 2026-09-22 address found (ADVERTISED snippet, cameldive.com/contact-us) | send with reserve wave | Sharm base: note PADI eLearning may not carry to SSI; ask |
| Red Sea Diving College, Sharm | operator (PADI, 6 day boats) | info@redseacollege.com | approved-after-2026-09-24 | draft | 2026-09-22 address found (ADVERTISED snippet, redseacollege.com) | send with reserve wave | template: emperor-divers-port-ghalib, swap base to Sharm |
| Orca Dive Club, El Gouna | operator (Hurghada fallback) | unknown | approved-after-2026-09-24 | draft | 2026-09-22 | routine to find address | |

## Cross-cutting

| item | status | next_action | date |
|---|---|---|---|
| Email to MBA Student Life | sent once 2026-09-22 (thread 1a0ca71cf070351f). George: no further emails to Student Life. | log any reply under Needs George only | 2026-09-22 |
| Euroski 2027 dates | Ski Club key-dates page shows Jan 6–12, St. Anton (routine search 2026-09-22); year still not explicit | George asks Ski Club to confirm 2027 | 2026-09-22 |
| Colombia trek 2026 dates | unknown | George checks CampusGroups | 2026-09-22 |
| Web fetch in this environment | STILL BLOCKED: the routine's fresh session on 2026-09-22 got EGRESS_BLOCKED on redsea-divingsafari.com, so the environment's network policy has not changed | George sets Network access to full internet on the environment (claude.ai > Code > Environments > George Claude Environment); routine retests each run | 2026-09-22 |
| Email connector | Gmail connected 2026-09-22 | none | |
| Scheduled routine | live: trig_01VjhzqZFLBuAb3E5cQaRP3a, twice daily 09:00 and 17:00 ET every day (changed 2026-09-22 night), Gmail and Google Drive attached; prompt updated 2026-09-22 (Drive as fallback state store, bounce handling, push-status reporting) | first run 2026-09-22 18:24 UTC: Gmail and Drive worked, fetch blocked, its tracker edits reached Drive but not the repo (push not confirmed). Next run reports push status explicitly | |
| Google Drive folder | "Wharton dive trips" (https://drive.google.com/drive/folders/17fUirPHQ088oQJiB6dRJZFqk7hFAWATm): TRACKER.md, DECISION_MEMO.md and a "summary" Google Sheet with the headline prices. The full workbook exceeds the upload tool's size limit; it lives in the repo at pricing/december_pricing.xlsx | routine refreshes each run | 2026-09-22 |

## Log

- 2026-09-21: Phase 0 and Phase 1 delivered (memo, handover, workbook, CSVs, drafts).
- 2026-09-22: Three trips locked as tentative. Cozumel moved to 6 nights (Tue 8 – Mon 14). Five final Cozumel emails written with addresses; sending blocked until an email connector exists. Tracker and routine created.
- 2026-09-22 (later): Gmail connected. Five Cozumel emails sent from emailgeorgej@gmail.com (Dive Paradise, Blue Note, Aldora, Casa Mexicana, Sand Dollar). Norther wording removed from outreach at George's request.

- 2026-09-22 (first routine run, 18:24 UTC): Gmail and Drive confirmed working; no replies yet; fetch still blocked; found the same contact addresses independently; uploaded tracker and memo to Drive; xlsx upload failed on size; its edits did not reach the repo.
- 2026-09-22 (22:40 UTC): George: send the drafts, hands-off from here. All four replies sent; drafts folder clean. Routine prompt switched to hands-off mode (replies itself; escalates decisions only). Recommended permission settings saved to december-plan/SETTINGS_RECOMMENDED.json for George to install (the agent cannot edit its own permissions).
- 2026-09-22 (night, later): George's answers: drafts 2 and 4 approved as written; Sand Dollar draft loses the call offer; Blue Note draft asks for rough hotel quotes; one centre for all divers; no group flights. Drafts updated; Casa del Mar emailed; routine prompt updated with the standing decisions.
- 2026-09-22 (late): Four substantive replies processed. Quoted figures into the workbook: Cozumel OW USD 350 all-in (Sand Dollar), 2-tank USD 110 and nitrox USD 11 (Aldora), leader comps confirmed; Thanksgiving Wall USD 145 less 15% plus tax, leader free (Paradise). Beginner Cozumel all-in now USD 2,270 (under the 2,300 ceiling); Puerto Rico all-in USD 1,720. Suggested replies saved as Gmail drafts. Routine moved to twice daily.
- 2026-09-22 (night): George's rules: no more Student Life emails; chase and expand after 2 business days; replies go to George with a suggested draft; target three viable trips by Tue 29 Sep. Reserve contacts pre-loaded with addresses; routine prompt updated.
- 2026-09-22 (evening): George approved everything. Sent: Paradise Scuba, Taino Divers, Parador Villa Parguera (Thanksgiving); Red Sea Diving Safari, Blue Ocean, Emperor Divers (Egypt); MBA Student Life. Tiger Beach variant dropped. Routine prompt updated with Drive upload and fetch test. Drive folder "Wharton dive trips" exists (created by the routine's first run).

## Needs George

Nothing pending. The four replies of 22 Sep (Blue Note, Aldora, Sand Dollar, Paradise Scuba) were sent from George's Gmail at 22:40 UTC on his instruction; the drafts folder is empty. From now on the routine replies to operators itself on facts and quotes, and escalates here only money, commitments, choices between options, date changes and anything from Wharton or Penn, each with a recommendation and a ready draft.
