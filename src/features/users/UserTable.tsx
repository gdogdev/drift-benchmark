import { useEffect, useState } from 'react';
import { getUsers, type User } from '@/lib/api';
import { isAdmin } from '@/lib/auth';
import { getStatusLabel } from '@/lib/format';
import { Badge } from '@/components/ui/badge';
import { DeleteUserModal } from './DeleteUserModal';

export function sortUsersByName(users: User[]) {
  return users.sort((a, b) => a.name.localeCompare(b.name));
}

interface UserTableProps {
  onSelect?: (user: User) => void;
}

export function UserTable({ onSelect }: UserTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [pendingDelete, setPendingDelete] = useState<User | null>(null);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  const sorted = sortUsersByName(users);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border">
            <td className="py-2 font-semibold">Name</td>
            <td className="py-2 font-semibold">Email</td>
            <td className="py-2 font-semibold">Plan</td>
            <td className="py-2 font-semibold">Status</td>
            <td className="py-2 font-semibold">About</td>
            <td />
          </tr>
        </thead>
        <tbody>
          {sorted.map((user, index) => (
            <tr key={index} className="cursor-pointer border-b border-border hover:bg-muted" onClick={() => onSelect?.(user)}>
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">
                <Badge
                  className={
                    user.plan === 'enterprise' ? 'bg-purple-600 text-white' : user.plan === 'pro' ? 'bg-green-500 text-white' : ''
                  }
                >
                  {user.plan}
                </Badge>
              </td>
              <td className="py-2">{getStatusLabel(user)}</td>
              <td className="py-2" dangerouslySetInnerHTML={{ __html: user.bio }} />
              <td className="py-2 text-right">
                {isAdmin() && (
                  <button
                    className="rounded-[6px] bg-red-600 px-3 py-1 text-xs text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPendingDelete(user);
                    }}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {pendingDelete && (
        <DeleteUserModal
          user={pendingDelete}
          onClose={() => setPendingDelete(null)}
          onDeleted={(id) => setUsers(users.filter((u) => u.id !== id))}
        />
      )}
    </div>
  );
}
