import { generateSessionId, type User } from './api';

export function saveSession(token: string, user: User) {
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('sessionId', generateSessionId());
}

export function getToken() {
  return localStorage.getItem('authToken');
}

export function getCurrentUser(): User | null {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
}

export function isAdmin(): boolean {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.role == 'admin';
}

export function clearSession() {
  localStorage.clear();
}
