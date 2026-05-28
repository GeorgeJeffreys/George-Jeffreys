import { Scenario } from '@/types/union';
import ScenarioModeller from '@/components/scenarios/ScenarioModeller';

async function getScenarios(): Promise<Scenario[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/scenarios`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function ScenariosPage() {
  const scenarios = await getScenarios();
  return <ScenarioModeller initialScenarios={scenarios} />;
}
