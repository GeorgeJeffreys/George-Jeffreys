# Prompt for a Claude Code session: build the Cozumel sign-up page (Google Sheet + Apps Script web app)

Copy everything below the line into a new Claude Code session.

---

Build a free, self-contained sign-up page for a student club dive trip, using a Google Sheet plus a Google Apps Script web app. I (George) will paste the files into Apps Script and deploy them myself from my own Google account, so your output is code plus exact setup steps. Do not use any paid service, external database, or hosting.

## Deliverables
Create a folder `signup/` containing:
1. `Code.gs` – server-side Apps Script.
2. `Index.html` – the public page (trip description, live counters, sign-up form, public list).
3. `Confirmation.html` – shown after a successful sign-up (payment instructions).
4. `SETUP.md` – step-by-step instructions for a non-developer: create the Sheet, open Extensions > Apps Script, paste files, fill the Config tab, run `setup()` once, authorise, deploy as a web app (Execute as: Me; Who has access: Anyone), test, share the link, and how to redeploy after edits.
5. `TEST_PLAN.md` – a short checklist I can run in test mode before going live.

## Sheet structure (create it from `setup()` if tabs are missing)
- `Config` tab, key/value rows, all editable without touching code:
  - trip_name: Cozumel Dive Week
  - dates_text: Sun Dec 13 – Sat Dec 19, 2026
  - price_beginner: 1400
  - price_certified: 1250
  - deposit: 400
  - deposit_deadline: 2026-10-10 (end of day, US Eastern)
  - balance_deadline: 2026-11-06
  - capacity: 40
  - waitlist_enabled: TRUE
  - require_wharton_email: FALSE (if TRUE, only accept emails ending @wharton.upenn.edu)
  - bank_account_name, bank_name, account_number, routing_number, other_instructions (e.g. Zelle or Venmo handle): leave blank; I will fill these in. Never hard-code bank details in the code or the repo.
  - organiser_whatsapp: +447443469886
  - test_mode: TRUE (while TRUE, show a "TEST" banner and write to a `Signups_TEST` tab instead)
- `Signups` tab, one row per person, columns: Timestamp, Ref (e.g. COZ-007-SMITH), First name, Last name, Email, WhatsApp number, Track (Beginner or Certified), Certification level and agency (certified only), Last dive (month/year, certified only), Status (Confirmed / Waitlist / Cancelled), Deposit paid (checkbox), Deposit date, Balance paid (checkbox), Balance date, Notes.
- `Public` tab: formula-driven view showing only First name + last-name initial, Track, Status, in sign-up order. No emails or phone numbers ever leave the private columns.

## Page behaviour (Index.html)
- Mobile-first, clean, fast; no frameworks needed beyond plain HTML/CSS/JS and google.script.run.
- Top: the trip description (text below), with prices, dates and deposit pulled from Config so I can change them in the sheet.
- Live counter: "X of 40 places taken, Y left" plus beginners and certified counts. When full, show "Full – join the waitlist".
- Form fields: first name, last name, email, WhatsApp number (with country code), track (Beginner / Certified, radio buttons). If Certified: certification level and agency (free text, e.g. "PADI Open Water"), last dive month/year. Required checkbox: "I understand my place is confirmed only when my $400 deposit is received by Sat Oct 10, and that certified divers must show proof of certification."
- Hidden honeypot field to block bots.
- Public list below the form: first name + last initial, track, and a "Waitlist" tag where relevant, pulled live from the sheet.
- On submit: disable the button, show a spinner, call the server, then render Confirmation.html with the person's details.

## Server rules (Code.gs)
- `doGet()` serves Index.html.
- `getSummary()` returns counts and the public list (never private fields).
- `submitSignup(form)`:
  - Validate all fields server-side (never trust the client). Trim, cap lengths, basic email and phone checks, Wharton-email rule if enabled.
  - Reject duplicates by email (case-insensitive) with a friendly message that tells them they're already signed up and shows their ref.
  - Use LockService so two people can't take the last place at once.
  - Count Confirmed + pending rows (everyone not Cancelled and not Waitlist) against capacity. If under capacity, status = Confirmed (pending deposit); otherwise Waitlist if enabled, else reject as full.
  - Generate a ref like COZ-###-SURNAME (### = sequence number).
  - Append the row, then send a confirmation email via MailApp (subject: "Cozumel Dive Week – your place and payment details") containing the same content as the confirmation page. Handle MailApp quota errors gracefully (still show the page).
  - Return what the confirmation page needs.
- Add a custom menu in the Sheet ("Dive trip") with: "Recount and refresh public list", "Move unpaid to waitlist after deadline" (marks Confirmed rows with Deposit paid unchecked as Cancelled after the deadline, and promotes the earliest Waitlist rows to Confirmed up to capacity, emailing those promoted with payment details), and "Send balance reminder" (emails Confirmed rows with Balance paid unchecked). Every bulk action asks for confirmation first and logs what it did in a `Log` tab.

## Confirmation.html
- "You're in!" (or "You're on the waitlist" with position number).
- Their ref, track and price; deposit amount and deadline; balance amount and deadline.
- Bank details from Config, with the instruction to use their ref as the payment reference.
- Waitlisted people do NOT see bank details; they're told we'll email them if a place opens.
- Note: "Your place is confirmed when your deposit arrives. Questions: WhatsApp George on +447443469886."

## Trip description text for the top of the page (keep wording; prices, dates and deposit come from Config)
Join us for six nights of Caribbean diving in Cozumel, Mexico, home of the famous Palancar and Santa Rosa walls, turtles, eagle rays and some of the clearest water in the world. Never dived before? Get PADI Open Water certified on the trip. Already certified? Five days of boat diving with the group.

📅 Dates: {dates_text}
💸 Cost: ${price_beginner} beginners / ${price_certified} certified divers (excluding flights, dive insurance, meals, drinks, tips, airport transfers)
🏦 Deposit at signup: ${deposit} (balance due {balance_deadline})

Trip Overview:
🤿 Beginners: PADI Open Water course Mon–Wed (eLearning at home before the trip, included), certified by Wednesday lunch, then two reef boat days with everyone
🐢 Certified divers: two-tank boat dives every day Mon–Fri, with optional add-on dives and a night dive. Add on the Advanced Open Water course for only the cost of the eLearning. Nitrox and other PADI courses can be organised 1-1 if you're interested. Haven't dived for a while? We'll start with a refresher dive for anyone who needs it.
🏝 Alternating mornings or afternoons off every day: chill on the beach, take jeeps and scooters round the island, or visit the El Cielo sandbar.
🏨 Six nights at Hotel Plaza in downtown San Miguel with breakfast, two sharing, walking distance to bars and the seafront.
🐳 Diving with Blue Note Scuba, a PADI 5 Star centre. All gear and computer rental, park fees and eLearning are included.
ℹ Trip led by George Jeffreys, PADI Master Scuba Diver Trainer with 2.5k+ dives. Any questions, WhatsApp {organiser_whatsapp}.

How booking works:
1. Sign up below as a beginner or certified diver. Certified divers will need to show proof of PADI Open Water or equivalent.
2. You'll get bank details straight away. Pay the ${deposit} deposit by end of {deposit_deadline} to confirm your spot. Capacity is {capacity}; places go in order of deposit.
3. If your deposit hasn't arrived by the deadline, your spot passes to the next person on the waitlist.
4. The balance is due by {balance_deadline}.

## Quality bar
- Works on phone browsers; test the layout at 375 px wide.
- No private data in the public list, page source or getSummary() output.
- Clear error messages; never a blank screen.
- Keep all editable values in Config.
- Comment the code briefly for a non-developer maintainer.
- In SETUP.md, include how to switch test_mode off and clear test data before launch, and note that the page shows Google's "created by a Google Apps Script user" banner, which is normal.
