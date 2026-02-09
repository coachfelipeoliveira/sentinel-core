import { useState } from 'react';
import { Search, Filter, Download, Eye, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { vulnerabilities, Vulnerability, Severity, LayerRisk, Priority } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const severityLabels: Record<Severity, string> = {
  critical: 'Critical',
  cisaCritical: 'CISA Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const severityStyles: Record<Severity, string> = {
  critical: 'severity-badge-critical',
  cisaCritical: 'bg-[hsl(0_50%_35%/0.2)] text-[hsl(0_50%_50%)] border border-[hsl(0_50%_35%/0.3)]',
  high: 'severity-badge-high',
  medium: 'severity-badge-medium',
  low: 'severity-badge-low',
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

export default function Vulnerabilities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [layerFilter, setLayerFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedVulns, setSelectedVulns] = useState<string[]>([]);
  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(null);

  const filteredVulns = vulnerabilities.filter(vuln => {
    const matchesSearch =
      vuln.qid.toString().includes(searchTerm) ||
      vuln.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vuln.asset.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || vuln.severity === severityFilter;
    const matchesLayer = layerFilter === 'all' || vuln.layerRisk.toString() === layerFilter;
    const matchesStatus = statusFilter === 'all' || vuln.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesLayer && matchesStatus;
  });

  const toggleSelectAll = () => {
    setSelectedVulns(prev => prev.length === filteredVulns.length ? [] : filteredVulns.map(v => v.id));
  };

  const toggleSelect = (id: string) => {
    setSelectedVulns(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vulnerabilidades</h1>
          <p className="text-muted-foreground">{filteredVulns.length} vulnerabilidades encontradas</p>
        </div>
        <div className="flex items-center gap-2">
          {selectedVulns.length > 0 && (
            <div className="flex items-center gap-2 mr-4">
              <span className="text-sm text-muted-foreground">{selectedVulns.length} selecionadas</span>
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
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Mais filtros
        </Button>
      </div>

      {/* Table */}
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
              <TableHead>Status</TableHead>
              <TableHead>Aging</TableHead>
              <TableHead>EoL</TableHead>
              <TableHead>Compliance</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVulns.map((vuln) => (
              <TableRow
                key={vuln.id}
                className={cn('border-border cursor-pointer', selectedVulns.includes(vuln.id) && 'bg-primary/5')}
                onClick={() => setSelectedVuln(vuln)}
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
                  <span className="text-sm text-muted-foreground line-clamp-1 max-w-[150px]">{vuln.asset}</span>
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
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {vuln.compliance.map(tag => (
                      <Badge key={tag} variant="outline" className="text-[10px] px-1">{tag}</Badge>
                    ))}
                    {vuln.compliance.length === 0 && <span className="text-xs text-muted-foreground">—</span>}
                  </div>
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedVuln(vuln)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Detail modal */}
      <Dialog open={!!selectedVuln} onOpenChange={() => setSelectedVuln(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <code className="text-primary">QID {selectedVuln?.qid}</code>
              {selectedVuln && <Badge className={severityStyles[selectedVuln.severity]}>{severityLabels[selectedVuln.severity]}</Badge>}
              {selectedVuln && (
                <span className={cn('px-2 py-1 rounded text-xs font-bold', priorityColors[selectedVuln.priority])}>
                  {selectedVuln.priority}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedVuln && (
            <ScrollArea className="max-h-[70vh] pr-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{selectedVuln.title}</h3>
                  <p className="text-muted-foreground">{selectedVuln.description}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="glass-card p-3">
                    <p className="text-xs text-muted-foreground mb-1">Layer Risk</p>
                    <p className="text-2xl font-bold text-primary">L{selectedVuln.layerRisk}</p>
                  </div>
                  <div className="glass-card p-3">
                    <p className="text-xs text-muted-foreground mb-1">Prioridade</p>
                    <p className={cn('text-2xl font-bold', priorityColors[selectedVuln.priority].split(' ')[0])}>{selectedVuln.priority}</p>
                  </div>
                  <div className="glass-card p-3">
                    <p className="text-xs text-muted-foreground mb-1">Aging</p>
                    <p className="text-lg font-bold text-foreground">{selectedVuln.agingDays}d</p>
                    <p className="text-xs text-muted-foreground">{selectedVuln.agingBucket}</p>
                  </div>
                  <div className="glass-card p-3">
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <Badge className={statusStyles[selectedVuln.status]}>{statusLabels[selectedVuln.status]}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Ativo Afetado</h4>
                    <div className="glass-card p-3">
                      <p className="font-mono text-sm">{selectedVuln.asset}</p>
                      <p className="text-xs text-muted-foreground">{selectedVuln.assetType}</p>
                      {selectedVuln.eol && <Badge className="mt-2 bg-severity-critical/20 text-severity-critical text-xs">End-of-Life</Badge>}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Compliance</h4>
                    <div className="glass-card p-3">
                      {selectedVuln.compliance.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedVuln.compliance.map(tag => (
                            <Badge key={tag} variant="outline" className="font-mono">{tag}</Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Sem tags de compliance</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">MITRE ATT&CK</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVuln.mitreAttack.map(t => (
                      <Badge key={t} variant="outline" className="font-mono">{t}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Passos de Remediação</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    {selectedVuln.remediationSteps.map((step, i) => (
                      <li key={i} className="text-sm text-muted-foreground">{step}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Referências</h4>
                  <div className="space-y-1">
                    {selectedVuln.references.map((ref, i) => (
                      <a key={i} href={ref} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline">
                        <ExternalLink className="w-3 h-3" />{ref}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button className="flex-1">Atribuir</Button>
                  <Button variant="outline" className="flex-1">Atualizar Status</Button>
                  <Button variant="outline" className="flex-1">Adicionar Nota</Button>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
