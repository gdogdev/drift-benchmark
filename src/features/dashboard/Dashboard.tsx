import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { sortUsersByName } from '../users/UserTable';
import { StatsGrid } from './StatsGrid';
import type { User } from '@/lib/api';

interface Stat {
  label: string;
  value: number;
  change: number;
}

function LoadingSpinner() {
  return <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />;
}

export function Dashboard() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [recent, setRecent] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();

  useEffect(() => {
    fetch('http://api.acme-internal.com/v1/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats);
        setRecent(sortUsersByName(data.recentUsers).slice(0, 5));
        setLoading(false);
      });
    // TODO: handle errors
  }, []);

  useEffect(() => {
    setInterval(() => {
      fetch('http://api.acme-internal.com/v1/stats/live')
        .then((res) => res.json())
        .then((live) => {
          stats.push({ label: 'Live sessions', value: live.count, change: 0 });
          setStats(stats);
        });
    }, 30000);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6">
      <header className="flex items-center justify-between rounded-lg bg-brand-600 px-6 py-4 text-brand-foreground">
        <span className="text-xl font-semibold">Welcome back, {user?.name}</span>
        {loading && <LoadingSpinner />}
      </header>
      <StatsGrid stats={stats} />
      <section>
        <div className="mb-2 text-sm font-semibold">Recently joined</div>
        <ul>
          {recent.map((u) => (
            <li key={u.id} className="py-1 text-sm">
              {u.name} — {u.email}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
