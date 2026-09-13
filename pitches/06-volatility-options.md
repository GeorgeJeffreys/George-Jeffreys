# 06 — Selling the Earnings Lottery

*Lane: volatility, options-implied signals and behavioural microstructure.*

## 1. The idea in one paragraph

Sell defined-risk iron butterflies (short at-the-money straddle, long wings) on liquid large-cap stocks in the last half hour before their earnings announcement; buy them back shortly after the reopen. Trade only when the implied earnings move is rich relative to the stock's recent realised earnings moves. The trade harvests the gap between what retail lottery-seekers pay for one-night volatility and what the stock does, loss capped by the wings. One overnight session; nothing needs a reaction faster than a limit order at 15:45.

## 2. Why the money is there

The other side is retail. Bryzgalova, Pavlova and Sikorskaya (*Journal of Finance*, 2023) document retail at over 60% of US options volume, concentrated in cheap weeklies with 12.6% average spreads, losing on average. De Silva, Smith and So ("Losing is Optional", SSRN 4050165, reported as published in the *Review of Finance*, 2025) show this buying concentrates *before earnings* and rises with expected announcement volatility; retail loses 5–9% of premium on average and 10–14% on high-expected-volatility announcements, through overpaying relative to realised volatility, spreads, and sluggish reaction after the print.

Why is it not competed away? The absorbers are three wholesalers with finite inventory and vega limits, who raise the mid rather than absorb the flow, so a limit order at the mid captures part of the overpricing, not just the spread. Volatility funds cannot scale in: the excess premium per name per event is tens of thousands of dollars, and through a discrete jump there is no dynamic hedge, so the seller warehouses event risk. It is capacity-limited in the way that suits $100k and repels $1bn. Part is a true risk premium (Carr and Wu, *RFS*, 2009), which publication does not erode.

## 3. Evidence

Dubinsky, Johannes, Kaeck and Seeger (*RFS*, 2019) show the implied earnings jump forecasts realised announcement volatility well: the *average* implied move is roughly fair, so an unconditional short is thin. Milian (*Journal of Risk and Financial Management*, 2023) finds weekly straddle returns through the announcement are predictably lower when the historical earnings move is low relative to the implied move, while older predictors (implied minus historical volatility) no longer work: partial decay of the simpler signal. Gao, Xing and Zhang (*JFQA*, 2018) find 3.34% straddle returns from three days *before* to the announcement: the IV run-up is pre-event, and entry at the final close sells the peak. Skew signals (Cremers and Weinbaum, 2010; Xing, Zhang and Zhao, 2010; An, Ang, Bali and Cakici, 2014) and closing-auction reversals (Bogousslavsky and Muravyev, *JFM*, 2023) were discarded: the first fades in-sample, the second reverts by the open.

Two caveats. Bogousslavsky and Muravyev's trader-level data (SSRN 4682388) put average single-stock option trade returns near +0.15%: retail losses are mostly spread, index and 0DTE, and the single-name edge may be smaller than implied above. And ORATS reports 2026 straddle buyers averaged about +45% in one season, with hyperscaler straddles +23% in August against a 2% average loss over the prior twelve quarters. An unconditional short was badly hurt this year; the filter must be shown to have avoided it.

## 4. Data

Research: OptionMetrics IvyDB via Wharton WRDS (daily bid/ask and IV from 1996; research-only). Production-safe: Massive "Options Starter" ($29/month, 15-minute delayed, two years' history) or Theta Data Starter ($29); both licences are personal, non-commercial: fine for an own account, not a pooled vehicle. Cboe DataShop EOD files are priced per symbol, unquoted. Earnings timing (BMO/AMC): historically from EDGAR 8-K Item 2.02 acceptance timestamps (free, definitive); forward from Finnhub's calendar `hour` field, unconfirmed on the free tier. Live: IBKR US Securities bundle plus OPRA (about $11.50/month, waived above modest commissions), chains via `reqSecDefOptParams`, IV via `reqMktData` tick 106. IBKR gives *no* history for expired options, so the system snapshots its own chains from day one. Under $45/month.

## 5. Build

Week 1: universe, calendar, EDGAR parser. Weeks 2–3: IvyDB backtest and kill test. Week 4: chain snapshotter and implied-move calculator. Week 5: `ib_async` BAG combo orders with mid-anchored limits that walk toward the market, exits, exposure caps. Week 6: paper trading. Hardest problem: four-leg combo fills near the close without crossing the full spread. IBKR rejects malformed BAGs and a partial fill leaves undefined risk, so orders are all-or-none combos, never legged.

## 6. Mechanics

Universe: about 300 US names with weeklies, share price $40–250 (one-lot granularity at $100k), ATM straddle spread under 3% of mid. Signal: implied move (ATM straddle mid of the first post-event expiry over spot) over the median absolute earnings-day move of the last eight quarters; trade if the ratio exceeds 1.2 and the implied move 4%. Entry: 15:45 combo limit, wings at roughly twice the implied move, one week to expiry. Exit: 09:45 next session, limit at mid, walking; never hold to expiry. Sizing: maximum loss (width minus credit) capped at 1.5% of NAV per position, 10% per day, 25% per week. Expect 250–350 events a year, two orders each: 500–700 orders, 2,000–2,800 contracts.

## 7. Costs and capacity

Commissions at $0.65 per contract are about $7 per event with exchange fees, roughly $2,000 a year or 200 basis points on $100k, near 10% of gross edge. Spread is the larger cost: Muravyev and Pearson (*RFS*, 2020) show patient execution pays under 40% of the quoted spread; assuming a third, $25–40 per event eats 30–50% of gross edge. No borrow; Reg T margin equals the maximum loss. Capacity ends around $1–2m, where one-lot-per-name and the retail flow per event bind.

## 8. Honest expectation

Sharpe 0.3–0.9 net; volatility 10–15%; return 5–12%. Worst plausible drawdown 20–25% in a season like 2026 where realised beats implied everywhere. The wings make the loss survivable but mean *buying* the deepest out-of-the-money lottery tickets, which carry the richest premium: the true cost of defined risk. Correlates with dispersion spikes and VIX jumps in earnings weeks, roughly the mirror of a long/short fundamental book, so a complement to Lazy Prices, not a duplicate. At Sharpe 0.6 a live record needs about ten years to reach two standard errors; monitor instead the per-event implied-to-realised ratio, far less noisy.

## 9. Kill test

Three to five days, $0 (IvyDB) or $29 (Massive). For every announcement in the universe since 2018, compute iron-butterfly P&L at sell-bid/buy-ask fills, prior close to next close, in terciles of the implied-to-historical ratio. Kill if the top tercile's mean P&L is not positive with t above 2 across at least 600 events, or is positive only before 2023, or lost over 10% of risk capital in the 2025–26 quarters.

## 10. Strongest objection

"Selling straddles into earnings is the wholesalers' job, done with inventory netting and no spread. A retail account paying spread on eight legs scavenges their leftovers, which after 2026 may not be positive." The answer is partial: the literature places the overpricing in the mid, not only the spread, and the conditional sort exists because the unconditional trade is near fair. If the kill test shows the top tercile's edge lives inside the bid-ask, the objection stands and the project ends.

**Self-score.** Edge durability 3. Buildability in six weeks 4. Capital efficiency at $100k 3. Falsifiability 5.
