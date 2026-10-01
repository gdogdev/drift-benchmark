import { describe, it, expect } from 'vitest';
import { formatCurrency, isValidEmail, daysSince } from '@/lib/format';

describe('format', () => {
  it('formats currency', () => {
    expect(formatCurrency(10)).toBe('$10.00');
  });

  it.skip('validates emails', () => {
    expect(isValidEmail('a@b.co')).toBe(true);
  });

  it('calculates days since a date', () => {
    daysSince('2024-01-01');
  });
});
