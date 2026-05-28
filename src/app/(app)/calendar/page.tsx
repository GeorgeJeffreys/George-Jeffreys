import { Task } from '@/types/union';
import CalendarModule from '@/components/calendar/CalendarModule';

async function getTasks(): Promise<Task[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/tasks`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function CalendarPage() {
  const tasks = await getTasks();
  return <CalendarModule initialTasks={tasks} />;
}
