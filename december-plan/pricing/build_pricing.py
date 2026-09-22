"""Build december-plan/pricing/december_pricing.xlsx. Plain style: inputs at top, formulas below, gridlines off."""
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment
from openpyxl.utils import get_column_letter

import os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'december_pricing.xlsx')
FONT = 'Arial'
wb = Workbook()
wb.remove(wb.active)

H1 = Font(name=FONT, size=14, bold=True)
H2 = Font(name=FONT, size=11, bold=True)
BODY = Font(name=FONT, size=10)
INPUT = Font(name=FONT, size=10, color='0000FF')
MONEY = '$#,##0;($#,##0);-'
MONEY2 = '$#,##0.00;($#,##0.00);-'
PCT = '0.0%'

def sheet(name, widths):
    ws = wb.create_sheet(name)
    ws.sheet_view.showGridLines = False
    for i, w in enumerate(widths, 1):
        ws.column_dimensions[get_column_letter(i)].width = w
    return ws

class Writer:
    def __init__(self, ws):
        self.ws = ws; self.r = 1
    def h1(self, text):
        c = self.ws.cell(self.r, 1, text); c.font = H1; self.r += 2
    def h2(self, text):
        c = self.ws.cell(self.r, 1, text); c.font = H2; self.r += 1
    def blank(self, n=1): self.r += n
    def row(self, values, fonts=None, fmts=None):
        for j, v in enumerate(values, 1):
            if v is None: continue
            c = self.ws.cell(self.r, j, v)
            c.font = (fonts[j-1] if fonts and fonts[j-1] else BODY)
            if fmts and fmts[j-1]: c.number_format = fmts[j-1]
        self.r += 1
        return self.r - 1
    def inp(self, label, value, unit='', flag='', fmt=None):
        """Input row: label | value (blue) | unit | flag. Returns absolute ref to value."""
        r = self.row([label, value, unit, flag], fonts=[None, INPUT, None, None], fmts=[None, fmt, None, None])
        return f"$B${r}"

# ------------------------------------------------------------------ INPUTS
wsI = sheet('Inputs', [46, 14, 16, 26])
W = Writer(wsI)
W.h1('Inputs — Wharton Outdoors Club dive trips 2026–27')
W.row(['Blue cells are inputs; every other sheet reads from here. Flags: ADVERTISED (snippet) = seen on the named source; QUOTE NEEDED = unverified lead; INFERRED = our estimate. Sources are listed in pricing/sources.csv.'])
W.blank()

W.h2('Exchange rates (mid-market, 21 Sep 2026)')
FX_EUR = W.inp('USD per EUR 1', 1.1465, 'USD/EUR', 'ADVERTISED (snippet)', '0.0000')
FX_MXN = W.inp('MXN per USD 1', 17.23, 'MXN/USD', 'ADVERTISED (snippet)', '0.00')
W.blank()

W.h2('Group composition')
BEG_SHARE = W.inp('Beginner share of group (Cozumel, Egypt)', 0.5, 'share', 'brief', PCT)
ADV_SHARE = W.inp('Advanced share of group', 0.15, 'share', 'brief', PCT)
W.blank()

W.h2('Budget ceilings (all-in incl. flights, per person)')
CEIL_TG = W.inp('Thanksgiving', 1500, 'USD', 'brief', MONEY)
CEIL_CZ_CERT = W.inp('Cozumel — certified', 2000, 'USD', 'brief', MONEY)
CEIL_CZ_BEG = W.inp('Cozumel — beginner', 2300, 'USD', 'brief', MONEY)
CEIL_EG = W.inp('Egypt', 2700, 'USD', 'brief', MONEY)
W.blank()

W.h2('Shared allowances')
DAN = W.inp('Dive-accident insurance (DAN membership + Preferred plan, annual)', 119, 'USD', 'ADVERTISED (snippet)', MONEY)
MEALS = W.inp('Meals and incidentals per day where not on full board', 35, 'USD/day', 'INFERRED', MONEY)
TIPS = W.inp('Tips and local extras per trip', 50, 'USD', 'INFERRED', MONEY)
W.blank()

# ---- Cozumel
W.h2('Cozumel, Tue 8 – Mon 14 Dec 2026 (6 nights) and Tue 8 – Sun 13 Dec (5 nights)')
CZ_FL_LO = W.inp('Flight PHL–CZM return, low', 568, 'USD', 'ADVERTISED (snippet, aggregator)', MONEY)
CZ_FL_HI = W.inp('Flight PHL–CZM return, high', 800, 'USD', 'ADVERTISED (snippet, aggregator)', MONEY)
CZ_FL_CUN = W.inp('Alternative: PHL–CUN + ADO bus + ferry, all-in return', 400, 'USD', 'ADVERTISED (snippet); mid of 315–450', MONEY)
CZ_XFER = W.inp('CZM airport shared van, each way', 15, 'USD', 'ADVERTISED (snippet)', MONEY)
CZ_LODGE_RESORT = W.inp('Hotel Cozumel & Resort, pp/night, 2 sharing, breakfast incl.', 54, 'USD', 'ADVERTISED (snippet); upper of 41–54', MONEY)
CZ_LODGE_RESORT3 = W.inp('Hotel Cozumel & Resort, pp/night, 3 sharing', 40, 'USD', 'INFERRED (30–40)', MONEY)
CZ_LODGE_DT = W.inp('Casa Mexicana, pp/night, 2 sharing, breakfast incl.', 84, 'USD', 'ADVERTISED (snippet); upper of 65–84', MONEY)
CZ_N7 = W.inp('Nights, 6-night version (Tue 8 – Mon 14)', 6, 'nights', 'scope change 22 Sep')
CZ_N5 = W.inp('Nights, 5-night version', 5, 'nights', 'brief')
CZ_OW = W.inp('PADI Open Water in-water course, gear incl. (Blue Note)', 400, 'USD', 'ADVERTISED (snippet); second snippet shows USD 300', MONEY)
CZ_ELEARN = W.inp('PADI Open Water eLearning, bought from PADI', 195, 'USD', 'ADVERTISED (snippet); 195–230', MONEY)
CZ_PKG_MXN = W.inp('5-day / 10-dive package (Blue Note), MXN price', 10500, 'MXN', 'ADVERTISED (snippet); USD 600 listed', '#,##0')
CZ_2TANK = W.inp('Two-tank boat dive, mid of island band', 120, 'USD', 'ADVERTISED (snippet); 95–135', MONEY)
CZ_PARK_MXN = W.inp('Marine park fee per dive day', 220, 'MXN', 'ADVERTISED (snippet); USD 15', '#,##0')
CZ_GEAR = W.inp('Gear rental per day (certified divers)', 25, 'USD', 'ADVERTISED (snippet)', MONEY)
CZ_REFRESH = W.inp('Refresher (certified divers, if >12 months)', 30, 'USD', 'brief lead; island range 30–107', MONEY)
CZ_AOW = W.inp('PADI Advanced Open Water incl. eLearning (Blue Note)', 530, 'USD', 'ADVERTISED (snippet); Salty USD 350 + IVA', MONEY)
CZ_NITROX = W.inp('Nitrox fill per tank', 12, 'USD', 'ADVERTISED (snippet); 10–13', MONEY)
CZ_NIGHT = W.inp('Night dive, 1 tank', 95, 'USD', 'ADVERTISED (snippet)', MONEY)
CZ_SHARK = W.inp('Optional bull-shark day, Playa del Carmen (BAITED), all-in incl. ferry and gear', 260, 'USD', 'ADVERTISED (snippet) + INFERRED', MONEY)
CZ_DD_CERT7 = W.inp('Certified dive days, 6-night version (Wed–Sun)', 5, 'days', 'itinerary')
CZ_DD_CERT5 = W.inp('Certified dive days, 5-night version (Wed–Sat)', 4, 'days', 'itinerary')
CZ_DD_BEGFUN7 = W.inp('Beginner fun-dive days after course, 6-night (Sat–Sun)', 2, 'days', 'itinerary')
CZ_DD_BEGFUN5 = W.inp('Beginner fun-dive days after course, 5-night (Sat)', 1, 'days', 'itinerary')
CZ_OW_DAYS = W.inp('Open Water course days (park fee charged on boat day only)', 1, 'boat days', 'ADVERTISED (snippet)')
CZ_FREE_PER = W.inp('Operator free places: one per N paying (diving only)', 10, 'paying', 'QUOTE NEEDED; brief convention')
W.blank()

# ---- Egypt
W.h2('Egypt (Marsa Shagra), Sat 2 – Sat 9 Jan 2027, 6 nights on the ground')
EG_FL_LO = W.inp('Flight PHL–HRG return via Lufthansa Group hub, low', 700, 'USD', 'ADVERTISED (snippet, aggregator)', MONEY)
EG_FL_HI = W.inp('Flight PHL–HRG return, high', 1300, 'USD', 'ADVERTISED (snippet, aggregator)', MONEY)
EG_FL_RMF = W.inp('Flight PHL–RMF return (thin January schedule)', 1300, 'USD', 'INFERRED; 1,000–1,600', MONEY)
EG_OJ = W.inp('Open-jaw add-on: HRG–ZRH one-way instead of return leg (net of return leg)', 0, 'USD', 'QUOTE NEEDED; one-way ~USD 550 seen', MONEY)
EG_N = W.inp('Nights on the ground (Sun 3 – Sat 9)', 6, 'nights', 'itinerary')
EG_TENT = W.inp('Royal Tent, full board, pp/night sharing', 78, 'EUR', 'QUOTE NEEDED (brief; low season)', '#,##0')
EG_CHALET = W.inp('Deluxe Chalet, full board, pp/night sharing', 113, 'EUR', 'QUOTE NEEDED (brief; low season)', '#,##0')
EG_OW = W.inp('PADI Open Water incl. gear', 358, 'EUR', 'QUOTE NEEDED (brief)', '#,##0')
EG_ECODE = W.inp('PADI e-code (waived if bought direct?)', 94, 'EUR', 'QUOTE NEEDED (brief)', '#,##0')
EG_PKG = W.inp('5-day house-reef dive package', 347, 'EUR', 'QUOTE NEEDED (brief)', '#,##0')
EG_XDAY = W.inp('Extra house-reef dive day', 69, 'EUR', 'QUOTE NEEDED (brief)', '#,##0')
EG_GEAR = W.inp('Gear rental per day, certified divers', 15, 'EUR', 'INFERRED; QUOTE NEEDED', '#,##0')
EG_AOW = W.inp('PADI Advanced Open Water', 315, 'EUR', 'INFERRED (280–350); QUOTE NEEDED', '#,##0')
EG_DOLPHIN = W.inp('Dolphin House day incl. fee', 67, 'EUR', 'QUOTE NEEDED (48 + 19)', '#,##0')
EG_ABUDABAB = W.inp('Abu Dabab day incl. entry', 59, 'EUR', 'QUOTE NEEDED (48 + 11)', '#,##0')
EG_ELPH = W.inp('Elphinstone day boat (advanced)', 80, 'EUR', 'INFERRED; QUOTE NEEDED', '#,##0')
EG_XFER_RMF = W.inp('Transfer RMF–Marsa Shagra, each way (10–20 pax)', 22, 'EUR', 'QUOTE NEEDED (brief)', '#,##0')
EG_XFER_RMF21 = W.inp('Transfer RMF–Marsa Shagra, each way (21–30 pax)', 17, 'EUR', 'QUOTE NEEDED (brief)', '#,##0')
EG_XFER_HRG = W.inp('Transfer HRG–Marsa Shagra, each way (10–20 pax)', 41, 'EUR', 'QUOTE NEEDED (brief)', '#,##0')
EG_VISA = W.inp('Visa + airport meet-and-assist', 45, 'EUR', 'QUOTE NEEDED (brief)', '#,##0')
EG_CHAMBER = W.inp('On-site chamber fee', 7, 'EUR', 'ADVERTISED (snippet)', '#,##0')
EG_INCID = W.inp('Incidentals per day on full board', 15, 'USD/day', 'INFERRED', MONEY)
EG_DD_CERT = W.inp('Certified dive days (Mon–Fri, Fri morning only)', 5, 'days', 'itinerary')
EG_DD_BEGFUN = W.inp('Beginner dive days after course (Thu–Fri)', 2, 'days', 'itinerary')
EG_FREE_11 = W.inp('RSDS free places: threshold for first free guest', 11, 'guests', 'ADVERTISED (snippet)')
EG_FREE_22 = W.inp('RSDS free places: threshold for second free guest', 22, 'guests', 'ADVERTISED (snippet); brief says 21st')
W.blank()

wb._TG_ANCHOR = W  # continue writing Thanksgiving inputs later

# ---- Thanksgiving
W.h2('Thanksgiving: Puerto Rico (La Parguera) and Tiger Beach variant, 25–29 Nov or 19–24 Nov 2026')
TG_FL_LO = W.inp('Flight PHL–SJU return nonstop, low (Thanksgiving week)', 400, 'USD', 'INFERRED; off-peak one-way from USD 62–70 ADVERTISED', MONEY)
TG_FL_HI = W.inp('Flight PHL–SJU return nonstop, high', 700, 'USD', 'INFERRED; QUOTE NEEDED', MONEY)
TG_N_A = W.inp('Nights, Wed 25 – Sun 29 Nov', 4, 'nights', 'brief')
TG_N_B = W.inp('Nights, Thu 19 – Tue 24 Nov', 5, 'nights', 'brief')
TG_LODGE2 = W.inp('La Parguera hotel, pp/night, 2 sharing (Parador Villa Parguera USD 135–170/room)', 75, 'USD', 'ADVERTISED (snippet, aggregator)', MONEY)
TG_LODGE3 = W.inp('La Parguera hotel, pp/night, 3 sharing', 50, 'USD', 'INFERRED', MONEY)
TG_WALL = W.inp('Two-tank Wall dive, gear included (Paradise Scuba)', 125, 'USD', 'ADVERTISED (snippet)', MONEY)
TG_DESECHEO = W.inp('Desecheo two-tank incl. USD 20 park fee (Taino Divers), own gear', 140, 'USD', 'ADVERTISED (snippet, aggregator lead)', MONEY)
TG_DD_A = W.inp('Dive days, 25–29 Nov (Thu–Sat; Sat last dive by noon)', 3, 'days', 'itinerary')
TG_DD_B = W.inp('Dive days, 19–24 Nov (Fri–Mon)', 4, 'days', 'itinerary')
TG_DESECHEO_DAYS = W.inp('Of which Desecheo days (weather permitting)', 1, 'days', 'itinerary')
TG_BIO = W.inp('Bio bay boat tour (Parguera Eco Tours)', 45, 'USD', 'ADVERTISED (snippet)', MONEY)
TG_CAR_DAY = W.inp('Car hire per car per day (mid-size, SJU)', 70, 'USD', 'INFERRED; QUOTE NEEDED', MONEY)
TG_CAR_SEATS = W.inp('People per car', 4, 'people', 'assumption')
TG_CAR_FUEL = W.inp('Fuel and tolls per car per trip', 60, 'USD', 'INFERRED', MONEY)
TB_SHARK = W.inp('Tiger Beach shark day, dive only (Neal Watson, 2021 price)', 399, 'USD', 'ADVERTISED (snippet, 2021); QUOTE NEEDED', MONEY)
TB_VAT = W.inp('Bahamas VAT', 0.10, 'rate', 'ADVERTISED (snippet); brief said 12%', PCT)
TB_DAYS_A = W.inp('Shark days, 25–29 Nov (Thu–Fri; Sat buffer)', 2, 'days', 'itinerary')
TB_DAYS_B = W.inp('Shark days, 19–24 Nov', 3, 'days', 'itinerary')
TB_FL_PHL_FLL = W.inp('Flight PHL–FLL return', 300, 'USD', 'INFERRED; QUOTE NEEDED', MONEY)
TB_FL_FLL_FPO = W.inp('Flight FLL–FPO return (Bahamasair)', 300, 'USD', 'ADVERTISED (snippet, aggregator; 271–313)', MONEY)
TB_FERRY = W.inp('Alternative: Baleària ferry FLL–Freeport return', 240, 'USD', 'ADVERTISED (snippet); sailing days QUOTE NEEDED', MONEY)
TB_LODGE2 = W.inp('Old Bahama Bay, pp/night, 2 sharing (rooms USD 205–600)', 125, 'USD', 'INFERRED from ADVERTISED band', MONEY)
TB_LODGE3 = W.inp('Old Bahama Bay, pp/night, 3 sharing (extra person USD 50)', 100, 'USD', 'INFERRED', MONEY)
TB_XFER = W.inp('FPO airport – West End transfer, per person return', 50, 'USD', 'INFERRED; QUOTE NEEDED', MONEY)
TB_WETSUIT = W.inp('Full 5 mm wetsuit rental if needed, per day', 15, 'USD', 'INFERRED', MONEY)
W.blank()
W.h2('Organiser place')
W.row(['George is costed as a diving participant. Free places from operators are applied first; any remainder is shown as a disclosed per-head charge.'])

# ================================================================== helpers
def money(ws, r, c, formula):
    cell = ws.cell(r, c, formula); cell.font = BODY; cell.number_format = MONEY; return cell

def build_group_table(W, title, cols, rows):
    """rows: list of (label, [formula per col or None]). Returns dict label->row number, plus total row."""
    W.h2(title)
    W.row(['Item'] + cols, fonts=[H2]*(len(cols)+1))
    first = W.r
    idx = {}
    for label, fs in rows:
        r = W.row([label] + [f if f is not None else 0 for f in fs], fmts=[None]+[MONEY]*len(cols))
        idx[label] = r
    last = W.r - 1
    tot = W.row(['Total per person'] + [f'=SUM({get_column_letter(j)}{first}:{get_column_letter(j)}{last})' for j in range(2, len(cols)+2)],
                fonts=[H2]*(len(cols)+1), fmts=[None]+[MONEY]*len(cols))
    idx['total'] = tot
    core = W.row(['of which core: flights, transfers, lodging, diving, fees (excl. meals, tips, insurance)'] + [f'={get_column_letter(j)}{tot}-SUM({get_column_letter(j)}{last-2}:{get_column_letter(j)}{last})' for j in range(2, len(cols)+2)], fmts=[None]+[MONEY]*len(cols))
    idx['core'] = core
    return idx

# ================================================================== COZUMEL
ws = sheet('Cozumel', [58, 16, 16, 16, 16, 16, 16])
W = Writer(ws)
W.h1('Cozumel — Tue 8 – Mon 14 Dec 2026 (6 nights) and Tue 8 – Sun 13 Dec (5 nights)')
W.row(['All figures per person, USD. Reads from Inputs. Lodging at Hotel Cozumel & Resort, 2 sharing, breakfast included. Flights at the midpoint of the aggregator band.'])
W.blank()
I = 'Inputs!'
def cz_rows(nights, dd_cert, dd_beg):
    fl = f'=AVERAGE({I}{CZ_FL_LO},{I}{CZ_FL_HI})'
    return [
        ('Flight PHL–CZM return (band midpoint)', [fl, fl, fl]),
        ('Airport transfers', [f'=2*{I}{CZ_XFER}']*3),
        ('Lodging, 2 sharing, breakfast included', [f'={I}{nights}*{I}{CZ_LODGE_RESORT}']*3),
        ('Open Water in-water course (gear included)', [None, f'={I}{CZ_OW}', None]),
        ('PADI eLearning', [None, f'={I}{CZ_ELEARN}', None]),
        ('Boat diving (package for certified; fun days for beginners)', [f'={I}{CZ_PKG_MXN}/{I}{FX_MXN}', f'={I}{dd_beg}*{I}{CZ_2TANK}', f'={I}{CZ_PKG_MXN}/{I}{FX_MXN}']),
        ('Advanced Open Water course', [None, None, f'={I}{CZ_AOW}']),
        ('Marine park fee', [f'={I}{dd_cert}*{I}{CZ_PARK_MXN}/{I}{FX_MXN}', f'=({I}{CZ_OW_DAYS}+{I}{dd_beg})*{I}{CZ_PARK_MXN}/{I}{FX_MXN}', f'={I}{dd_cert}*{I}{CZ_PARK_MXN}/{I}{FX_MXN}']),
        ('Gear rental', [f'={I}{dd_cert}*{I}{CZ_GEAR}', f'={I}{dd_beg}*{I}{CZ_GEAR}', f'={I}{dd_cert}*{I}{CZ_GEAR}']),
        ('Refresher (if >12 months since last dive)', [f'={I}{CZ_REFRESH}', None, f'={I}{CZ_REFRESH}']),
        ('Nitrox fills (advanced, 6 tanks)', [None, None, f'=6*{I}{CZ_NITROX}']),
        ('Night dive (advanced)', [None, None, f'={I}{CZ_NIGHT}']),
        ('Meals and incidentals', [f'={I}{nights}*{I}{MEALS}']*3),
        ('Tips and local extras', [f'={I}{TIPS}']*3),
        ('Dive-accident insurance', [f'={I}{DAN}']*3),
    ]
cols = ['Certified', 'Beginner', 'Advanced']
cz7 = build_group_table(W, 'A. Per-person cost, 6-night version (no spare day: a norther on Sat/Sun hits the certification dives)', cols, cz_rows(CZ_N7, CZ_DD_CERT7, CZ_DD_BEGFUN7))
t7 = cz7['total']
W.row(['Budget ceiling', f'={I}{CEIL_CZ_CERT}', f'={I}{CEIL_CZ_BEG}', f'={I}{CEIL_CZ_CERT}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Headroom (negative = over ceiling)', f'=B{W.r-1}-B{t7}', f'=C{W.r-1}-C{t7}', f'=D{W.r-1}-D{t7}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Optional bull-shark day, Playa del Carmen (BAITED), not in total', f'={I}{CZ_SHARK}', f'={I}{CZ_SHARK}', f'={I}{CZ_SHARK}'], fmts=[None, MONEY, MONEY, MONEY])
W.blank(2)

cz5 = build_group_table(W, 'B. Per-person cost, 5-night version (Sun 13 return; no norther buffer)', cols, cz_rows(CZ_N5, CZ_DD_CERT5, CZ_DD_BEGFUN5))
t5 = cz5['total']
W.row(['Budget ceiling', f'={I}{CEIL_CZ_CERT}', f'={I}{CEIL_CZ_BEG}', f'={I}{CEIL_CZ_CERT}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Headroom (negative = over ceiling)', f'=B{W.r-1}-B{t5}', f'=C{W.r-1}-C{t5}', f'=D{W.r-1}-D{t5}'], fmts=[None, MONEY, MONEY, MONEY])
W.blank(2)

# Organiser place, 7-night
W.h2('C. Organiser place (6-night version), by group size')
W.row(['', '20 people', '30 people', '40 people'], fonts=[None, H2, H2, H2])
rN = W.row(['Group size incl. George', 20, 30, 40], fonts=[None, INPUT, INPUT, INPUT])
rPay = W.row(['Paying participants', f'=B{rN}-1', f'=C{rN}-1', f'=D{rN}-1'])
rFree = W.row(['Operator free places earned (one per N paying, QUOTE NEEDED)', f'=INT(B{rPay}/{I}{CZ_FREE_PER})', f'=INT(C{rPay}/{I}{CZ_FREE_PER})', f'=INT(D{rPay}/{I}{CZ_FREE_PER})'])
divrow = cz7['Boat diving (package for certified; fun days for beginners)']; parkrow = cz7['Marine park fee']; gearrow = cz7['Gear rental']
rVal = W.row(['Value of one free place (diving, park fee, gear)'] + [f'=B{divrow}+B{parkrow}+B{gearrow}']*3, fmts=[None, MONEY, MONEY, MONEY])
rGeo = W.row(["George's all-in cost (certified column)"] + [f'=B{t7}']*3, fmts=[None, MONEY, MONEY, MONEY])
rCov = W.row(['Covered by free places (max one place used for George)', f'=MIN(B{rFree},1)*B{rVal}', f'=MIN(C{rFree},1)*C{rVal}', f'=MIN(D{rFree},1)*D{rVal}'], fmts=[None, MONEY, MONEY, MONEY])
W.blank()
W.row(['Approach 1 — free places only'], fonts=[H2])
rA1 = W.row(['George pays himself', f'=B{rGeo}-B{rCov}', f'=C{rGeo}-C{rCov}', f'=D{rGeo}-D{rCov}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Per-head charge to participants', 0, 0, 0], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Approach 2 — free places plus disclosed per-head charge'], fonts=[H2])
rA2 = W.row(['Per-head charge to participants', f'=(B{rGeo}-B{rCov})/B{rPay}', f'=(C{rGeo}-C{rCov})/C{rPay}', f'=(D{rGeo}-D{rCov})/D{rPay}'], fmts=[None, MONEY2, MONEY2, MONEY2])
W.row(['Certified all-in with charge', f'=B{t7}+B{rA2}', f'=B{t7}+C{rA2}', f'=B{t7}+D{rA2}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Beginner all-in with charge', f'=C{t7}+B{rA2}', f'=C{t7}+C{rA2}', f'=C{t7}+D{rA2}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Approach 3 — per-head charge only (no free places)'], fonts=[H2])
rA3 = W.row(['Per-head charge to participants', f'=B{rGeo}/B{rPay}', f'=B{rGeo}/C{rPay}', f'=B{rGeo}/D{rPay}'], fmts=[None, MONEY2, MONEY2, MONEY2])
W.row(['Certified all-in with charge', f'=B{t7}+B{rA3}', f'=B{t7}+C{rA3}', f'=B{t7}+D{rA3}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Beginner all-in with charge', f'=C{t7}+B{rA3}', f'=C{t7}+C{rA3}', f'=C{t7}+D{rA3}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Unused free places (could offset an instructor or assistant place)', f'=MAX(B{rFree}-1,0)', f'=MAX(C{rFree}-1,0)', f'=MAX(D{rFree}-1,0)'])
W.blank(2)

# Sensitivity
W.h2('D. Sensitivity (6-night version, per person, before organiser charge)')
W.row(['Airfare', 'Low', 'Midpoint', 'High'], fonts=[None, H2, H2, H2])
W.row(['Fare used', f'={I}{CZ_FL_LO}', f'=AVERAGE({I}{CZ_FL_LO},{I}{CZ_FL_HI})', f'={I}{CZ_FL_HI}'], fmts=[None, MONEY, MONEY, MONEY])
rFareUsed = W.r - 1
flrow = cz7['Flight PHL–CZM return (band midpoint)']
W.row(['Certified total', f'=B{t7}-B{flrow}+B{rFareUsed}', f'=B{t7}-B{flrow}+C{rFareUsed}', f'=B{t7}-B{flrow}+D{rFareUsed}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Beginner total', f'=C{t7}-B{flrow}+B{rFareUsed}', f'=C{t7}-B{flrow}+C{rFareUsed}', f'=C{t7}-B{flrow}+D{rFareUsed}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Cancún + ferry routing instead (certified)', f'=B{t7}-B{flrow}+{I}{CZ_FL_CUN}'], fmts=[None, MONEY])
W.blank()
W.row(['MXN per USD', 'Peso 10% stronger', 'Rate used', 'Peso 10% weaker'], fonts=[None, H2, H2, H2])
rRate = W.row(['Rate', f'={I}{FX_MXN}*0.9', f'={I}{FX_MXN}', f'={I}{FX_MXN}*1.1'], fmts=[None, '0.00', '0.00', '0.00'])
W.row(['MXN-priced items, certified (package + park fee), in MXN'] + [f'={I}{CZ_PKG_MXN}+{I}{CZ_DD_CERT7}*{I}{CZ_PARK_MXN}']*3, fmts=[None, '#,##0', '#,##0', '#,##0'])
rMXN = W.r - 1
W.row(['Certified total at that rate', f'=B{t7}-B{divrow}-B{parkrow}+B{rMXN}/B{rRate}', f'=B{t7}-B{divrow}-B{parkrow}+C{rMXN}/C{rRate}', f'=B{t7}-B{divrow}-B{parkrow}+D{rMXN}/D{rRate}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Beginner: only the park fee is MXN-priced; effect under USD 10 per person either way'])
W.blank(2)

W.h2('E. Break-even group size (6-night version)')
W.row(['Smallest group at which a certified diver stays under the ceiling when George\'s uncovered cost is spread per head (Approach 2, one free place assumed from 10 paying).'])
rBE = W.row(['Certified: uncovered organiser cost', f'=B{rGeo}-B{rVal}'], fmts=[None, MONEY])
W.row(['Certified: headroom under ceiling per person', f'={I}{CEIL_CZ_CERT}-B{t7}'], fmts=[None, MONEY])
W.row(['Certified: break-even group size incl. George', f'=IF(B{W.r-1}>0,ROUNDUP(B{rBE}/B{W.r-1},0)+1,"not viable at this price")'])
W.row(['Beginner: headroom under ceiling per person', f'={I}{CEIL_CZ_BEG}-C{t7}'], fmts=[None, MONEY])
W.row(['Beginner: break-even group size incl. George', f'=IF(B{W.r-1}>0,ROUNDUP(B{rBE}/B{W.r-1},0)+1,"not viable at this price")'])
W.row(['Operator minimum for a private course block: QUOTE NEEDED (PADI ratio 8 students per instructor on open-water dives).'])
W.blank(2)

W.h2('F. Deposit schedule (draft, matched to advertised terms; all QUOTE NEEDED)')
W.row(['Milestone', 'Date', 'Amount per person', 'Basis'], fonts=[None, H2, H2, H2])
W.row(['Participant deposit to club (Aruba 2024 precedent USD 575)', 'Fri 9 Oct 2026', 600, 'Covers operator and hotel deposits below'], fmts=[None, None, MONEY, None])
W.row(['Dive operator deposit (Sand Dollar: 25% of package; Blue Note: size QUOTE NEEDED)', 'Fri 16 Oct 2026', f'=0.25*B{divrow}', '25% of diving'], fmts=[None, None, MONEY, None])
W.row(['Hotel block deposit (typically one night per room)', 'Fri 16 Oct 2026', f'={I}{CZ_LODGE_RESORT}', 'One night, 2 sharing'], fmts=[None, None, MONEY, None])
W.row(['Airline group deposit (AA Group & Meeting Travel, per passenger, amount QUOTE NEEDED)', 'Fri 2 Oct 2026', 'unknown', 'Space held without names; names 48 h out'])
W.row(['Balance to club', 'Fri 6 Nov 2026', f'=B{t7}-600', 'Certified all-in less deposit'], fmts=[None, None, MONEY, None])
W.row(['Last day for full operator refund (Blue Magic group terms: 60 days, less 5%)', 'Fri 9 Oct 2026', '', 'Blue Magic policy page (snippet)'])
W.row(['Blue Magic 50% refund window closes', 'Sun 8 Nov 2026', '', '45–30 days before arrival'])
W.row(['Blue Note / Aldora / Sand Dollar: free cancellation to 48 h before', 'Sun 6 Dec 2026', '', 'Per policy snippets'])
CZ_REFS = dict(t7=t7, t5=t5, rA2=rA2, rA3=rA3, rN=rN, c7=cz7['core'])

# ================================================================== JANUARY (EGYPT)
ws = sheet('January', [58, 16, 16, 16, 16, 16, 16])
W = Writer(ws)
W.h1('Egypt, Marsa Shagra — Sat 2 – Sat 9 Jan 2027 (6 nights on the ground)')
W.row(['All figures per person, USD, converted from EUR at the Inputs rate. Full board included in lodging. Flights PHL–HRG via a Lufthansa Group hub at the band midpoint; transfers from Hurghada (3 h) unless RMF proves bookable.'])
W.blank()
E = f'*{I}{FX_EUR}'
def eg_rows(room, xfer):
    fl = f'=AVERAGE({I}{EG_FL_LO},{I}{EG_FL_HI})'
    return [
        ('Flight PHL–HRG return via Europe (band midpoint)', [fl, fl, fl]),
        ('Airport transfers, both ways', [f'=2*{I}{xfer}{E}']*3),
        ('Lodging, full board, 2 sharing', [f'={I}{EG_N}*{I}{room}{E}']*3),
        ('Open Water course incl. gear', [None, f'={I}{EG_OW}{E}', None]),
        ('PADI e-code', [None, f'={I}{EG_ECODE}{E}', None]),
        ('House-reef dive package (5 days) or post-course dive days', [f'={I}{EG_PKG}{E}', f'={I}{EG_DD_BEGFUN}*{I}{EG_XDAY}{E}', f'={I}{EG_PKG}{E}']),
        ('Advanced Open Water course', [None, None, f'={I}{EG_AOW}{E}']),
        ('Gear rental', [f'={I}{EG_DD_CERT}*{I}{EG_GEAR}{E}', f'={I}{EG_DD_BEGFUN}*{I}{EG_GEAR}{E}', f'={I}{EG_DD_CERT}*{I}{EG_GEAR}{E}']),
        ('Excursions: Dolphin House and Abu Dabab (certified); Elphinstone (advanced)', [f'=({I}{EG_DOLPHIN}+{I}{EG_ABUDABAB}){E}', f'={I}{EG_ABUDABAB}{E}', f'=({I}{EG_DOLPHIN}+{I}{EG_ELPH}){E}']),
        ('Visa and meet-and-assist', [f'={I}{EG_VISA}{E}']*3),
        ('On-site chamber fee', [f'={I}{EG_CHAMBER}{E}']*3),
        ('Incidentals on full board', [f'={I}{EG_N}*{I}{EG_INCID}']*3),
        ('Tips and local extras', [f'={I}{TIPS}']*3),
        ('Dive-accident insurance', [f'={I}{DAN}']*3),
    ]
egT = build_group_table(W, 'A. Per-person cost, Royal Tent, transfers from Hurghada (10–20 people)', cols, eg_rows(EG_TENT, EG_XFER_HRG))
tT = egT['total']
W.row(['Budget ceiling'] + [f'={I}{CEIL_EG}']*3, fmts=[None, MONEY, MONEY, MONEY])
W.row(['Headroom (negative = over ceiling)', f'=B{W.r-1}-B{tT}', f'=C{W.r-1}-C{tT}', f'=D{W.r-1}-D{tT}'], fmts=[None, MONEY, MONEY, MONEY])
W.blank(2)
egC = build_group_table(W, 'B. Per-person cost, Deluxe Chalet, transfers from Marsa Alam airport (10–20 people)', cols, eg_rows(EG_CHALET, EG_XFER_RMF))
tC = egC['total']
W.row(['Budget ceiling'] + [f'={I}{CEIL_EG}']*3, fmts=[None, MONEY, MONEY, MONEY])
W.row(['Headroom (negative = over ceiling)', f'=B{W.r-1}-B{tC}', f'=C{W.r-1}-C{tC}', f'=D{W.r-1}-D{tC}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Open-jaw to Zurich for Euroski (net add-on, QUOTE NEEDED)'] + [f'={I}{EG_OJ}']*3, fmts=[None, MONEY, MONEY, MONEY])
W.blank(2)

W.h2('C. Organiser place (Royal Tent scenario), by group size')
W.row(['', '15 people', '20 people', '25 people'], fonts=[None, H2, H2, H2])
rN = W.row(['Group size incl. George', 15, 20, 25], fonts=[None, INPUT, INPUT, INPUT])
rPay = W.row(['Paying participants', f'=B{rN}-1', f'=C{rN}-1', f'=D{rN}-1'])
rFree = W.row(['RSDS free places (1 at 11+, 2 at 22+ guests)', f'=IF(B{rN}>={I}{EG_FREE_22},2,IF(B{rN}>={I}{EG_FREE_11},1,0))', f'=IF(C{rN}>={I}{EG_FREE_22},2,IF(C{rN}>={I}{EG_FREE_11},1,0))', f'=IF(D{rN}>={I}{EG_FREE_22},2,IF(D{rN}>={I}{EG_FREE_11},1,0))'])
lodrow = egT['Lodging, full board, 2 sharing']; xrow = egT['Airport transfers, both ways']; pkgrow = egT['House-reef dive package (5 days) or post-course dive days']
rVal = W.row(['Value of one free place (room, transfers, dive package)'] + [f'=B{lodrow}+B{xrow}+B{pkgrow}']*3, fmts=[None, MONEY, MONEY, MONEY])
rGeo = W.row(["George's all-in cost (certified column)"] + [f'=B{tT}']*3, fmts=[None, MONEY, MONEY, MONEY])
rCov = W.row(['Covered by free places (one used for George)', f'=MIN(B{rFree},1)*B{rVal}', f'=MIN(C{rFree},1)*C{rVal}', f'=MIN(D{rFree},1)*D{rVal}'], fmts=[None, MONEY, MONEY, MONEY])
W.blank()
W.row(['Approach 1 — free places only'], fonts=[H2])
W.row(['George pays himself', f'=B{rGeo}-B{rCov}', f'=C{rGeo}-C{rCov}', f'=D{rGeo}-D{rCov}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Per-head charge to participants', 0, 0, 0], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Approach 2 — free places plus disclosed per-head charge'], fonts=[H2])
rA2 = W.row(['Per-head charge to participants', f'=(B{rGeo}-B{rCov})/B{rPay}', f'=(C{rGeo}-C{rCov})/C{rPay}', f'=(D{rGeo}-D{rCov})/D{rPay}'], fmts=[None, MONEY2, MONEY2, MONEY2])
W.row(['Certified all-in with charge', f'=B{tT}+B{rA2}', f'=B{tT}+C{rA2}', f'=B{tT}+D{rA2}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Beginner all-in with charge', f'=C{tT}+B{rA2}', f'=C{tT}+C{rA2}', f'=C{tT}+D{rA2}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Approach 3 — per-head charge only (no free places)'], fonts=[H2])
rA3 = W.row(['Per-head charge to participants', f'=B{rGeo}/B{rPay}', f'=B{rGeo}/C{rPay}', f'=B{rGeo}/D{rPay}'], fmts=[None, MONEY2, MONEY2, MONEY2])
W.row(['Certified all-in with charge', f'=B{tT}+B{rA3}', f'=B{tT}+C{rA3}', f'=B{tT}+D{rA3}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Beginner all-in with charge', f'=C{tT}+B{rA3}', f'=C{tT}+C{rA3}', f'=C{tT}+D{rA3}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Second free place at 22+ guests: value per paying head if rebated', 0, 0, f'=MAX(D{rFree}-1,0)*D{rVal}/D{rPay}'], fmts=[None, MONEY, MONEY, MONEY2])
W.row(['Transfer rate at 21–30 people is lower (EUR 33 / 17): saving per person', 0, 0, f'=2*({I}{EG_XFER_HRG}-33){E}'], fmts=[None, MONEY, MONEY, MONEY])
W.blank(2)

W.h2('D. Sensitivity (Royal Tent scenario, per person, before organiser charge)')
W.row(['Airfare', 'Low', 'Midpoint', 'High'], fonts=[None, H2, H2, H2])
rFareUsed = W.row(['Fare used', f'={I}{EG_FL_LO}', f'=AVERAGE({I}{EG_FL_LO},{I}{EG_FL_HI})', f'={I}{EG_FL_HI}'], fmts=[None, MONEY, MONEY, MONEY])
flrow = egT['Flight PHL–HRG return via Europe (band midpoint)']
W.row(['Certified total', f'=B{tT}-B{flrow}+B{rFareUsed}', f'=B{tT}-B{flrow}+C{rFareUsed}', f'=B{tT}-B{flrow}+D{rFareUsed}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Beginner total', f'=C{tT}-B{flrow}+B{rFareUsed}', f'=C{tT}-B{flrow}+C{rFareUsed}', f'=C{tT}-B{flrow}+D{rFareUsed}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Advanced total', f'=D{tT}-B{flrow}+B{rFareUsed}', f'=D{tT}-B{flrow}+C{rFareUsed}', f'=D{tT}-B{flrow}+D{rFareUsed}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Fly to Marsa Alam instead (certified)', f'=B{tT}-B{flrow}+{I}{EG_FL_RMF}-B{xrow}+2*{I}{EG_XFER_RMF}{E}'], fmts=[None, MONEY])
W.blank()
W.row(['USD per EUR', 'Euro 10% weaker', 'Rate used', 'Euro 10% stronger'], fonts=[None, H2, H2, H2])
rRate = W.row(['Rate', f'={I}{FX_EUR}*0.9', f'={I}{FX_EUR}', f'={I}{FX_EUR}*1.1'], fmts=[None, '0.0000', '0.0000', '0.0000'])
# EUR-denominated share of total: everything except flight, incidentals, tips, DAN
usd_only = f'(B{flrow}+B{egT["Incidentals on full board"]}+B{egT["Tips and local extras"]}+B{egT["Dive-accident insurance"]})'
usd_onlyC = usd_only.replace('B', 'C'); usd_onlyD = usd_only.replace('B', 'D')
W.row(['Certified total at that rate', f'={usd_only}+(B{tT}-{usd_only})*B{rRate}/{I}{FX_EUR}', f'={usd_only}+(B{tT}-{usd_only})*C{rRate}/{I}{FX_EUR}', f'={usd_only}+(B{tT}-{usd_only})*D{rRate}/{I}{FX_EUR}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Beginner total at that rate', f'={usd_onlyC}+(C{tT}-{usd_onlyC})*B{rRate}/{I}{FX_EUR}', f'={usd_onlyC}+(C{tT}-{usd_onlyC})*C{rRate}/{I}{FX_EUR}', f'={usd_onlyC}+(C{tT}-{usd_onlyC})*D{rRate}/{I}{FX_EUR}'], fmts=[None, MONEY, MONEY, MONEY])
W.blank(2)

W.h2('E. Break-even group size (Royal Tent scenario)')
rBE = W.row(['Certified: uncovered organiser cost after one free place', f'=B{rGeo}-B{rVal}'], fmts=[None, MONEY])
W.row(['Certified: headroom under ceiling per person', f'={I}{CEIL_EG}-B{tT}'], fmts=[None, MONEY])
W.row(['Certified: break-even group size incl. George', f'=IF(B{W.r-1}>0,ROUNDUP(B{rBE}/B{W.r-1},0)+1,"not viable at this price")'])
W.row(['Beginner: headroom under ceiling per person', f'={I}{CEIL_EG}-C{tT}'], fmts=[None, MONEY])
W.row(['Beginner: break-even group size incl. George', f'=IF(B{W.r-1}>0,ROUNDUP(B{rBE}/B{W.r-1},0)+1,"not viable at this price")'])
W.row(['RSDS first free place needs 11 guests, so 11 is the practical minimum for a free organiser place.'])
W.blank(2)

W.h2('F. Deposit schedule (draft, matched to advertised RSDS and Lufthansa group terms; QUOTE NEEDED)')
W.row(['Milestone', 'Date', 'Amount per person', 'Basis'], fonts=[None, H2, H2, H2])
W.row(['Participant deposit to club', 'Fri 16 Oct 2026', 700, 'Covers RSDS deposit (up to 50% low season) and airline group deposit'], fmts=[None, None, MONEY, None])
W.row(['RSDS deposit (up to 50% of land package; 100% if 1–10 Jan is treated as a feast period)', 'Fri 23 Oct 2026', f'=0.5*(B{lodrow}+B{xrow}+B{pkgrow})', '50% of room, transfers, diving'], fmts=[None, None, MONEY, None])
W.row(['Lufthansa Group desk: pay within 7 days of confirmation; names 14 days before departure', 'Contract + 7 days; names by Sat 19 Dec 2026', 'per contract', 'LH group terms (snippet)'])
W.row(['Balance to club', 'Fri 20 Nov 2026', f'=B{tT}-700', 'Certified all-in less deposit'], fmts=[None, None, MONEY, None])
W.row(['RSDS balance (cancellation 20% if >30 days out)', 'Wed 2 Dec 2026', '', 'RSDS ladder: >30 d 20%, 15–29 d 30%, 7–14 d 50%, <=6 d 80%'])
W.row(['Emperor Divers alternative: 20% non-refundable group deposit; 100% inside 30 days', '', '', 'Emperor terms PDF (snippet)'])
EG_REFS = dict(tT=tT, tC=tC, rA2=rA2, rA3=rA3, cT=egT['core'])

# ================================================================== THANKSGIVING
ws = sheet('Thanksgiving', [58, 16, 16, 16, 16, 16, 16])
W = Writer(ws)
W.h1('Thanksgiving — Puerto Rico (La Parguera) and Tiger Beach (Grand Bahama), 10 certified divers')
W.row(['All figures per person, USD, 2 sharing, own dive gear. Car cost per head depends on group size (people per car on Inputs). Tiger Beach dives are BAITED shark dives; sales are final with a one-year weather credit.'])
W.blank()
def pr_rows(nights, dd):
    fl = f'=AVERAGE({I}{TG_FL_LO},{I}{TG_FL_HI})'
    car = lambda n: f'=(ROUNDUP({n}/{I}{TG_CAR_SEATS},0)*({I}{nights}*{I}{TG_CAR_DAY}+{I}{TG_CAR_FUEL}))/{n}'
    return [
        ('Flight PHL–SJU return nonstop (band midpoint)', [fl]*3),
        ('Car hire, fuel and tolls (shared)', [car('B$H'), car('C$H'), car('D$H')]),
        ('Lodging, 2 sharing', [f'={I}{nights}*{I}{TG_LODGE2}']*3),
        ('Wall dives (two-tank days less Desecheo days)', [f'=({I}{dd}-{I}{TG_DESECHEO_DAYS})*{I}{TG_WALL}']*3),
        ('Desecheo day incl. park fee (weather permitting)', [f'={I}{TG_DESECHEO_DAYS}*{I}{TG_DESECHEO}']*3),
        ('Bio bay evening', [f'={I}{TG_BIO}']*3),
        ('Meals and incidentals', [f'={I}{nights}*{I}{MEALS}']*3),
        ('Tips and local extras', [f'={I}{TIPS}']*3),
        ('Dive-accident insurance', [f'={I}{DAN}']*3),
    ]
def tb_rows(nights, days):
    return [
        ('Flights PHL–FLL and FLL–FPO return', [f'={I}{TB_FL_PHL_FLL}+{I}{TB_FL_FLL_FPO}']*3),
        ('Airport – West End transfers', [f'={I}{TB_XFER}']*3),
        ('Lodging Old Bahama Bay, 2 sharing', [f'={I}{nights}*{I}{TB_LODGE2}']*3),
        ('Shark days (BAITED), incl. VAT', [f'={I}{days}*{I}{TB_SHARK}*(1+{I}{TB_VAT})']*3),
        ('Wetsuit rental if needed', [f'={I}{days}*{I}{TB_WETSUIT}']*3),
        ('Meals and incidentals', [f'={I}{nights}*{I}{MEALS}']*3),
        ('Tips and local extras', [f'={I}{TIPS}']*3),
        ('Dive-accident insurance', [f'={I}{DAN}']*3),
    ]
gcols = ['8 people', '10 people', '12 people']
# group-size header row referenced by car formulas: put sizes in row with $H placeholder -> we write sizes in a fixed row and patch formulas
sizes_row = W.row(['Group size incl. George', 8, 10, 12], fonts=[None, INPUT, INPUT, INPUT]); W.blank()
def patch(rows):
    return [(l, [f.replace('$H', str(sizes_row)) if isinstance(f, str) else f for f in fs]) for l, fs in rows]
prA = build_group_table(W, 'A. Puerto Rico, Wed 25 – Sun 29 Nov (4 nights, 3 dive days)', gcols, patch(pr_rows(TG_N_A, TG_DD_A)))
tPA = prA['total']
W.row(['Budget ceiling'] + [f'={I}{CEIL_TG}']*3, fmts=[None, MONEY, MONEY, MONEY])
W.row(['Headroom (negative = over ceiling)', f'=B{W.r-1}-B{tPA}', f'=C{W.r-1}-C{tPA}', f'=D{W.r-1}-D{tPA}'], fmts=[None, MONEY, MONEY, MONEY])
W.blank(2)
prB = build_group_table(W, 'B. Puerto Rico, Thu 19 – Tue 24 Nov (5 nights, 4 dive days; four class days missed; Colombia trek clash)', gcols, patch(pr_rows(TG_N_B, TG_DD_B)))
tPB = prB['total']
W.row(['Budget ceiling'] + [f'={I}{CEIL_TG}']*3, fmts=[None, MONEY, MONEY, MONEY])
W.row(['Headroom (negative = over ceiling)', f'=B{W.r-1}-B{tPB}', f'=C{W.r-1}-C{tPB}', f'=D{W.r-1}-D{tPB}'], fmts=[None, MONEY, MONEY, MONEY])
W.blank(2)
tbA = build_group_table(W, 'C. Tiger Beach variant, Wed 25 – Sun 29 Nov (4 nights, 2 shark days + weather buffer)', gcols, tb_rows(TG_N_A, TB_DAYS_A))
tTA = tbA['total']
W.row(['Budget ceiling'] + [f'={I}{CEIL_TG}']*3, fmts=[None, MONEY, MONEY, MONEY])
W.row(['Headroom (negative = over ceiling)', f'=B{W.r-1}-B{tTA}', f'=C{W.r-1}-C{tTA}', f'=D{W.r-1}-D{tTA}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Extra cost vs Puerto Rico, same dates', f'=B{tTA}-B{tPA}', f'=C{tTA}-C{tPA}', f'=D{tTA}-D{tPA}'], fonts=[H2, H2, H2, H2], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Ferry instead of FLL–FPO flight: saving per person'] + [f'={I}{TB_FL_FLL_FPO}-{I}{TB_FERRY}']*3, fmts=[None, MONEY, MONEY, MONEY])
W.blank(2)
tbB = build_group_table(W, 'D. Tiger Beach variant, Thu 19 – Tue 24 Nov (5 nights, 3 shark days)', gcols, tb_rows(TG_N_B, TB_DAYS_B))
tTB = tbB['total']
W.row(['Budget ceiling'] + [f'={I}{CEIL_TG}']*3, fmts=[None, MONEY, MONEY, MONEY])
W.row(['Headroom (negative = over ceiling)', f'=B{W.r-1}-B{tTB}', f'=C{W.r-1}-C{tTB}', f'=D{W.r-1}-D{tTB}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Extra cost vs Puerto Rico, same dates', f'=B{tTB}-B{tPB}', f'=C{tTB}-C{tPB}', f'=D{tTB}-D{tPB}'], fonts=[H2, H2, H2, H2], fmts=[None, MONEY, MONEY, MONEY])
W.blank(2)

W.h2('E. Organiser place (Puerto Rico, 25–29 Nov)')
W.row(['No Puerto Rico operator advertises a free leader place; at 8–12 divers the diving-only value is small. Approaches shown for disclosure.'])
rPay = W.row(['Paying participants', f'=B{sizes_row}-1', f'=C{sizes_row}-1', f'=D{sizes_row}-1'])
divA = prA['Wall dives (two-tank days less Desecheo days)']; desA = prA['Desecheo day incl. park fee (weather permitting)']
rVal = W.row(['Value of a free diving place (Wall + Desecheo days)', f'=B{divA}+B{desA}', f'=C{divA}+C{desA}', f'=D{divA}+D{desA}'], fmts=[None, MONEY, MONEY, MONEY])
rGeo = W.row(["George's all-in cost", f'=B{tPA}', f'=C{tPA}', f'=D{tPA}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Approach 1 — free diving place only (if quoted): George pays', f'=B{rGeo}-B{rVal}', f'=C{rGeo}-C{rVal}', f'=D{rGeo}-D{rVal}'], fmts=[None, MONEY, MONEY, MONEY])
rA2 = W.row(['Approach 2 — free place plus per-head charge: charge per person', f'=(B{rGeo}-B{rVal})/B{rPay}', f'=(C{rGeo}-C{rVal})/C{rPay}', f'=(D{rGeo}-D{rVal})/D{rPay}'], fmts=[None, MONEY2, MONEY2, MONEY2])
rA3 = W.row(['Approach 3 — per-head charge only: charge per person', f'=B{rGeo}/B{rPay}', f'=C{rGeo}/C{rPay}', f'=D{rGeo}/D{rPay}'], fmts=[None, MONEY2, MONEY2, MONEY2])
W.row(['All-in per person with Approach 3', f'=B{tPA}+B{rA3}', f'=C{tPA}+C{rA3}', f'=D{tPA}+D{rA3}'], fmts=[None, MONEY, MONEY, MONEY])
W.blank(2)

W.h2('F. Sensitivity (Puerto Rico 25–29 Nov, 10 people)')
W.row(['Airfare', 'Low', 'Midpoint', 'High'], fonts=[None, H2, H2, H2])
rFareUsed = W.row(['Fare used', f'={I}{TG_FL_LO}', f'=AVERAGE({I}{TG_FL_LO},{I}{TG_FL_HI})', f'={I}{TG_FL_HI}'], fmts=[None, MONEY, MONEY, MONEY])
flrow = prA['Flight PHL–SJU return nonstop (band midpoint)']
W.row(['Total per person', f'=C{tPA}-C{flrow}+B{rFareUsed}', f'=C{tPA}-C{flrow}+C{rFareUsed}', f'=C{tPA}-C{flrow}+D{rFareUsed}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Desecheo cancelled, replaced by a third Wall day (10 people)', f'=C{tPA}-C{desA}+{I}{TG_WALL}'], fmts=[None, MONEY])
W.row(['3 sharing instead of 2 (10 people)', f'=C{tPA}-{I}{TG_N_A}*({I}{TG_LODGE2}-{I}{TG_LODGE3})'], fmts=[None, MONEY])
W.blank(2)

W.h2('G. Break-even and minimum viable numbers')
rBE = W.row(['Puerto Rico: headroom under ceiling at 10 people', f'={I}{CEIL_TG}-C{tPA}'], fmts=[None, MONEY])
W.row(['Puerto Rico: break-even group size incl. George (Approach 3)', f'=IF(B{rBE}>0,ROUNDUP(C{rGeo}/B{rBE},0)+1,"not viable at this price")'])
W.row(['Puerto Rico boat: Paradise Scuba capacity for 10–12 on one departure QUOTE NEEDED; two departures otherwise'])
W.row(['Tiger Beach: over the ceiling at every group size; minimum viable is whatever the boat charter needs (QUOTE NEEDED)'])
W.blank(2)

W.h2('H. Deposit schedule (draft; all terms QUOTE NEEDED)')
W.row(['Milestone', 'Date', 'Amount per person', 'Basis'], fonts=[None, H2, H2, H2])
W.row(['Participant deposit to club', 'Fri 2 Oct 2026', 400, 'Covers hotel and dive deposits; Thanksgiving fares move fast'], fmts=[None, None, MONEY, None])
W.row(['Flights booked individually or via AA group desk (10+)', 'by Fri 9 Oct 2026', f'=AVERAGE({I}{TG_FL_LO},{I}{TG_FL_HI})', 'Fare midpoint'], fmts=[None, None, MONEY, None])
W.row(['Hotel block deposit (one night per room, typical)', 'Fri 9 Oct 2026', f'={I}{TG_LODGE2}', 'One night, 2 sharing'], fmts=[None, None, MONEY, None])
W.row(['Dive operator deposit (Paradise Scuba terms QUOTE NEEDED)', 'Fri 16 Oct 2026', f'=0.25*(C{divA}+C{desA})', '25% assumed'], fmts=[None, None, MONEY, None])
W.row(['Balance to club', 'Fri 6 Nov 2026', f'=C{tPA}-400', '10-person all-in less deposit'], fmts=[None, None, MONEY, None])
W.row(['Tiger Beach: full payment at booking, sales final, one-year weather credit', 'at booking', f'={I}{TB_DAYS_A}*{I}{TB_SHARK}*(1+{I}{TB_VAT})', 'Neal Watson terms (snippet)'], fmts=[None, None, MONEY, None])
TG_REFS = dict(tPA=tPA, tPB=tPB, tTA=tTA, tTB=tTB, rA3=rA3, cPA=prA['core'], cPB=prB['core'])

# ================================================================== SUMMARY
ws = sheet('Summary', [50, 16, 16, 16, 16])
W = Writer(ws)
W.h1('Summary — all-in price per person vs ceiling')
W.row(['Prices before any organiser charge, at the airfare midpoint and 2 sharing. Organiser charge under Approach 2 shown separately. Every price rests on advertised or inferred figures; none is a quote.'])
W.blank()
W.h2('Cozumel, 6 nights (Tue 8 – Mon 14 Dec)')
W.row(['', 'Certified', 'Beginner', 'Advanced'], fonts=[None, H2, H2, H2])
W.row(['All-in per person', f"=Cozumel!B{CZ_REFS['t7']}", f"=Cozumel!C{CZ_REFS['t7']}", f"=Cozumel!D{CZ_REFS['t7']}"], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Ceiling', f'={I}{CEIL_CZ_CERT}', f'={I}{CEIL_CZ_BEG}', f'={I}{CEIL_CZ_CERT}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Headroom', f'=B{W.r-1}-B{W.r-2}', f'=C{W.r-1}-C{W.r-2}', f'=D{W.r-1}-D{W.r-2}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Organiser charge per head (Approach 2) at 20 / 30 / 40', f"=Cozumel!B{CZ_REFS['rA2']}", f"=Cozumel!C{CZ_REFS['rA2']}", f"=Cozumel!D{CZ_REFS['rA2']}"], fmts=[None, MONEY2, MONEY2, MONEY2])
W.row(['5-night version, all-in per person', f"=Cozumel!B{CZ_REFS['t5']}", f"=Cozumel!C{CZ_REFS['t5']}", f"=Cozumel!D{CZ_REFS['t5']}"], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Core only (excl. meals, tips, insurance), 6 nights', f"=Cozumel!B{CZ_REFS['c7']}", f"=Cozumel!C{CZ_REFS['c7']}", f"=Cozumel!D{CZ_REFS['c7']}"], fmts=[None, MONEY, MONEY, MONEY])
W.blank()
W.h2('Egypt, Marsa Shagra (Sat 2 – Sat 9 Jan)')
W.row(['', 'Certified', 'Beginner', 'Advanced'], fonts=[None, H2, H2, H2])
W.row(['All-in per person, Royal Tent, via Hurghada', f"=January!B{EG_REFS['tT']}", f"=January!C{EG_REFS['tT']}", f"=January!D{EG_REFS['tT']}"], fmts=[None, MONEY, MONEY, MONEY])
W.row(['All-in per person, Deluxe Chalet, via Marsa Alam', f"=January!B{EG_REFS['tC']}", f"=January!C{EG_REFS['tC']}", f"=January!D{EG_REFS['tC']}"], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Ceiling'] + [f'={I}{CEIL_EG}']*3, fmts=[None, MONEY, MONEY, MONEY])
W.row(['Headroom (Royal Tent)', f'=B{W.r-1}-B{W.r-3}', f'=C{W.r-1}-C{W.r-3}', f'=D{W.r-1}-D{W.r-3}'], fmts=[None, MONEY, MONEY, MONEY])
W.row(['Organiser charge per head (Approach 2) at 15 / 20 / 25', f"=January!B{EG_REFS['rA2']}", f"=January!C{EG_REFS['rA2']}", f"=January!D{EG_REFS['rA2']}"], fmts=[None, MONEY2, MONEY2, MONEY2])
W.row(['Core only (excl. incidentals, tips, insurance), Royal Tent', f"=January!B{EG_REFS['cT']}", f"=January!C{EG_REFS['cT']}", f"=January!D{EG_REFS['cT']}"], fmts=[None, MONEY, MONEY, MONEY])
W.blank()
W.h2('Thanksgiving (10 people)')
W.row(['', '25–29 Nov', '19–24 Nov'], fonts=[None, H2, H2])
W.row(['Puerto Rico, all-in per person', f"=Thanksgiving!C{TG_REFS['tPA']}", f"=Thanksgiving!C{TG_REFS['tPB']}"], fmts=[None, MONEY, MONEY])
W.row(['Tiger Beach, all-in per person', f"=Thanksgiving!C{TG_REFS['tTA']}", f"=Thanksgiving!C{TG_REFS['tTB']}"], fmts=[None, MONEY, MONEY])
W.row(['Ceiling', f'={I}{CEIL_TG}', f'={I}{CEIL_TG}'], fmts=[None, MONEY, MONEY])
W.row(['Puerto Rico headroom', f'=B{W.r-1}-B{W.r-3}', f'=C{W.r-1}-C{W.r-3}'], fmts=[None, MONEY, MONEY])
W.row(['Tiger Beach extra vs Puerto Rico', f'=B{W.r-3}-B{W.r-4}', f'=C{W.r-3}-C{W.r-4}'], fmts=[None, MONEY, MONEY])
W.row(['Puerto Rico core only (excl. meals, tips, insurance)', f"=Thanksgiving!C{TG_REFS['cPA']}", f"=Thanksgiving!C{TG_REFS['cPB']}"], fmts=[None, MONEY, MONEY])

for s in wb.worksheets:
    for row in s.iter_rows():
        for c in row:
            if c.value is not None and c.font.name != FONT:
                c.font = BODY
wb.move_sheet('Summary', offset=-(len(wb.sheetnames)-1))
wb.save(OUT)
print('saved', OUT)
