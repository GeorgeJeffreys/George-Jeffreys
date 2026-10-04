"""List Airbnb search results with date-specific prices.

Usage: python3 airbnb_search.py "<airbnb search url>"
Example URL:
  https://www.airbnb.com/s/St.-Anton-am-Arlberg--Austria/homes?checkin=2027-01-04&checkout=2027-01-09&adults=12&currency=EUR
Add ne_lat/ne_lng/sw_lat/sw_lng and search_by_map=true to pin the map to one area.

Fetches the page with curl (normal proxy and CA settings) and reads the
server-rendered JSON. A price qualifier other than "for 5 nights" means Airbnb
is suggesting different dates, i.e. the listing is not bookable for ours.
"""
import base64
import json
import re
import subprocess
import sys

url = sys.argv[1]
html = subprocess.run(
    ["curl", "-sS", "-m", "60",
     "-A", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36",
     "-H", "Accept-Language: en-US", url],
    capture_output=True, text=True).stdout

results = []


def walk(o):
    if isinstance(o, dict):
        if o.get("__typename") == "StaySearchResult":
            results.append(o)
        for v in o.values():
            walk(v)
    elif isinstance(o, list):
        for v in o:
            walk(v)


for m in re.finditer(r"<script[^>]*>(.*?)</script>", html, re.S):
    t = m.group(1).strip()
    if '"searchResults"' not in t:
        continue
    try:
        walk(json.loads(t))
    except Exception:
        pass

seen = set()
for r in results:
    dl = r.get("demandStayListing") or {}
    lid = dl.get("id", "")
    try:
        lid = base64.b64decode(lid).decode().split(":")[-1]
    except Exception:
        pass
    if lid in seen:
        continue
    seen.add(lid)
    p = (r.get("structuredDisplayPrice") or {}).get("primaryLine") or {}
    name = ((dl.get("description") or {}).get("name") or {}).get("localizedStringWithTranslationPreference", "")
    rooms = " | ".join(x.get("body", "") for x in (r.get("structuredContent") or {}).get("primaryLine") or [] if isinstance(x, dict))
    print("\t".join([lid, r.get("title", ""), name, rooms,
                     f"{p.get('price', '')} {p.get('qualifier', '')}".strip(),
                     r.get("avgRatingLocalized", "") or "",
                     f"https://www.airbnb.com/rooms/{lid}"]))
print(f"# {len(seen)} listings", file=sys.stderr)
