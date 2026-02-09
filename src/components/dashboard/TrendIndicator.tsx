import { TrendingDown, TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrendIndicatorProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { icon: 'w-3 h-3', text: 'text-xs' },
  md: { icon: 'w-4 h-4', text: 'text-sm' },
  lg: { icon: 'w-5 h-5', text: 'text-base' },
};

export function TrendIndicator({ value, size = 'sm', className }: TrendIndicatorProps) {
  const s = sizeMap[size];
  const isNeg = value < 0;
  const isPos = value > 0;

  return (
    <span className={cn('inline-flex items-center gap-0.5', className)}>
      {isNeg ? (
        <TrendingDown className={cn(s.icon, 'text-status-success')} />
      ) : isPos ? (
        <TrendingUp className={cn(s.icon, 'text-severity-critical')} />
      ) : (
        <ArrowRight className={cn(s.icon, 'text-muted-foreground')} />
      )}
      <span className={cn(s.text, isNeg ? 'text-status-success' : isPos ? 'text-severity-critical' : 'text-muted-foreground')}>
        {value > 0 ? '+' : ''}{value}
      </span>
    </span>
  );
}
