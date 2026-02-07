import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { dashboardMetrics } from '@/lib/mockData';

export function TopAssetsChart() {
  const data = dashboardMetrics.topAffectedAssets.slice(0, 8);

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Top Ativos Afetados</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="vertical"
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 20% 20%)" horizontal={false} />
            <XAxis 
              type="number"
              stroke="hsl(215 20% 55%)"
              fontSize={12}
            />
            <YAxis 
              type="category"
              dataKey="name"
              stroke="hsl(215 20% 55%)"
              fontSize={11}
              width={150}
              tickFormatter={(value) => value.length > 20 ? value.substring(0, 20) + '...' : value}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(230 25% 14%)',
                border: '1px solid hsl(230 20% 20%)',
                borderRadius: '8px',
                color: 'hsl(210 40% 96%)'
              }}
              formatter={(value: number) => [`${value} vulnerabilidades`, 'Total']}
            />
            <Bar 
              dataKey="count" 
              radius={[0, 4, 4, 0]}
              maxBarSize={30}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index < 3 ? 'hsl(0 72% 51%)' : index < 5 ? 'hsl(25 95% 53%)' : 'hsl(177 71% 41%)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
