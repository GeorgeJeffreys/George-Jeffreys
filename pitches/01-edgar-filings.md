# 01 — Clustered Insider Purchases (Form 4)

*Lane: regulatory filings other than 10-K/10-Q text — Section 16 ownership reports.*

## 1. The idea in one paragraph

Buy US small caps ($75m–$2bn) in which two or more distinct officers or directors have filed Form 4 open-market purchases (transaction code P, not flagged as a Rule 10b5-1 plan trade) within the same ten trading days, entering at the next market-on-close after the second filing, holding a fixed sixty trading days, and neutralising market beta with a short in IWM or Micro E-mini Russell 2000 (M2K) futures. Long-only in single names by design: insider sales carry no predictive content (Lakonishok and Lee 2001; Jeng, Metrick and Zeckhauser 2003), so the constrained-borrow problem never arises.

## 2. Why the money is there

Insiders are contrarian; their purchases cluster after price declines, and the sellers on the other side are structurally uninformed: index deletions, fund outflows, tax-loss selling and retail capitulation in names too small to have analyst coverage. That much is old news. The reason it has not been arbitraged away is size. Cziraki and Gider (Review of Finance, 2021) show that percentage returns to insider trading are negatively correlated with trade size and firm size and that the median insider's dollar profit is trivial; the edge lives exactly where a quant fund cannot deploy a meaningful dollar. Nobody with the engineering to exploit it systematically has a mandate that permits $5k positions in $200m companies, and the people who do see it (OpenInsider publishes a free "cluster buys" screen) trade it discretionarily, unhedged and without an exit rule. The competitor that would close the gap — a small, disciplined, hedged book — barely exists as a category. The candid caveat is that this argument bounds the edge at retail scale; it cannot be scaled into a business.

## 3. Evidence

Cohen, Malloy and Pomorski (Journal of Finance, 2012) report 82 bp/month value-weighted alpha for "opportunistic" (non-routine) insider trades. Alldredge and Blank (Journal of Financial Research, 2019) find that clustered purchases are followed by abnormal returns exceeding 2% in the subsequent month, and that clustering intensifies when information asymmetry is highest. Brochet (Accounting Review, 2010) shows the five-day purchase announcement return rose from 1.0% to 2.3% after SOX's two-day deadline: the market reacts to filings, but incompletely.

Decay is real and must be assumed. An Aalto master's thesis replicating Cohen et al. on 2008–2024 Form 4 data finds opportunistic-trade alphas down 60–70%, to roughly 0.3–0.4%/month (I could not open the PDF; figures come from indexed excerpts). Zhao (arXiv 2602.06198, 2026), on 17,237 microcap purchases 2018–2024, finds a 1.0% five-day SPY-adjusted CAR but confidence intervals that include zero at 21 and 63 sessions — the unconditional signal is gone at our holding period. This pitch therefore rests on the conditional subset (clusters, ex-plan, ex-offering), which is exactly what the kill test must establish. McLean and Pontiff's 58% is the prior.

Rejected lane alternatives: NT 10-K (Bartov and Konchitchki, Accounting Horizons 2017) and SEC comment letters (Dechow, Lawrence and Ryans, Accounting Review 2016) are short-side signals in names with no borrow; 13D announcement returns accrue before and at filing with no post-filing drift (Brav et al. 2008); 8-K item drifts (Lerman and Livnat 2010) are large-cap, fast and crowded.

## 4. Data

All production data is free. Live signal: EDGAR "latest filings" Atom feed (`browse-edgar?action=getcurrent&type=4&output=atom`), polled every few minutes; the `type` filter also returns 424B and 425 forms, so re-filter on form type. Each filing's XML (`ownershipDocument`) carries `transactionCode`, `transactionShares`, `transactionPricePerShare`, `isDirector`/`isOfficer`, and since April 2023 the 10b5-1 checkbox. Backfill: `data.sec.gov/submissions/CIK##########.json` and the daily-index `master.YYYYMMDD.idx` files. History: the SEC's Insider Transactions Data Sets, quarterly zips of flattened Form 3/4/5 tables from January 2006. Fair-access rules: at most ten requests per second and a User-Agent naming you and an email; violations get a ten-minute block. Forms 3/4/5 are exempt from the 5:30pm cutoff, so filings land until 10pm ET — process overnight, trade next close. Prices: IBKR historical data via `ib_async` for live; CRSP via WRDS for research only. Offering exclusion: EDGAR full-text search (`efts.sec.gov/LATEST/search-index`, `forms=8-K`) for Item 3.02 in the prior 30 days. I could not reach sec.gov from this environment; endpoint details are corroborated from third-party documentation and should be confirmed on day one.

## 5. Build

Week 1: poller, XML parser, SQLite/Supabase store of purchases keyed by CIK and owner. Week 2: cluster detector with filters (distinct owners, ex-plan, ex-amendment, ex-late filings where transaction precedes filing by more than two business days, ex-offering, price above $2, twenty-day ADV above $300k). Week 3: backtest on the quarterly data sets plus CRSP. Weeks 4–5: `ib_async` MOC execution, hedge sizing, position ledger. Week 6: paper. The hardest engineering problem is entity resolution: the same person files under different `rptOwnerCik`s and titles, and a "cluster" of one person filing twice is the commonest false positive.

## 6. Mechanics

Universe as above. Entry: second qualifying purchase filing within ten trading days, aggregate cluster value at least $50k, no 10% holder-only clusters. Exit: sixty trading days, no stop; a fresh cluster resets the clock. Sizing: equal weight, 4% of capital, maximum 25 names; hedge to net beta zero with IWM or M2K, rebalanced when drift exceeds 10% of book. Expect 120–200 qualifying events a year after filters, of which 90–120 are taken, so roughly 200–250 single-name orders plus 30–50 hedge orders.

## 7. Costs and capacity

At $100k, 250–300 orders at IBKR Pro's $0.005/share, $1 minimum: roughly $350–450, or 35–45 bp. Spread and closing-auction impact in $200m names: assume 40 bp per side, 80 bp round trip, times four turns of the book, so 320 bp/year. Total drag 350–400 bp. Borrow: IWM only, general collateral; M2K needs about $930 initial margin per contract. Capacity: the ADV floor forces the universe upward as the book grows; above about $2m the filters remove most of the names that carry the signal.

## 8. Honest expectation

Hedged residual volatility 12–15%. If the conditional drift survives at 2–3% per event over sixty days, gross alpha is 8–12% and net 4–7%, so Sharpe 0.4–0.8, most plausibly 0.6. That does not clearly beat Lazy Prices on Sharpe; the case rests on buildability, no borrow, and a hedge that costs nothing. Worst plausible drawdown 20–25% (2020-style small-cap liquidation, when clusters also spike). Correlates with small-cap value and short-term reversal. Three years of live returns will not distinguish 0.6 from zero; five might.

## 9. Kill test

Two to three days. Load Insider Transactions Data Sets 2015–2025, build cluster events with the section 6 filters, merge CRSP daily returns, compute IWM-adjusted CAR from the next close after the second filing to +63 trading days, with calendar-time portfolio t-statistics. The project ends if equal-weighted CAR is below +1.5% or t < 2 over the full sample, or below +1.0% in 2020–2025 alone. A secondary kill: if excluding events with a prior-30-day Item 3.02 offering removes the result.

## 10. Strongest objection

Everything here is public, free, screened by hobbyist tools, and studied since 1975; the best recent evidence says the unconditional microcap purchase signal is zero beyond a month and the opportunistic subset has lost two-thirds of its alpha; a Substack analysis argues 70–80% of measured returns accrue between trade date and filing, where nobody can trade. Against 350–400 bp of costs, what survives may be nothing. My answer is partial: clustering, ex-plan and ex-offering filters have not been tested together on post-2020 data by anyone I can find, the capacity argument explains why they would not be, and the kill test costs three days. If it fails, that is the cheapest "no" in this portfolio.

**Self-score:** edge durability 2/5; buildability in six weeks 5/5; capital efficiency at $100k 4/5; falsifiability 5/5.
