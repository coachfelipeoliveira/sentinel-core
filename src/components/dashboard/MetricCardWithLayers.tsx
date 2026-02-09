import { TrendIndicator } from './TrendIndicator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface LayerData {
  layer: number;
  value: number;
  trend: number;
}

interface MetricCardWithLayersProps {
  title: string;
  total: number;
  trend: number;
  subtitle: string;
  layers: LayerData[];
  borderColor: string;
}

const layerColors: Record<number, string> = {
  1: 'text-severity-critical',
  2: 'text-severity-high',
  3: 'text-severity-medium',
  4: 'text-[hsl(200_80%_50%)]',
};

const layerDescriptions: Record<number, string> = {
  1: 'Ativos expostos à Internet com compliance ACN/SOX/LGPD',
  2: 'Ativos expostos à Internet sem compliance',
  3: 'Rede interna com compliance ACN/SOX/LGPD',
  4: 'Rede interna sem compliance',
};

export function MetricCardWithLayers({ title, total, trend, subtitle, layers, borderColor }: MetricCardWithLayersProps) {
  return (
    <div className={cn('metric-card border-t-4 transition-all duration-300 hover:scale-[1.02]', borderColor)}>
      <div className="flex items-start justify-between mb-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <TrendIndicator value={trend} size="md" />
      </div>
      <p className="text-3xl font-bold text-foreground">{total.toLocaleString()}</p>
      <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>

      <div className="border-t border-border/40 my-3" />

      <TooltipProvider delayDuration={200}>
        <div className="space-y-1.5">
          {layers.map((l) => (
            <Tooltip key={l.layer}>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-between text-sm cursor-default hover:bg-muted/30 rounded px-1 -mx-1 py-0.5 transition-colors">
                  <span className={cn('font-medium', layerColors[l.layer])}>
                    Layer Risk {l.layer}:
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{l.value.toLocaleString()}</span>
                    <TrendIndicator value={l.trend} size="sm" />
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="text-xs">{layerDescriptions[l.layer]}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
