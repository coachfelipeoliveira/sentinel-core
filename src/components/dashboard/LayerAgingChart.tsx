import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface AgingEntry {
  range: string;
  critical: number;
  cisaCritical: number;
  high: number;
}

interface LayerAgingChartProps {
  layerNumber: number;
  total: number;
  type: 'Internet' | 'Interna';
  data: AgingEntry[];
}

const layerBorderColors: Record<number, string> = {
  1: 'border-t-severity-critical',
  2: 'border-t-severity-high',
  3: 'border-t-severity-medium',
  4: 'border-t-[hsl(200_80%_50%)]',
};

const layerTextColors: Record<number, string> = {
  1: 'text-severity-critical',
  2: 'text-severity-high',
  3: 'text-severity-medium',
  4: 'text-[hsl(200_80%_50%)]',
};

export function LayerAgingChart({ layerNumber, total, type, data }: LayerAgingChartProps) {
  return (
    <div className={cn('glass-card p-4 border-t-4 transition-all duration-300 hover:shadow-lg', layerBorderColors[layerNumber])}>
      <div className="mb-3">
        <h4 className={cn('text-sm font-bold', layerTextColors[layerNumber])}>Layer Risk {layerNumber}</h4>
        <p className="text-lg font-bold text-foreground">{total.toLocaleString()} vulns</p>
        <p className="text-xs text-muted-foreground">{type}</p>
      </div>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 20% 20%)" horizontal={false} />
            <XAxis type="number" stroke="hsl(215 20% 55%)" fontSize={10} tickCount={4} />
            <YAxis type="category" dataKey="range" stroke="hsl(215 20% 55%)" fontSize={9} width={52} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(230 25% 14%)',
                border: '1px solid hsl(230 20% 20%)',
                borderRadius: '8px',
                color: 'hsl(210 40% 96%)',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="critical" name="Critical" stackId="a" fill="hsl(0 72% 51%)" />
            <Bar dataKey="cisaCritical" name="CISA Critical" stackId="a" fill="hsl(0 50% 35%)" />
            <Bar dataKey="high" name="High" stackId="a" fill="hsl(25 95% 53%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
