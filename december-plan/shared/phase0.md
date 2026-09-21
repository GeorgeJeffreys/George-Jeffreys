# Phase 0 report — December 2026 scuba trek

Access date for everything below: 21 Sep 2026. Web search works; web fetch does not (details in section 2). Every fact here therefore rests on search-result snippets of the named source, not on the page itself, and is flagged accordingly.

## 1. Date anchors

| Anchor | Brief says | Found | Status | Source |
|---|---|---|---|---|
| Wharton Q2 / full-semester core exam period | Wed 2 – Mon 7 Dec 2026, tentative | Wed 2 – Mon 7 Dec 2026. Page states the schedule is tentative and departments may add or remove exams within the window | VERIFIED (snippet) | https://mba-inside.wharton.upenn.edu/fall-2026-core-exam-schedule/ |
| Wharton Q1 core exams (context) | not stated | Tue 6 – Fri 9 Oct 2026 | VERIFIED (snippet) | same page |
| Penn final exam period | Thu 10 – Thu 17 Dec | Thu 10 – Thu 17 Dec 2026, excluding weekends. Postponed-exam period Thu 21 – Wed 27 Jan 2027. Instructor deadline to request an in-person final was Fri 4 Sep 2026, so the Registrar's room schedule is probably already on Path@Penn | VERIFIED (snippet) | https://srfs.upenn.edu/registration-catalog-calendar/final-exams |
| Cozumel dates | Tue 8 – Tue 15 Dec; short version Tue 8 – Sun 13 | Weekdays check out (Python calendar) | VERIFIED | local calculation |
| Egypt dates | about Tue 8 – Wed 16 Dec | Weekdays check out | VERIFIED | local calculation |
| Aruba precedent | Tue 10 – Sun 15 Dec 2024, 25 people, $575 deposit | An event "Winter 2024 Aruba Scuba Diving Trek – Outdoors Club" exists on CampusGroups; the snippet confirms only the name and purpose. Dates, headcount and deposit not confirmed; weekdays for 10 and 15 Dec 2024 are correct | UNVERIFIED (page blocked) | https://groups.wharton.upenn.edu/rsvp?id=119202 |
| Marsa Shagra winter 26-27 price list validity | not stated | List exists, titled "Euro Winter 26-27 (01/11/2026 – 30/04/2027), Foreigners/Non-Residents". No prices visible in snippets | PARTLY VERIFIED | https://www.redsea-divingsafari.com/price-lists/marsa-shagra/euro-winter-26-27 |
| Insurance known-event date | 28 Feb 2026 | Allianz and Squaremouth both date the Middle East war as a known event from 28 Feb 2026 | VERIFIED (snippet) | https://www.allianztravelinsurance.com/coverage-alerts/war-in-middle-east-surrounding-region.htm |

Exam overlap, counting Penn final-exam weekdays only (the period excludes weekends):

| Version | Away | Exam weekdays overlapped | Which |
|---|---|---|---|
| Cozumel, 7 nights | Tue 8 – Tue 15 Dec | 4 | Thu 10, Fri 11, Mon 14, Tue 15 |
| Cozumel, short | Tue 8 – Sun 13 Dec | 2 | Thu 10, Fri 11 |
| Egypt | Tue 8 – Wed 16 Dec | 5 | Thu 10, Fri 11, Mon 14, Tue 15, Wed 16 |

Core exams end Mon 7 Dec, so a Tue 8 departure is possible for everyone, but anyone with a Mon 7 exam gets no buffer; a Mon-evening flight to Cancún is not realistic.

## 2. Web-access result

- WebSearch: works. Returns titles, URLs and a short snippet-based summary. Good enough to confirm that a page exists and to pull headline figures that appear in the snippet.
- WebFetch: blocked on every domain tried, with the error "blocked by the network egress proxy". Tried: redsea-divingsafari.com, bluenotescuba.com, bluemagicscuba.com, scubatony.com, mba-inside.wharton.upenn.edu, srfs.upenn.edu, groups.wharton.upenn.edu, almanac.upenn.edu, travel.state.gov, padi.com, en.wikipedia.org.
- curl from the shell: also blocked (CONNECT tunnel 403) for the same pages. The shell's request to read the proxy status page was denied by the permission classifier, so I could not read the policy itself.
- Consequence for Phase 1: subagents can discover pages and headline figures but cannot read price lists, PDFs, booking terms, cancellation clauses, calendars or advisories in full. Expect a much higher share of QUOTE NEEDED rows and no verified deposit or cancellation terms unless access changes. This is the single biggest risk to the deliverable and is the first question below.
- Two ways to fix before "go": (a) change this session's environment network policy to allow outbound web access (see https://code.claude.com/docs/en/claude-code-on-the-web); or (b) save the key pages yourself as text or PDF into december-plan/shared/sources/ and commit them. The pages that matter most: the Marsa Shagra euro winter 26-27 price list and its General Notes; Blue Note's prices page; Blue Magic's dive-and-stay page; the Wharton 2026-27 MBA session calendar PDF; the Aruba trek RSVP page.

## 3. Things in the brief that look wrong, risky or missing

Wrong or out of date
- Blue Note park fee. The brief says Open Water at $400 includes marine park fees and that the fee is about $13 a day. Blue Note's 2026 prices page snippet says prices exclude the marine park entry fee of $15 (220 MXN). Treat the fee as excluded and budget $15 a day until the page is read. Blue Note's $400 plus eLearning (3 days: 2 shore, 1 boat) and $600 (MXN 10,500) for 5 days / 10 dives are confirmed by snippet.
- PHL–CZM nonstop. American runs a seasonal Saturday-only nonstop in winter (about 4 h 40 m). It does not help Tue 8 / Sun 13 / Tue 15, so the brief's practical conclusion stands, but "no nonstop" is not literally true. Phase 1 should check whether a Sat 12 Dec return is worth offering as a variant.
- Blue Magic. $884 confirmed as 7 nights at Hotel Plaza Cozumel plus 5 days of 2-tank morning dives, per person double occupancy, taxes (16 percent plus 5 percent) included, park fee and gear excluded. $1,143 applies 21 Dec 2026 – 31 Mar 2027. Our dates fall in the $884 band. Confirmed by snippet only.
- Marsa Shagra free places. Red Sea Diving Safari's rule is the 11th, 21st and 30th guest free (transfers, accommodation and dive package). That gives 1 free place at 20 people and 3 at 30, not "one per ten paying"; it does not cover flights, courses, excursions or the visa fee, and the rule beyond 30 guests is not stated. The €89 / €122 room rates and all other euro figures in the brief could not be checked because the price list page is blocked.

Risky
- Beginner capacity. PADI's standard is 8 students per instructor on open-water training dives and 10 in confined water, fewer in current or poor visibility. 10–22 beginners need 2–3 instructors and confined-water space simultaneously for three days. Cozumel's six-diver pangas and small shops cannot do this; only resort-based or multi-boat operators can. This will drive the shortlist more than price.
- Norther closures. The Port Captain closes the port at sustained winds above about 18 knots or 4-ft seas; boats over 48 ft are sometimes allowed out when small craft are not. Prefer operators with larger boats and shore-diving fallbacks.
- Egypt insurance. Allianz names Egypt as an "Impacted Country" for the Middle East war exclusion. That is wider than "war-related disruption": some insurers will not write Egypt trip cancellation at all for policies bought after 28 Feb 2026. Phase 1 must find at least one insurer that will, or the Egypt version needs refundable contract terms to be viable.
- Egypt advisory. Level 2 overall, Do Not Travel for North and Middle Sinai and parts of the Western Desert, with an explicit warning about fatal accidents on Red Sea dive boats. South Sinai resorts are excluded from the Level 4 zone, but "Sinai" will read badly to an approver; Marsa Alam or Hurghada avoids the optics.
- Wharton electives. Full-semester MBA electives can hold finals inside Penn's 10–17 Dec period. The brief treats the period as a flag only, but for second-years the clash may be disqualifying. The in-person schedule should be on Path@Penn now.
- Fly-after-dive. Fine for all versions as drafted (last dive Sun 13 before a Tue 15 flight; last dive Sat 12 before a Sun 13 flight, provided the Sunday flight departs after about 08:00). Egypt: last dive Mon 14, fly Tue 15.

Missing
- No numeric budget ceiling per person, and no statement of whether flights are booked individually or by the club.
- No conversion from the multi-select poll (83 responses) to expected paying heads.
- No nationality mix, which drives Mexico and Egypt visa work for international students.
- No word on whether you intend to teach or assist (your instructor status) or stay a customer; this affects liability, capacity and whether the operator will still give the leader's free place.
- No operator or agent from the Aruba trek, whose terms would be the best precedent.
- No exchange-rate policy. I will fix MXN and EUR rates on the Phase 1 access date and state them in the workbook.

## 4. Questions only you can answer

1. Web access: will you open outbound fetch on this environment, or paste the key pages into shared/sources/? Without one of these, Phase 1 delivers leads and QUOTE NEEDED rows rather than verified prices and terms.
2. What is the per-person ceiling you will publish, including or excluding flights? And does the club book flights, or do participants?
3. How many unique people do the 83 poll responses represent, and how many of them are second-years likely to have finals 10–17 Dec?
4. Rough nationality mix of likely participants (top five passports), so visa checks cover the right cases.
5. Do partners count for club approval and insurance, and can they attend without a student present?
6. Will you dive as a customer only? If you plan to teach or assist, is your PADI status current and insured?
7. Is a disclosed per-head organiser charge acceptable to the club, and what did the Aruba trek do?
8. Who ran the Aruba diving and lodging, and can you share their contract terms as the precedent?
9. Is the short Cozumel version a whole-trip alternative, or a second cohort leaving Sun 13 while the rest stay to Tue 15?
10. For Egypt, are you willing to accept a base that requires a 3-hour road transfer from Hurghada if Marsa Alam airport has no workable European connection on our dates?

Stopped here as instructed. Reply "go" to start Phase 1.
