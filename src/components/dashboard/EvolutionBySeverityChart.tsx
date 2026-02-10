import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface EvolutionBySeverityChartProps {
  data: { month: string; critical: number; cisaCritical: number; high: number; medium: number; low: number; total: number }[];
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border bg-popover p-3 text-popover-foreground shadow-md text-sm">
      <p className="font-semibold mb-2">{label}</p>
      <div className="space-y-1">
        {payload.filter((p: any) => p.dataKey !== 'total').map((p: any) => (
          <div key={p.dataKey} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: p.color }} />
              {p.name}
            </span>
            <span className="font-mono font-medium">{p.value}</span>
          </div>
        ))}
        <div className="border-t border-border pt-1 mt-1 flex justify-between font-semibold">
          <span>Total</span>
          <span className="font-mono">{payload.find((p: any) => p.dataKey === 'total')?.value ?? '—'}</span>
        </div>
      </div>
    </div>
  );
}

export function EvolutionBySeverityChart({ data }: EvolutionBySeverityChartProps) {
  return (
    <div className="min-h-[320px]">
      <ResponsiveContainer width="100%" height={360}>
        <ComposedChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 20% 20%)" />
          <XAxis dataKey="month" stroke="hsl(215 20% 55%)" fontSize={11} interval={1} />
          <YAxis stroke="hsl(215 20% 55%)" fontSize={12} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(230 25% 14% / 0.6)' }} />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          <Bar dataKey="cisaCritical" stackId="a" fill="hsl(0 50% 35%)" name="CISA Critical" radius={[0, 0, 0, 0]} />
          <Bar dataKey="critical" stackId="a" fill="hsl(0 72% 51%)" name="Critical" />
          <Bar dataKey="high" stackId="a" fill="hsl(25 95% 53%)" name="High" />
          <Bar dataKey="medium" stackId="a" fill="hsl(45 93% 47%)" name="Medium" />
          <Bar dataKey="low" stackId="a" fill="hsl(200 80% 50%)" name="Low" radius={[2, 2, 0, 0]} />
          <Line type="monotone" dataKey="total" stroke="hsl(215 20% 55%)" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: 'hsl(215 20% 55%)', r: 3 }} name="Total Geral" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
