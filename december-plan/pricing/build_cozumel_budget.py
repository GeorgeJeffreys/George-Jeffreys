"""Cozumel group budget on the Blue Note + Hotel Plaza basis (George's top choice, 23 Sep 2026).
Blue inputs on the Inputs sheet; everything else is formulas. Run, then recalc with LibreOffice.
Flags: QUOTED = Blue Note / Hotel Plaza emails 23 Sep; ADVERTISED = public page or snippet; INFERRED = our estimate.
"""
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

wb = Workbook()
BLUE = Font(color="1F4E9A"); BOLD = Font(bold=True); H = Font(bold=True, size=13)
FILL = PatternFill("solid", fgColor="EEF3F8"); MONEY = '#,##0'; PCT = '0%'
thin = Side(style="thin", color="C8D2DC")

# ---------------- Inputs ----------------
ws = wb.active; ws.title = "Inputs"
ws.column_dimensions['A'].width = 70; ws.column_dimensions['B'].width = 12; ws.column_dimensions['C'].width = 12; ws.column_dimensions['D'].width = 60
ws['A1'] = "Cozumel group budget — inputs (blue cells are editable)"; ws['A1'].font = H
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

h2("Group shape")
inp('n_beg', "Open Water students", 15, "people", "scenario; George's brief: about half beginners")
inp('n_cert', "Certified divers, paying (excluding George)", 14, "people", "scenario")
inp('adv_share', "Share of certified divers taking AOW", 0.25, "share", "brief (about 15% of the whole group)", PCT)
inp('rent_share', "Share of certified divers renting gear", 0.25, "share", "INFERRED", PCT)
inp('triple_share', "Share of people in triples", 0.0, "share", "assumption; Hotel Plaza allows a 3rd person", PCT)
h2("Blue Note Scuba (QUOTED 23 Sep 2026, Doug Atkinson)")
inp('ow', "Open Water course, 3 days, equipment included", 400, "USD", "QUOTED", MONEY)
inp('ow_extra', "Two extra boat days for new divers (Thu–Fri)", 240, "USD", "QUOTED", MONEY)
inp('pkg', "Certified 5-day two-tank package", 600, "USD", "QUOTED", MONEY)
inp('rental', "Equipment rental per day", 30, "USD/day", "QUOTED", MONEY)
inp('park', "Marine park fee per boat day, paid on island in cash", 15, "USD/day", "ADVERTISED (Blue Note price page); Blue Note asked whether it is in the package", MONEY)
inp('park_days_cert', "Boat days for certified divers", 5, "days", "programme")
inp('park_days_beg', "Boat days for new divers (dive 3–4 day + Thu + Fri)", 3, "days", "programme")
inp('comm', "Commission on certified packages, paid to the group leader", 0.10, "share", "QUOTED: deducted from our payment; George keeps it (23 Sep)", PCT)
inp('comp_per', "One free certified package per N paid", 5, "paid", "QUOTED")
inp('dep_bn', "Blue Note deposit at booking", 0.25, "share", "QUOTED; balance 30 days out; refund to 7 days out", PCT)
inp('pm2', "Afternoon two-tank dive (optional)", 130, "USD", "ADVERTISED price page", MONEY)
inp('night_charter', "Private night charter, up to 10 divers", 800, "USD", "ADVERTISED price page", MONEY)
inp('nitrox_fill', "Nitrox fill per tank (course free with eLearning)", 12, "USD", "INFERRED; Blue Note charges extra, amount QUOTE NEEDED", MONEY)
h2("Hotel Plaza Cozumel (QUOTED via Blue Note's contracted rate)")
inp('room_lo', "Room rate per night, 2 people with breakfast, Dec 14–15", 70, "USD", "QUOTED", MONEY)
inp('room_hi', "Room rate per night, 2 people with breakfast, Dec 16–19", 88, "USD", "QUOTED", MONEY)
inp('nights_lo', "Nights at the low rate (Sun 13, Mon 14)", 2, "nights", "assumes the Dec 14–15 rate covers the nights of 13 and 14; CONFIRM")
inp('nights_hi', "Nights at the high rate (Tue 15 – Fri 18)", 4, "nights", "")
inp('third_lo', "Third person per night, low-rate nights", 35, "USD", "QUOTED", MONEY)
inp('third_hi', "Third person per night, high-rate nights", 44, "USD", "QUOTED", MONEY)
inp('hotel_dep', "Hotel deposit at booking (share of block)", 0.25, "share", "QUOTE NEEDED; assumption", PCT)
h2("Group finance")
inp('contingency', "Contingency added to the trip fee (refunded if unused)", 0.05, "share", "policy", PCT)
inp('kitty', "Group kitty per person (farewell dinner, welcome drinks)", 25, "USD", "policy", MONEY)
inp('p_dep', "Participant deposit at sign-up", 300, "USD", "policy", MONEY)
h2("Own costs, not in the trip fee (shown to participants as estimates)")
inp('flights', "Flights PHL–CZM return, band midpoint", 684, "USD", "ADVERTISED band 568–800", MONEY)
inp('elearn_ow', "PADI Open Water eLearning (buy via Blue Note's link)", 195, "USD", "ADVERTISED", MONEY)
inp('elearn_aow', "PADI AOW eLearning", 220, "USD", "ADVERTISED (about); needed for the free AOW course", MONEY)
inp('dan', "DAN membership + Preferred plan (required)", 119, "USD", "ADVERTISED", MONEY)
inp('meals', "Lunches, dinners, drinks per day (breakfast included)", 40, "USD/day", "INFERRED for an MBA crowd", MONEY)
inp('days_meals', "Days on the island", 6, "days", "")
inp('tips', "Tips for boat crew and hotel", 50, "USD", "INFERRED", MONEY)
inp('xfer', "Airport transfers, both ways", 30, "USD", "ADVERTISED shared van 15 each way", MONEY)

# ---------------- Per person ----------------
pp = wb.create_sheet("PerPerson")
pp.column_dimensions['A'].width = 58
for col in "BCD": pp.column_dimensions[col].width = 16
pp['A1'] = "What each person pays (USD, 6 nights, 2 sharing)"; pp['A1'].font = H
pp.append(["", "Open Water student", "Certified diver", "Certified + AOW"])
for c in pp[2]: c.font = BOLD; c.fill = FILL
room_pp2 = f"(({R['room_lo']}*{R['nights_lo']}+{R['room_hi']}*{R['nights_hi']})/2)"
rows = [
 ("Trip fee, paid to the club", None, None, None, True),
 ("Diving with Blue Note", f"={R['ow']}+{R['ow_extra']}", f"={R['pkg']}", f"={R['pkg']}", False),
 ("Hotel Plaza, 6 nights with breakfast, 2 sharing", f"={room_pp2}", f"={room_pp2}", f"={room_pp2}", False),
 ("Group kitty", f"={R['kitty']}", f"={R['kitty']}", f"={R['kitty']}", False),
 ("Contingency (refunded if unused)", "=ROUND((B4+B5+B6)*%s,0)" % R['contingency'], "=ROUND((C4+C5+C6)*%s,0)" % R['contingency'], "=ROUND((D4+D5+D6)*%s,0)" % R['contingency'], False),
 ("TRIP FEE", "=SUM(B4:B7)", "=SUM(C4:C7)", "=SUM(D4:D7)", True),
 ("Own costs, estimates", None, None, None, True),
 ("Flights (own booking)", f"={R['flights']}", f"={R['flights']}", f"={R['flights']}", False),
 ("PADI eLearning (Open Water / AOW)", f"={R['elearn_ow']}", "0", f"={R['elearn_aow']}", False),
 ("DAN insurance (required)", f"={R['dan']}", f"={R['dan']}", f"={R['dan']}", False),
 ("Marine park fees, cash on the island", f"={R['park']}*{R['park_days_beg']}", f"={R['park']}*{R['park_days_cert']}", f"={R['park']}*{R['park_days_cert']}", False),
 ("Gear rental if needed (certified only, per day x 5)", "0", f"={R['rental']}*5", f"={R['rental']}*5", False),
 ("Lunches, dinners, drinks", f"={R['meals']}*{R['days_meals']}", f"={R['meals']}*{R['days_meals']}", f"={R['meals']}*{R['days_meals']}", False),
 ("Tips and transfers", f"={R['tips']}+{R['xfer']}", f"={R['tips']}+{R['xfer']}", f"={R['tips']}+{R['xfer']}", False),
 ("ALL-IN ESTIMATE (own gear)", "=B8+SUM(B10:B12)+SUM(B14:B16)", "=C8+SUM(C10:C12)+SUM(C14:C16)", "=D8+SUM(D10:D12)+SUM(D14:D16)", True),
 ("ALL-IN ESTIMATE (renting gear)", "=B17", "=C17+C13", "=D17+D13", True),
 ("Club ceiling (brief)", "2300", "2000", "2000", False),
 ("Optional add-ons", None, None, None, True),
 ("Afternoon two-tank dive (each) + park fee", f"={R['pm2']}+{R['park']}", f"={R['pm2']}+{R['park']}", f"={R['pm2']}+{R['park']}", False),
 ("Night dive, private charter shared by 10", f"={R['night_charter']}/10", f"={R['night_charter']}/10", f"={R['night_charter']}/10", False),
 ("Nitrox fills for the week (10 tanks)", "n/a", f"={R['nitrox_fill']}*10", f"={R['nitrox_fill']}*10", False),
 ("Single room supplement (whole room to yourself)", f"={room_pp2}", f"={room_pp2}", f"={room_pp2}", False),
]
for label, b, c, d, bold in rows:
    pp.append([label, b, c, d]); r = pp.max_row
    if bold:
        for cell in pp[r]: cell.font = BOLD
    for col in (2, 3, 4):
        pp.cell(r, col).number_format = MONEY
pp['A26'] = "Notes: the trip fee is what the club invoices. Flights, eLearning, DAN, park fees, meals and tips are paid by each person directly. Comps and the 10% commission go to the trip leader and are disclosed on the sign-up page."

# ---------------- Group ----------------
g = wb.create_sheet("Group")
g.column_dimensions['A'].width = 60
for col in "BCD": g.column_dimensions[col].width = 16
g['A1'] = "Group budget at three sizes (half beginners; George leads and is not a paying diver)"; g['A1'].font = H
g.append(["", "20 people", "30 people", "40 people"])
for c in g[2]: c.font = BOLD; c.fill = FILL
sizes = {"B": 20, "C": 30, "D": 40}
def grow(label, fn, fmt=MONEY, bold=False):
    g.append([label] + [fn(col, n) for col, n in sizes.items()]); r = g.max_row
    for col in (2, 3, 4): g.cell(r, col).number_format = fmt
    if bold:
        for cell in g[r]: cell.font = BOLD
    return r
r_n = grow("People (incl. George)", lambda c, n: n, '0')
r_beg = grow("Open Water students", lambda c, n: f"=ROUND({c}{r_n}/2,0)", '0')
r_cert = grow("Paying certified divers (George excluded)", lambda c, n: f"={c}{r_n}-{c}{r_beg}-1", '0')
r_rooms_p = grow("Rooms for paying people (2 sharing; an odd person takes a single)", lambda c, n: f"=ROUNDUP(({c}{r_n}-1)/2,0)", '0')
r_rooms = grow("Rooms including George's single", lambda c, n: f"={c}{r_rooms_p}+1", '0')
g.append(["Revenue (trip fees)"]); g.cell(g.max_row, 1).font = BOLD
r_rev_beg = grow("Students x trip fee", lambda c, n: f"={c}{r_beg}*PerPerson!$B$8")
r_rev_cert = grow("Certified x trip fee", lambda c, n: f"={c}{r_cert}*PerPerson!$C$8")
r_single = grow("Single supplement from the odd person (full room less the shared share)", lambda c, n: f"={c}{r_rooms_p}*({R['room_lo']}*{R['nights_lo']}+{R['room_hi']}*{R['nights_hi']})-({c}{r_n}-1)*PerPerson!$B$5")
r_rev = grow("TOTAL REVENUE", lambda c, n: f"={c}{r_rev_beg}+{c}{r_rev_cert}+{c}{r_single}", bold=True)
g.append(["Costs"]); g.cell(g.max_row, 1).font = BOLD
r_bn_ow = grow("Blue Note: Open Water courses + extra days", lambda c, n: f"={c}{r_beg}*({R['ow']}+{R['ow_extra']})")
r_bn_pk = grow("Blue Note: certified packages, paid divers", lambda c, n: f"={c}{r_cert}*{R['pkg']}")
r_comps = grow("Comps earned (1 per N paid certified)", lambda c, n: f"=INT({c}{r_cert}/{R['comp_per']})", '0')
r_bn_gross = grow("Blue Note gross invoice", lambda c, n: f"={c}{r_bn_ow}+{c}{r_bn_pk}")
r_comm = grow("Less 10% commission on certified packages (to George)", lambda c, n: f"=-{c}{r_bn_pk}*{R['comm']}")
r_bn_net = grow("Blue Note net payable by the club", lambda c, n: f"={c}{r_bn_gross}+{c}{r_comm}", bold=True)
r_hotel = grow("Hotel Plaza block (rooms x 6 nights)", lambda c, n: f"={c}{r_rooms}*({R['room_lo']}*{R['nights_lo']}+{R['room_hi']}*{R['nights_hi']})")
r_george_dive = grow("George's diving (covered by a comp; 0 if comps >= 1)", lambda c, n: f"=IF({c}{r_comps}>=1,0,{R['pkg']})")
r_kitty = grow("Group kitty spend", lambda c, n: f"=({c}{r_n}-1)*{R['kitty']}")
r_comm_out = grow("Commission passed to George (Blue Note deducts it, the club pays it over)", lambda c, n: f"=-{c}{r_comm}")
r_costs = grow("TOTAL COSTS (club pays)", lambda c, n: f"={c}{r_bn_net}+{c}{r_hotel}+{c}{r_george_dive}+{c}{r_kitty}+{c}{r_comm_out}", bold=True)
g.append(["Result"]); g.cell(g.max_row, 1).font = BOLD
r_surplus = grow("Club surplus = contingency held less George's room", lambda c, n: f"={c}{r_rev}-{c}{r_costs}", bold=True)
r_cont = grow("Contingency held for refund to participants", lambda c, n: f"={c}{r_beg}*PerPerson!$B$7+{c}{r_cert}*PerPerson!$C$7")
r_groom = grow("George's single room (club cost, reimbursed by George from his pot)", lambda c, n: f"=({R['room_lo']}*{R['nights_lo']}+{R['room_hi']}*{R['nights_hi']})")
r_check = grow("Check: surplus + George's room reimbursement - contingency (should be 0)", lambda c, n: f"={c}{r_surplus}+{c}{r_groom}-{c}{r_cont}")
r_pot = grow("George's pot: commission + spare comps at net package value", lambda c, n: f"={c}{r_comm_out}+MAX({c}{r_comps}-1,0)*{R['pkg']}*(1-{R['comm']})", bold=True)
r_pot_net = grow("George's pot after paying for his room", lambda c, n: f"={c}{r_pot}-{c}{r_groom}", bold=True)
g.append(["Deposits and cash"]); g.cell(g.max_row, 1).font = BOLD
r_dep_in = grow("Participant deposits collected at sign-up", lambda c, n: f"=({c}{r_n}-1)*{R['p_dep']}")
r_dep_out = grow("Blue Note deposit (25% of gross) + hotel deposit", lambda c, n: f"={c}{r_bn_gross}*{R['dep_bn']}+{c}{r_hotel}*{R['hotel_dep']}")
r_dep_gap = grow("Deposit cover (positive = deposits cover the outflow)", lambda c, n: f"={c}{r_dep_in}-{c}{r_dep_out}", bold=True)
r_bal_in = grow("Balances due from participants by Fri 6 Nov", lambda c, n: f"={c}{r_rev}-{c}{r_dep_in}")
r_bal_out = grow("Blue Note balance due Fri 13 Nov + hotel balance", lambda c, n: f"={c}{r_bn_net}-{c}{r_bn_gross}*{R['dep_bn']}+{c}{r_hotel}*(1-{R['hotel_dep']})")
g.append(["Notes: George's own certified package is covered by the first comp; further comps are valued at the net package price. The club never holds the commission: Blue Note deducts it from the invoice and George keeps it, disclosed on the sign-up page. Contingency is refunded pro rata after the trip if unused."])

# ---------------- Payments and policy ----------------
pay = wb.create_sheet("Payments")
pay.column_dimensions['A'].width = 22; pay.column_dimensions['B'].width = 70; pay.column_dimensions['C'].width = 30
pay['A1'] = "Payment schedule and refund policy (mirrors Blue Note's terms)"; pay['A1'].font = H
for row in [
 ("date", "what", "who"),
 ("by Fri 2 Oct", "Sign-ups open on CampusGroups with the flyer; deposit USD 300 per person to hold a place", "participants"),
 ("Sat 10 Oct", "Sign-up deadline for the first block; headcount to Blue Note and Hotel Plaza", "George"),
 ("by Thu 15 Oct", "Blue Note deposit 25% of the gross invoice; hotel deposit (terms to confirm)", "club account"),
 ("Fri 6 Nov", "Participant balances due (trip fee less deposit)", "participants"),
 ("Fri 13 Nov", "Blue Note final payment (30 days before arrival); hotel balance per its terms", "club account"),
 ("Sun 6 Dec", "Blue Note's 7-day refund cut-off: last day a cancellation gets money back rather than credit", "everyone"),
 ("Sun 13 Dec", "Arrival; park fees in cash on the island", "participants"),
 ("", "", ""),
 ("Refund ladder", "Deposit refundable in full until Fri 6 Nov; from 7 Nov to 6 Dec refundable only if the place is resold or Blue Note refunds it; from 7 Dec no refund, only Blue Note credit where they give it. Contingency refunded pro rata after the trip. Weather cancellations: Blue Note reschedules or refunds the missed dives.", "policy"),
 ("Money handling", "All payments through CampusGroups or Blue Note's own link, never personal Venmo or Zelle. The leader's comped place and the 10% commission are disclosed on the sign-up page.", "policy"),
]:
    pay.append(list(row))
for c in pay[2]: c.font = BOLD; c.fill = FILL

for sh in wb.worksheets:
    for row in sh.iter_rows():
        for cell in row:
            cell.alignment = Alignment(wrap_text=True, vertical="top")

out = "/home/user/George-Jeffreys/december-plan/pricing/cozumel_group_budget.xlsx"
wb.save(out); print("saved", out)
