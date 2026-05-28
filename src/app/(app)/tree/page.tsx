import { TreeNode } from '@/types/union';
import DiagnosticTree from '@/components/tree/DiagnosticTree';

async function getTreeNodes(): Promise<TreeNode[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/tree`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function TreePage() {
  const nodes = await getTreeNodes();
  return <DiagnosticTree initialNodes={nodes} />;
}
