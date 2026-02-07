import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { dashboardMetrics } from '@/lib/mockData';

const COLORS = [
  'hsl(0 72% 51%)',
  'hsl(25 95% 53%)',
  'hsl(45 93% 47%)',
  'hsl(177 71% 41%)',
  'hsl(200 80% 50%)',
  'hsl(280 60% 55%)',
];

export function MitreDistributionChart() {
  const data = dashboardMetrics.mitreDistribution;

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Distribuição MITRE ATT&CK</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="count"
              nameKey="technique"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(230 25% 14%)',
                border: '1px solid hsl(230 20% 20%)',
                borderRadius: '8px',
                color: 'hsl(210 40% 96%)'
              }}
              formatter={(value: number, name: string) => [value, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {data.slice(0, 4).map((item, index) => (
          <div key={item.technique} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-muted-foreground truncate max-w-[200px]">
                {item.technique.split(' - ')[0]}
              </span>
            </div>
            <span className="font-medium">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
