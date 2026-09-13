# 00 — Red team: attacking the six pitches

Method: every paper, dataset and price claim in the six pitches was checked by web search on 13 September 2026. Where a primary source was blocked by the network proxy the check rests on indexed abstracts, journal listings and secondary summaries, and that is noted. Arithmetic was recomputed from each pitch's own stated turnover, position size, holding period and costs. Then the six were read against each other for overlap.

## Cross-cutting problems the pitches did not raise

**Nobody has answered whose account this runs in.** Only 03 raised compliance, and it raised it as the worst case. It is the general case. Bank personal-trading policies typically require pre-clearance, a restricted-list check and a minimum holding period, commonly thirty days, and FINRA Rule 3210 requires employer consent for any account in which an associated person has a beneficial interest. That kills 06 outright (one-night holds), makes 04 (twenty-day holds with a press-release exit) impractical, makes 03 a restricted-list risk on every deal the bank touches, and complicates even 01 and 02. If Jad is to have any economic interest, the strategies must be pre-cleared as a systematic programme or Jad's role must be limited to research before the start date. This is cheaper to settle than any kill test and should be settled first.

**Five of six are the same trade.** 01, 02, 04 and 05 are all long-only small-cap books hedged with IWM or micro futures; 03 is long-only small-cap with no hedge. The "market-neutral" label in each hides the same residual: long small-cap value and reversal, short nothing but beta. In 2020–21 all five draw down together, and their combined book is an unhedged small-cap factor bet with five different entry timestamps. The comparison file's "alongside" argument survives only for 03, whose deal-risk return is different in kind, and 06, which shares nothing.

**Every pitch scores itself 5 on falsifiability and 4 or 5 on buildability.** That is not credible across six independent authors and should be read as a floor effect of the format rather than evidence. Falsifiability is genuinely high in all six because the kill tests are WRDS event studies; buildability is overstated in 03, 04 and 06, where the hardest engineering problem (merger-agreement extraction, entity resolution, four-leg combo fills) is exactly the sort of thing that consumes weeks four to eight.

## 01 — Clustered Form 4 insider purchases

*Citations.* All verified: Cohen, Malloy and Pomorski (JF 2012, 82 bp/month), Alldredge and Blank (JFR 42(2), 2019, clustered purchases followed by >2% next month), Brochet (TAR 85(2), 2010), Cziraki and Gider (RoF 25(5), 2021, median insider earns $464 a year), Zhao (arXiv 2602.06198, February 2026, 17,237 purchases 2018–2024), Bartov and Konchitchki (AH 31(4), 2017), Lerman and Livnat (RAST 15, 2010). The Aalto master's thesis exists and the 60–70% decay figure matches its abstract. The "Substack analysis" claiming 70–80% of returns accrue between trade and filing is not cited and cannot be checked; it should not be in an evidence section.

*Data.* All free and real; the 10b5-1 checkbox (April 2023) and the Form 3/4/5 exemption from the 5:30 pm cutoff are correct. The pitch admits it could not reach sec.gov and the endpoints are second-hand.

*Cost arithmetic.* 250–300 orders at $1–2 each is 30–60 bp, consistent with the stated 35–45. Spread at 40 bp a side on four turns is 320 bp, so total drag near 4% is honest. Gross alpha of 8–12% requires 2–3% per event over sixty days on a fully invested book; the pitch's own evidence (Zhao: confidence intervals include zero at 63 sessions; Alldredge and Blank: 2% in the first month) supports 2% for one month, not 2–3% over three. The Sharpe of 0.6 is therefore an upper case, not a central one. A twenty-day hold would cut spread cost and match the evidence better, at the price of three times the order count.

*Edge overlap.* Same factor as 02, 04 and 05. The honest version of this pitch is "buy beaten-up small caps when insiders do", which is a reversal screen with a better timestamp.

*Verdict.* The kill test is the cheapest in the set and the pitch is the most candid. It is also the pitch whose best recent evidence most directly says the signal is gone at its own holding period.

## 02 — Buying S&P 1500 discretionary deletions

*Citations.* Verified: Greenwood and Sammon (JF 80(2), 2025), Vijh and Wang (Financial Management 51(4), 2022, downward deletions +1.37%), Cai and Houge (FAJ 64(4), 2008), Arnott and Henslee ("Nixed", Research Affiliates, August 2024), Preston and Soe (S&P DJI 2021), Chang, Hong and Liskovich (RFS 2015), Petajisto (2011). Unverified: NIXT's assets (~$37m) and first-year return (+28%); the claim that the effective-date close carries "roughly 30% of the month's volume", attributed to Greenwood and Sammon, which I could not find in their abstract; and the unnamed study reporting no Russell 2000 reversal, which the pitch itself flags. One factual slip: the pitch says FTSE Russell's second reconstitution falls on the second Friday of *December* from 2026; LSEG's own release says *November*.

*Cost arithmetic.* 130–180 orders is 15–20 bp, correct. The problem is the return side. The pitch haircuts Research Affiliates' 5% p.a. by McLean and Pontiff's 58% to "roughly 2%", then claims a hedged Sharpe of 0.3–0.7 on 8–12% residual volatility, which requires 2.5–8% net. On a book that is at most 100% gross long, 2% drift less 40–60 bp of costs is about 1.5% net, which at 10% volatility is a Sharpe of 0.15. The pitch's Sharpe is the undecayed number; its own decay adjustment gives half the bottom of its range.

*Edge overlap.* This is the purest factor exposure of the six. Cai and Houge's own result is "factor-adjusted", but the factors they adjust for are Fama–French three-factor plus momentum, not long-term reversal, which is the whole story here. The pitch's strongest objection ("buy a small-value ETF and close the project") is right unless the kill test's factor regression says otherwise, and the pitch's kill threshold (t above 1.5 on a 2015–2025 sample of perhaps 400 events) is lenient.

*Verdict.* Cheap to build and cheap to kill, but the twelve-month hold means the live book teaches nothing for a decade, and the expected return after the pitch's own decay adjustment is not worth the infrastructure.

## 03 — Small-cap cash merger arbitrage

*Citations.* Verified: Mitchell and Pulvino (JF 56(6), 2001), Baker and Savaşoglu (JFE 64(1), 2002), Jetley and Ji (FAJ 66(2), 2010, 2,182 deals, spreads down 400 bp post-2002), Pontiff (1995). MNA's ten-year return (2.8–3.1% p.a.) and March 2020 drawdown (16.7%) are confirmed by fund-data sites. Accelerate's 2024 termination rate is "just under 6%", matching the pitch's 5.9%. The Baker and Savaşoglu "returns increase in target size" wording rests on a search summary; the 5–10% small-deal spread is practitioner hearsay and the pitch says so.

*Data.* The `efts.sec.gov/LATEST/search-index` endpoint, `q`, `forms` and `dateRange` parameters are documented by third parties and free. Fine.

*Cost arithmetic.* 100 orders is 10 bp, the lowest in the set, and correct because closings settle by corporate action. Gross capture of 8–12% annualised on deployed capital, less 1.5–2.8% break drag (6–8% breaks at 25–35%), less 1.6% costs, gives 4–7% over T-bills at 5–8% volatility: Sharpe 0.5–1.4. The pitch claims 0.5–1.0, so it is if anything conservative. The weak link is the 60–120 qualifying deals a year, which the pitch marks as its own guess; if the true number after the cash-only, no-financing-condition and ADV filters is 30, the book is half deployed and the Sharpe halves with it.

*Edge overlap.* None with the other five. It is the only pitch whose return is deal risk rather than small-cap factor exposure.

*The unstated risk.* The hardest engineering problem, LLM extraction of consideration and conditions from Exhibit 2.1, is a silent-failure mode: a CVR or collar misread as clean cash is a wrong price with no alarm. This is the same class of risk the DCE carries and should be tested the same way, with a hand-labelled set before any live order.

*Verdict.* The most economically coherent pitch and the cheapest to run. It is disqualified for Jad's beneficial ownership and it does not beat the benchmark on Sharpe. Its case is that it beats it on everything else.

## 04 — Federal contract award surprise

*Citations.* **One misattribution.** The Economics Letters 252 (2025) paper "Trading on government contracts: The investment potential of public procurement awards" is by **Chaehyun Pyun**, not "Gans and Holden". The paper exists, the volume and article number are right, and its finding (outperformance driven by large caps) is correctly reported, but the author is wrong, and the pitch's own description of Gans and Holden's other work suggests a memory collision rather than a fabrication. Verified: Belo, Gala and Li (JFE 107(2), 2013, 6.9% p.a.), Esqueda, Ngo and Susnjara (JBF 106, 2019), the TenderAlpha October 2025 note (Sharpe 0.77–0.88 on receivables growth). The 2026 TenderAlpha–HKU white paper and the 2020 "unexpected government receivables" working paper are unverified and the pitch says so.

*Data.* The DoD daily contracts list (threshold $7.5m under DFARS 205.303), the 90-day FPDS delay for DoD and USACE, and the FAR three-business-day reporting rule are all confirmed. The DoD domain is given as war.gov; the daily list is also reachable at defense.gov. USAspending API v2 is free. Correct.

*Cost arithmetic.* 220 orders is 22 bp, correct. Spread drag of 3–4% a year on 40–80 events at 5% each and 100 bp round trip is 2–4%, correct. **The kill threshold does not survive the arithmetic.** The pitch kills if mean CAR(+1,+20) is under 1.5%. At 1.5% per event, 60 events a year at 5% of the book is 4.5% gross, less 3–4% of spread and slippage, is 0.5–1.5% net: a Sharpe near 0.1. To reach the claimed 0.4–0.8 at 8–12% volatility requires CAR of roughly 3–4% per event after the overnight gap the pitch already concedes. The kill test as written would pass a strategy that cannot pay its own costs.

*Edge.* The pitch's only refereed evidence on the direct effect says it is large-cap driven, and its argument for small caps is that the vendor work "says the signal carries" there, which is the vendor's marketing. The DoD list has been machine-read for years by the people the pitch names, so the residual is civilian USAspending flow and the ceiling-versus-obligation parsing, both of which are real but thin.

*Verdict.* Genuine free data, genuine parsing edge, wrong author on the key citation, and a kill threshold that lets a loser through. Fix the threshold to 3% before running it.

## 05 — Event-time XBRL quality tilt

*Citations.* All verified: Sloan (1996), Pontiff and Woodgate (2008), Cooper, Gulen and Schill (2008), Hirshleifer et al. (2004), Bradshaw, Richardson and Sloan (2006), Novy-Marx (2013), Ball et al. (2016), McLean and Pontiff (2016), Chen and Velikov (JFQA 58(3), 2023: 50% decay, 72% ex stale data, 93% after costs, 4 bp a month average), Hou, Xue and Zhang (2020), Chen and Zimmermann (2022), Bowles, Reed, Ringgenberg and Thornock (JF 79(5), 2024), Miao, Teoh and Zhu (RAST 21, 2016), Chychyla and Kogan (JIS 29(1), 2015), Blitz, Baltussen and van Vliet (FAJ 2020, long legs in small caps most attractive), Green, Hand and Soliman (2011), Engelberg, McLean and Pontiff (2018). This is the cleanest citation record of the six. The Calcbench filing-lag figures are unverified.

*Data.* The companyfacts, companyconcept, frames and Financial Statement Data Sets endpoints exist; the pitch's warning that `frames` is latest-value only and that `fy`/`fp` describe the filing not the fact is correct and useful. Field names are from memory, as the pitch admits.

*Cost arithmetic.* 220 orders is 25 bp, correct. **The Sharpe is inconsistent with the stated alpha.** Net long-leg alpha of 1.5–3.5% over a small-cap benchmark, hedged with IWM, at 8–12% residual volatility is a Sharpe of 0.15–0.4, not 0.3–0.6. The pitch's information ratio of 0.3–0.5 is the honest number and it is below the benchmark by a wide margin.

*Edge overlap.* Same long-only small-cap-with-IWM-hedge trade as 01, 02 and 04, with a quality rather than reversal tilt.

*Verdict.* The pitch is right that the lane is dead as a standalone and right that it is a useful filter for the DCE's short leg. That is a three-day test and a few hundred lines, not a six-week build, and the comparison should treat it so.

## 06 — Defined-risk earnings iron butterflies

*Citations.* Verified: Bryzgalova, Pavlova and Sikorskaya (JF 78(6), 2023, retail >60% of volume, 12.6% spreads), de Silva, Smith and So ("Losing is Optional", Review of Finance 30(2), **March 2026**, not 2025; losses of 5–9% and 10–14% confirmed), Dubinsky, Johannes, Kaeck and Seeger (RFS 32(2), 2019), Gao, Xing and Zhang (JFQA 53(6), 2018), Milian (JRFM 16(5), 2023), Muravyev and Pearson (RFS 33(11), 2020), Bogousslavsky and Muravyev (JFM 66, 2023), Carr and Wu (RFS 2009). The ORATS 2026 figures (hyperscaler straddles +23% in August against a 2% average loss over twelve quarters) are confirmed by ORATS's own blog. Unverified: "Bogousslavsky and Muravyev's trader-level data (SSRN 4682388)" and the +0.15% figure; Gao, Xing and Zhang's 3.34% is from a summary.

*Data.* Massive Options Starter at $29 a month with 15-minute delay and two years' history is confirmed. IBKR's $0.65 per contract is confirmed for Lite and Pro fixed; Pro tiered can be lower. The claim that IBKR gives no history for expired options is correct and is the reason the pitch's own chain snapshotter matters.

*Cost arithmetic.* 300 events, eight contract-sides each at $0.65 plus fees, is about $2,000 or 200 bp, correct, and the highest in the set. Spread at a third of quoted on eight legs at $25–40 an event is plausible. **The gross-edge estimate double-counts.** Retail's 5–9% loss in de Silva et al. is the sum of three behaviours: overpaying relative to realised volatility, paying the spread, and closing late. A seller at the mid captures only the first; the spread goes to the wholesaler and the late close is retail's problem alone. Dubinsky et al., as the pitch itself says, find the average implied move roughly fair, so the unconditional component of the first term is near zero and the entire edge sits in Milian's conditional sort, which is one paper in a second-tier journal. The Sharpe range of 0.3–0.9 is wide enough to be honest, but its upper half needs the conditional sort to deliver essentially all of retail's overpricing, which the evidence does not show.

*Risk.* Wings at twice the implied move give a max loss roughly equal to the credit, so the trade is near one-to-one, which makes the 20–25% drawdown claim easy to reach in a season like 2026. "Roughly the mirror of a long/short fundamental book" is loose: short volatility is short the market's left tail, and a market-neutral text book is not long it. Correlation is low, not negative.

*Compliance.* A one-night options trade is impossible under any thirty-day holding rule and most banks prohibit employee options trading outright. This strategy cannot involve Jad at all.

*Verdict.* The only uncorrelated idea and the only one with a data source that must be paid for. The kill test is the sharpest in the set because it can be run on the 2025–26 quarters that would have hurt it. But the cost structure eats a third to a half of gross before any edge is counted, and the edge itself is thinner than the pitch's headline figures imply.

## Ranking: most likely to be a waste of six weeks first

1. **05 XBRL quality tilt.** The agent says it is dead standalone and the Sharpe arithmetic agrees. Run the three-day test as a DCE filter; do not build a book.
2. **02 Index deletions.** Factor exposure with a timestamp; the pitch's own decay adjustment gives a Sharpe near 0.15; twelve-month holds mean the live book cannot validate itself in George's working lifetime; the correct alternative is an ETF.
3. **04 Contract surprise.** Misattributed key citation, refereed evidence pointing the wrong way on size, a kill threshold that passes an unprofitable strategy, and the hardest entity-resolution problem of the six. Fixable, but it needs the 3% threshold and a proper hand-labelled resolution set before anything else.
4. **06 Earnings iron butterflies.** Genuine and uncorrelated, but 200 bp of commission, spread eating a third to a half of gross, double-counted retail losses, a hostile 2026 regime and a compliance profile that excludes Jad entirely. Worth a three-day OptionMetrics test; not worth six weeks unless that test is decisive.
5. **01 Insider clusters.** The cheapest kill test and the most honest pitch; also the pitch whose most recent evidence says the signal is gone at sixty days. Shorten the hold, run the test, and expect a "no".
6. **03 Small-cap merger arbitrage.** Least likely to be wasted because the economics are coherent, costs are 10 bp, the kill test is decisive and the infrastructure is the DCE's. It does not beat the benchmark on Sharpe, its deal count is a guess, and Jad cannot own it. If those three facts are acceptable, it is the one to test first.
