import { Shield, AlertTriangle, CheckCircle, TrendingDown, Clock } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { SeverityDistribution } from '@/components/dashboard/SeverityDistribution';
import { VulnerabilityTrendChart } from '@/components/dashboard/VulnerabilityTrendChart';
import { TopAssetsChart } from '@/components/dashboard/TopAssetsChart';
import { MitreDistributionChart } from '@/components/dashboard/MitreDistributionChart';
import { MTTRCard } from '@/components/dashboard/MTTRCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { dashboardMetrics } from '@/lib/mockData';

export default function Dashboard() {
  const totalVulns = dashboardMetrics.totalVulnerabilities.critical + 
                     dashboardMetrics.totalVulnerabilities.high + 
                     dashboardMetrics.totalVulnerabilities.medium + 
                     dashboardMetrics.totalVulnerabilities.low;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do estado de segurança</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Última atualização: há 5 minutos</span>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Vulnerabilidades Críticas"
          value={dashboardMetrics.totalVulnerabilities.critical}
          icon={<AlertTriangle className="w-6 h-6" />}
          trend={12}
          trendLabel="mês anterior"
          variant="critical"
        />
        <MetricCard
          title="Total de Vulnerabilidades"
          value={totalVulns}
          icon={<Shield className="w-6 h-6" />}
          trend={-5.2}
          trendLabel="mês anterior"
          variant="default"
        />
        <MetricCard
          title="Conformidade SLA"
          value={`${dashboardMetrics.slaCompliance}%`}
          icon={<CheckCircle className="w-6 h-6" />}
          trend={3}
          trendLabel="mês anterior"
          variant="success"
        />
        <MetricCard
          title="Taxa de Scan"
          value={`${dashboardMetrics.scanCompletion}%`}
          icon={<TrendingDown className="w-6 h-6" />}
          variant="default"
        />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VulnerabilityTrendChart />
        </div>
        <SeverityDistribution />
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TopAssetsChart />
        <MitreDistributionChart />
        <MTTRCard />
      </div>

      {/* Activity */}
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
