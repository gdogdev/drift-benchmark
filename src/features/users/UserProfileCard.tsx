import type { User } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { daysSince } from '@/lib/format';

interface UserProfileCardProps {
  user: User;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <Card style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)', background: 'var(--color-surface-elevated)' }}>
      <CardContent className="flex items-center gap-4 pt-6">
        <img src={user.avatarUrl} className="h-12 w-12 rounded-full" />
        <div>
          <h4 className="font-semibold">{user.name}</h4>
          <p className="text-sm text-gray-400">{user.email}</p>
          <p className="text-xs text-gray-400">Member for {daysSince(user.createdAt)} days</p>
        </div>
        <div className="ml-auto flex gap-3 text-sm">
          <a href="#" onClick={() => navigator.clipboard.writeText(user.email)}>
            Copy email
          </a>
          <a href={`https://crm.acme.com/contacts/${user.id}`} target="_blank">
            Open in CRM
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
