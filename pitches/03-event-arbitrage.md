# 03 — Small-Cap Cash Merger Arbitrage

*Lane: deal and corporate-event arbitrage (Agent 3). Also surveyed: SPAC trust arbitrage, CEF discounts, dual-class and ADR spreads, odd-lot tenders.*

## 1. The idea in one paragraph

Buy the target after a definitive all-cash acquisition agreement for a US-listed company with equity value of $75m–$1bn is filed on EDGAR (8-K Item 1.01 with the merger agreement as Exhibit 2.1, or a Schedule TO for tenders). Hold until shares convert to cash at closing, or sell on termination. No shorts, no options. The bet is that spreads on deals this size are wider than their completion risk justifies, because the capital that compresses large-deal spreads cannot deploy here.

## 2. Why the money is there

The other side is two groups. Existing holders — small-cap managers and Russell 2000 index funds — lose the name at closing anyway and prefer 95% of the premium now to locking capital for four months against a binary tail. And the usual buyer is absent: merger-arb capital is institutional. Jetley and Ji (2010) document spreads falling over 400bp after 2002 alongside inflows into merger-arb hedge funds, and that money lives where it can be sized. A $2bn fund with forty positions needs $50m tickets; a $300m target cannot absorb that, so it passes. This is Baker and Savaşoglu's (2002) limited-arbitrage model: spreads compensate scarce arbitrageur capacity. The honest complication is that in their 1981–96 sample returns *increased* with target size, because capital was scarce everywhere. My claim is that two decades of inflows flipped the sign — abundant for large deals, absent for small. That is a hypothesis, not a finding; section 9 tests it. Practitioner sources (Special Situation Investments; InsideArbitrage) report small-cap spreads of 5–10%, but that is observation, not peer-reviewed evidence. A retail book has no size handicap here.

Rejected: SPAC trust arbitrage (352 SPAC IPOs in 2025) is a 5–7% cash substitute crowded by funds who get the unit allocations retail cannot; CEF discount reversion (Pontiff 1995) is Saba's territory with beta-laden, low-excess returns; odd-lot priority in Rule 13e-4 issuer tenders is real but pays hundreds of dollars an event.

## 3. Evidence

Mitchell and Pulvino (2001, *Journal of Finance* 56(6); 4,750 deals, 1963–98) find about 4% a year excess after costs, with a short-index-put profile: uncorrelated normally, sharply positive beta in crashes. Baker and Savaşoglu (2002, *JFE* 64(1)) find 0.6–0.9% monthly abnormal returns, 1981–96. Jetley and Ji (2010, *FAJ* 66(2); 2,182 deals, 1990–2007) document the post-2002 decay and call part of it permanent. Decay is visible: the MNA merger-arb ETF returned about 3.1% a year over ten years with a 16.7% drawdown in March 2020 — T-bills plus 1–1.5%, Sharpe near 0.3. Base rates from Accelerate's AlphaRank monitors: North American termination rate 5.5% since 2011, 5.9% in 2024; a broken deal typically costs 20–40% of position value.

## 4. Data

Discovery: EDGAR full-text search, `efts.sec.gov/LATEST/search-index`, `q="agreement and plan of merger"`, `forms=8-K`, plus SC TO-T, SC 14D-9, PREM14A, DEFM14A and 8-K Item 8.01 for terminations. Free, no key, indexed from May 2001, 10 requests a second, User-Agent required, parameters undocumented. Term extraction by Claude over Exhibit 2.1: about $20 a month. Prices: IBKR market data via `ib_async`, a few dollars a month. Cross-checks only: ArbLens (free) and InsideArbitrage (partly paywalled). Research only: WRDS carries LSEG SDC M&A (US targets from 1979) and CRSP daily; they build the backtest and never touch the live book.

## 5. Build

Week 1: EDGAR poller and LLM term extractor into Supabase. Week 2: price feed, spread and annualised-yield maths. Week 3: eligibility rules and sizing. Week 4: `ib_async` limit orders and reconciliation of corporate-action cash-outs. Week 5: event monitor (amended 8-Ks, second requests, votes, terminations). Week 6: paper trading. Hardest problem: extracting conditions and consideration reliably from merger agreements — CVRs, collars and financing conditions are where the LLM will hallucinate a clean cash deal, and a wrong price is a silent loss.

## 6. Mechanics

Universe: US-listed targets, all-cash, definitive agreement filed, equity value $75m–$1bn, average daily value traded above $300k, no financing condition; tender offers (30–60 day windows) and strategic buyers preferred. Entry: limit order at or below the prior close, one to five days after filing, only if the annualised spread exceeds T-bills by 6%. Exit: cash-out at closing; sell at market on termination or if the annualised spread falls below T-bills plus 2%. Holding one to five months. Sizing 5% a deal, 6% cash reserve, 15–20 positions. Roughly 60–120 qualifying deals a year (my estimate, unverified). About 60 entries, 15 sale exits, 20 top-ups: some 100 orders a year.

## 7. Costs and capacity

At $100k, 100 orders at IBKR's $1 minimum is $100, or 10bp; closings settle by corporate action with no commission. Half-spreads of 30–80bp on entry via limit orders give roughly 150bp a year of slippage at 3× turnover. No borrow. Capacity is set by the volume filter: the book stops working near $2–3m, when positions exceed 5% of daily volume.

## 8. Honest expectation

Gross spread capture 8–12% annualised on deployed capital, less 1.5–2.5% break drag (6–8% breaks at 25–35% loss), less 1.6% costs: 4–7% over T-bills. Volatility 5–8%; worst plausible drawdown 15–20% when breaks correlate, as in 2008 or 2020. Sharpe 0.5–1.0 — the *Lazy Prices* range; the advantages are buildability, full deployment without borrow, and falsifiability. Profile: short index put, positive beta in crashes. At 6% vol a 0.7 Sharpe needs about eight years for two-sigma separation from zero; live trading can reject it, not prove it.

Compliance: this is the worst lane for an incoming banker. Goldman has barred bankers from individual stocks and event-driven funds since 2014; other banks require pre-clearance, 30-day holds and restricted-list checks; FINRA Rule 3210 requires employer consent for any account in which Jad has a beneficial interest. Jad must have no economic interest and no deal-specific input after his start date; George runs it alone.

## 9. Kill test

Three to five days on WRDS. Pull SDC US all-cash public-target deals 2010–2025, join CRSP, bucket by target value (under $500m, $500m–$2bn, over $2bn). Compute the day-two spread, completion rate, and realised annualised return of buying every deal on day two and holding to resolution with a 25% loss on breaks. Kill if the small bucket's excess return over T-bills is below 3%, its Sharpe below 0.5, or its net-of-breaks spread does not beat the large bucket by 150bp. Then pull 30 live small-deal spreads from EDGAR for the past year; if they are not 200bp wider than ArbLens's large-deal spreads, stop.

## 10. Strongest objection

Small deals pay more because they break more and for worse reasons — thin financing, private-equity buyers walking, holdouts, MAC disputes — and the risk is unhedgeable, so the "excess" is a fairly priced short put with negative skew, not an edge; Baker and Savaşoglu's size result points the same way. My answer: the filters (cash only, no financing condition, tenders and strategics preferred) target deals whose risk is capital lock-up rather than credit, and the kill test measures net-of-break returns. If small deals only match large deals net of breaks, this is a worse MNA and should die.

**Self-score.** Edge durability 3/5. Buildability in six weeks 4/5. Capital efficiency at $100k 3/5. Falsifiability 5/5.
