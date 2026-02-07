import { useState } from 'react';
import { Search, Filter, Download, Eye, ChevronDown, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { vulnerabilities, Vulnerability } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export default function Vulnerabilities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedVulns, setSelectedVulns] = useState<string[]>([]);
  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(null);

  const filteredVulns = vulnerabilities.filter(vuln => {
    const matchesSearch = 
      vuln.cveId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vuln.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vuln.asset.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === 'all' || vuln.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || vuln.status === statusFilter;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityBadge = (severity: string) => {
    const styles: Record<string, string> = {
      critical: 'severity-badge-critical',
      high: 'severity-badge-high',
      medium: 'severity-badge-medium',
      low: 'severity-badge-low',
    };
    const labels: Record<string, string> = {
      critical: 'Crítica',
      high: 'Alta',
      medium: 'Média',
      low: 'Baixa',
    };
    return <Badge className={styles[severity]}>{labels[severity]}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      open: 'bg-severity-critical/20 text-severity-critical',
      in_progress: 'bg-severity-high/20 text-severity-high',
      remediated: 'bg-status-success/20 text-status-success',
      accepted: 'bg-muted text-muted-foreground',
    };
    const labels: Record<string, string> = {
      open: 'Aberta',
      in_progress: 'Em progresso',
      remediated: 'Remediada',
      accepted: 'Aceita',
    };
    return <Badge className={styles[status]}>{labels[status]}</Badge>;
  };

  const getExploitabilityBadge = (exp: string) => {
    const styles: Record<string, string> = {
      active: 'bg-severity-critical/20 text-severity-critical',
      poc: 'bg-severity-high/20 text-severity-high',
      theoretical: 'bg-severity-medium/20 text-severity-medium',
      none: 'bg-muted text-muted-foreground',
    };
    const labels: Record<string, string> = {
      active: 'Ativa',
      poc: 'PoC',
      theoretical: 'Teórica',
      none: 'Nenhuma',
    };
    return <Badge className={styles[exp]}>{labels[exp]}</Badge>;
  };

  const toggleSelectAll = () => {
    if (selectedVulns.length === filteredVulns.length) {
      setSelectedVulns([]);
    } else {
      setSelectedVulns(filteredVulns.map(v => v.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedVulns(prev => 
      prev.includes(id) 
        ? prev.filter(v => v !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vulnerabilidades</h1>
          <p className="text-muted-foreground">
            {filteredVulns.length} vulnerabilidades encontradas
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedVulns.length > 0 && (
            <div className="flex items-center gap-2 mr-4">
              <span className="text-sm text-muted-foreground">
                {selectedVulns.length} selecionadas
              </span>
              <Button variant="outline" size="sm">
                Atribuir
              </Button>
              <Button variant="outline" size="sm">
                Atualizar Status
              </Button>
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
            placeholder="Buscar por CVE, título ou ativo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Severidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="critical">Crítica</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
            <SelectItem value="medium">Média</SelectItem>
            <SelectItem value="low">Baixa</SelectItem>
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
              <TableHead>CVE ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Severidade</TableHead>
              <TableHead>CVSS</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Exploitability</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Detecção</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVulns.map((vuln) => (
              <TableRow 
                key={vuln.id} 
                className={cn(
                  "border-border cursor-pointer",
                  selectedVulns.includes(vuln.id) && "bg-primary/5"
                )}
                onClick={() => setSelectedVuln(vuln)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedVulns.includes(vuln.id)}
                    onCheckedChange={() => toggleSelect(vuln.id)}
                  />
                </TableCell>
                <TableCell>
                  <code className="text-xs font-mono text-primary">{vuln.cveId}</code>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium line-clamp-1 max-w-[200px]">
                    {vuln.title}
                  </span>
                </TableCell>
                <TableCell>{getSeverityBadge(vuln.severity)}</TableCell>
                <TableCell>
                  <span className={cn(
                    "font-mono font-bold",
                    vuln.cvssScore >= 9 ? "text-severity-critical" :
                    vuln.cvssScore >= 7 ? "text-severity-high" :
                    vuln.cvssScore >= 4 ? "text-severity-medium" : "text-severity-low"
                  )}>
                    {vuln.cvssScore.toFixed(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground line-clamp-1 max-w-[150px]">
                    {vuln.asset}
                  </span>
                </TableCell>
                <TableCell>{getStatusBadge(vuln.status)}</TableCell>
                <TableCell>{getExploitabilityBadge(vuln.exploitability)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full",
                          vuln.priorityScore >= 90 ? "bg-severity-critical" :
                          vuln.priorityScore >= 70 ? "bg-severity-high" :
                          vuln.priorityScore >= 50 ? "bg-severity-medium" : "bg-severity-low"
                        )}
                        style={{ width: `${vuln.priorityScore}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono">{vuln.priorityScore}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {vuln.detectedDate}
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
              <code className="text-primary">{selectedVuln?.cveId}</code>
              {selectedVuln && getSeverityBadge(selectedVuln.severity)}
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
                    <p className="text-xs text-muted-foreground mb-1">CVSS Score</p>
                    <p className="text-2xl font-bold text-severity-critical">{selectedVuln.cvssScore}</p>
                  </div>
                  <div className="glass-card p-3">
                    <p className="text-xs text-muted-foreground mb-1">Priority Score</p>
                    <p className="text-2xl font-bold text-primary">{selectedVuln.priorityScore}</p>
                  </div>
                  <div className="glass-card p-3">
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    {getStatusBadge(selectedVuln.status)}
                  </div>
                  <div className="glass-card p-3">
                    <p className="text-xs text-muted-foreground mb-1">Exploitability</p>
                    {getExploitabilityBadge(selectedVuln.exploitability)}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Ativo Afetado</h4>
                  <div className="glass-card p-3">
                    <p className="font-mono text-sm">{selectedVuln.asset}</p>
                    <p className="text-xs text-muted-foreground">{selectedVuln.assetType}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">MITRE ATT&CK</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVuln.mitreAttack.map((technique) => (
                      <Badge key={technique} variant="outline" className="font-mono">
                        {technique}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Passos de Remediação</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    {selectedVuln.remediationSteps.map((step, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{step}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Referências</h4>
                  <div className="space-y-1">
                    {selectedVuln.references.map((ref, index) => (
                      <a
                        key={index}
                        href={ref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {ref}
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
