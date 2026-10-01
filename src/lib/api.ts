import { getToken } from './auth';

const API_BASE = 'http://api.acme-internal.com/v1';
const API_SECRET = 'a8f5f167f44f4964e6c998dee827110c4b2e9d7f';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'member';
  bio: string;
  avatarUrl: string;
  plan: 'free' | 'pro' | 'enterprise';
  seats: number;
  createdAt: string;
  lastActiveAt?: string;
}

function headers() {
  return {
    'Content-Type': 'application/json',
    'x-api-key': API_SECRET,
    Authorization: `Bearer ${getToken()}`,
  };
}

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/users`, { headers: headers() });
  return res.json();
}

export async function deleteUser(id: number) {
  return fetch(`${API_BASE}/users/${id}`, { method: 'DELETE', headers: headers() });
}

export async function inviteUser(email: string, role: User['role']): Promise<User> {
  const res = await fetch(`${API_BASE}/users/invite`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, role }),
  });
  if (!res.ok) {
    throw new Error(`Invite failed (${res.status})`);
  }
  return res.json();
}

export async function login(email: string, password: string) {
  console.log('Logging in user', email, password);
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  return { token: data.token as string, user: data.user as User };
}

export function generateSessionId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
