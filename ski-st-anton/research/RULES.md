# Research rules for every St Anton accommodation agent

Trip: 10–15 Wharton MBA students (and maybe partners) skiing St Anton am Arlberg, Austria. Assumed dates: arrive Mon 4 Jan 2027, leave Sat 9 Jan 2027 (5 nights). Note: 6 Jan is Epiphany, a public holiday, and the Austrian/German school Christmas holidays end around then, so 4–6 Jan is still busy. The group wants to "shadow" the official Wharton ski club trip: same resort, same week, but booking independently.

Priorities, in order:
1. Budget. Cheapest decent option per person per night is what we want. Shared rooms and bunk rooms are fine.
2. The whole group sleeps under one roof (one big chalet/apartment house), or failing that, in rooms in one hotel/hostel.
3. Easy access to the lifts (Galzigbahn and Nassereinbahn in St Anton, Rendlbahn) and to St Anton nightlife.

Web access: WebSearch works. WebFetch and curl are mostly blocked by the network proxy (stantonamarlberg.com, airbnb.com tested and blocked). Try WebFetch once or twice on key pages, but expect to rely on search snippets. Do not spend more than about 40 searches.

Evidence flags. Tag every price and fact:
- ADVERTISED (snippet): seen in a search snippet from the named source
- ADVERTISED (page): read on the fetched page itself
- INFERRED: worked out from other facts (show how)
- PRIOR KNOWLEDGE: from your training, not checked; say so
- QUOTE NEEDED: must ask the property
Never present a guess as a fact. Prices: give the native currency (EUR) and USD at 1.17 USD per EUR, and say whether a price is for the whole property per night, per room or per person, and whether it was for the actual dates or a generic season rate. January 4–9 sits in many places' "high season" or "Christmas/New Year shoulder"; say which band applies if the source shows it. Note Austrian tourist tax (Ortstaxe / Gästetaxe, roughly EUR 3–5 per person per night) and final cleaning fees where known.

Output. Write a CSV at the path you are given, with exactly these columns (quote fields with commas):
property,area,type,sleeps_max,bedrooms_or_room_mix,website,rating,price_whole_property_per_night_eur,price_pp_night_eur_at_12,price_pp_night_usd_at_12,price_basis_and_season,min_stay_and_changeover,meals_or_kitchen,distance_to_lift,distance_to_st_anton_centre_and_transport,booking_channel,deposit_terms,cancellation_terms,price_flag,sources,access_date,confidence,notes

Access date is 2026-10-04. Aim for 6–12 rows of real, named options, cheapest first, plus one band row for generic Airbnb/VRBO in your area if you can only see bands. Then, in your final reply, give a 150-word summary: the three best-value options for 12 people, a per-person-per-night figure for each, the biggest risks, and anything that suggests availability is already gone for 4–9 Jan.
