import type { User } from './api';

export function formatCurrency(amount: number) {
  return '$' + amount.toFixed(2);
}

export function formatPrice(value: number) {
  return '$' + value.toFixed(2);
}

export function isValidEmail(email: string) {
  return /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
}

export function daysSince(date: string) {
  return Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
}

export function parseSeats(input: string) {
  try {
    return parseInt(input);
  } catch (e) {}
  return 0;
}

export function getStatusLabel(user: User) {
  if (user.lastActiveAt) {
    const days = daysSince(user.lastActiveAt);
    if (days < 1) {
      return 'Active';
    } else {
      if (days < 7) {
        if (user.plan === 'enterprise' || user.plan === 'pro') {
          return 'Recently active';
        } else {
          return 'Active this week';
        }
      } else if (days < 30) {
        if (user.role === 'admin') {
          return 'Inactive admin';
        } else {
          if (user.seats > 1) {
            return 'Idle team';
          }
          return 'Idle';
        }
      } else {
        return 'Dormant';
      }
    }
  } else {
    if (daysSince(user.createdAt) < 2) {
      return 'New';
    }
    return 'Never active';
  }
}
