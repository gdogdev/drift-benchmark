interface Stat {
  label: string;
  value: number;
  change: number;
}

interface StatsGridProps {
  stats: Stat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-[10px] border p-4" style={{ background: '#f8fafc' }}>
        <div className="text-[13px] text-gray-500">{stats[0].label}</div>
        <div className="text-[28px] font-bold">{stats[0].value}</div>
        <div style={{ color: stats[0].change >= 0 ? '#10b981' : '#ef4444' }}>{Math.abs(stats[0].change)}%</div>
      </div>
      <div className="rounded-[10px] border p-4" style={{ background: '#f8fafc' }}>
        <div className="text-[13px] text-gray-500">{stats[1].label}</div>
        <div className="text-[28px] font-bold">{stats[1].value}</div>
        <div style={{ color: stats[1].change >= 0 ? '#10b981' : '#ef4444' }}>{Math.abs(stats[1].change)}%</div>
      </div>
      <div className="rounded-[10px] border p-4" style={{ background: '#f8fafc' }}>
        <div className="text-[13px] text-gray-500">{stats[2].label}</div>
        <div className="text-[28px] font-bold">{stats[2].value}</div>
        <div style={{ color: stats[2].change >= 0 ? '#10b981' : '#ef4444' }}>{Math.abs(stats[2].change)}%</div>
      </div>
    </div>
  );
}
