You are planning a December 2026 scuba trip for the Wharton Outdoors Club. Produce two fully costed versions, Cozumel and Egypt, so I can pick one and request group quotes this week. I'm George, a second-year Wharton MBA and former PADI instructor. You research, compare, price and draft. I decide, contact people and book.

HOW TO RUN THIS

Phase 0 (you alone, quick):
1. Create ./december-plan/ with subfolders cozumel/, egypt/, shared/ and pricing/.
2. Save this whole prompt verbatim as december-plan/BRIEF.md.
3. Check that web search and web fetch work. Fetch these two pages:
   - https://www.redsea-divingsafari.com/price-lists/marsa-shagra/euro-winter-26-27
   - one Cozumel dive operator's site
4. Verify the date anchors in THE BRIEF against primary sources.
5. Write shared/phase0.md containing:
   - a dates table with sources;
   - the web-access result;
   - anything in this brief you think is wrong, risky or missing;
   - questions only I can answer.
6. Then STOP and wait for me to reply "go".

Phase 1:
- Run the five workstreams below as parallel subagents, at most five at once. Give each subagent its full workstream text plus the RULES and OUTPUT sections, because subagents don't see this conversation.
- If agent teams are already available in this session, you may instead run a team with a Cozumel lead and an Egypt lead who challenge each other's numbers. Don't ask me to set that up; subagents are fine.
- When the subagents report, reconcile their numbers, build the pricing workbook, and check every figure in the memo against a source row. Then write DECISION_MEMO.md and HANDOVER.md.

THE BRIEF

Group
- 20–40 people. Plan scenarios for 20, 30 and 40.
- About half are complete beginners taking PADI Open Water, with eLearning finished at home. The rest are certified, and roughly 15% of the group want advanced diving.
- Demand signal: a multi-select club poll counted 40 beginners, 30 certified divers who "just want to dive" and 13 experienced divers wanting advanced diving.

Budget and organiser place
- Mid to low budget. Accommodation should be decent, not bad.
- My own place should be covered by operators' free places for group leaders where possible; one free per ten paying is common.
- Any per-head organiser charge must be disclosed.

Dates
- The trip starts after MBA core exams, which run Wed 2 – Mon 7 Dec 2026 (tentative).
- Penn's final exam period is Thu 10 – Thu 17 Dec, and the Registrar publishes in-person elective exam dates later. Flag how many days each version overlaps that period.
- Club precedent: the December 2024 Aruba trek ran Tue 10 – Sun 15 Dec, took 25 people and charged a $575 deposit.

Participants and host
- MBA students (many international) and partners only; no Penn undergraduates.
- Host: Wharton Outdoors Club. MBA club travel rules aren't public, so list what to ask MBA Student Life.

VERSION A: COZUMEL

Target dates: Tue 8 – Tue 15 Dec, 7 nights.
- Beginners do Open Water Wed–Fri.
- Everyone dives from boats Sat–Sun.
- Mon 14 is a spare day in case a norther (winter north wind) closes the port. Closures peak December–February, usually for hours to a day, occasionally two.
- Fly home Tue 15.
- Also cost a shorter Tue 8 – Sun 13 version.

Leads to verify:
- Blue Note Scuba (PADI 5-Star ECO Center):
  - Open Water $400 plus eLearning, including gear and marine park fees; two days at a shore training site, then a boat day.
  - Five days / 10 dives: $600.
- Blue Magic Scuba: seven downtown nights plus five days of two-tank dives for $884 per person sharing, or $1,143 from 21 Dec. Park fee and gear are extra.
- General dive costs:
  - two-tank boat dives $80–135;
  - marine park fee about $13 a day;
  - gear about $25 a day;
  - $30 refresher on the boat for anyone who hasn't dived in 12 months;
  - some boats cap at six divers.
- Accommodation: Casa Mexicana, downtown, rated 9.2/10 with breakfast.
- Flights: no nonstop from Philadelphia; typical return $432–803. The alternative is a nonstop to Cancún plus the ferry.
- Entry: Mexico typically admits holders of a valid US visa without a Mexican visa. Confirm.

Advanced options: deep walls, the C-53 wreck, nitrox, night dives, and the Advanced, Deep, Drift and Enriched Air courses. Price an optional off-island bull-shark day by ferry and flag it as optional; I ruled out Playa del Carmen as a base.

VERSION B: EGYPT (land-based only, no liveaboards)

Target dates: about Tue 8 – Wed 16 Dec, door to door. Travel is about 15 hours each way via Europe; avoid Gulf hubs, which the 2026 conflict has disrupted.

Decide the base for a big, beginner-heavy group in December:
- Marsa Alam: Red Sea Diving Safari's Marsa Shagra village, or Emperor Divers at Port Ghalib;
- Sharm el-Sheikh: Ras Mohammed, Tiran, Thistlegorm day trips;
- Hurghada / El Gouna.

Leads to verify (from the Marsa Shagra winter 2026–27 euro price list, URL above):
- Accommodation: December is high season. Full board, per person per night sharing: Royal Tent €89, Deluxe Chalet €122. High-season bookings can require non-refundable deposits.
- Group terms: the 11th, 21st and 30th guest get free transfers, room and diving.
- Transfers, per person one way: from Hurghada €41 (10–20 people) or €33 (21–30); from Marsa Alam airport €22 or €17.
- Diving:
  - five-day house-reef package €347, plus €69 per extra day;
  - Open Water €358 with gear, plus €94 for the PADI e-code.
- Excursions: Dolphin House €48 plus €19 fee; Abu Dabab €48 plus €11 entry; speedboat dives €24–36 each.
- Visa and airport meet-and-assist: €45.
- Flights: Philadelphia–Hurghada about $958–1,214 return; Sharm from about $975.
- Conditions: December water about 22–24°C. North winds can cancel wreck and offshore trips. Oceanic whitetips at Elphinstone are possible from autumn into December.

Document these facts for club approval:
- US State Department rating: Level 2 overall; Level 4 for North and Middle Sinai and the Western Desert.
- The Department warns of fatal accidents on overnight dive boats.
- Insurers treat the 2026 conflict as a "known event" from 28 Feb 2026, which typically excludes war-related disruption from cover bought now.

WORKSTREAMS (PHASE 1)

1. Cozumel diving.
   - Shortlist 6–8 operators, starting with Blue Note and Blue Magic.
   - For each operator, cover:
     - capacity to train 10–22 beginners at once alongside the certified group: boats, boat sizes, instructor ratios;
     - course schedules;
     - refresher and nitrox;
     - advanced options;
     - norther policy and shore fallbacks;
     - group rates and free places for group leaders;
     - deposit and cancellation terms;
     - per-participant payment links;
     - insurance certificates.
   - Write a day-by-day itinerary for each group.
   - Draft an outreach email per shortlisted operator asking for a group quote at 20, 30 and 40 people, and for the terms above.

2. Cozumel accommodation and travel.
   - Hotel blocks for 20–40 people in downtown San Miguel and at dive resorts. Record:
     - price per person per night at 2 and 3 sharing;
     - distance to the shortlisted operators;
     - group terms, cancellation terms and breakfast.
   - Flight fare bands for out Tue 8, back Tue 15 or Sun 13: Philadelphia–Cozumel, and Philadelphia–Cancún plus the ferry.
   - Airline group-booking options for 10+ passengers.
   - Airport transfers.

3. Egypt base and diving.
   - Decide the base, with reasons and a confidence level.
   - Profile 5–7 land-based operators across the candidate bases, starting with Red Sea Diving Safari and Emperor Divers. Cover:
     - beginner training sites;
     - December highlights for certified and advanced divers;
     - how they handle weather cancellations;
     - capacity;
     - group terms and free places for group leaders;
     - deposit and cancellation terms.
   - Write a day-by-day itinerary for each group.
   - Draft outreach emails.

4. Egypt accommodation and travel.
   - Lodging at the chosen base and one alternative.
   - Flights from Philadelphia via Europe for about 8–16 Dec, with fare bands and the fastest routings.
   - Airport transfers.
   - Visa (e-visa or on arrival) for US passports and common international passports.
   - A note on onward connections to London.

5. Rules, risk and money (both versions).
   - Publicly documented Wharton MBA club travel requirements. Mark any undergraduate rules you use as analogues.
   - Penn Global rules for graduate travellers.
   - Entry rules.
   - Dive-accident insurance options and their exclusions.
   - The Egypt known-event issue, and how to protect deposits through contract terms.
   - Nearest recompression chambers.
   - Payment options, and rules on free places for leaders.
   - A ready-to-send email to MBA Student Life (mbastudentlife@wharton.upenn.edu) with the questions the public rules don't settle.

RULES (give these to every subagent)
- Research and drafting only. Never email, message, submit forms, create accounts, book or pay.
- Every decision-relevant fact carries:
  - source URL and access date;
  - currency and what's included;
  - a flag: ADVERTISED, QUOTE NEEDED or INFERRED.
- Never invent a price, date or availability. If a page is unreachable or behind a login, say so and move on.
- Prefer primary sources: operators, hotels, airlines, government, PADI and DAN. Treat blogs and aggregators as leads only.
- Safety:
  - depth limits: Open Water 18 m, Advanced 30 m, Deep 40 m;
  - at least 18 hours between the last dive and flying;
  - no liveaboards;
  - label baited or feeding shark dives as such.
- Privacy: no personal data about individuals; public business contacts only.
- House style: UK English, conclusions first, dense prose. Prices in USD with the native currency alongside.

OUTPUT (all inside ./december-plan/)

CSV files (UTF-8, one row per entity, "unknown" rather than blank):
- cozumel/operators.csv, cozumel/lodging.csv, cozumel/flights.csv
- egypt/operators.csv, egypt/lodging.csv, egypt/flights.csv
- Operator columns: operator, base, padi_rating, website, open_on_dates, boats_and_capacity, max_divers_per_boat, instructor_ratio, ow_price, aow_price, eanx_price, fun_2tank_price, signature_trip_prices, gear_rental, nitrox, fees, refresher_policy, weather_policy, group_rate, leader_free_places, deposit_terms, cancellation_terms, payment_options, price_flag, sources, access_date, confidence, notes

Plans and drafts:
- cozumel/plan.md and egypt/plan.md, each opening with a 3–5 line Conclusions block. Cover: itinerary per group, operators and lodging to approach, risks.
- Outreach drafts in cozumel/outreach/ and egypt/outreach/.
- shared/rules_risk.md and shared/email_student_life.md.

pricing/december_pricing.xlsx
- A plain, simple draft:
  - inputs grouped at the top;
  - section headings and sub-headings, with spacing between blocks;
  - gridlines off and minimal formatting;
  - no source notes on the sheets (sources go in pricing/sources.csv).
- Content:
  - all-in price per person for each group (beginner, certified, advanced), for each version, at 20, 30 and 40 people;
  - the cost of my place under three approaches: operator free places only; free places plus a disclosed per-head charge; per-head charge only;
  - sensitivity to airfares and to MXN and EUR exchange rates (state the rate and date used);
  - break-even group size;
  - a deposit schedule matched to the operators' terms.

DECISION_MEMO.md
- One screen per version.
- A head-to-head table covering: all-in price by group, door-to-door travel time, days of diving, beginner suitability, highlights for certified and advanced divers, weather risk, approval and insurance friction, exam overlap, capacity.
- Your recommendation with a confidence level, and the decisions I must make.

HANDOVER.md
- What was done and a file map.
- An assumptions register and a source index.
- Known gaps.
- My next actions, with suggested dates.

---

# Scope change, 21 Sep 2026

GO, with scope changes.

Read december-plan/BRIEF.md and december-plan/shared/phase0.md first. Where this message conflicts with BRIEF.md, this message wins. Append this message to BRIEF.md under "Scope change, 21 Sep 2026". If december-plan/ isn't in your working tree, check out branch claude/wharton-outdoors-scuba-dec-5ley3f first.

0. WEB ACCESS
- Retest a fetch of https://www.redsea-divingsafari.com/price-lists/marsa-shagra/euro-winter-26-27. If it works, proceed normally.
- If fetch is still blocked, don't stall. Proceed search-only:
  - record each search result's URL and snippet as the source;
  - flag figures taken from snippets as ADVERTISED (snippet);
  - flag anything you couldn't confirm as QUOTE NEEDED;
  - write every gap into the outreach emails so the operators fill it.

1. NEW SCOPE: THREE SEPARATE TRIPS, EACH PLANNED ON ITS OWN (not alternatives)

A. Thanksgiving: 10 certified divers.
   - Dates: price both options.
     - Wed 25 – Sun 29 Nov 2026 (preferred).
     - Thu 19 – Tue 24 Nov. Note the class days missed and the clash with the Colombia trek, which draws on the same travellers.
   - Primary destination: south-west Puerto Rico, based in La Parguera. Diving on the Wall, plus Desecheo Island from Rincón if the weather allows, and a bioluminescent-bay evening.
   - Variant to price side by side: Tiger Beach, Grand Bahama. Day boats run from Old Bahama Bay. Leads to verify:
     - Neal Watson historically charged $399 plus 12% VAT per shark day;
     - the dives are baited;
     - sales are final, with a weather credit;
     - a full wetsuit is needed in low-70s °F water;
     - flights go via Fort Lauderdale, or take the ferry from there.

B. December: Cozumel only, as in BRIEF.md: Tue 8 – Tue 15 Dec, plus the Tue 8 – Sun 13 version. Drop the December Egypt version.

C. January: Egypt, Sat 2 – Sat 9 Jan 2027 door to door, land-based only.
   - Decide the base for this 7-night window, where transfer time now matters more: Sharm el-Sheikh vs Marsa Alam / Marsa Shagra vs Hurghada / El Gouna.
   - January is Marsa Shagra's low season. Full board, per person per night sharing: Royal Tent €78, Deluxe Chalet €113. Verify.
   - Also price an open-jaw ending in Europe for people going on to Euroski. Check Euroski's 2027 dates and resort.

2. CORRECTIONS FROM PHASE 0 (adopt them)
- The Cozumel marine park fee is now $15 a day and is not included in Blue Note's course price.
- American flies a Saturday-only nonstop from Philadelphia to Cozumel in winter. Note it; it doesn't fit the December dates.
- Marsa Shagra's free places go to the 11th, 21st and 30th guest and cover room, transfers and diving only.
- Allianz lists Egypt as an Impacted Country under the 28 Feb 2026 known-event exclusion.

3. ANSWERS TO YOUR QUESTIONS
- Budget ceilings, per person, all-in including flights. Flag anything over.
  - Thanksgiving: $1,500. Show Tiger Beach's extra cost separately.
  - Cozumel: $2,000 for certified divers, $2,300 for beginners.
  - Egypt: $2,700.
- Nationality mix is unknown. Check entry rules for US, Canadian, UK, EU, Indian, Chinese, South Korean and Brazilian passports.
- Me: cost me as a diving participant whose place is covered by operator free places where available. Leave any teaching role out of the numbers.
- Group sizes:
  - Thanksgiving: 8, 10, 12.
  - Cozumel: 20, 30, 40, about half beginners.
  - Egypt: 15, 20, 25, about half beginners.

4. WORKSTREAMS
Run these as subagents, at most five at once. Brief each one fully and include the RULES and OUTPUT sections from BRIEF.md.
- W1: Cozumel diving, as in BRIEF.md.
- W2: Cozumel accommodation and travel, as in BRIEF.md.
- W3: Egypt base and diving, as in BRIEF.md, but for 2–9 Jan.
- W4: Egypt accommodation and travel, as in BRIEF.md, but for 2–9 Jan, including the Euroski open-jaw.
- W5: Thanksgiving.
  - Puerto Rico: operators (Paradise Scuba La Parguera and others), lodging in La Parguera, car hire, flights to San Juan and Aguadilla for both date options, and a day-by-day plan.
  - Tiger Beach variant: operators (Neal Watson, Epic Diving, West End Watersports), Old Bahama Bay or alternatives, flights or the ferry.
  - Outreach drafts for both.
- W6: Rules, risk and money for all three trips. Same scope as workstream 5 in BRIEF.md, plus:
  - entry rules for the Bahamas and Puerto Rico;
  - whether club rules allow trips on class days, which affects the 19–24 Nov option.

5. OUTPUT CHANGES
- Rename egypt/ to january/ and add thanksgiving/.
- The pricing workbook covers all three trips, in the same plain style.
- DECISION_MEMO.md: one screen per trip covering:
  - recommended dates;
  - operators and lodging to request quotes from;
  - price bands per person by group;
  - minimum viable numbers;
  - top risks.
  For Thanksgiving, add a Puerto Rico vs Tiger Beach head-to-head.
- HANDOVER.md as before.

---

# Scope change, 22 Sep 2026

Let's lock in those three as tentative. I know want to move beyond drafts. Move Cozumel to 6 nights. That means securing accommodation and operator potential. I want you to source those, draft emails, and send them through mcp. Be casual, friendly and brief in the email. Give Wharton context, also that I'm a former padi MSDT leading the trip. Make sure to ask to start a conversation around a book grouping and pricing structure. We don't yet know exact numbers but give them guidance. The next milestone I want us to get to is having concrete bookable options for all of these trips so I can trigger them when ready. I also want you to start managing this yourself with cowork or triggered/scheduled agents. Tell me what you need to do that
