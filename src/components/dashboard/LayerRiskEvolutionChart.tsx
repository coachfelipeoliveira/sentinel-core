import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface LayerRiskEvolutionChartProps {
  data: { month: string; l1: number; l2: number; l3: number; l4: number; total: number }[];
}

export function LayerRiskEvolutionChart({ data }: LayerRiskEvolutionChartProps) {
  return (
    <div className="min-h-[320px]">
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 20% 20%)" />
          <XAxis 
            dataKey="month" 
            stroke="hsl(215 20% 55%)"
            fontSize={11}
            interval={1}
          />
          <YAxis 
            stroke="hsl(215 20% 55%)"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(230 25% 14%)',
              border: '1px solid hsl(230 20% 20%)',
              borderRadius: '8px',
              color: 'hsl(210 40% 96%)'
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          <Line type="monotone" dataKey="l1" name="Layer Risk 1" stroke="hsl(0 72% 51%)" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="l2" name="Layer Risk 2" stroke="hsl(25 95% 53%)" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="l3" name="Layer Risk 3" stroke="hsl(45 93% 47%)" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="l4" name="Layer Risk 4" stroke="hsl(200 80% 50%)" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="total" name="Total Geral" stroke="hsl(215 20% 55%)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
