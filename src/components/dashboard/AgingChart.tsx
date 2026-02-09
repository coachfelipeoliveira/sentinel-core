import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { dashboardData, AgingBucket } from '@/lib/mockData';

export function AgingChart() {
  const { byAging } = dashboardData;

  const data = (Object.entries(byAging) as [AgingBucket, { critical: number; cisaCritical: number; high: number }][]).map(
    ([bucket, values]) => ({
      bucket,
      ...values,
    })
  );

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-1">Análise de Aging (Idade das Vulnerabilidades)</h3>
      <p className="text-sm text-muted-foreground mb-4">Distribuição por tempo de exposição</p>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 20% 20%)" horizontal={false} />
            <XAxis type="number" stroke="hsl(215 20% 55%)" fontSize={12} />
            <YAxis
              type="category"
              dataKey="bucket"
              stroke="hsl(215 20% 55%)"
              fontSize={11}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(230 25% 14%)',
                border: '1px solid hsl(230 20% 20%)',
                borderRadius: '8px',
                color: 'hsl(210 40% 96%)',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar dataKey="critical" name="Critical" stackId="a" fill="hsl(0 72% 51%)" />
            <Bar dataKey="cisaCritical" name="CISA Critical" stackId="a" fill="hsl(0 50% 35%)" />
            <Bar dataKey="high" name="High" stackId="a" fill="hsl(25 95% 53%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
