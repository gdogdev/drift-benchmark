import * as React from 'react';
import { cn } from '@/lib/utils';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
}

export function Alert({ className, variant = 'default', ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        'rounded-md border p-4 text-sm',
        variant === 'destructive' ? 'border-destructive text-destructive' : 'border-border',
        className,
      )}
      {...props}
    />
  );
}
