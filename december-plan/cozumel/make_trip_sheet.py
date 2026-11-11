from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.formatting.rule import FormulaRule
from openpyxl.utils import get_column_letter as L
import sys

out = sys.argv[1]
cols = [  # (header, width, group)
 ("First name",14,0),("Last name",14,0),("Track",13,0),
 ("Cert number\n(certified only)",15,1),("Date of birth\n(DD/MM/YYYY)",14,1),("Email\n(for PADI eLearning)",28,1),
 ("Height\n(cm or ft/in)",12,2),("Weight\n(kg or lb)",12,2),("Shoe size\n(US)",10,2),("Dive computer?\n(certified only, $10/day)",17,2),
 ("Arrival date",12,3),("Arriving at\n(CZM or CUN)",13,3),("Arrival\nflight no.",11,3),("Landing time\n(local)",12,3),
 ("Departure date",13,3),("Departure\nflight no.",11,3),("Departure time\n(local)",13,3),
 ("Roommate preference",20,4),
 ("DAN insurance\nbought?",13,5),("Medical form\ndone?",13,5),("eLearning\nfinished?\n(beginners)",13,5),
 ("Dietary needs /\nallergies",20,6),("Notes",28,6),
]
groups = [("ABOUT YOU","0B5394","CFE2F3"),("PADI eLEARNING + CERT","38761D","D9EAD3"),("GEAR SIZES","B45F06","FCE5CD"),
          ("FLIGHTS","741B47","EAD1DC"),("ROOM","134F5C","D0E0E3"),("CHECKLIST","990000","F4CCCC"),("ANYTHING ELSE","434343","EFEFEF")]
people = [("Adarsh","Suresh","Open Water"),("Alec","Greenwald","Open Water"),("Alex","Helms","Open Water"),("Chris","Brown","Open Water"),
 ("Dina","Daas","Open Water"),("Ellie","Miller","Open Water"),("Erin","Angell","Open Water"),("Jack","Mitchell","Open Water"),
 ("Joe","Kahnke","Open Water"),("John","Kibler","Open Water"),("Kedar","Reddy","Open Water"),("Lucia","Yang","Open Water"),
 ("Mallika","Jain","Open Water"),("Meghal","Dubey","Open Water"),("Natalie","Kahn","Open Water"),("Nicholas","Wade","Open Water"),
 ("Rachel","","Open Water"),("Spencer","Hanson","Open Water"),("Teddy","Carnes","Open Water"),("Theeba","","Open Water"),
 ("Brett","Graham","Certified"),("Josh","Dinardo","Certified"),("Juan","Solera","Certified"),("George","Jeffreys","Organiser")]
example = ["EXAMPLE","(copy this format)","Open Water","","15/06/1995","jane@example.com","5'7\"","140 lb","8","n/a",
           "Sun 13 Dec","CZM","AA 1234","14:30","Sat 19 Dec","AA 4072","13:45","Sam Smith","Y","Y","N","Vegetarian","Taking the ferry from Cancún"]

N = len(cols); last = L(N)
wb = Workbook(); ws = wb.active; ws.title = "Trip sheet"
F = "Arial"
def fill(c): return PatternFill("solid", start_color=c, end_color=c)
thin = Side(style="thin", color="B7B7B7"); box = Border(left=thin,right=thin,top=thin,bottom=thin)

def banner(row, text, bg, fg, size, bold, height):
    ws.merge_cells(f"A{row}:{last}{row}")
    c = ws[f"A{row}"]; c.value = text
    c.font = Font(name=F, size=size, bold=bold, color=fg); c.fill = fill(bg)
    c.alignment = Alignment(horizontal="left", vertical="center", wrap_text=True, indent=1)
    ws.row_dimensions[row].height = height

banner(1,"🐢🌊  COZUMEL DIVE TRIP  ·  Sun 13 – Sat 19 Dec 2026  ·  Blue Note Scuba  ·  Hotel Plaza Cozumel","0B5394","FFFFFF",16,True,40)
banner(2,"HOW TO FILL THIS IN:  find your name and fill in your own row only. Use the dropdowns where there is one. "
         "Grey cells don't apply to your track, so skip them. Come back and update your row as you book flights and tick things off. "
         "Please don't edit anyone else's row.","CFE2F3","073763",11,False,36)
banner(3,"DEADLINES:  your row by Fri 20 Nov  ·  DAN insurance by Fri 27 Nov  ·  gear sizes by Sun 29 Nov  ·  "
         "beginners finish PADI eLearning by Sun 6 Dec  ·  land in Cozumel (CZM) by 4pm or Cancún (CUN) by 1pm on Sun 13 Dec","FFF2CC","7F6000",10,True,32)

# Row 4: section headings
g_start = {}
for i,(h,w,g) in enumerate(cols,1): g_start.setdefault(g,[i,i])[1]=i
for g,(a,b) in g_start.items():
    name,dark,light = groups[g]
    if b>a: ws.merge_cells(start_row=4,start_column=a,end_row=4,end_column=b)
    c = ws.cell(4,a,name)
    for k in range(a,b+1):
        x = ws.cell(4,k); x.fill = fill(dark); x.border = box
    c.font = Font(name=F,size=10,bold=True,color="FFFFFF"); c.alignment = Alignment(horizontal="center",vertical="center")
ws.row_dimensions[4].height = 22

# Row 5: column headers
HEAD, FIRST = 5, 6
for i,(h,w,g) in enumerate(cols,1):
    c = ws.cell(HEAD,i,h); c.font = Font(name=F,size=10,bold=True); c.fill = fill(groups[g][2])
    c.alignment = Alignment(horizontal="center",vertical="center",wrap_text=True); c.border = box
    ws.column_dimensions[L(i)].width = w
ws.row_dimensions[HEAD].height = 48

rows = [example] + [[a,b,t]+[""]*(N-3) for a,b,t in people]
for r,vals in enumerate(rows, FIRST):
    for i,v in enumerate(vals,1):
        c = ws.cell(r,i,v if v!="" else None); c.border = box
        c.number_format = "@"  # keep as text so dates/times/sizes don't get converted
        c.alignment = Alignment(vertical="center", horizontal="left" if i in (1,2,6,18,22,23) else "center", wrap_text=i in (22,23))
        c.font = Font(name=F,size=10,bold=i<=2)
    ws.row_dimensions[r].height = 20
for i in range(1,N+1):
    ws.cell(FIRST,i).font = Font(name=F,size=10,italic=True,color="999999",bold=i<=2)
LAST = FIRST + len(rows) - 1
# leave 6 spare rows for anyone added later
for r in range(LAST+1, LAST+7):
    for i in range(1,N+1):
        c = ws.cell(r,i); c.border = box; c.number_format = "@"; c.font = Font(name=F,size=10,bold=i<=2)
LAST += 6

def colnum(prefix): return next(i for i,(h,_,_) in enumerate(cols,1) if h.startswith(prefix))
TR = L(colnum("Track"))
def rng(prefix): k=L(colnum(prefix)); return f"{k}{FIRST+1}:{k}{LAST}"

# Dropdowns (skip example row)
def dv(prefix, values):
    d = DataValidation(type="list", formula1='"'+",".join(values)+'"', allow_blank=True, showErrorMessage=False)
    ws.add_data_validation(d); d.add(rng(prefix))
dv("Track",["Open Water","Certified","Organiser"])
dv("Arriving at",["CZM","CUN","Other"])
yn = ["Dive computer?","DAN insurance","Medical form","eLearning"]
for p in yn: dv(p,["Y","N","n/a"])

# Conditional formatting: grey out what doesn't apply, Y green, N red, banding
grey = PatternFill("solid", start_color="D9D9D9", end_color="D9D9D9")
for p,track in (("Cert number","Open Water"),("Dive computer?","Open Water"),("eLearning","Certified")):
    k = L(colnum(p))
    ws.conditional_formatting.add(rng(p), FormulaRule(formula=[f'${TR}{FIRST+1}="{track}"'], fill=grey, font=Font(color="999999")))
for p in yn:
    k = L(colnum(p)); top = f"{k}{FIRST+1}"
    ws.conditional_formatting.add(rng(p), FormulaRule(formula=[f'{top}="Y"'], fill=fill("B6D7A8")))
    ws.conditional_formatting.add(rng(p), FormulaRule(formula=[f'{top}="N"'], fill=fill("F4CCCC")))
ws.conditional_formatting.add(f"A{FIRST+1}:{last}{LAST}", FormulaRule(formula=[f"MOD(ROW(),2)=0"], fill=fill("F3F6FA")))

ws.freeze_panes = f"C{FIRST}"
ws.sheet_view.zoomScale = 100
wb.save(out)
print("rows", FIRST, LAST)
