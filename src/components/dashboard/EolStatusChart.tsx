import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { dashboardData } from '@/lib/mockData';

export function EolStatusChart() {
  const { eolStatus } = dashboardData;
  const data = [
    { name: 'End-of-Life', value: eolStatus.eol },
    { name: 'Non-EoL', value: eolStatus.nonEol },
  ];
  const total = eolStatus.eol + eolStatus.nonEol;
  const COLORS = ['hsl(0 72% 51%)', 'hsl(177 71% 41%)'];

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Status EoL vs Non-EoL</h3>
      <div className="h-[200px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(230 25% 14%)',
                border: '1px solid hsl(230 20% 20%)',
                borderRadius: '8px',
                color: 'hsl(210 40% 96%)',
              }}
              formatter={(value: number, name: string) => [`${value} (${((value / total) * 100).toFixed(0)}%)`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-2">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
            <span className="text-sm text-muted-foreground">{item.name}</span>
            <span className="text-sm font-bold">{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
