import { dashboardMetrics } from '@/lib/mockData';
import { Clock } from 'lucide-react';

export function MTTRCard() {
  const { mttr } = dashboardMetrics;

  const items = [
    { label: 'Crítica', value: mttr.critical, color: 'text-severity-critical', bgColor: 'bg-severity-critical/10' },
    { label: 'Alta', value: mttr.high, color: 'text-severity-high', bgColor: 'bg-severity-high/10' },
    { label: 'Média', value: mttr.medium, color: 'text-severity-medium', bgColor: 'bg-severity-medium/10' },
    { label: 'Baixa', value: mttr.low, color: 'text-severity-low', bgColor: 'bg-severity-low/10' },
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Tempo Médio para Remediação (MTTR)</h3>
      </div>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                <span className={`text-sm font-bold ${item.color}`}>
                  {item.label.charAt(0)}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
            <div className="text-right">
              <span className={`text-lg font-bold ${item.color}`}>{item.value}</span>
              <span className="text-sm text-muted-foreground ml-1">dias</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Média Geral</span>
          <div>
            <span className="text-2xl font-bold text-primary">
              {((mttr.critical + mttr.high + mttr.medium + mttr.low) / 4).toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground ml-1">dias</span>
          </div>
        </div>
      </div>
    </div>
  );
}
