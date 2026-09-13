# 02 — Buying the Discards: post-deletion drift in S&P 1500 index drops

*Lane: mechanical and calendar flows (Agent 2). Rejected: S&P 500 additions, Russell recon day, LETF close rebalancing, IPO lockups, turn-of-month, tax-loss January, spin-offs.*

## 1. The idea in one paragraph

Buy every stock that S&P Dow Jones discretionarily drops from the S&P 500, MidCap 400 or SmallCap 600 (market-cap or representativeness reasons; not mergers, bankruptcies or going-private), filling market-on-close on the effective date, the exact print into which index funds are forced to sell. Hold twelve months, equal-weighted, with market beta hedged by micro futures (M2K/MES). No individual shorts, no borrow, no options. The claim is that the following year, not the deletion day, is mispriced.

## 2. Why the money is there

Index funds are contractually indifferent to price: a deletion must be sold at the close of the effective date regardless of value, and the buyer of last resort is whoever is willing to hold a stock that has just lost its permanent passive bid and, often, sell-side coverage. Greenwood and Sammon (JF 2025) show the *event-day* discount has been competed away: S&P 500 deletion abnormal returns fell from double digits in the 1990s to about 0.1% in 2010–2020, because index desks and liquidity providers now pre-position and trade the closing auction. What has not been competed away is the slow part. Research Affiliates (Arnott and Henslee, "Nixed", 2024) find deletions from top-500/1000 cap-weighted indices lag the market by more than half in the year before removal and then beat it by over 5% p.a. for five years (1991–2023). Cai and Houge (FAJ 2008) found Russell 2000 deletions earned significantly higher factor-adjusted returns than additions. The structural reason nobody arbitrages it is that the counterparty who would is benchmarked: an active manager buying ex-index small caps carries tracking error for a year for a few percent, a hedge fund will not hold a slow reversal, and the one vehicle that does (NIXT, launched September 2024) holds roughly $37m. The edge is patience and benchmark indifference, which a $100k personal book has and a mandate does not.

## 3. Evidence

Verified: Greenwood and Sammon, *Journal of Finance* 80(2), 2025; Preston and Soe, S&P DJI, "What Happened to the Index Effect?", 2021 (deletions −0.6% in 2010–2020); Vijh and Wang, *Financial Management* 51(4), 2022, who find that in 2016–2020 "downward deletions" from the 500 to the 400 earned *positive* announcement returns (+1.4%), i.e. the demotion discount has inverted for migrations; Chang, Hong and Liskovich, *RFS* 28(1), 2015, regression-discontinuity price effects at the Russell 1000/2000 cut-off; Petajisto, *JEF* 2011, index premia peaking in 2000 and declining since; Cai and Houge, *FAJ* 64(4), 2008; Arnott and Henslee, Research Affiliates, August 2024. Honest decay assessment: the announcement-to-effective effect is dead and I make no claim on it. The twelve-month drift is documented mainly by practitioners (RA) and one 2008 FAJ paper whose sample ends in 2004; applying McLean and Pontiff's 58% haircut to RA's 5% p.a. gives roughly 2%. One study surfaced in search reported *no* reversal for Russell 2000 deletions; I could not retrieve it to verify, so treat Russell demotions as unproven. NIXT's +28% first year is one observation, not evidence.

## 4. Data

Production, free: S&P DJI index announcements (spglobal.com/spdji media centre and the PR Newswire feed), issued about five trading days before the effective date and stating the reason, which is what lets us tag a deletion discretionary; IBKR daily bars via ib_async (US Securities Snapshot bundle $10/month, waived above $30 monthly commissions). Optional extension: FTSE Russell preliminary lists, posted free on lseg.com on Fridays from late May, and now twice a year (June and second Friday of December from 2026). Research only: WRDS Compustat index-constituent history for the 500/400/600 and CRSP daily returns for the backtest. Total cost: ≤ $10/month. Bulk-scraping spglobal.com should be checked against its terms; the press-release feed and WRDS avoid the question.

## 5. Build

Week 1: announcement ingester (RSS/press-release poll into Supabase) with a Claude classifier for reason codes. Week 2: WRDS backtest, which is also the kill test. Week 3: portfolio engine, equal-weight sizing, futures beta hedge, ib_async MOC routing. Week 4: paper trading. Weeks 5–6: monitoring, corporate-action handling, monthly hedge rebalance. Hardest problem: building a survivorship-free, correctly classified history of 400 and 600 deletions, since press-release archives are messy and Compustat carries no reason codes; a takeover misfiled as a discretionary drop poisons the backtest.

## 6. Mechanics

Universe: S&P 1500 constituents announced for removal with a discretionary reason. Entry: MOC buy on the effective date. Exit: MOC sell on the twelve-month anniversary, or on acquisition. Sizing: equal weight, 2.5% of book, cap 40 concurrent names. Hedge: short M2K (and MES for ex-500 names) at 1.0 beta of gross long, rebalanced monthly. Expected 40–70 entries a year, 30–45 concurrent positions, roughly 130–180 orders a year including futures.

## 7. Costs and capacity

Commissions at $1 per order: about $150–200 a year, 15–20 bps at $100k. Spreads: 1500 constituents are liquid and the effective-date close carries roughly 30% of the month's volume (Greenwood and Sammon), so the MOC print is the cheapest moment; assume 10–20 bps half-spread on 600 names, near zero on 500/400. Total drag about 40–60 bps a year. Borrow: none. Capacity is large (tens of millions before impact); the constraint runs the other way, since below $50k positions fall under $1.5k and the $1 minimum bites.

## 8. Honest expectation

Hedged Sharpe 0.3–0.7; residual volatility 8–12%; worst plausible drawdown 20–30% in a regime where small-cap value lags growth for a year, as in 2020–21, when a beta hedge does not help. Correlates with small-cap value and long-term reversal, and only weakly with Lazy Prices. At Sharpe 0.5 a live record needs about sixteen years to reach t = 2; the live book will never validate itself, so the backtest carries the whole burden. This beats the benchmark on buildability, capital efficiency and falsifiability, not on Sharpe.

## 9. Kill test

Three to four days on WRDS. Take all discretionary 500/400/600 deletions 2010–2025, compute twelve-month post-effective returns against DGTW size/value/momentum-matched benchmarks, then regress the monthly hedged strategy return on FF5 plus momentum and long-term reversal. Kill if the 2015–2025 characteristic-adjusted twelve-month return is below +2% or its t-statistic below 1.5, or if factor alpha is indistinguishable from zero. Second cut: split by destination (500→400, 400→600, 600→out); if only migrations show drift, Vijh's active-ownership story, not forced selling, is the mechanism.

## 10. Strongest objection

This is not a flow trade; it is a small-cap value and long-term reversal screen wearing an index-change costume. The forced selling that names the strategy no longer moves price on the day, per the best paper in the field, and the drift that remains may be entirely the factor premia any $10 ETF delivers. My answer: the trigger is exogenous and precisely timed, and the permanent loss of the passive holder is a real change in demand. But the objection is right that the burden is on the factor regression, and if alpha is zero the correct action is to buy a small-value ETF and close the project.

**Self-score:** edge durability 3; buildability in six weeks 5; capital efficiency at $100k 4; falsifiability 5.
