import { Option } from '@/types/union';
import WorkstreamExplorer from '@/components/workstream/WorkstreamExplorer';

async function getOptions(): Promise<Option[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/options`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function WorkstreamPage() {
  const options = await getOptions();
  return <WorkstreamExplorer initialOptions={options} />;
}
