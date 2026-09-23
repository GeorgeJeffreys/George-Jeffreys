# Pipeline tracker — Wharton Outdoors Club dive trips

Owner: George (decides, books, pays). Agent: scheduled routine "Dive trips pipeline check-in" (four times daily, 08:00, 12:00, 16:00 and 20:00 ET, firing into the main planning session; hands-off mode: replies to operators itself on facts and quote-chasing, chases after 2 business days, sends the reserve wave the same day, escalates only money, commitments, choices and Wharton/Penn mail to George as drafts under Needs George, updates pricing inputs, commits to branch `claude/wharton-outdoors-scuba-dec-5ley3f`). Nothing is ever booked or paid by the agent. The agent never emails MBA Student Life or anyone at Wharton or Penn (George's instruction, 22 Sep).

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

## Cozumel, Sun 13 – Sat 19 Dec 2026, 20–40 people (CONFIRMED GO 23 Sep; dates CONFIRMED by George 2026-09-22 night, moved from Tue 8 – Mon 14 because of his DC event on Sat 12). Date-change notes sent to all six existing Cozumel contacts on 2026-09-23 14:36 UTC; every new first-contact email uses Sun 13 – Sat 19 Dec.

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Dive Paradise | operator + Cozumel Hotel & Resort all-inclusive (one-roof option) | reservations@diveparadise.com | approved | quoted | 2026-09-23 Lisa replied 19:07 UTC (NEW thread 1a0cfaa9b7e1a215): AI lodging USD 522 pp (book by 30 Sep), 5-day boats 590, comps 1/11, 10% commission, deposit 500; courses priced later; replied 20:15 asking to extend the 30 Sep window, triple rate, instructor capacity | await course prices and the rate-window answer | cozumel/replies/dive-paradise-2026-09-23.md | Big boats; ask instructors for 10–20 students |
| Blue Note Scuba | operator | info@bluenotescuba.com | approved | replied | 2026-09-22 Doug replied (thread 1a0ca55e7f19ae79): 2–4 boats by level, quote with comps to follow, asks about pool and hotel; suggested reply drafted | 2026-09-23 full quote 16:23 and terms 17:21 UTC: OW 400, 5-day 600 less 10% commission, 1 comp per 5, free AOW/nitrox, deposit 25%, Hotel Plaza USD 70–88/room; can take the whole group; replied 20:15 asking instructor count, park fees, minimum to hold | await answers; PRICE LEADER | cozumel/replies/blue-note-2026-09-22.md, blue-note-2026-09-23.md |
| Sand Dollar Sports | operator, LEADING one-centre candidate (OW + certified together) | sds@sanddollarsports.com | approved | quoted | 2026-09-23 Angelica's second reply (thread 1a0ca5674e6c857a): second OW cohort at 1 pm, certified on boats alongside at 6:1, packages 2/3/4/5-day USD 215/321/420/510, AOW 380, nitrox 13, night 60/85, deposit USD 500, 48 h refund ladder; replied same day with new dates | 2026-09-23 17:14 UTC: boat days 14 am, 15 am, 16 pm, 17 am, 18 PM (clashes with Sat flights; asked for Fri am or Thu as last boat day); 28-diver boat; deposit ladder; will price Casa del Mar for us | await Friday answer, rental rate, Casa del Mar price; BEGINNER LEADER | cozumel/replies/sand-dollar-2026-09-22.md, -23.md, -23b.md |
| Aldora Divers | operator (certified/advanced; OW offered too) | frontdesk@aldora.com | approved | quoted | 2026-09-22 second reply (23:48 UTC): OW USD 667 incl. eLearning, AOW 749, nitrox course 273, 2-tank 145 air / 167 nitrox incl. tax and park fee, night 82/94, gear 20/day, deposits 150 per student / 100 per diver; asked for exact numbers; replied 2026-09-23 with new dates and ranges | 2026-09-23 14:51 and 18:34 UTC: OW 389 with own eLearning, 10% package discount (2-tank 130), 20 students at 4:1, USD 100 pp deposit to hold, asked how we want to proceed; replied 20:15: no deposits until October, asked latest deposit date | await answer; premium option, dearest | cozumel/replies/aldora-2026-09-22.md, -22b.md, -23.md |
| Casa Mexicana | hotel (downtown; Sand Dollar says students would need taxis) | reservaciones@casamexicanacozumel.com | approved | sent | 2026-09-23 date-change note sent in thread 1a0ca560b2f3f88a (doubles as first nudge) | chase 2026-09-25 if still silent | 88 rooms; sister hotels for overflow |
| Hotel Cozumel & Resort | hotel (resort, pool) | unknown; cozumelhotel.com.mx contact page; quoted via Dive Paradise | n/a | draft | 2026-09-22 | covered by Dive Paradise email | 180 rooms; only property that holds 40 |
| Salty Endeavors, ScubaTony | operators (reserve) | see cozumel/operators.csv | not yet | draft | 2026-09-21 drafts in cozumel/outreach/ | hold unless the first four cannot cover 30–40 | |
| Blue Magic Scuba | operator | see cozumel/operators.csv | no | dropped | 2026-09-21 | none | Business advertised for sale |
| Scuba Club Cozumel | dive resort | see cozumel/operators.csv | no | dropped | 2026-09-22 | none | Reported permanently closed (TripAdvisor snippet); verify only if needed |
| Flights PHL–CZM | individual bookings | n/a | no | dropped | 2026-09-22 George: people book their own flights | keep the fare band in the workbook current | |

Reserve contacts, Cozumel (not needed unless the four quoted centres fall through):

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Salty Endeavors | operator (3 boats x 8, two departures, cheapest AOW) | letsgodiving@saltyendeavors.com | approved-after-2026-09-24 | draft | 2026-09-22 address found (ADVERTISED snippet, cozumelscuba.com/contact-salty-endeavors) | send with reserve wave | template: cozumel/outreach/final/blue-note-scuba.md, swap the operator line |
| ScubaTony | operator (all-in pricing, 18 seats) | info@scubatony.com | approved-after-2026-09-24 | draft | 2026-09-22 address found (ADVERTISED snippet, scubatony.com/contactus.aspx) | send with reserve wave | fits the 20-person case |
| Casa del Mar Cozumel Hotel & Dive Resort | hotel, LEADING (200 yards from Sand Dollar, which recommends it; triples allowed) | reservations@casadelmarcozumel.com | approved | sent | 2026-09-23 date-change note sent in thread 1a0cb3a2f3032070 (doubles as first nudge) | chase 2026-09-25 if still silent; also check booking-site rates for Sun 13 – Sat 19 | now a first-wave hotel |
| Hotel Cozumel & Resort (direct) | hotel (180 rooms, pool) | unknown (cozumelhotel.com.mx/es/contact-us.php) | approved-after-2026-09-24 | draft | 2026-09-22 | routine to find address; else George submits the form | also quoted via Dive Paradise |

## Thanksgiving, Wed 25 – Sun 29 Nov 2026, 8–12 certified divers (CONFIRMED GO 23 Sep; equal priority)

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Paradise Scuba & Snorkeling Center | operator | paradisescubapr@gmail.com | approved | quoted | 2026-09-22 Kiko replied (thread 1a0ca716dc6c7ebd): 12 on one vessel, dates open, Wall USD 145 + tax, 15% group discount, leader free, gear 25, no nitrox, 50% deposit, 30-day refund; suggested reply drafted | reply sent 2026-09-22 22:40 UTC (pencil Thu–Sat for 12, tax, Thanksgiving Day, night dive, bio bay, invoicing); await answer | thanksgiving/replies/paradise-scuba-2026-09-22.md |
| Taino Divers | Desecheo operator | tainodivers@gmail.com | approved | dropped | 2026-09-23 Tara replied (thread 1a0ca717fcf5d4cf): no boat any more; shore dives only; refers Island Style Charters; replied thanks, asked for their email | none | thanksgiving/replies/taino-divers-2026-09-23.md |
| Island Style Charters, Rincón | Desecheo operator (referral from Taino) | unknown; tel 787-624-9379; islandstylescuba.com | approved-after-2026-09-24 | draft | 2026-09-23 web snippet: Tim Brennan, max 4 divers or 6 snorkellers per charter | routine finds an email via the site; if only a phone, George decides whether to call. Capacity problem: 8–12 divers = 2–3 charters | Desecheo may become optional |
| Parador Villa Parguera | lodging | hotel@villaparguerapr.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca718db8b088d | chase 2026-09-24 if no reply | 5–6 rooms |
| Flights PHL–SJU | individual bookings | n/a | no | dropped | 2026-09-22 George: people book their own flights | keep the fare band current; Thanksgiving fares are the swing | |
| Neal Watson's Tiger Beach | opt-in variant | see thanksgiving/outreach/ | no | dropped | 2026-09-22 | none unless George revives the variant | BAITED; sales final |

Reserve contacts, Thanksgiving (send on 2026-09-24 if the first wave is silent):

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Parguera Plaza Hotel | lodging (adults only, opened 2023) | ventaspargueraplaza@gmail.com (routine found 2026-09-22, ADVERTISED snippet) | approved-after-2026-09-24 | draft | 2026-09-22 | send with reserve wave | template: parador-villa-parguera |
| West Divers | operator (second boat, La Parguera) | unknown (phone 787-899-3223 only) | approved-after-2026-09-24 | draft | 2026-09-22 | routine to find address; else George calls | |
| Rincón Diving & Snorkeling / Aquatica Dive & Surf | Desecheo back-ups | unknown | approved-after-2026-09-24 | draft | 2026-09-22 | routine to find addresses; send with the reserve wave now that Taino is out | |

## Egypt, Sat 2 – Fri 8 Jan 2027, 15–25 people (CONFIRMED GO 23 Sep; shortened by one day at the end; contacts were emailed as 3–9 Jan and get the new end date in the next message in each thread)

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Red Sea Diving Safari, Marsa Shagra | operator + lodging (primary) | reservations.ma@redsea-divingsafari.com | approved | sent | 2026-09-22 sent via Gmail, thread 1a0ca71a4aee743e | chase 2026-09-24 if no reply | Ask price list, feast-period rule, free places, capacity |
| Emperor Divers Port Ghalib | operator (fallback) | info@emperordivers.com (routes to reservations@emperordivers.com) | approved | replied (acknowledgement) | 2026-09-22 Rose Regules (thread 1a0ca7227f5db287): will review and revert | chase 2026-09-25 if nothing substantive | january/replies/emperor-2026-09-22.md |
| Blue Ocean Abu Dabbab | operator + lodge package (fallback to RSDS) | info@blueocean-eg.com | approved | replied | 2026-09-23 Rita replied (thread 1a0ca7212c991ce4): full package possible, lodge double/triple, no free rooms, free diving places by activity; replied with five pricing questions | await prices (chase 2026-09-25) | january/replies/blue-ocean-2026-09-23.md |
| Flights PHL–HRG | individual bookings | n/a | no | dropped | 2026-09-22 George: people book their own flights | keep the fare band current | |
| Insurer (Squaremouth/broker) | Egypt cancellation with CFAR | | not yet | draft | | ask before sign-up opens | known-event exclusion |

Reserve contacts, Egypt (send on 2026-09-24 if the first wave is silent):

| contact | role | email | send | status | last_action | next_action | notes |
|---|---|---|---|---|---|---|---|
| Camel Dive Club & Hotel, Sharm | operator + hotel (SSI; groups from 10) | info@cameldive.com | approved-after-2026-09-24 | draft | 2026-09-22 address found (ADVERTISED snippet, cameldive.com/contact-us) | send with reserve wave | Sharm base: note PADI eLearning may not carry to SSI; ask |
| Red Sea Diving College, Sharm | operator (PADI, 6 day boats) | info@redseacollege.com | approved-after-2026-09-24 | draft | 2026-09-22 address found (ADVERTISED snippet, redseacollege.com) | send with reserve wave | template: emperor-divers-port-ghalib, swap base to Sharm |
| Orca Dive Club, El Gouna | operator (Hurghada fallback) | info@orca-diveclub-elgouna.com | approved-after-2026-09-24 | draft | 2026-09-23 address found by the routine (ADVERTISED snippet, orca-diveclubs.com/contact-us) | send with reserve wave if Egypt first wave silent | |

## Cross-cutting

| item | status | next_action | date |
|---|---|---|---|
| Email to MBA Student Life | sent once 2026-09-22 (thread 1a0ca71cf070351f). George: no further emails to Student Life. | log any reply under Needs George only | 2026-09-22 |
| Euroski 2027 dates | Ski Club key-dates page shows Jan 6–12, St. Anton (routine search 2026-09-22); year still not explicit | George asks Ski Club to confirm 2027 | 2026-09-22 |
| Colombia trek 2026 dates | unknown | George checks CampusGroups | 2026-09-22 |
| Dive Paradise 2026 rates | PDF location found by the routine (ADVERTISED snippet, unread: diveparadise.com/wp-content/uploads/2025/10/Diving-Rates-2026-v2.pdf, "effective 21 Dec 2025") | read once fetch works, or wait for Dive Paradise's reply | 2026-09-23 |
| Cancún–London direct for George (Sat 19 Dec) | Virgin Atlantic and British Airways fly LGW/LHR–CUN direct; generic fares seen about GBP 480–660 one-way-equivalent (ADVERTISED snippet, not date-specific) | George checks BA/Virgin for the exact date when booking his own ticket | 2026-09-23 |
| AA Saturday PHL–CZM nonstop | Snippet: Saturday-only nonstop scheduled from 7 Nov (year not shown); would fit the Sat 19 Dec return | routine confirms the 2026-27 season when fetch works | 2026-09-23 |
| Web fetch in this environment | STILL BLOCKED on the 2026-09-23 routine run (redsea-divingsafari.com, diveparadise.com, example.com all EGRESS_BLOCKED, so not domain-specific) | George sets Network access to full internet on the environment (claude.ai > Code > Environments > George Claude Environment); routine retests each run | 2026-09-23 |
| Email connector | Back on emailgeorgej@gmail.com as of 2026-09-23 14:30 UTC (George switched it; verified by thread lookup). The 13:09 UTC routine run found it on the Wharton account and sent nothing | routine verifies each run | 2026-09-23 |
| Scheduled routine | live: trig_01FXquqgu6QVVmADznF1E78v, four times daily (08:00, 12:00, 16:00, 20:00 ET) firing into the main session; no email or push; procedure in ROUTINE.md. Old fresh-session routine deleted 2026-09-23 | | 2026-09-23 |
| Google Drive folder | "Wharton dive trips" (https://drive.google.com/drive/folders/17fUirPHQ088oQJiB6dRJZFqk7hFAWATm): TRACKER.md, DECISION_MEMO.md and a "summary" Google Sheet with the headline prices. The full workbook exceeds the upload tool's size limit; it lives in the repo at pricing/december_pricing.xlsx | routine refreshes each run | 2026-09-22 |

## Log

- 2026-09-21: Phase 0 and Phase 1 delivered (memo, handover, workbook, CSVs, drafts).
- 2026-09-22: Three trips locked as tentative. Cozumel moved to 6 nights (Tue 8 – Mon 14). Five final Cozumel emails written with addresses; sending blocked until an email connector exists. Tracker and routine created.
- 2026-09-22 (later): Gmail connected. Five Cozumel emails sent from emailgeorgej@gmail.com (Dive Paradise, Blue Note, Aldora, Casa Mexicana, Sand Dollar). Norther wording removed from outreach at George's request.

- 2026-09-22 (first routine run, 18:24 UTC): Gmail and Drive confirmed working; no replies yet; fetch still blocked; found the same contact addresses independently; uploaded tracker and memo to Drive; xlsx upload failed on size; its edits did not reach the repo.
- 2026-09-22 (23:00 UTC): George has a DC event on Sat 12 Dec. Cozumel likely moves to Sun 13 – Sat 19 Dec; analysis in cozumel/DATE_CHANGE_PENDING.md. Pencilled only; existing contacts not told; new emails use the new dates.
- 2026-09-22 (23:50 UTC): George CONFIRMED Cozumel Sun 13 – Sat 19 Dec, six nights; he flies Cancún to the UK afterwards. Option 6–11 Dec rejected (first-years' core exams). Files, workbook labels, memo, plan and routine prompt updated. Date-change notes to the six existing Cozumel contacts queued for the routine (Gmail connector was on the Wharton account, so not sent from this session).
- 2026-09-22 (23:30 UTC): George switched the Gmail connector to his Wharton account briefly. Read his Fall 2026 course emails for exam dates: FNCE 7070 exams Tue 29 Sep and Thu 19 Nov (in class, mandatory), project due Thu 10 Dec (virtual); no other December exam found; core exam schedule and calendars only linked, not printed. Earlier-than-core-exams still not recommended; 13–19 Dec still recommended. No emails sent. Gmail sends must resume from emailgeorgej@gmail.com once George switches the connector back.
- 2026-09-22 (22:40 UTC): George: send the drafts, hands-off from here. All four replies sent; drafts folder clean. Routine prompt switched to hands-off mode (replies itself; escalates decisions only). Recommended permission settings saved to december-plan/SETTINGS_RECOMMENDED.json for George to install (the agent cannot edit its own permissions).
- 2026-09-22 (night, later): George's answers: drafts 2 and 4 approved as written; Sand Dollar draft loses the call offer; Blue Note draft asks for rough hotel quotes; one centre for all divers; no group flights. Drafts updated; Casa del Mar emailed; routine prompt updated with the standing decisions.
- 2026-09-22 (late): Four substantive replies processed. Quoted figures into the workbook: Cozumel OW USD 350 all-in (Sand Dollar), 2-tank USD 110 and nitrox USD 11 (Aldora), leader comps confirmed; Thanksgiving Wall USD 145 less 15% plus tax, leader free (Paradise). Beginner Cozumel all-in now USD 2,270 (under the 2,300 ceiling); Puerto Rico all-in USD 1,720. Suggested replies saved as Gmail drafts. Routine moved to twice daily.
- 2026-09-22 (night): George's rules: no more Student Life emails; chase and expand after 2 business days; replies go to George with a suggested draft; target three viable trips by Tue 29 Sep. Reserve contacts pre-loaded with addresses; routine prompt updated.
- 2026-09-23 (13:09 UTC routine run): connector was on the Wharton account, so nothing sent; fetch still blocked everywhere; found Orca Dive Club's address and the Dive Paradise 2026 rates PDF location; Cancún–London fare band noted. Its tracker edits reached Drive only; merged here.
- 2026-09-23 (14:36 UTC, George's morning work run by hand after he switched the connector back): date-change notes sent to all six Cozumel contacts (Sand Dollar and Aldora inside substantive replies). New replies processed: Sand Dollar (full certified price list, second OW cohort, deposit and refund terms), Aldora (full price list, deposits), Taino Divers (no boat, refers Island Style Charters), Blue Ocean (willing, terms). Workbook inputs moved to Sand Dollar's quoted 5-day package (USD 102/day), park fee USD 14, nitrox 13, night 85, tune-up 5, gear 20; Cozumel all-in now certified 2,201 / beginner 2,248 / advanced 2,894. Six sources rows added.
- 2026-09-23 (17:00 UTC): George: all three trips are confirmed go with equal priority; Egypt shortened by a day at the end (Sun 3 – Fri 8 on the ground); off-afternoon activities and add-ons are planned by us, not asked of operators; routine now four times a day and reports into the main session only, no emails or push. Programmes written (cozumel/PROGRAMME.md, january/PROGRAMME.md, shared/briefing_template.md). Workbook Egypt inputs: 5 nights, 4 dive days.
- 2026-09-23 (20:15 UTC, in-session routine run): four Cozumel replies since 16:55 UTC processed and answered: Sand Dollar (boat days, 28-diver boat, deposit ladder, Casa del Mar approach), Blue Note (terms, whole group, commission, Hotel Plaza rates, El Cielo), Aldora (availability, deposit, whole group), Dive Paradise (first quote: all-inclusive resort USD 522 pp by 30 Sep, diving 590, comps 1/11). The fresh-session run at 16:51 replied to Blue Note and Aldora at 16:54 but never pushed; its replies are recorded here. Comparison written: cozumel/OPERATOR_COMPARISON.md. Thanksgiving and Egypt: no new mail; chasers due 24–25 Sep.
- 2026-09-23 (21:30 UTC): George picks Blue Note + Hotel Plaza as the Cozumel top choice; sidemount parked but to be raised at booking; certified track gets an optional third dive Mon, Tue, Thu. Built pricing/cozumel_group_budget.xlsx (per-person fees, group budget at 20/30/40, payment schedule, refund ladder; George keeps comps and commission) and the group-chat flyer (cozumel/TRIP_FLYER.html, trip_flyer_1080.png).
- 2026-09-22 (evening): George approved everything. Sent: Paradise Scuba, Taino Divers, Parador Villa Parguera (Thanksgiving); Red Sea Diving Safari, Blue Ocean, Emperor Divers (Egypt); MBA Student Life. Tiger Beach variant dropped. Routine prompt updated with Drive upload and fetch test. Drive folder "Wharton dive trips" exists (created by the routine's first run).

## Needs George

- COZUMEL: George's top choice is BLUE NOTE + Hotel Plaza (23 Sep evening). Not yet booked: Blue Note must still answer instructor count for 10–20 students, park fees in or out, and the minimum to hold; then George approves the 25% deposit. Sand Dollar stays warm as the backup; Aldora and Dive Paradise are told nothing until Blue Note confirms capacity. Budget (rebuilt 23 Sep night, final rule): the fee covers diving, DAN and the hotel (everyone shares, George too); meals, transfers and flights are own costs. USD 1,465 student / 1,345 certified (all gear rental in the fee), set at 20 people with 6% contingency; George's flight allowance, half-room and DAN carried by the group, commission to George; surplus positive from 12 people up. Guidance budget without flights about 1,815 / 1,695. Flyer: cozumel/FLYER_PROMPT.md is the ChatGPT image prompt; the HTML flyer was rejected. Earlier note: four centres can each take the whole group and all four have quoted. Comparison and recommendation in cozumel/OPERATOR_COMPARISON.md: keep Blue Note (cheapest, best terms, free AOW/nitrox, Hotel Plaza at USD 70–88 a room) and Sand Dollar (best beginner capacity, Casa del Mar next door) in play, drop Aldora unless both fail, hold Dive Paradise as the one-resort fallback. Three answers still due before choosing (Blue Note instructors and park fees; Sand Dollar Friday boat; Dive Paradise rate window).
- Dive Paradise's all-inclusive rate (USD 522 pp) must be booked by 30 Sep. Asked Lisa for an extension; if she refuses, you decide by Mon 28 whether to lock a small block or let it go.
- Aldora asked how we want to proceed and wants USD 100 per person to hold; told them October. Nothing to sign.
- Desecheo (Thanksgiving) is now optional: Taino Divers has no boat and the referral, Island Style Charters, takes 4 divers per charter. Paradise Scuba's three Wall mornings still make the trip; say if you want Desecheo pursued by phone.
- Budget caveats before the price is posted (23 Sep night): the fee assumes Blue Note's prices include tax and exclude the park fee, the rental includes a computer, the Hotel Plaza rate is per room and tax-inclusive, and the hotel has a normal group cancellation policy. Card or platform fees (about 3% of USD 25–55k) are not in the fee. Doug is being asked all of it in one email; hold the flyer price until he answers.
- Sidemount (parked, George interested): rent a rig for the week from Cozumel Dive School (XDeep rigs held for their course) and have Blue Note put two AL80s on the boat for his afternoon dives; ask both at booking time, not before.
- Syllabi check (low priority): the three full-semester syllabi for any final dated 14–19 Dec; nothing in email suggests one.

Otherwise nothing pending. The four replies of 22 Sep (Blue Note, Aldora, Sand Dollar, Paradise Scuba) were sent from George's Gmail at 22:40 UTC on his instruction; the drafts folder is empty. From now on the routine replies to operators itself on facts and quotes, and escalates here only money, commitments, choices between options, date changes and anything from Wharton or Penn, each with a recommendation and a ready draft.
