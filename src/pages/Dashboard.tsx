import { Clock } from 'lucide-react';
import { MetricCardWithLayers } from '@/components/dashboard/MetricCardWithLayers';
import { LayerRiskEvolutionChart } from '@/components/dashboard/LayerRiskEvolutionChart';
import { SeverityLayerTable } from '@/components/dashboard/SeverityLayerTable';
import { LayerAgingChart } from '@/components/dashboard/LayerAgingChart';
import { EolStatusChart } from '@/components/dashboard/EolStatusChart';
import { PriorityMatrixCard } from '@/components/dashboard/PriorityMatrixCard';
import { SlaGaugeCard } from '@/components/dashboard/SlaGaugeCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { dashboardData } from '@/lib/mockData';

export default function Dashboard() {
  const { agingByLayer } = dashboardData;

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

      {/* Big Numbers - 4 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCardWithLayers
          title="Total de Vulnerabilidades"
          total={dashboardData.totalCard.current}
          trend={dashboardData.totalCard.trend}
          subtitle="Em relação a Janeiro/26"
          layers={dashboardData.totalCard.layers}
          borderColor="border-t-primary"
        />
        <MetricCardWithLayers
          title="Vulnerabilidades CISA Critical"
          total={dashboardData.cisaCriticalCard.current}
          trend={dashboardData.cisaCriticalCard.trend}
          subtitle="Máxima prioridade CISA"
          layers={dashboardData.cisaCriticalCard.layers}
          borderColor="border-t-[hsl(0_50%_35%)]"
        />
        <MetricCardWithLayers
          title="Vulnerabilidades Critical"
          total={dashboardData.criticalCard.current}
          trend={dashboardData.criticalCard.trend}
          subtitle="Requerem remediação urgente"
          layers={dashboardData.criticalCard.layers}
          borderColor="border-t-severity-critical"
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

      {/* Aging by Layer - 4 mini charts */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Análise de Aging (Idade das Vulnerabilidades)</h3>
          <p className="text-sm text-muted-foreground">Distribuição por tempo de exposição e Layer Risk</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <LayerAgingChart layerNumber={1} total={agingByLayer.layer1.total} type={agingByLayer.layer1.type} data={agingByLayer.layer1.aging} />
          <LayerAgingChart layerNumber={2} total={agingByLayer.layer2.total} type={agingByLayer.layer2.type} data={agingByLayer.layer2.aging} />
          <LayerAgingChart layerNumber={3} total={agingByLayer.layer3.total} type={agingByLayer.layer3.type} data={agingByLayer.layer3.aging} />
          <LayerAgingChart layerNumber={4} total={agingByLayer.layer4.total} type={agingByLayer.layer4.type} data={agingByLayer.layer4.aging} />
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[hsl(0_72%_51%)]" /> Critical</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[hsl(0_50%_35%)]" /> CISA Critical</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[hsl(25_95%_53%)]" /> High</span>
        </div>
      </div>

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
