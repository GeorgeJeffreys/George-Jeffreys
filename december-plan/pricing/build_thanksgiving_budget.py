"""Thanksgiving group budget, Puerto Rico (La Parguera), Paradise Scuba + Parador Villa Parguera basis. 23 Sep 2026.
Same rules as Cozumel: one fee covers everything diving-related (boat dives, gear, tax), DAN, the hotel two sharing,
and (George's decision 23 Sep) the hire cars as group logistics. Own costs: flights, meals, drinks, tips.
George's flight allowance, half-room, DAN and gear are carried by the group. Fee set at a conservative headcount,
surplus must stay positive at the minimum. Blue inputs; formulas elsewhere; recalc with LibreOffice.
Flags: QUOTED = Paradise Scuba email 22 Sep; ADVERTISED; INFERRED.
"""
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment

wb = Workbook()
BLUE = Font(color="1F4E9A"); BOLD = Font(bold=True); H = Font(bold=True, size=13)
FILL = PatternFill("solid", fgColor="EEF3F8"); MONEY = '#,##0'; PCT = '0%'

ws = wb.active; ws.title = "Inputs"
for col, w in zip("ABCD", (72, 12, 12, 64)): ws.column_dimensions[col].width = w
ws['A1'] = "Thanksgiving (Puerto Rico) group budget — inputs (blue cells are editable)"; ws['A1'].font = H
ws.append(["item", "value", "unit", "flag / source"])
for c in ws[2]: c.font = BOLD; c.fill = FILL
R = {}
def inp(key, label, value, unit, flag, fmt=None):
    ws.append([label, value, unit, flag]); r = ws.max_row
    ws.cell(r, 2).font = BLUE
    if fmt: ws.cell(r, 2).number_format = fmt
    R[key] = f"Inputs!$B${r}"
def h2(t):
    ws.append([t]); ws.cell(ws.max_row, 1).font = BOLD

h2("Pricing basis")
inp('n_price', "Pricing headcount including George", 10, "people", "policy: conservative (group is 8–12)")
inp('contingency', "Contingency inside the fee (refunded pro rata if unused)", 0.06, "share", "policy", PCT)
h2("Paradise Scuba, La Parguera (QUOTED 22 Sep 2026, Kiko)")
inp('wall', "Two-tank Wall dive, list price", 145, "USD", "QUOTED", MONEY)
inp('disc', "Group discount", 0.15, "share", "QUOTED", PCT)
inp('tax', "Puerto Rico sales tax (IVU)", 0.115, "share", "QUOTED 24 Sep (Edwin, Paradise Scuba)", PCT)
inp('dive_days', "Boat mornings (Thu, Fri, Sat; Sat out of the water by noon)", 3, "days", "programme")
inp('gear', "Gear rental per day, everyone rents", 25, "USD/day", "QUOTED", MONEY)
inp('night', "Night dive, single tank with lights, list price (optional add-on; group discount and tax apply)", 140, "USD", "QUOTED 24 Sep; gear rental 25 extra", MONEY)
inp('pm3', "Third dive the same afternoon", 0, "USD", "NOT OFFERED (Paradise 24 Sep: air only, nitrogen loading); night dive instead", MONEY)
inp('dep_ps', "Paradise Scuba deposit", 0.5, "share", "QUOTED; refundable to 30 days out", PCT)
h2("Lodging (Parador Villa Parguera; QUOTE NEEDED, chased 24 Sep)")
inp('room', "Room per night, 2 sharing", 150, "USD", "ADVERTISED band 135–170", MONEY)
inp('nights', "Nights (Wed 25 – Sun 29 Nov)", 4, "nights", "")
inp('hotel_dep', "Hotel deposit at booking (share)", 0.25, "share", "assumption", PCT)
h2("Cars (in the group budget, George 23 Sep)")
inp('car_day', "Hire car per day, mid-size from SJU", 70, "USD/day", "INFERRED; QUOTE NEEDED", MONEY)
inp('car_days', "Rental days", 5, "days", "Wed to Sun")
inp('car_fuel', "Fuel and tolls per car", 60, "USD", "INFERRED", MONEY)
inp('car_seats', "People per car", 4, "people", "assumption")
h2("Included for everyone")
inp('dan', "DAN cover inside the fee", 0, "USD", "George 24 Sep: not in the fee; each diver buys their own cover (see own spending)", MONEY)
inp('tax_buffer', "Hotel room-tax buffer per head (PR room tax 9% plus fees; kept until the hotel quotes an all-in rate)", 80, "USD", "policy; diving tax is now inside the diving line", MONEY)
h2("Leader costs carried by the group")
inp('g_flight', "George's flight allowance PHL–SJU", 550, "USD", "policy; Thanksgiving band 400–700", MONEY)
inp('g_room', "George's half of a shared room", f"={R['room']}*{R['nights']}/2", "USD", "formula", MONEY)
inp('odd_room', "Odd-headcount room risk", f"={R['g_room']}", "USD", "half a room", MONEY)
inp('g_dan', "George's DAN carried by the group", 0, "USD", "George 24 Sep: own cost like everyone", MONEY)
inp('g_gear', "George's gear", f"={R['gear']}*{R['dive_days']}", "USD", "formula", MONEY)
h2("Own spending guidance (no flights)")
inp('meals', "Meals and drinks per day (Thanksgiving dinner included)", 45, "USD/day", "INFERRED", MONEY)
inp('days_meals', "Days", 4, "days", "")
inp('tips', "Tips", 40, "USD", "INFERRED", MONEY)
inp('bio', "Sunset Bio Bay Cruise, list price (optional add-on; eat, cruise, swim; discount and tax apply)", 85, "USD", "QUOTED 24 Sep", MONEY)
inp('dan_own', "Dive-accident cover, required, bought by each person", 84, "USD", "ADVERTISED: DAN membership 40 + Master 44", MONEY)

fee = wb.create_sheet("Fee")
fee.column_dimensions['A'].width = 62; fee.column_dimensions['B'].width = 18
fee['A1'] = "Trip fee per certified diver, set at the pricing headcount (USD, 2 sharing)"; fee['A1'].font = H
fee.append(["", "Certified diver"])
for c in fee[2]: c.font = BOLD; c.fill = FILL
paying = f"({R['n_price']}-1)"
cars = f"(ROUNDUP({R['n_price']}/{R['car_seats']},0)*({R['car_day']}*{R['car_days']}+{R['car_fuel']}))"
leader = f"({R['g_flight']}+{R['g_room']}+{R['odd_room']}+{R['g_dan']}+{R['g_gear']})"
rows = [
 ("Diving: three two-tank mornings, group discount, plus tax", f"=ROUND({R['wall']}*(1-{R['disc']})*(1+{R['tax']})*{R['dive_days']},0)"),
 ("Gear rental, everyone", f"={R['gear']}*{R['dive_days']}"),
 ("DAN dive-accident cover (not in the fee; each person buys their own, see below)", f"={R['dan']}"),
 ("Hotel, 4 nights, 2 sharing", f"={R['room']}*{R['nights']}/2"),
 ("Hire cars, shared by everyone", f"={cars}/{paying}"),
 ("Tax buffer", f"={R['tax_buffer']}"),
 ("Leader's costs shared (George's flight, half-room, DAN, gear, odd-room risk)", f"={leader}/{paying}"),
 ("Subtotal", "=SUM(B3:B9)"),
 ("Contingency", f"=ROUND(B10*{R['contingency']},0)"),
 ("TRIP FEE (rounded up to the nearest 50)", "=CEILING(B10+B11,50)"),
 ("", None),
 ("Optional add-ons, charged at cost", None),
 ("Sunset Bio Bay Cruise, after discount and tax", f"=ROUND({R['bio']}*(1-{R['disc']})*(1+{R['tax']}),0)"),
 ("Night dive, after discount and tax, plus gear", f"=ROUND({R['night']}*(1-{R['disc']})*(1+{R['tax']}),0)+{R['gear']}"),
 ("Third dive in the afternoon: not offered (air only); night dive Fri instead", f"={R['pm3']}"),
 ("", None),
 ("GUIDANCE BUDGET WITHOUT FLIGHTS", None),
 ("Trip fee", "=B12"),
 ("Own spending: dive cover, meals incl. Thanksgiving dinner, drinks, tips", f"={R['dan_own']}+{R['meals']}*{R['days_meals']}+{R['tips']}"),
 ("Guidance budget", "=B20+B21"),
 ("Guidance budget with bio bay and night dive", "=B22+B15+B16"),
]
for label, b in rows:
    fee.append([label, b]); fee.cell(fee.max_row, 2).number_format = MONEY
for r in (10, 12, 19, 22, 23):
    for cell in fee[r]: cell.font = BOLD

g = wb.create_sheet("Group")
g.column_dimensions['A'].width = 62
cols = {"B": 8, "C": 10, "D": 12}
for col in cols: g.column_dimensions[col].width = 14
g['A1'] = "Group budget at three sizes (George leads and does not pay)"; g['A1'].font = H
g.append(["", "8 people (minimum)", "10 people (pricing basis)", "12 people (boat max)"])
for c in g[2]: c.font = BOLD; c.fill = FILL
def grow(label, fn, fmt=MONEY, bold=False):
    g.append([label] + [fn(col, n) for col, n in cols.items()]); r = g.max_row
    for i in range(2, 5): g.cell(r, i).number_format = fmt
    if bold:
        for cell in g[r]: cell.font = BOLD
    return r
def sect(t): g.append([t]); g.cell(g.max_row, 1).font = BOLD
r_n = grow("People including George", lambda c, n: n, '0')
r_pay = grow("Paying divers", lambda c, n: f"={c}{r_n}-1", '0')
r_rooms = grow("Rooms, 2 sharing (odd person alone at the group's cost)", lambda c, n: f"=ROUNDUP({c}{r_n}/2,0)", '0')
r_cars = grow("Hire cars", lambda c, n: f"=ROUNDUP({c}{r_n}/{R['car_seats']},0)", '0')
sect("Revenue")
r_rev = grow("Trip fees collected", lambda c, n: f"={c}{r_pay}*Fee!$B$12", bold=True)
sect("Costs")
r_dive = grow("Paradise Scuba: paying divers, three mornings, discount, tax (George free)", lambda c, n: f"=ROUND({c}{r_pay}*{R['wall']}*(1-{R['disc']})*(1+{R['tax']})*{R['dive_days']},0)")
r_gear = grow("Gear rental, everyone including George", lambda c, n: f"={c}{r_n}*{R['gear']}*{R['dive_days']}")
r_dan = grow("DAN for everyone including George", lambda c, n: f"={c}{r_n}*{R['dan']}")
r_hotel = grow("Hotel block", lambda c, n: f"={c}{r_rooms}*{R['room']}*{R['nights']}")
r_car = grow("Hire cars, fuel and tolls", lambda c, n: f"={c}{r_cars}*({R['car_day']}*{R['car_days']}+{R['car_fuel']})")
r_tax = grow("Tax buffer held (paid if charged, else refunded)", lambda c, n: f"={c}{r_n}*{R['tax_buffer']}")
r_gfl = grow("George's flight allowance", lambda c, n: f"={R['g_flight']}")
r_costs = grow("TOTAL COSTS", lambda c, n: f"={c}{r_dive}+{c}{r_gear}+{c}{r_dan}+{c}{r_hotel}+{c}{r_car}+{c}{r_tax}+{c}{r_gfl}", bold=True)
sect("Result")
r_sur = grow("Surplus (contingency and over-recovery; refunded pro rata or held)", lambda c, n: f"={c}{r_rev}-{c}{r_costs}", bold=True)
r_cov = grow("Covered?", lambda c, n: f'=IF({c}{r_sur}>=0,"yes","NO")', '@', bold=True)
sect("Deposits and cash")
r_dep_in = grow("Participant deposits at sign-up (USD 400 each)", lambda c, n: f"={c}{r_pay}*400")
r_dep_out = grow("Paradise Scuba 50% deposit + hotel deposit", lambda c, n: f"={c}{r_dive}*{R['dep_ps']}+{c}{r_hotel}*{R['hotel_dep']}")
r_gap = grow("Deposit cover (positive means deposits fund the outflow)", lambda c, n: f"={c}{r_dep_in}-{c}{r_dep_out}", bold=True)
r_bal_in = grow("Balances due from participants by Fri 23 Oct", lambda c, n: f"={c}{r_rev}-{c}{r_dep_in}")
r_bal_out = grow("Paradise balance (by Mon 26 Oct, 30 days out) + hotel balance + gear + DAN + cars", lambda c, n: f"={c}{r_dive}*(1-{R['dep_ps']})+{c}{r_hotel}*(1-{R['hotel_dep']})+{c}{r_gear}+{c}{r_dan}+{c}{r_car}")
g.append(["Notes: no comps or commission are on offer here beyond George's free place, which Paradise Scuba quoted. If a cheaper hotel quote or a lower tax rate lands, rerun this builder."])

pay = wb.create_sheet("Payments")
pay.column_dimensions['A'].width = 22; pay.column_dimensions['B'].width = 76; pay.column_dimensions['C'].width = 22
pay['A1'] = "Payment schedule and refund policy (mirrors Paradise Scuba's terms)"; pay['A1'].font = H
for row in [
 ("date", "what", "who"),
 ("by Fri 2 Oct", "Sign-ups open; USD 400 deposit holds a place; capacity 12 (one boat)", "participants"),
 ("Sat 10 Oct", "Sign-up deadline; headcount to Paradise Scuba and the hotel; cars booked", "George"),
 ("by Thu 15 Oct", "Paradise Scuba 50% deposit; hotel deposit", "club account"),
 ("Fri 23 Oct", "Participant balances due", "participants"),
 ("Mon 26 Oct", "Paradise Scuba balance (30 days out); hotel balance per its terms; DAN bought", "club account"),
 ("Mon 26 Oct", "Paradise Scuba's 30-day refund cut-off", "everyone"),
 ("Wed 25 Nov", "Fly PHL–SJU, drive to La Parguera", "everyone"),
 ("", "", ""),
 ("Refund ladder", "Deposit refundable in full until Fri 23 Oct; after 26 Oct only if the place is resold. Weather: Paradise reschedules or refunds missed dives (to confirm).", "policy"),
 ("Money handling", "CampusGroups or the operator's own link, never personal Venmo or Zelle. George's free place, flight allowance and half-room are disclosed on the sign-up page.", "policy"),
]:
    pay.append(list(row))
for c in pay[2]: c.font = BOLD; c.fill = FILL
for sh in wb.worksheets:
    for row in sh.iter_rows():
        for cell in row: cell.alignment = Alignment(wrap_text=True, vertical="top")
out = "/home/user/George-Jeffreys/december-plan/pricing/thanksgiving_group_budget.xlsx"
wb.save(out); print("saved", out)
