# 04 — Contract Surprise: small-cap federal award-to-market-cap events

*Lane: non-financial public data (federal procurement; FDA, ClinicalTrials.gov and USPTO surveyed and rejected).*

## 1. The idea

Buy US-listed small and mid-caps on the day the government, not the company, first discloses a contract award or modification worth at least 10% of the firm's market capitalisation; hedge with a short in a liquid ETF (ITA or IWM); hold twenty trading days or until two days after the company's own release. Two feeds supply the events: the Department of Defense's daily 5 p.m. list of awards of $7.5m and above, and the USAspending nightly extract of civilian-agency awards. The bet is that a large government cash-flow shock to a thinly covered firm is priced slowly because it arrives after the close, as prose naming legal entities rather than tickers, days before (or instead of) any company announcement.

## 2. Why the money is there

The other side is anyone who would have bought had the information reached them: sell-side coverage is absent below about $1bn, and the vendor that structures this data (TenderAlpha, sold through FactSet) serves institutions whose position sizes exclude a $300m name. Three frictions keep the residual alive. The DoD list is prose — "Vectrus Systems Corp., Colorado Springs" must be resolved to V2X, subsidiaries to parents — so the first structured reaction is the next morning's gap, and the retail and small-fund flow that actually moves these names arrives only when the company issues a release, often three to ten days later, sometimes never for IDIQ ceilings and modifications. Civilian awards on USAspending are never in the newswire cycle; they simply appear. Ceilings are noisy (an IDIQ "up to $900m" may obligate $2m), which deters mechanical scrapers and rewards a reader that separates obligated funds from ceilings. The edge is small-cap inattention plus a parsing cost, not secrecy; it persists because the capacity is too small for those equipped to remove it.

## 3. Evidence

Gans and Holden (2025, *Economics Letters* 252, 112341) find that portfolios of large-contract winners outperform, with contract size predicting longer-run returns, but driven by large caps — a warning, not a confirmation. Belo, Gala and Li (2013, *JFE* 107, 305–324) document underreaction to predictable government cash flows (6.9% p.a. from their presidential-cycle strategy), supporting the theme that the market is slow on government revenue. Esqueda, Ngo and Susnjara (2019, *Journal of Banking and Finance* 106, 305–322) show contractors carry lower valuations, so the long leg must be event-driven, not a static contractor tilt. The directly relevant work is unrefereed vendor research: a 2026 TenderAlpha–HKU white paper reports mildly positive market-adjusted 3- and 5-day returns after DoD announcements, concentrated in awards large relative to market cap and in Army awards; TenderAlpha's October 2025 note reports equal-weighted long–short Sharpe of 0.77–0.88 from a receivables-growth signal on US stocks above $100m cap and $1m ADV. FactSet and Neudata cite a 2020 working paper on "unexpected government receivables" whose authors I could not verify, and I could not read the TenderAlpha PDF itself. Applying McLean–Pontiff decay of roughly 58% to the vendor figures gives a Sharpe near 0.4 before costs; anything better rests on restricting to the sub-$3bn, high award-to-cap tail the vendor work itself says carries the signal.

## 4. Data

*DoD announcements*: war.gov/News/Contracts, RSS at `war.gov/DesktopModules/ArticleCS/RSS.ashx?ContentType=400`, posted 5 p.m. ET each business day under DFARS 205.303, archived for over a decade with exact dates. Free, production-safe. *USAspending*: FAR 4.6 requires the FPDS contract action report within three business days; USAspending publishes it about a day later ("generally within five days"). API v2 `POST /api/v2/search/spending_by_transaction/` filtered on action date, no key, free. Caveat: DoD and USACE actions are withheld 90 days under DFARS PGI 204.606, so USAspending is production-safe only for civilian agencies; DoD must come from the 5 p.m. list. *Award Data Archive* bulk CSVs from FY2008 for the backtest. *SAM.gov* award notices are free but capped at ten calls a day on a personal key — a supplement only. *Company releases*: EDGAR 8-K RSS and free newswire feeds for the "government first" check. *Prices*: CRSP via WRDS for research only; IBKR bars in production. All-in cost: $0.

## 5. Build

Week 1: pull the DoD archive 2016–2025 and Award Data Archive; LLM-parse each award into (entity, agency, type, ceiling, obligated at award, modification flag). Week 2: entity resolution to tickers using EDGAR names and Exhibit 21 subsidiary lists, against a hand-checked set of 300. Week 3: event study on CRSP (also the kill test). Weeks 4–5: live ingestion (n8n cron at 5:10 p.m. and 7 a.m.), market-cap lookup, press-release check, orders via `ib_async`, ETF hedge. Week 6: paper trading. Hardest problem: entity resolution — private primes, renamed subsidiaries, JVs. A wrong mapping is a full-size wrong position.

## 6. Mechanics

Universe: US-listed common stock, market cap $150m–$3bn, ADV over $1m, price over $2. Trigger: obligated-at-award value (or 25% of ceiling where none is stated) at least 10% of market cap, and no company release in the prior five days. Entry: MOC the next session. Exit: close of day 20, two days after the company's release, or a 15% stop. Sizing: 5% of book per name, maximum eight concurrent; ETF short sized to beta, rebalanced weekly. Expected 40–80 events a year, 80–160 stock orders plus about 60 hedge orders: roughly 220.

## 7. Costs and capacity

Commissions about $220 at $100k, 22 bp a year. Small-cap spreads 20–50 bp each way plus slippage: budget 100 bp per round trip, 3–4% a year of drag on the book. No single-name borrow; the ETF short is always available. A $5k position against $1m-plus ADV is invisible; the strategy stops working around $3–5m of capital, when positions exceed a few percent of ADV in the smallest names.

## 8. Honest expectation

Sharpe 0.4–0.8, annualised volatility 8–12% (sparse, idiosyncratic), worst plausible drawdown 15–20% from a cluster of ceiling-only awards that never obligate, or a budget shock (continuing resolution, shutdown, DOGE-style cancellation) hitting every open name at once. Residual correlation with small-cap defence and government-services beta. At Sharpe 0.6 a live record needs over a decade to reach t = 2; the backtest has to carry the proof.

## 9. Kill test

Three to four days. Parse the DoD archive 2018–2025 and civilian USAspending awards, map to CRSP, keep events with award-to-cap of at least 10% in sub-$3bn names, and compute market-adjusted CAR from the next close to day 20, excluding the overnight gap we cannot capture. Kill if fewer than 300 events qualify, if mean CAR(+1,+20) is under 1.5% or t under 2, or if over two-thirds of CAR(0,+20) sits in day 0.

## 10. Strongest objection

The 5 p.m. list has been machine-read for years; Bloomberg and TenderAlpha timestamp it to the minute, and the opening print absorbs it. What remains is a tail of illiquid names where "drift" is bid–ask bounce, unrealisable with real orders. The answer: the kill test measures from the next close, so the gap is conceded; civilian USAspending flow sits outside the newswire cycle entirely; and the company-release exit makes the alleged staleness the mechanism — we are early to the retail catalyst, not late to the institutional one. If day 0 holds the return, the objection is right and the project ends.

**Self-score:** edge durability 3; buildability in six weeks 4; capital efficiency at $100k 3; falsifiability 5.
