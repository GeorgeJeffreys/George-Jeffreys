# 05 — Fresh Fundamentals: an event-time XBRL quality tilt (and why it is a layer, not a strategy)

*Lane: cross-sectional fundamentals from free EDGAR XBRL. Verdict: the lane is dead as a standalone long-short; alive as a long-only tilt and as a conditioning layer for Lazy Prices.*

## 1. The idea in one paragraph

Every 10-K and 10-Q lands in EDGAR's XBRL companyfacts feed within a minute of filing, stamped with its `filed` date. On each filing day, recompute a composite of the surviving fundamentals signals — cash-based operating profitability, net share issuance, asset growth, net operating assets — for that filer alone, and hold a long-only book of the 40 top-ranked US small caps ($300m–$3bn), entering the day after filing and exiting at the next filing or after 90 days. Beta is neutralised with short IWM or IWM puts, never single-name shorts. The claim is not that these signals are secrets, but that free filing-date fundamentals let a $100k account act in the one window where the literature says the return still lives.

## 2. Why the money is there

Honestly: not much of it is. The other side of accruals, issuance and asset-growth trades is investors extrapolating reported earnings without checking their cash backing (Sloan 1996; Miao, Teoh and Zhu 2016 show accrual mispricing is worse when the press release omits the cash-flow statement). The error persists, but the arbitrage is crowded: Green, Hand and Soliman (2011) trace the accrual anomaly's demise to hedge-fund capital. What is left is structural: (a) academic and much practitioner data is stale — Bowles, Reed, Ringgenberg and Thornock (2024) show anomaly returns concentrate in the first month after information release and that the June-formation convention understates them; (b) the long leg in small caps is where factor value survives (Blitz, Baltussen and van Vliet 2020), yet that is exactly where institutional capacity is too small to bother and retail lacks point-in-time data. Those are capacity and plumbing frictions, not an insight; they justify a tilt, not a fund.

## 3. Evidence

The base anomalies are real and verified: Sloan (1996, *Accounting Review*); Pontiff and Woodgate (2008, *JF*); Cooper, Gulen and Schill (2008, *JF*); Hirshleifer, Hou, Teoh and Zhang (2004, *JAE*); Bradshaw, Richardson and Sloan (2006, *JAE*); Novy-Marx (2013, *JFE*). Ball, Gerakos, Linnainmaa and Nikolaev (2016, *JFE*) show cash-based operating profitability subsumes accruals, hence its use in the composite. The decay evidence: McLean and Pontiff (2016, *JF*), 26% out-of-sample, 58% post-publication. Chen and Velikov (2023, *JFQA*): roughly 50% decay post-publication, 72% excluding pre-2005 data, 93% after effective spreads; the average anomaly nets about 4 bps a month and the best about 10 bps, with median ex-microcap returns around 7 bps a month since 2006. Hou, Xue and Zhang (2020, *RFS*): 65% of 452 anomalies fail once microcaps are neutralised. Chen and Zimmermann (2022, *CFR*) publish the signal returns openly. The only paper on my side is Bowles et al.; I could not retrieve its tables, so its effect size is unverified here and must be read before any build.

## 4. Data

Production-safe and free: `data.sec.gov/api/xbrl/companyfacts/CIK##########.json` (all facts for a filer, each with `val`, `accn`, `fy`, `fp`, `form`, `filed`, `frame`), `companyconcept` (one tag across a filer's history), `frames` (one tag across all filers — latest value only, so *not* point-in-time), `submissions`, and nightly `companyfacts.zip`. Ten requests per second with a User-Agent header; no key; processing delay under a minute. The Financial Statement Data Sets (`sub`, `num`, `pre`, `tag`) cover 2009 onward, monthly since November 2020, and are the better backtest base. Known problems: `fy`/`fp` describe the filing not the fact; restatements appear as later-filed facts for the same period, so point-in-time means taking the earliest `filed` per concept-period; custom extensions and tag drift (revenue tags changed under ASC 606) break naive lookups, so map several tags per concept and fall back to the `pre` statement linkage; Chychyla and Kogan (2015) found Compustat differs from the 10-K for 17 of 30 items, so XBRL is arguably the cleaner source. Smaller reporting companies entered XBRL only for periods ending after 15 June 2011, so backtests start in 2012. Prices: CRSP via WRDS for research only; Tiingo's free tier or IBKR in production. Cost: $0–22 a month.

## 5. Build

Weeks 1–2: ingest FSDS bulk files, build tag mapping, compute the four signals point-in-time, validate against WRDS. Week 3: event-time backtest. Week 4: nightly companyfacts.zip diff, universe filter, ranking. Weeks 5–6: `ib_async` market-on-close execution, IWM hedge, paper trading. Hardest problem: tag reconciliation for small filers, whose cash-flow items are inconsistently tagged or dimensional.

## 6. Mechanics

Universe: US common stock, $300m–$3bn, price above $5, ex-financials and REITs, no 12b-25 late filers. Trigger: on a new 10-K or 10-Q, rescore the filer; enter if it ranks in the top decile of the rolling cross-section and the filing adds facts the 8-K release lacked. Exit at the next filing, at 90 days, or if the rank drops below the fourth decile (buy/hold spread per Novy-Marx and Velikov 2016). Forty equal-weight positions at 2.5%. Roughly 25 buys and 25 sells a quarter plus monthly hedge trims: about 220 orders a year.

## 7. Costs and capacity

Commissions ≈ $250 a year, 25 bps at $100k. Half-spread 10–20 bps at the close in this size band, two-way turnover ≈ 150%: 20–30 bps. Total drag ≈ 50 bps. No single-name borrow; IWM borrow is general collateral. Capacity is not the constraint (perhaps $5m); the thin gross alpha is.

## 8. Honest expectation

Long-leg alpha over a small-cap benchmark of 2–4% gross, 1.5–3.5% net, information ratio 0.3–0.5. Hedged with IWM: Sharpe 0.3–0.6, volatility 8–12%, worst plausible drawdown 15–20% in a small-cap quality reversal such as 2020–21. Correlates with Lazy Prices' long leg and with quality factors. Separating a 0.4 Sharpe from zero needs 20-plus years; a live record cannot validate this. It loses to the benchmark on Sharpe, wins on build time and capacity, and supplies the fundamentals filter Lazy Prices needs to avoid shorting cash-rich names.

## 9. Kill test

Three days on WRDS plus the open Chen–Zimmermann portfolios: form the composite long decile in event time, 2012–2026, value-weighted, ex-microcap, entering on the filing date rather than the earnings announcement. Kill if the filing-date entry earns less than 2% annualised over a size-matched benchmark net of 50 bps costs, or if more than half of the first-month return accrues between announcement and filing. Calcbench data show most S&P 500 firms file the 10-Q within a day of the release, so the XBRL edge is nil for large caps; the test is whether slower small filers leave anything.

## 10. Strongest objection

Compustat Snapshot and S&P point-in-time exist; every quant fund has them, so freshness is not an edge, it is table stakes, and Engelberg, McLean and Pontiff (2018) show anomaly returns are six times larger on earnings-announcement days, which precede the XBRL filing. The XBRL implementation is therefore *staler* than the professional one during the only window that matters. My answer is partial: correct for large caps and income-statement signals; weaker for balance-sheet and cash-flow signals in small filers whose releases omit those statements and who file weeks later. That residual is worth a three-day test, not a six-week build on its own.

**Self-score.** Edge durability 2. Buildability in six weeks 4. Capital efficiency at $100k 3. Falsifiability 5.
