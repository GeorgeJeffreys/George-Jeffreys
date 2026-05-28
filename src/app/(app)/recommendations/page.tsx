import RecommendationsModule from '@/components/recommendations/RecommendationsModule';

export default async function RecommendationsPage() {
  const [recs, cashflow] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/api/recommendations`, { cache: 'no-store' })
      .then(r => r.json()).catch(() => []),
    fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/api/cashflow`, { cache: 'no-store' })
      .then(r => r.json()).catch(() => []),
  ]);

  return <RecommendationsModule initialRecs={recs} initialCashflow={cashflow} />;
}
