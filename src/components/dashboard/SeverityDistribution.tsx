import { dashboardMetrics } from '@/lib/mockData';

export function SeverityDistribution() {
  const { totalVulnerabilities } = dashboardMetrics;
  const total = totalVulnerabilities.critical + totalVulnerabilities.high + 
                totalVulnerabilities.medium + totalVulnerabilities.low;

  const segments = [
    { label: 'Crítica', count: totalVulnerabilities.critical, color: 'bg-severity-critical', textColor: 'text-severity-critical' },
    { label: 'Alta', count: totalVulnerabilities.high, color: 'bg-severity-high', textColor: 'text-severity-high' },
    { label: 'Média', count: totalVulnerabilities.medium, color: 'bg-severity-medium', textColor: 'text-severity-medium' },
    { label: 'Baixa', count: totalVulnerabilities.low, color: 'bg-severity-low', textColor: 'text-severity-low' },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Distribuição por Severidade</h3>
      
      {/* Progress bar */}
      <div className="h-4 rounded-full overflow-hidden flex mb-6 bg-muted">
        {segments.map((segment, index) => (
          <div
            key={segment.label}
            className={`${segment.color} transition-all duration-500`}
            style={{ width: `${(segment.count / total) * 100}%` }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-4">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${segment.color}`} />
              <span className="text-sm text-muted-foreground">{segment.label}</span>
            </div>
            <span className={`text-lg font-bold ${segment.textColor}`}>{segment.count}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Total de Vulnerabilidades</span>
        <span className="text-2xl font-bold text-foreground">{total}</span>
      </div>
    </div>
  );
}
