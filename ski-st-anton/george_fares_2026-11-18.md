# George – live fares check (18 Nov 2026)

All prices: 1 adult, economy, one-way. Checked **18 Nov 2026, 20:14–20:16 UTC** (Wizz API 20:14–20:15; Google Flights 20:15).
"Live" = a real date-specific search result for that exact date (not a calendar/estimate). Google Flights prices are live
aggregator results (lowest fare it found); they are not airline-confirmed and can change at booking. Lowest fares are basic
fares: **no checked bag** and, for easyJet/Wizz/Pegasus/AJet, **under-seat bag only** (Google flags "price does not include
overhead locker access").

## 1. London -> Sharm el Sheikh (SSH), Sun 3 Jan 2027

| Carrier | Flight | Route | Dep–Arr (local) | Fare | Source / liveness |
|---|---|---|---|---|---|
| easyJet | U2 2619 | LTN–SSH nonstop | 10:40–18:00 | **£113** | Google Flights, live for date |
| Wizz Air UK | W9 5315 | LTN–SSH nonstop | 12:25–19:55 | **£112.99** (Wizz API) / £113 (GF) | Wizz be.wizzair.com timetable API, live for date; confirmed on GF |
| easyJet | U2 8741 | LGW–SSH nonstop | 08:15–15:25 | **£116** | Google Flights, live |
| TUI Airways | BY 406 | LGW–SSH nonstop | 13:25–20:40 | £241 | Google Flights, live |
| Pegasus | PC 1164 + PC 636 | STN–SAW–SSH | 09:30–23:30 (5h40 stop) | £141 | Google Flights, live |
| Pegasus | PC 1162 + PC 636 | STN–SAW–SSH | 13:15–23:30 (1h55 stop) | £190 | Google Flights, live |
| Pegasus | (17:25 dep) | STN–SAW–SSH | 17:25–02:55 (+1) | £161 | Google Flights, live |
| AJet | VF 1988 + VF 255 | STN–SAW–SSH | 12:30–01:35 (+1) | £219 | Google Flights, live |
| EgyptAir | MS 778 + MS 20 | LHR–CAI–SSH | 14:00–23:30 | £547 | Google Flights, live |
| EgyptAir | MS 784 + MS 28 | LHR–CAI–SSH | 09:40–21:50 | £541 | Google Flights, live |

**Who flies London–SSH on a Sunday:** easyJet (LGW and LTN), Wizz Air (**LTN only**; Wizz LGW–SSH does *not* operate
Sundays – LGW days per Wizz flightDates API: Mon/Tue/Thu/Fri/Sat), TUI (LGW), plus one-stops on Pegasus/AJet (STN via
Istanbul SAW) and EgyptAir (LHR via Cairo). No BA nonstop shown.
Wizz London fares on surrounding days for reference: LGW £103.99 most days; LTN Sun £112.99.

Sources:
- Wizz API: `POST https://be.wizzair.com/29.25.0/Api/search/timetable` (LTN/LGW–SSH) and `GET .../Api/search/flightDates`.
  (Wizz's per-date `/Api/search/search` endpoint returned HTTP 429/bot-blocked, so bundle/fee breakdown not available.)
- https://www.google.com/travel/flights?q=Flights%20from%20London%20to%20SSH%20on%202027-01-03%20one%20way&curr=GBP
- https://www.google.com/travel/flights?q=Flights%20from%20LHR%20to%20SSH%20on%202027-01-03%20one%20way%20on%20EgyptAir&curr=GBP
- easyJet direct API (`easyjet.com/ejcms/...`) returned 403 (Akamai); book/verify at https://www.easyjet.com/en/

## 2. Sharm el Sheikh -> Zurich, Fri 8 Jan 2027

| Carrier | Flight | Route | Dep–Arr | Fare | Notes |
|---|---|---|---|---|---|
| **Edelweiss** (codeshare SWISS LX 8141) | **WK 141** | SSH–ZRH nonstop, A320 | **19:10–22:55** | **CHF 268** | Google Flights, live. Lowest fare = Economy Light (no checked bag). Only nonstop; SWISS mainline does not fly SSH. |
| AJet | via SAW | SSH–SAW–ZRH | 03:30–13:05 | CHF 238 | cheaper, but 03:30 departure |
| Pegasus | PC 569 + PC 949 | SSH–SAW–ZRH | 04:10–13:50 | CHF 253 | cheaper, 04:10 dep |
| Turkish | TK 701 + TK 1909 | SSH–IST–ZRH | 11:15–17:45 | CHF 320 | best-timed one-stop |
| Turkish | TK 699 + TK 1913 | SSH–IST–ZRH | 04:55–13:45 | CHF 320 | |
| EgyptAir + SWISS | MS 23 + LX 239 | SSH–CAI–ZRH | 11:05–16:30 | CHF 775 | |

Cheaper one-stops landing by midnight exist (AJet CHF 238, Pegasus CHF 253) but only save CHF 15–30 and need a ~03:30–04:10
departure. Edelweiss nonstop is the practical choice.
Source (checked 20:15 UTC): https://www.google.com/travel/flights?q=Flights%20from%20SSH%20to%20ZRH%20on%202027-01-08%20one%20way&curr=CHF
Book direct: https://www.flyedelweiss.com/en (not fetched: JS-only booking).

## 3. Zurich -> London, Sat 16 Jan 2027, departing after 15:00

| Carrier | Flight | Route | Dep–Arr | Fare |
|---|---|---|---|---|
| SWISS | LX 324 | ZRH–LHR | 15:30–16:20 | £81 |
| **British Airways** | **BA 715** | ZRH–LHR | **15:40–16:25** | **£65** |
| British Airways | BA 717 | ZRH–LHR | 16:40–17:25 | £65 |
| SWISS (Helvetic) | LX | ZRH–LHR | 17:00–17:50 | £81 |
| SWISS (op. Edelweiss) | LX | ZRH–LGW | 17:05–17:50 | £105 |
| SWISS (Helvetic) | LX | ZRH–LHR | 18:25–19:15 | £81 |
| British Airways | BA 719 | ZRH–LHR | 18:45–19:30 | £65 |
| British Airways | BA 721 | ZRH–LHR | 19:10–19:55 | £65 |
| SWISS | LX 340 | ZRH–LHR | 20:55–21:40 | £81 |

easyJet: the only Saturday easyJet ZRH–London flight shown is **U2 1541 ZRH–STN 13:20–14:15, £32** – i.e. *before* 15:00;
no easyJet after 15:00 that day. All live Google Flights results, checked 20:15 UTC; lowest fares (BA Basic / SWISS Light =
hand baggage only, no checked bag – relevant with ski kit).
Source: https://www.google.com/travel/flights?q=Flights%20from%20ZRH%20to%20London%20on%202027-01-16%20one%20way&curr=GBP

## 4. London -> Philadelphia

**Mon 18 Jan 2027** (only two nonstops, both LHR; nothing nonstop from LGW):

| Carrier | Flight | Dep–Arr | Fare |
|---|---|---|---|
| American | **AA 729** (B787; codeshare BA 1588) | LHR 10:35 – PHL 13:40 | **£439** |
| British Airways | **BA 67** (A350; codeshare AA 6912) | LHR 13:10 – PHL 16:15 | **£439** |
| BA/AA via Dublin | | LHR 06:30 – 14:00 | £419 (1 stop) |
| United via ORD | UA 928 + UA 1776 | LHR 13:35 – 21:40 | £473 |

**Sun 17 Jan 2027** (comparison): AA 729 10:35–13:40 **£481**; BA 67 13:10–16:15 **£481**. Monday is ~£42 cheaper.
Lowest fares are likely Basic Economy (no checked bag, no seat choice) – confirm fare brand when booking.
Sources (live, checked 20:15 UTC):
- https://www.google.com/travel/flights?q=Flights%20from%20London%20to%20PHL%20on%202027-01-18%20one%20way&curr=GBP
- https://www.google.com/travel/flights?q=Flights%20from%20London%20to%20PHL%20on%202027-01-17%20one%20way&curr=GBP

## 5. Trains (ÖBB HAFAS timetable, live for the dates; checked 20:13–20:14 UTC)

**Sat 9 Jan 2027, Zürich Flughafen -> St. Anton am Arlberg (morning):**

| Dep | Arr | Time | Changes | Trains |
|---|---|---|---|---|
| 08:15 | 11:01 | 2h46 | 1 | IR 2110 to Zürich HB (08:26), **EC 163** Zürich HB 08:40 → St. Anton 11:01 |
| 09:43 | 12:41 | 2h58 | 1 | EC 99 to Bregenz (11:00), ICE 1221 11:06 → St. Anton 12:41 |
| 10:15 | 13:01 | 2h46 | 1 | IR 2114 to Zürich HB, **RJX 165** Zürich HB 10:40 → St. Anton 13:01 |
| (06:51 / 08:51 / 10:51 options via St. Gallen–Bregenz, 3 changes, 3h20–4h04 – avoid) |

**Sat 16 Jan 2027, St. Anton -> Zürich Flughafen (midday):**

| Dep | Arr | Time | Changes | Trains |
|---|---|---|---|---|
| 10:57 | 13:44 | 2h47 | 1 | **RJX 368** St. Anton → Zürich HB 13:20, IR 2121 → Flughafen 13:44 |
| 12:57 | 15:44 | 2h47 | 1 | **RJX 160** → Zürich HB 15:20, IR 2125 → Flughafen 15:44 |
| 14:57 | 17:44 | 2h47 | 1 | RJX 162 → Zürich HB 17:20, IR 2129 → Flughafen 17:44 |

Note: for a 15:30–15:40 flight on 16 Jan, take the **10:57** (arr 13:44); the 12:57 arrives 15:44 – too late.

**Fares: NOT obtained live.** ÖBB ticket shop (shop.oebbtickets.at) returns Cloudflare 403; DB (int.bahn.de) API returns
OPS_BLOCKED; SBB has no open price API. Aggregator indications only (Omio, undated): Zürich HB–St. Anton from ~£18–23,
typical ~£46–70. ÖBB "Sparschiene" discounted fares are released ~6 months ahead, so they should be bookable now.
Direct booking links for the exact trains:
- 9 Jan 08:15: https://shop.oebbtickets.at/en/ticket?cref=scotty&connectionDatetimeDeparture=2027-01-09T08:15&connectionDatetimeArrival=2027-01-09T11:01&connectionOrigEva=8503016&connectionDestEva=8100064&stationOrigName=Z%C3%BCrich%20Flughafen&stationDestName=St.Anton%20am%20Arlberg
- 16 Jan 10:57: https://shop.oebbtickets.at/en/ticket?connectionDatetimeDeparture=2027-01-16T10:57&connectionDatetimeArrival=2027-01-16T13:44&connectionOrigEva=8100064&connectionDestEva=8503016
- SBB alternative: https://www.sbb.ch/en (search Zürich Flughafen → St. Anton am Arlberg)

Caveat: transport.opendata.ch (Swiss open data) returned bus-only routings via Feldkirch/Bludenz for these dates, i.e. it lacks
Austrian rail data; ÖBB's own planner (above) shows the normal direct EC/RJX services, which is authoritative.
