import { Shield, Globe, Server, Clock, TrendingDown, TrendingUp } from 'lucide-react';
import { LayerRiskEvolutionChart } from '@/components/dashboard/LayerRiskEvolutionChart';
import { SeverityLayerTable } from '@/components/dashboard/SeverityLayerTable';
import { AgingChart } from '@/components/dashboard/AgingChart';
import { EolStatusChart } from '@/components/dashboard/EolStatusChart';
import { PriorityMatrixCard } from '@/components/dashboard/PriorityMatrixCard';
import { SlaGaugeCard } from '@/components/dashboard/SlaGaugeCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { dashboardData } from '@/lib/mockData';

function BigNumberCard({
  title,
  value,
  trend,
  subtitle,
  icon,
  borderColor,
}: {
  title: string;
  value: number;
  trend: number;
  subtitle: string;
  icon: React.ReactNode;
  borderColor: string;
}) {
  const isPositive = trend > 0;
  const isNegative = trend < 0;

  return (
    <div className={`metric-card border-l-4 ${borderColor} transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-2 text-xs">
            {isNegative ? (
              <TrendingDown className="w-3 h-3 text-status-success" />
            ) : isPositive ? (
              <TrendingUp className="w-3 h-3 text-severity-critical" />
            ) : null}
            <span className={isNegative ? 'text-status-success' : isPositive ? 'text-severity-critical' : 'text-muted-foreground'}>
              {trend > 0 ? '+' : ''}{trend}
            </span>
            <span className="text-muted-foreground">{subtitle}</span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-primary/10 text-primary">{icon}</div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { summary } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Gestão de Vulnerabilidades — Metodologia Layer Risk</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Última atualização: há 5 minutos</span>
        </div>
      </div>

      {/* Big Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BigNumberCard
          title="Total de Vulnerabilidades"
          value={summary.total}
          trend={summary.trend}
          subtitle={summary.trendLabel}
          icon={<Shield className="w-6 h-6" />}
          borderColor="border-l-primary"
        />
        <BigNumberCard
          title="Layer Risk 1 e 2 (Internet)"
          value={summary.layer12}
          trend={summary.layer12Trend}
          subtitle="Ativos expostos à Internet"
          icon={<Globe className="w-6 h-6" />}
          borderColor="border-l-severity-critical"
        />
        <BigNumberCard
          title="Layer Risk 3 e 4 (Interna)"
          value={summary.layer34}
          trend={summary.layer34Trend}
          subtitle="Rede interna"
          icon={<Server className="w-6 h-6" />}
          borderColor="border-l-severity-medium"
        />
        <SlaGaugeCard />
      </div>

      {/* Evolution chart + Severity table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LayerRiskEvolutionChart />
        </div>
        <SeverityLayerTable />
      </div>

      {/* Aging */}
      <AgingChart />

      {/* EoL + Priority Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EolStatusChart />
        <div className="lg:col-span-2">
          <PriorityMatrixCard />
        </div>
      </div>

      {/* Activity + ETL status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Status de Jobs ETL</h3>
          <div className="space-y-3">
            {[
              { name: 'Qualys Vulnerability Sync', status: 'running', progress: 67 },
              { name: 'Asset Inventory Update', status: 'completed', progress: 100 },
              { name: 'Threat Intelligence Feed', status: 'completed', progress: 100 },
              { name: 'MITRE ATT&CK Mapping', status: 'failed', progress: 45 },
            ].map((job) => (
              <div key={job.name} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{job.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      job.status === 'running' ? 'status-running' :
                      job.status === 'completed' ? 'status-success' : 'status-error'
                    }`}>
                      {job.status === 'running' ? 'Executando' :
                       job.status === 'completed' ? 'Concluído' : 'Falhou'}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        job.status === 'running' ? 'bg-status-running animate-pulse' :
                        job.status === 'completed' ? 'bg-status-success' : 'bg-status-error'
                      }`}
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
