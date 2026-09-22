# Pipeline tracker — Wharton Outdoors Club dive trips

Owner: George (decides, books, pays). Agent: scheduled routine "Dive trips pipeline check-in" (weekdays 09:00 ET; reads this file, chases after 2 business days, sends the reserve wave the same day, drafts suggested replies for George rather than replying, updates pricing inputs, commits to branch `claude/wharton-outdoors-scuba-dec-5ley3f`). Nothing is ever booked or paid by the agent. The agent never emails MBA Student Life or anyone at Wharton or Penn (George's instruction, 22 Sep).

Milestone: by Tue 29 Sep 2026, three viable planned trips: for each, at least one operator and one lodging that has replied with capacity confirmed and indicative pricing, plus a flight plan, so George can trigger bookings.

## Week plan, Tue 22 – Tue 29 Sep

| day | action | owner |
|---|---|---|
| Tue 22 | First wave sent: 5 Cozumel, 3 Thanksgiving, 3 Egypt contacts. Same day: Blue Note, Aldora, Sand Dollar and Paradise Scuba replied; Emperor acknowledged. Suggested replies drafted for George | done |
| Wed 23 | Routine run: log any replies, draft suggested replies, research price pages | routine |
| Thu 24 | Two business days without reply: chase first wave, send reserve wave (below) | routine |
| Fri 25 | Week summary to George; George requests AA (PHL–SJU, PHL–CZM) and Lufthansa (PHL–HRG) group holds via the airlines' group forms | routine / George |
| Mon 28 | Chase reserve wave; if a trip still has no operator reply, propose further candidates for George | routine |
| Tue 29 | Viability check per trip against the milestone; George picks the operator and lodging to book | routine / George |

Status values: draft | approved | sent | replied | chased | quoted | bookable | dropped. Dates are ISO. Update the `last_action` and `next_action` columns on every touch.

## Cozumel, Tue 8 – Mon 14 Dec 2026, 20–40 people (tentative, locked 2026-09-22)

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Dive Paradise | operator + Hotel Cozumel & Resort bundle | reservations@diveparadise.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca55da573b85a | chase 2026-09-24 if no reply | Big boats; ask instructors for 10–20 students |
| Blue Note Scuba | operator | info@bluenotescuba.com | approved | replied | 2026-09-22 Doug replied (thread 1a0ca55e7f19ae79): 2–4 boats by level, quote with comps to follow, asks about pool and hotel; suggested reply drafted | George sends draft; quote expected | cozumel/replies/blue-note-2026-09-22.md |
| Sand Dollar Sports | operator (beginner training) | sds@sanddollarsports.com | approved | quoted | 2026-09-22 Angelica replied (thread 1a0ca5674e6c857a): 16 OW at a time, OW USD 350 all-in incl. gear, wetsuit, DAN training cover; park fee USD 14/boat day; one free diver; suggested reply drafted | George sends draft; get certified package price and deposit terms | cozumel/replies/sand-dollar-2026-09-22.md |
| Aldora Divers | operator (certified/advanced) | frontdesk@aldora.com | approved | quoted | 2026-09-22 Amanda replied (thread 1a0ca55f8e267357): multi-boat parallel, 2-tank USD 110 incl. steel tanks, nitrox USD 11, 1 comp at 10+ paid, block deposit, 15–30 day cut-off; suggested reply drafted | George sends draft; block quote at 10/15/20 | cozumel/replies/aldora-2026-09-22.md |
| Casa Mexicana | hotel (downtown) | reservaciones@casamexicanacozumel.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca560b2f3f88a | chase 2026-09-24 if no reply | 88 rooms; sister hotels for overflow |
| Hotel Cozumel & Resort | hotel (resort, pool) | unknown; cozumelhotel.com.mx contact page; quoted via Dive Paradise | n/a | draft | 2026-09-22 | covered by Dive Paradise email | 180 rooms; only property that holds 40 |
| Salty Endeavors, ScubaTony | operators (reserve) | see cozumel/operators.csv | not yet | draft | 2026-09-21 drafts in cozumel/outreach/ | hold unless the first four cannot cover 30–40 | |
| Blue Magic Scuba | operator | see cozumel/operators.csv | no | dropped | 2026-09-21 | none | Business advertised for sale |
| Scuba Club Cozumel | dive resort | see cozumel/operators.csv | no | dropped | 2026-09-22 | none | Reported permanently closed (TripAdvisor snippet); verify only if needed |
| American Airlines Group Travel | flights PHL–CZM 8/14 Dec | groups.aa.com (web form) | George | draft | | George to request a 20-seat hold via the group form by 2026-09-25 | |

Reserve contacts, Cozumel (send on 2026-09-24 if the first wave is silent):

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Salty Endeavors | operator (3 boats x 8, two departures, cheapest AOW) | letsgodiving@saltyendeavors.com | approved-after-2026-09-24 | draft | 2026-09-22 address found (ADVERTISED snippet, cozumelscuba.com/contact-salty-endeavors) | send with reserve wave | template: cozumel/outreach/final/blue-note-scuba.md, swap the operator line |
| ScubaTony | operator (all-in pricing, 18 seats) | info@scubatony.com | approved-after-2026-09-24 | draft | 2026-09-22 address found (ADVERTISED snippet, scubatony.com/contactus.aspx) | send with reserve wave | fits the 20-person case |
| Casa del Mar Cozumel Hotel & Dive Resort | hotel (resort, triples allowed) | unknown (casadelmarcozumel.com contact page) | approved-after-2026-09-24 | draft | 2026-09-22 | routine to find address, then send | template: hotel-casa-mexicana |
| Hotel Cozumel & Resort (direct) | hotel (180 rooms, pool) | unknown (cozumelhotel.com.mx/es/contact-us.php) | approved-after-2026-09-24 | draft | 2026-09-22 | routine to find address; else George submits the form | also quoted via Dive Paradise |

## Thanksgiving, Wed 25 – Sun 29 Nov 2026, 8–12 certified divers (tentative)

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Paradise Scuba & Snorkeling Center | operator | paradisescubapr@gmail.com | approved | quoted | 2026-09-22 Kiko replied (thread 1a0ca716dc6c7ebd): 12 on one vessel, dates open, Wall USD 145 + tax, 15% group discount, leader free, gear 25, no nitrox, 50% deposit, 30-day refund; suggested reply drafted | George sends draft; confirm tax, Thanksgiving Day, night dive and bio bay prices | thanksgiving/replies/paradise-scuba-2026-09-22.md |
| Taino Divers | Desecheo operator | tainodivers@gmail.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca717fcf5d4cf | chase 2026-09-24 if no reply | USD 120 + 20 fee |
| Parador Villa Parguera | lodging | hotel@villaparguerapr.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca718db8b088d | chase 2026-09-24 if no reply | 5–6 rooms |
| AA / Frontier group desk | flights PHL–SJU | groups.aa.com (web form) | George | draft | | George requests a 10-seat hold by 2026-09-25 | Thanksgiving fares are the swing |
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
| Lufthansa Group desk | flights PHL–HRG | lufthansa.com group form | George | draft | | George requests a 15/20/25 hold by 2026-09-25 | pay within 7 days of confirmation |
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
- 2026-09-22 (late): Four substantive replies processed. Quoted figures into the workbook: Cozumel OW USD 350 all-in (Sand Dollar), 2-tank USD 110 and nitrox USD 11 (Aldora), leader comps confirmed; Thanksgiving Wall USD 145 less 15% plus tax, leader free (Paradise). Beginner Cozumel all-in now USD 2,270 (under the 2,300 ceiling); Puerto Rico all-in USD 1,720. Suggested replies saved as Gmail drafts. Routine moved to twice daily.
- 2026-09-22 (night): George's rules: no more Student Life emails; chase and expand after 2 business days; replies go to George with a suggested draft; target three viable trips by Tue 29 Sep. Reserve contacts pre-loaded with addresses; routine prompt updated.
- 2026-09-22 (evening): George approved everything. Sent: Paradise Scuba, Taino Divers, Parador Villa Parguera (Thanksgiving); Red Sea Diving Safari, Blue Ocean, Emperor Divers (Egypt); MBA Student Life. Tiger Beach variant dropped. Routine prompt updated with Drive upload and fetch test. Drive folder "Wharton dive trips" exists (created by the routine's first run).

## Needs George

Four suggested replies are waiting as Gmail drafts in the original threads. Edit and send:

1. Blue Note (Doug): confirms 2–4 boats by level, quote with comps coming; asks whether students do pool beforehand and whether we want their hotel. Draft says no pool, full confined water Wed–Fri, quote at 20/30/40, hotel bundle welcome alongside. https://mail.google.com/mail/?authuser=emailgeorgej@gmail.com#all?compose=thread-f:1877056969984552569%2Bmsg-a:r5311588137898147805
2. Aldora (Amanda): multi-boat parallel, USD 110 two-tank with HP120s, nitrox USD 11, 1 comp per 10 paid, block deposit with a 15–30 day cut-off. Draft asks for a block quote at 10/15/20 for Sat 12 and Sun 13 (optional Fri 11), AOW for 3–5, night dive, rental, deposit size. https://mail.google.com/mail/?authuser=emailgeorgej@gmail.com#all?compose=thread-f:1877056974532014935%2Bmsg-a:r2139063801941273740
3. Sand Dollar (Angelica): 16 Open Water students at a time, USD 350 all-in with gear, wetsuit and DAN training cover, free diver, USD 14 park fee, one day may run at 1 pm, assumes Casa del Mar. Draft confirms PADI and eLearning, asks about a second cohort above 16, the certified package price, deposit terms, and offers a call. https://mail.google.com/mail/?authuser=emailgeorgej@gmail.com#all?compose=thread-f:1877057007822603642%2Bmsg-a:r-8074656063535884897
4. Paradise Scuba (Kiko): 12 on one boat, dates open, USD 145 plus tax less 15%, leader free, gear 25, no nitrox, 50% deposit, 30-day refund. Draft pencils Thu 26 to Sat 28 Nov for 12 and asks tax rate, Thanksgiving Day, night dive and bio bay prices, invoicing. https://mail.google.com/mail/?authuser=emailgeorgej@gmail.com#all?compose=thread-f:1877058861335871165%2Bmsg-a:r-5745198931336882374

Decision forming for Cozumel: Sand Dollar for the Open Water block (16 max per cohort) plus Aldora for the certified and advanced divers, with Blue Note's quote as the comparison. Lodging still unanswered (Casa Mexicana; Casa del Mar is next to Sand Dollar and now worth emailing in the reserve wave).
