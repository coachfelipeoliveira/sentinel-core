import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Download, Eye, BarChart3, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { vulnerabilities, Vulnerability, Severity, Priority } from '@/lib/mockData';
import { getVulnerabilityDetail, VulnerabilityDetail } from '@/lib/vulnerabilityDetailsData';
import { assetVulnerabilities, getAssetCountByQid, AssetVulnerability } from '@/lib/assetData';
import VulnerabilityDetailsModal from '@/components/vulnerabilities/VulnerabilityDetailsModal';
import { VulnerabilityFilterBanner } from '@/components/vulnerabilities/VulnerabilityFilterBanner';
import { AssetVulnerabilityTable } from '@/components/vulnerabilities/AssetVulnerabilityTable';
import { cn } from '@/lib/utils';

const severityLabels: Record<Severity, string> = {
  critical: 'Critical',
  cisaCritical: 'CISA Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const severityStyles: Record<Severity, string> = {
  critical: 'bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20',
  cisaCritical: 'bg-[#991B1B]/15 text-[#991B1B] border border-[#991B1B]/25',
  high: 'bg-[#EA580C]/10 text-[#EA580C] border border-[#EA580C]/20',
  medium: 'bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20',
  low: 'bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20',
};

const priorityColors: Record<Priority, string> = {
  P1: 'text-severity-critical bg-severity-critical/10',
  P2: 'text-severity-high bg-severity-high/10',
  P3: 'text-severity-medium bg-severity-medium/10',
  P4: 'text-severity-low bg-severity-low/10',
};

const statusLabels: Record<string, string> = {
  open: 'Aberta',
  in_progress: 'Em progresso',
  remediated: 'Remediada',
  accepted: 'Aceita',
};

const statusStyles: Record<string, string> = {
  open: 'bg-severity-critical/20 text-severity-critical',
  in_progress: 'bg-severity-high/20 text-severity-high',
  remediated: 'bg-status-success/20 text-status-success',
  accepted: 'bg-muted text-muted-foreground',
};

// Map aging URL param to agingBucket values
const agingParamToBuckets: Record<string, string[]> = {
  '0-30': ['30d'],
  '31-60': ['31-60d'],
  '61-90': ['61-90d'],
  '91-180': ['91-180d'],
  '181-365': ['181-365d'],
  '366-730': ['1+ ano'],
  '730+': ['2+ anos'],
};

function buildFallbackDetail(vuln: Vulnerability): VulnerabilityDetail {
  return {
    qid: vuln.qid,
    title: vuln.title,
    severity: vuln.severity,
    layerRisk: vuln.layerRisk,
    priority: vuln.priority,
    status: vuln.status,
    description: vuln.description,
    vendor: 'N/A',
    product: 'N/A',
    affectedVersions: 'N/A',
    portProtocol: 'N/A',
    detectedDate: vuln.detectedDate,
    publishedDate: vuln.detectedDate,
    cvss: vuln.severity === 'critical' || vuln.severity === 'cisaCritical' ? 9.8 : vuln.severity === 'high' ? 7.5 : 5.0,
    cvssVector: 'N/A',
    cveIds: [],
    exploitability: vuln.exploitability === 'active' ? 'Alta' : vuln.exploitability === 'poc' ? 'Média' : 'Baixa',
    publicExploit: vuln.exploitability === 'active' || vuln.exploitability === 'poc',
    cisaKev: vuln.severity === 'cisaCritical',
    mitreMapping: vuln.mitreAttack.map(t => ({ id: t, name: t, tactic: 'N/A', subtechniques: [] })),
    compliance: vuln.compliance,
    assetCriticality: vuln.layerRisk <= 2 ? 'Crítica' : 'Média',
    businessImpact: 'Avaliação de impacto pendente.',
    remediationSteps: vuln.remediationSteps,
    workarounds: [],
    references: vuln.references.map(r => ({ type: 'Link', title: r, url: r })),
    affectedAssets: [{ id: 1, hostname: vuln.asset, ip: '10.0.0.1', type: vuln.assetType, os: 'N/A', layer: vuln.layerRisk, patchStatus: 'Pendente', lastDetected: vuln.detectedDate }],
    timeline: [{ type: 'detected', title: 'Detectada', description: 'Detectada pelo Qualys', timestamp: vuln.detectedDate + 'T12:00:00Z', user: 'Sistema Qualys' }],
    notes: [],
    eol: vuln.eol,
    agingDays: vuln.agingDays,
    agingBucket: vuln.agingBucket,
    asset: vuln.asset,
    assetType: vuln.assetType,
  };
}

export default function Vulnerabilities() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [layerFilter, setLayerFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [agingFilter, setAgingFilter] = useState<string>('all');
  const [selectedVulns, setSelectedVulns] = useState<string[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [detailVuln, setDetailVuln] = useState<VulnerabilityDetail | null>(null);
  const [activeTab, setActiveTab] = useState('vulnerability');

  // URL params from dashboard
  const urlLayer = searchParams.get('layer');
  const urlAging = searchParams.get('aging');
  const urlEmpresa = searchParams.get('empresa');

  useEffect(() => {
    const severity = searchParams.get('severity');
    if (severity) setSeverityFilter(severity);
    if (urlLayer) setLayerFilter(urlLayer);
    if (urlAging) setAgingFilter(urlAging);

    // Open modal if qid param present (from global search)
    const qidParam = searchParams.get('qid');
    if (qidParam) {
      const qid = parseInt(qidParam, 10);
      const detail = getVulnerabilityDetail(qid);
      if (detail) {
        setDetailVuln(detail);
      } else {
        const vuln = vulnerabilities.find(v => v.qid === qid);
        if (vuln) setDetailVuln(buildFallbackDetail(vuln));
      }
    }

    // Pre-fill search if hostname param present
    const hostnameParam = searchParams.get('hostname');
    if (hostnameParam) {
      setSearchTerm(hostnameParam);
    }
  }, [searchParams]);

  const clearUrlFilters = () => {
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
    setSeverityFilter('all');
    setLayerFilter('all');
    setAgingFilter('all');
  };

  // --- Tab 1: By Vulnerability ---
  const filteredVulns = useMemo(() => {
    return vulnerabilities.filter(vuln => {
      const matchesSearch =
        vuln.qid.toString().includes(searchTerm) ||
        vuln.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vuln.asset.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeverity = severityFilter === 'all' || vuln.severity === severityFilter;
      const matchesLayer = layerFilter === 'all' || vuln.layerRisk.toString() === layerFilter;
      const matchesStatus = statusFilter === 'all' || vuln.status === statusFilter;
      const matchesAging = agingFilter === 'all' || (agingParamToBuckets[agingFilter] || []).includes(vuln.agingBucket);
      return matchesSearch && matchesSeverity && matchesLayer && matchesStatus && matchesAging;
    });
  }, [searchTerm, severityFilter, layerFilter, statusFilter, agingFilter]);

  // --- Tab 2: By Asset ---
  const filteredAssets = useMemo(() => {
    return assetVulnerabilities.filter(av => {
      const matchesSearch =
        av.qid.toString().includes(searchTerm) ||
        av.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        av.hostname.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeverity = severityFilter === 'all' || av.severity === severityFilter;
      const matchesLayer = layerFilter === 'all' || av.layerRisk.toString() === layerFilter;
      const matchesStatus = statusFilter === 'all' || av.status === statusFilter;
      const matchesAging = agingFilter === 'all' || (agingParamToBuckets[agingFilter] || []).includes(av.agingBucket);
      const matchesEmpresa = !urlEmpresa || av.empresa === urlEmpresa;
      return matchesSearch && matchesSeverity && matchesLayer && matchesStatus && matchesAging && matchesEmpresa;
    }).sort((a, b) => {
      const pOrder = { P1: 0, P2: 1, P3: 2, P4: 3 };
      const sOrder = { cisaCritical: 0, critical: 1, high: 2, medium: 3, low: 4 };
      if (pOrder[a.priority] !== pOrder[b.priority]) return pOrder[a.priority] - pOrder[b.priority];
      if (sOrder[a.severity] !== sOrder[b.severity]) return sOrder[a.severity] - sOrder[b.severity];
      return a.hostname.localeCompare(b.hostname);
    });
  }, [searchTerm, severityFilter, layerFilter, statusFilter, agingFilter, urlEmpresa]);

  const handleRowClick = (vuln: Vulnerability) => {
    const detail = getVulnerabilityDetail(vuln.qid);
    setDetailVuln(detail || buildFallbackDetail(vuln));
  };

  const handleAssetViewDetail = (qid: number) => {
    const detail = getVulnerabilityDetail(qid);
    if (detail) {
      setDetailVuln(detail);
    } else {
      const vuln = vulnerabilities.find(v => v.qid === qid);
      if (vuln) setDetailVuln(buildFallbackDetail(vuln));
    }
  };

  const toggleSelectAll = () => {
    setSelectedVulns(prev => prev.length === filteredVulns.length ? [] : filteredVulns.map(v => v.id));
  };

  const toggleSelect = (id: string) => {
    setSelectedVulns(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };

  const toggleAssetSelectAll = () => {
    setSelectedAssets(prev => prev.length === filteredAssets.length ? [] : filteredAssets.map(a => a.vulnId));
  };

  const toggleAssetSelect = (id: string) => {
    setSelectedAssets(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };

  const currentSelected = activeTab === 'vulnerability' ? selectedVulns : selectedAssets;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vulnerabilidades</h1>
          <p className="text-muted-foreground">
            {activeTab === 'vulnerability'
              ? `${filteredVulns.length} vulnerabilidades encontradas`
              : `${filteredAssets.length} ativos afetados encontrados`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {currentSelected.length > 0 && (
            <div className="flex items-center gap-2 mr-4">
              <span className="text-sm text-muted-foreground">{currentSelected.length} selecionadas</span>
              <Button variant="outline" size="sm">Atribuir</Button>
              <Button variant="outline" size="sm">Atualizar Status</Button>
            </div>
          )}
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* URL Filter Banner */}
      <VulnerabilityFilterBanner
        layer={urlLayer || undefined}
        aging={urlAging || undefined}
        empresa={urlEmpresa || undefined}
        onClear={clearUrlFilters}
      />

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por QID, título ou ativo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Severidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="cisaCritical">CISA Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={layerFilter} onValueChange={setLayerFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Layer Risk" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas Layers</SelectItem>
            <SelectItem value="1">Layer 1</SelectItem>
            <SelectItem value="2">Layer 2</SelectItem>
            <SelectItem value="3">Layer 3</SelectItem>
            <SelectItem value="4">Layer 4</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="open">Aberta</SelectItem>
            <SelectItem value="in_progress">Em progresso</SelectItem>
            <SelectItem value="remediated">Remediada</SelectItem>
            <SelectItem value="accepted">Aceita</SelectItem>
          </SelectContent>
        </Select>
        <Select value={agingFilter} onValueChange={setAgingFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Aging" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="0-30">0-30 dias</SelectItem>
            <SelectItem value="31-60">31-60 dias</SelectItem>
            <SelectItem value="61-90">61-90 dias</SelectItem>
            <SelectItem value="91-180">91-180 dias</SelectItem>
            <SelectItem value="181-365">181-365 dias</SelectItem>
            <SelectItem value="366-730">1+ ano</SelectItem>
            <SelectItem value="730+">2+ anos</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Mais filtros
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="vulnerability" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Por Vulnerabilidade
          </TabsTrigger>
          <TabsTrigger value="asset" className="gap-2">
            <Monitor className="w-4 h-4" />
            Por Ativo Afetado
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: By Vulnerability */}
        <TabsContent value="vulnerability">
          <div className="glass-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedVulns.length === filteredVulns.length && filteredVulns.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>QID</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Severidade</TableHead>
                  <TableHead>Layer</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Ativo</TableHead>
                  <TableHead>Qtd Ativos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aging</TableHead>
                      <TableHead>EoL</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVulns.map((vuln) => {
                  const assetCount = getAssetCountByQid(vuln.qid);
                  return (
                    <TableRow
                      key={vuln.id}
                      className={cn(
                        'border-border cursor-pointer hover:bg-accent/50 transition-all duration-150',
                        selectedVulns.includes(vuln.id) && 'bg-primary/5',
                      )}
                      onClick={() => handleRowClick(vuln)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox checked={selectedVulns.includes(vuln.id)} onCheckedChange={() => toggleSelect(vuln.id)} />
                      </TableCell>
                      <TableCell>
                        <code className="text-xs font-mono text-primary">{vuln.qid}</code>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium line-clamp-1 max-w-[200px]">{vuln.title}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={severityStyles[vuln.severity]}>{severityLabels[vuln.severity]}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className={cn(
                          'inline-flex items-center justify-center w-7 h-7 rounded text-xs font-bold',
                          vuln.layerRisk === 1 ? 'bg-severity-critical/20 text-severity-critical' :
                          vuln.layerRisk === 2 ? 'bg-severity-high/20 text-severity-high' :
                          vuln.layerRisk === 3 ? 'bg-severity-medium/20 text-severity-medium' :
                          'bg-severity-low/20 text-severity-low'
                        )}>
                          L{vuln.layerRisk}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={cn('px-2 py-1 rounded text-xs font-bold', priorityColors[vuln.priority])}>
                          {vuln.priority}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground line-clamp-1 max-w-[150px]">
                          {assetCount > 1 ? 'Multiple Assets' : vuln.asset}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={assetCount > 1 ? 'default' : 'outline'} className="text-xs">
                          {assetCount} {assetCount === 1 ? 'ativo' : 'ativos'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusStyles[vuln.status]}>{statusLabels[vuln.status]}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-mono text-muted-foreground">{vuln.agingBucket}</span>
                      </TableCell>
                      <TableCell>
                      {vuln.eol ? (
                          <Badge className="bg-severity-critical/20 text-severity-critical text-xs">EoL</Badge>
                        ) : (
                          <Badge className="bg-status-success/20 text-status-success text-xs">Non-EoL</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" onClick={() => handleRowClick(vuln)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Tab 2: By Asset */}
        <TabsContent value="asset">
          <AssetVulnerabilityTable
            data={filteredAssets}
            selectedIds={selectedAssets}
            onToggleSelect={toggleAssetSelect}
            onToggleSelectAll={toggleAssetSelectAll}
            onViewDetail={handleAssetViewDetail}
          />
        </TabsContent>
      </Tabs>

      {/* Detail Modal */}
      <VulnerabilityDetailsModal
        vuln={detailVuln}
        open={!!detailVuln}
        onClose={() => setDetailVuln(null)}
      />
    </div>
  );
}
