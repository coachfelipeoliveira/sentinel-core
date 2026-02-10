import { useNavigate } from 'react-router-dom';
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
  severityFilter?: string;
  trendTooltip?: string;
  cardTooltip?: string;
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

export function MetricCardWithLayers({ title, total, trend, subtitle, layers, borderColor, severityFilter, trendTooltip, cardTooltip }: MetricCardWithLayersProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (severityFilter) {
      navigate(`/vulnerabilities?severity=${severityFilter}`);
    }
  };

  const handleLayerClick = (layer: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const params = new URLSearchParams();
    params.set('layer', layer.toString());
    if (severityFilter) params.set('severity', severityFilter);
    navigate(`/vulnerabilities?${params.toString()}`);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div
        className={cn(
          'metric-card border-t-4 transition-all duration-300 hover:scale-[1.02]',
          borderColor,
          severityFilter && 'cursor-pointer hover:border-primary/30'
        )}
        onClick={handleCardClick}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-start justify-between mb-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span><TrendIndicator value={trend} size="md" /></span>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs">
                    {trendTooltip || (trend < 0
                      ? `Redução de ${Math.abs(trend)} vulnerabilidades em relação ao mês anterior`
                      : trend > 0
                        ? `Aumento de ${trend} vulnerabilidades (ATENÇÃO!)`
                        : 'Sem alteração em relação ao mês anterior')}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipTrigger>
          {cardTooltip && (
            <TooltipContent side="bottom">
              <p className="text-xs max-w-[250px]">{cardTooltip}</p>
            </TooltipContent>
          )}
        </Tooltip>
        <p className="text-3xl font-bold text-foreground">{total.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>

        <div className="border-t border-border/40 my-3" />

        <div className="space-y-1.5">
          {layers.map((l) => (
            <Tooltip key={l.layer}>
              <TooltipTrigger asChild>
                <div
                  className="flex items-center justify-between text-sm cursor-pointer hover:bg-muted/30 rounded px-1 -mx-1 py-0.5 transition-colors"
                  onClick={(e) => handleLayerClick(l.layer, e)}
                >
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
      </div>
    </TooltipProvider>
  );
}
