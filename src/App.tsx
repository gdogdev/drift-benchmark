import { useState } from 'react';
import { getCurrentUser } from '@/lib/auth';
import type { User } from '@/lib/api';
import { LoginForm } from '@/features/auth/LoginForm';
import { Dashboard } from '@/features/dashboard/Dashboard';
import { UserTable } from '@/features/users/UserTable';
import { UserProfileCard } from '@/features/users/UserProfileCard';
import { InviteUserForm } from '@/features/users/InviteUserForm';
import { PricingSummary } from '@/features/billing/PricingSummary';

export default function App() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [selected, setSelected] = useState<User | null>(null);

  if (!currentUser) {
    return <LoginForm onSuccess={() => setCurrentUser(getCurrentUser())} />;
  }

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 py-8">
      <Dashboard />
      <InviteUserForm onInvited={() => undefined} />
      <UserTable onSelect={setSelected} />
      {selected && <UserProfileCard user={selected} />}
      <PricingSummary user={currentUser} />
    </main>
  );
}
