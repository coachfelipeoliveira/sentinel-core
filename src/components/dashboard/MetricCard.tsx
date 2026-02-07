import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: number;
  trendLabel?: string;
  variant?: 'default' | 'critical' | 'high' | 'medium' | 'low' | 'success';
  className?: string;
}

const variantStyles = {
  default: 'border-l-primary',
  critical: 'border-l-severity-critical',
  high: 'border-l-severity-high',
  medium: 'border-l-severity-medium',
  low: 'border-l-severity-low',
  success: 'border-l-status-success',
};

const iconBgStyles = {
  default: 'bg-primary/10 text-primary',
  critical: 'bg-severity-critical/10 text-severity-critical',
  high: 'bg-severity-high/10 text-severity-high',
  medium: 'bg-severity-medium/10 text-severity-medium',
  low: 'bg-severity-low/10 text-severity-low',
  success: 'bg-status-success/10 text-status-success',
};

export function MetricCard({
  title,
  value,
  icon,
  trend,
  trendLabel,
  variant = 'default',
  className,
}: MetricCardProps) {
  const getTrendIcon = () => {
    if (trend === undefined) return null;
    if (trend > 0) return <TrendingUp className="w-3 h-3" />;
    if (trend < 0) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getTrendColor = () => {
    if (trend === undefined) return '';
    // For vulnerabilities, negative trend is good (fewer vulns)
    if (trend < 0) return 'text-status-success';
    if (trend > 0) return 'text-severity-critical';
    return 'text-muted-foreground';
  };

  return (
    <div
      className={cn(
        'metric-card border-l-4 transition-all duration-300 hover:scale-[1.02]',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend !== undefined && (
            <div className={cn('flex items-center gap-1 mt-2 text-xs', getTrendColor())}>
              {getTrendIcon()}
              <span>{Math.abs(trend)}%</span>
              {trendLabel && <span className="text-muted-foreground">vs {trendLabel}</span>}
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-lg', iconBgStyles[variant])}>
          {icon}
        </div>
      </div>
    </div>
  );
}
