# Handover — Wharton Outdoors Club dive trips, 2026–27

Prepared 21 Sep 2026, updated 22 Sep 2026 (Cozumel 6 nights, final emails, tracker, routine) on branch `claude/wharton-outdoors-scuba-dec-5ley3f`. Read `DECISION_MEMO.md` first; this file says how the work was done, what it rests on, and what to do next.

## 1. What was done

Phase 0 verified the date anchors and found that web fetch is blocked in this environment; only web search works. You replied "go" with a scope change (three separate trips: Thanksgiving, Cozumel, Egypt in January). Phase 1 ran six research subagents by web search only, each briefed with the RULES and OUTPUT sections of the brief. Every figure they produced is therefore from a search-result snippet of the named source (ADVERTISED (snippet)), an unverified lead (QUOTE NEEDED) or an estimate (INFERRED); no operator, hotel, airline or university page was read in full. Two subagents ran out of search budget mid-task; the Thanksgiving subagent had none at all, so I ran its key searches myself and had it fold the results into its files. I then reconciled the numbers, fixed exchange rates, built the pricing workbook, checked every memo figure against the workbook and `pricing/sources.csv`, and wrote the memo.

Nothing was sent, booked or paid. No accounts were created.

## 2. File map

| Path | What it is |
|---|---|
| `BRIEF.md` | Your original prompt verbatim, plus the 21 Sep scope change appended |
| `DECISION_MEMO.md` | One screen per trip, recommendation, decisions for you |
| `HANDOVER.md` | This file |
| `shared/phase0.md` | Dates table, web-access result, brief corrections, questions (Phase 0) |
| `shared/rules_risk.md` | Wharton/Penn rules (documented, analogue, ask), Penn Global, entry rules by passport, dive and trip insurance, Egypt known-event issue, chambers, payments, risk registers, source index |
| `shared/email_student_life.md` | Ready-to-send email to MBA Student Life with twelve questions |
| `cozumel/plan.md` | Operators ranked, itineraries per group for 7 and 5 nights, capacity analysis, norther contingency |
| `cozumel/travel.md` | Hotels ranked with pp/night, flights, Cancún + ferry alternative, group air desks, transfers |
| `cozumel/operators.csv`, `lodging.csv`, `flights.csv` | One row per entity with sources and flags |
| `cozumel/outreach/` | 8 operator emails and 5 hotel emails |
| `january/plan.md` | Base decision (Marsa Shagra, ~70 percent), base comparison, operators ranked, itineraries, capacity, weather |
| `january/travel.md` | Lodging at Marsa Shagra and Hurghada, flights via Europe, Euroski open-jaw, visas by passport, transfers |
| `january/operators.csv`, `lodging.csv`, `flights.csv` | As above |
| `january/outreach/` | 5 operator emails and 3 hotel emails |
| `thanksgiving/plan.md` | Puerto Rico plan, Tiger Beach variant, head-to-head, class days and Colombia clash, moon phase |
| `thanksgiving/operators.csv`, `lodging.csv`, `flights.csv` | As above |
| `thanksgiving/outreach/` | 6 operator emails and 2 lodging emails |
| `pricing/december_pricing.xlsx` | Inputs sheet (blue cells), then Cozumel, January, Thanksgiving and Summary sheets; 570 formulas, recalculated, no errors |
| `pricing/sources.csv` | One row per workbook input: value used, flag, URL, access date |
| `pricing/build_pricing.py` | Regenerates the workbook from code; run it, then recalc, after changing inputs |
| `cozumel/outreach/final/` | Five ready-to-send Cozumel emails with recipient addresses (22 Sep) |
| `TRACKER.md` | Live pipeline tracker for all three trips; the scheduled routine reads and updates it |

Workbook notes: gridlines off, Arial, no source notes on the sheets. Change any blue cell on Inputs and every sheet updates. Each trip sheet has: per-person build-up by group; organiser place under three approaches; airfare and exchange-rate sensitivity; break-even group size; a draft deposit schedule. The Summary sheet shows all-in and core prices against your ceilings.

## 3. Assumptions register

| # | Assumption | Where used | Risk if wrong |
|---|---|---|---|
| A1 | Ceilings are all-in including meals (USD 35/day where not on full board), tips (USD 50) and DAN cover (USD 119). Core figures exclude these. | All sheets | Changes whether Cozumel and Puerto Rico "fit" |
| A2 | USD 1 = MXN 17.23 and EUR 1 = USD 1.1465, mid-market 21 Sep 2026 | Inputs | ±10 percent moves Egypt by about USD 130 |
| A3 | Flights at the midpoint of aggregator bands; no exact-date fare was visible | All sheets | Thanksgiving-week and January fares could sit at the top of the band |
| A4 | Two sharing throughout; 3-sharing rates are inferred | Lodging | Triples cut lodging by roughly a quarter |
| A5 | Cozumel: one free diving place per 10 paying (nobody publishes this) | Cozumel C | Organiser charge rises by about USD 40 a head at 20 |
| A6 | Egypt: six nights on the ground (arrive Sun 3, leave Sat 9); the January subagent's 7-night figures were restated | January | None if RSDS prices per night |
| A7 | Egypt: all euro prices are the brief's leads; the winter 26-27 list could not be read; 1–10 Jan assumed not a feast period | January | Deposit could become 100 percent non-refundable |
| A8 | Egypt transfers from Hurghada (3 h) unless RMF proves bookable | January A | RMF cuts transfer cost but raises airfare |
| A9 | Beginners' eLearning bought from PADI (USD 195) for Cozumel; through RSDS e-code (EUR 94) for Egypt | Inputs | Small |
| A10 | Certified Cozumel divers take the 5-day/10-dive Blue Note package price as the island benchmark | Cozumel | Dive Paradise's price is unknown |
| A11 | Advanced group = certified costs plus AOW, six nitrox fills and one night dive; no Deep/Drift specialties | Cozumel, January | Advanced could cost more |
| A12 | Thanksgiving cars: one per four people at USD 70/day plus USD 60 fuel and tolls | Thanksgiving | Small |
| A13 | Tiger Beach at Neal Watson's 2021 price (USD 399) plus 10 percent VAT; Old Bahama Bay at USD 250/room | Thanksgiving C, D | 2026 price unknown; rooms run to USD 600 |
| A14 | Wed 25 Nov 2026 is a class day and Thu 26 – Sun 29 is break, by analogy with 2025-26 | Thanksgiving | Student Life may treat it differently |
| A15 | The Colombia trek runs about 17–23 Nov as in 2024 | Thanksgiving | If it moves, the clash moves |
| A16 | Outreach emails are signed "George Jeffreys" (surname inferred from the repository name) with placeholder contact lines | outreach/ | Edit before sending |
| A17 | You are costed as a certified diving participant; no teaching role | Organiser sections | None |

## 4. Source index

`pricing/sources.csv` lists the source for every number in the workbook and memo (78 rows). The per-trip CSVs carry a `sources` column per operator, hotel and routing. `shared/rules_risk.md` section 9 indexes about 45 rule, entry, insurance and chamber sources. Access date for everything is 21 Sep 2026. Primary pages that matter most and were not read: the Marsa Shagra winter 26-27 euro price list and its General Notes; Blue Note's prices page; Dive Paradise's 2026 rates PDF; the Wharton 2026-27 MBA session calendar; the Aruba trek RSVP page; the WGA finance pages (PennKey).

## 5. Known gaps

1. No verified price list for Egypt: every euro figure, the deposit rule for early January, single supplements and the transfer and visa-service fees are QUOTE NEEDED.
2. No exact-date airfares for any trip and no airline group deposit amounts; Thanksgiving-week PHL–SJU is the biggest swing.
3. No Cozumel operator states instructor numbers for 10–20 students, boat allocation for 30–40 people, group rates, leader places, deposit sizes or insurance certificates. Dive Paradise, Sand Dollar, Salty Endeavors and Scuba Club Cozumel have no readable Open Water price.
4. No hotel publishes block, deposit or cancellation terms; Scuba Club Cozumel has no readable price at all.
5. Euroski 2027 dates and resort are unconfirmed (page shows 6–12 Jan, St. Anton, no year).
6. Neal Watson's 2026 price and VAT line; whether Epic Diving offers anything land-based; Bahamasair timings against an early PHL departure; Baleària sailing days on 25 and 29 Nov.
7. MBA club-travel rules: class-day and exam-day rules, partner eligibility, whether a recreational dive trip is an approvable trek, money handling and free-place disclosure. All in the Student Life email.
8. Egypt cancellation insurance: no insurer confirmed to write Egypt trip cancellation for policies bought now; CFAR is the fallback.
9. Aruba 2024 precedent (dates, 25 people, USD 575 deposit) unverified; the operator and its terms would be the best precedent.
10. Official e-visa eligibility for Indian, Chinese, Brazilian and South Korean passports rests on secondary sources.
11. Chamber capability at Mayagüez and on Grand Bahama unconfirmed.

## 6. Your next actions

| When | Action |
|---|---|
| Tue 22 Sep | Send `shared/email_student_life.md`. Check Path@Penn for Q2 elective exam dates 10–17 Dec and ask the Ski Club for Euroski 2027 dates. Confirm Colombia trek 2026 dates on CampusGroups. |
| Tue 22 – Wed 23 Sep | Send the Thanksgiving emails (Paradise Scuba, Taino Divers, Parador Villa Parguera, Parguera Plaza). Ask AA Group Travel for a 10-seat PHL–SJU hold on 25 and 29 Nov. Decide on Tiger Beach as an opt-in. |
| Wed 23 – Thu 24 Sep | Send the Cozumel emails: Dive Paradise and Hotel Cozumel & Resort first, then Blue Note, Sand Dollar, Aldora, Casa Mexicana. Ask each for 20/30/40 and instructor numbers. |
| Thu 24 – Fri 25 Sep | Send the Egypt emails: Red Sea Diving Safari first (price list, feast-period rule, free places, capacity), then Emperor Port Ghalib and Blue Ocean. Ask Lufthansa Group desk for 15/20/25 PHL–HRG on 2 and 9 Jan. Ask Squaremouth or a broker which insurers will write Egypt cancellation with CFAR. |
| by Fri 2 Oct | Publish Thanksgiving sign-up (deposit USD 400) if Student Life has not objected to Wed 25 Nov. |
| by Fri 9 Oct | Publish Cozumel sign-up (deposit USD 600) once one operator confirms capacity and a hotel confirms a block. Last day for Blue Magic's full-refund window if used. |
| by Fri 16 Oct | Publish Egypt sign-up (deposit USD 700) once RSDS confirms its deposit rule for early January and an insurer confirms cover. |
| Fri 6 Nov | Balances due for Thanksgiving and Cozumel. |
| Fri 20 Nov | Balance due for Egypt; Lufthansa names by Sat 19 Dec. |

When quotes arrive, overwrite the blue cells on the Inputs sheet and change the flag column; the memo tables should then be regenerated from the Summary sheet.
