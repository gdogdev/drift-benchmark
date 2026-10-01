import { useId, useState } from 'react';
import { inviteUser, type User } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';

interface InviteUserFormProps {
  onInvited: (user: User) => void;
}

function looksLikeEmail(value: string) {
  const at = value.indexOf('@');
  const dot = value.lastIndexOf('.');
  return at > 0 && dot > at + 1 && dot < value.length - 1 && !value.includes(' ');
}

export function InviteUserForm({ onInvited }: InviteUserFormProps) {
  const emailId = useId();
  const errorId = useId();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!looksLikeEmail(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const user = await inviteUser(email, 'member');
      onInvited(user);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <Label htmlFor={emailId}>Invite by email</Label>
      <div className="flex gap-2">
        <Input
          id={emailId}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
        <Button type="submit" loading={submitting}>
          Send invite
        </Button>
      </div>
      {error && (
        <Alert id={errorId} variant="destructive">
          {error}
        </Alert>
      )}
    </form>
  );
}
