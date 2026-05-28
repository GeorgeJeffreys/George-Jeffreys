import TwoYearPlan from '@/components/plan2year/TwoYearPlan';

export default async function PlanPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const [recs, cashflow] = await Promise.all([
    fetch(`${baseUrl}/api/recommendations`, { cache: 'no-store' }).then(r => r.json()).catch(() => []),
    fetch(`${baseUrl}/api/cashflow`, { cache: 'no-store' }).then(r => r.json()).catch(() => []),
  ]);

  return <TwoYearPlan initialRecs={recs} initialCashflow={cashflow} />;
}
