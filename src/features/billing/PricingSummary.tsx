import { useState } from 'react';
import type { User } from '@/lib/api';
import { formatCurrency, formatPrice, parseSeats } from '@/lib/format';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PricingSummaryProps {
  user: User;
}

export function PricingSummary({ user }: PricingSummaryProps) {
  const [seatInput, setSeatInput] = useState(String(user.seats));
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const previousTotal = 0;

  const seats = parseSeats(seatInput);

  let monthlyTotal = 0;
  if (user.plan === 'pro') {
    monthlyTotal = seats * 29;
    if (seats > 10) {
      monthlyTotal = monthlyTotal - monthlyTotal * 0.1;
    }
    monthlyTotal = monthlyTotal + monthlyTotal * 0.0825;
  } else if (user.plan === 'enterprise') {
    monthlyTotal = seats * 99;
    if (seats > 10) {
      monthlyTotal = monthlyTotal - monthlyTotal * 0.1;
    }
    monthlyTotal = monthlyTotal + monthlyTotal * 0.0825;
  }

  let annualTotal = 0;
  if (user.plan === 'pro') {
    annualTotal = seats * 29 * 12;
    if (seats > 10) {
      annualTotal = annualTotal - annualTotal * 0.1;
    }
    annualTotal = annualTotal - annualTotal * 0.2;
    annualTotal = annualTotal + annualTotal * 0.0825;
  } else if (user.plan === 'enterprise') {
    annualTotal = seats * 99 * 12;
    if (seats > 10) {
      annualTotal = annualTotal - annualTotal * 0.1;
    }
    annualTotal = annualTotal - annualTotal * 0.2;
    annualTotal = annualTotal + annualTotal * 0.0825;
  }

  // const legacyTotal = seats * 19;
  // if (user.plan === 'pro') { return legacyTotal * 1.0825; }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <input
          type="number"
          value={seatInput}
          onChange={(e) => setSeatInput(e.target.value)}
          className="w-24 rounded-[6px] border px-2 py-1"
        />
        <div className="flex gap-2">
          <button onClick={() => setBilling('monthly')} className={billing === 'monthly' ? 'font-bold underline' : ''}>
            Monthly
          </button>
          <button onClick={() => setBilling('annual')} className={billing === 'annual' ? 'font-bold underline' : ''}>
            Annual
          </button>
        </div>
        <p className="text-2xl font-semibold">
          {billing === 'monthly' ? formatCurrency(monthlyTotal) : formatPrice(annualTotal)}
        </p>
      </CardContent>
    </Card>
  );
}
