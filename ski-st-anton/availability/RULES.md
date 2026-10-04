# Availability check rules (round 3: corrected dates)

**DATES CORRECTED on 5 Oct 2026: the trip is Sat 9 – Sat 16 Jan 2027, 7 nights.** Round 2 (files ending `_4-9jan.csv`) checked the wrong dates. Saturday-to-Saturday weekly lets now fit, so whole houses and chalets are back in play.

Trip: 10–15 Wharton MBA students skiing St Anton am Arlberg. Check-in **Sat 9 Jan 2027**, check-out **Sat 16 Jan 2027** (7 nights). Plan for 12 people, and note whether each option could stretch to 15. Couples share doubles; everyone else is happy in multi-bed rooms (twins, triples, quads, bunks). Breakfast included is a plus, dinner is not wanted, and a kitchen is a plus. Budget matters most: target roughly €50–90 per person per night, but report everything that is actually available, with its price.

Areas the organiser wants, in order of preference: **St Anton itself (centre, Oberdorf, Gastig, Moos)**, then **Nasserein**, then **St Jakob**. Ignore Pettneu, Flirsch and everywhere else.

Background research (prices from snippets, not checked against dates) is in `/home/user/George-Jeffreys/ski-st-anton/lodging.csv`. Use it as a lead list, not as truth.

## Web access

Full outbound web access is now on. Use:
- `curl` (with a normal desktop User-Agent) and WebFetch to read pages, booking engines and availability calendars.
- `python3 /home/user/George-Jeffreys/ski-st-anton/tools/airbnb_search.py "<airbnb search url>"`. It returns Airbnb listings with prices for the exact dates. If the price qualifier is anything other than "for 7 nights", Airbnb is suggesting different dates, so treat the listing as **not available** for ours. Try several searches:
  - adults=12, 10 and 6 (two 6-person flats near each other also work);
  - with a map box around your area (`&search_by_map=true&ne_lat=..&ne_lng=..&sw_lat=..&sw_lng=..`);
  - with `&room_types[]=Entire%20home%2Fapt`.
- Property sites often embed a booking engine (Feratel/Deskline, Seekda, Bookingsuedtirol, Easybooking, Casablanca, Booking.com widget, Smoobu, Lodgify). Look in the page source for the engine's availability or price API and query it for 2027-01-09 to 2027-01-16.
- Do not try to run a headless browser, and do not disable or bypass TLS certificate checks. If a site only works in a real browser, record the link for the organiser to check by hand.
- Do not submit enquiry forms, send emails or start bookings. Read only.

## What to record

For every property, record one of these statuses:
- **AVAILABLE**: a bookable date-specific price was seen for 9–16 Jan.
- **AVAILABLE_PARTIAL**: some rooms or units are free, but not enough for the group.
- **UNAVAILABLE**: the calendar shows our dates booked, or the platform only offers other dates.
- **MIN_STAY_CONFLICT**: the property is free but needs a different changeover day (e.g. Sunday) or a longer stay. Give the price for the nearest stay it does allow.
- **ON_REQUEST**: the property has no online engine and must be asked.
- **UNKNOWN**: the check failed; say why.

Write a CSV to the path you are given, with these columns:

property,area,platform_or_engine,listing_url,status,checked_how,sleeps,room_layout,total_price_eur_7_nights,price_includes,pp_per_night_eur_at_12,pp_per_night_eur_at_15,breakfast,kitchen,walk_or_bus_to_lift,min_stay_or_changeover,cancellation_policy,checked_at_utc,notes

Notes on the columns:
- **price_includes**: say whether the price includes cleaning, service fees and the €5 per person per night tourist tax.
- **pp_per_night_eur_at_12**: total price ÷ 7 ÷ 12. Use n/a if the property can't take 12.
- **checked_at_utc**: the time you checked.

Cheapest available options first. Put UNAVAILABLE rows at the bottom; they are worth keeping as negative evidence.

## Final reply

At most 200 words:
- the top five options actually available, with price per person per night and why;
- how tight availability looks in your area;
- anything the organiser must check by hand, with links.
