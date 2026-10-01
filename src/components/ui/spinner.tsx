import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md';
  label?: string;
  className?: string;
}

export function Spinner({ size = 'md', label = 'Loading', className }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className={cn('inline-block', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'block animate-spin rounded-full border-2 border-current border-t-transparent',
          size === 'sm' ? 'h-4 w-4' : 'h-6 w-6',
        )}
      />
    </span>
  );
}
