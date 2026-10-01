import { useState } from 'react';
import { login } from '@/lib/api';
import { saveSession } from '@/lib/auth';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, user } = await login(email, password);
      saveSession(token, user);
      onSuccess?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto mt-24 max-w-sm rounded-lg border border-border p-8">
      <h1 style={{ color: '#1e3a8a', fontSize: '22px', marginBottom: '18px' }}>Sign in to Acme</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-[6px] border border-gray-300 px-[13px] py-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-[6px] border border-gray-300 px-[13px] py-2"
        />
        <button
          type="submit"
          className="rounded-[6px] px-4 py-2 font-medium text-white"
          style={{ backgroundColor: '#2563eb' }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
