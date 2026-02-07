import { useState } from 'react';
import { Download, Filter, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const mitreTactics = [
  { id: 'TA0001', name: 'Initial Access', techniques: [
    { id: 'T1190', name: 'Exploit Public-Facing Application', count: 14 },
    { id: 'T1133', name: 'External Remote Services', count: 2 },
    { id: 'T1566', name: 'Phishing', count: 1 },
  ]},
  { id: 'TA0002', name: 'Execution', techniques: [
    { id: 'T1059', name: 'Command and Scripting Interpreter', count: 8 },
    { id: 'T1203', name: 'Exploitation for Client Execution', count: 3 },
  ]},
  { id: 'TA0003', name: 'Persistence', techniques: [
    { id: 'T1505', name: 'Server Software Component', count: 2 },
    { id: 'T1136', name: 'Create Account', count: 1 },
  ]},
  { id: 'TA0004', name: 'Privilege Escalation', techniques: [
    { id: 'T1068', name: 'Exploitation for Privilege Escalation', count: 4 },
    { id: 'T1078', name: 'Valid Accounts', count: 4 },
  ]},
  { id: 'TA0005', name: 'Defense Evasion', techniques: [
    { id: 'T1218', name: 'System Binary Proxy Execution', count: 1 },
    { id: 'T1562', name: 'Impair Defenses', count: 0 },
  ]},
  { id: 'TA0006', name: 'Credential Access', techniques: [
    { id: 'T1552', name: 'Unsecured Credentials', count: 1 },
    { id: 'T1110', name: 'Brute Force', count: 0 },
  ]},
  { id: 'TA0007', name: 'Discovery', techniques: [
    { id: 'T1083', name: 'File and Directory Discovery', count: 2 },
    { id: 'T1082', name: 'System Information Discovery', count: 0 },
  ]},
  { id: 'TA0008', name: 'Lateral Movement', techniques: [
    { id: 'T1021', name: 'Remote Services', count: 0 },
    { id: 'T1534', name: 'Internal Spearphishing', count: 0 },
  ]},
  { id: 'TA0009', name: 'Collection', techniques: [
    { id: 'T1005', name: 'Data from Local System', count: 0 },
    { id: 'T1039', name: 'Data from Network Shared Drive', count: 0 },
  ]},
  { id: 'TA0011', name: 'Command and Control', techniques: [
    { id: 'T1071', name: 'Application Layer Protocol', count: 0 },
    { id: 'T1105', name: 'Ingress Tool Transfer', count: 0 },
  ]},
  { id: 'TA0010', name: 'Exfiltration', techniques: [
    { id: 'T1041', name: 'Exfiltration Over C2 Channel', count: 0 },
  ]},
  { id: 'TA0040', name: 'Impact', techniques: [
    { id: 'T1486', name: 'Data Encrypted for Impact', count: 0 },
    { id: 'T1489', name: 'Service Stop', count: 0 },
  ]},
];

const getHeatmapColor = (count: number) => {
  if (count === 0) return 'bg-muted/30 border-border/50';
  if (count <= 2) return 'bg-severity-low/30 border-severity-low/50';
  if (count <= 5) return 'bg-severity-medium/40 border-severity-medium/50';
  if (count <= 10) return 'bg-severity-high/50 border-severity-high/50';
  return 'bg-severity-critical/60 border-severity-critical/50';
};

const getTextColor = (count: number) => {
  if (count === 0) return 'text-muted-foreground';
  if (count <= 2) return 'text-severity-low';
  if (count <= 5) return 'text-severity-medium';
  if (count <= 10) return 'text-severity-high';
  return 'text-severity-critical';
};

export default function MitreAttack() {
  const [severityFilter, setSeverityFilter] = useState('all');
  const [assetFilter, setAssetFilter] = useState('all');

  const totalTechniques = mitreTactics.reduce(
    (sum, tactic) => sum + tactic.techniques.filter(t => t.count > 0).length, 
    0
  );
  
  const totalDetections = mitreTactics.reduce(
    (sum, tactic) => sum + tactic.techniques.reduce((s, t) => s + t.count, 0), 
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">MITRE ATT&CK Navigator</h1>
          <p className="text-muted-foreground">
            Visualização de técnicas detectadas no ambiente
          </p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Exportar Matriz
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <p className="text-sm text-muted-foreground">Técnicas Detectadas</p>
          <p className="text-3xl font-bold text-primary">{totalTechniques}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-sm text-muted-foreground">Total de Detecções</p>
          <p className="text-3xl font-bold text-foreground">{totalDetections}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-sm text-muted-foreground">Táticas Cobertas</p>
          <p className="text-3xl font-bold text-foreground">
            {mitreTactics.filter(t => t.techniques.some(tech => tech.count > 0)).length}/{mitreTactics.length}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-sm text-muted-foreground">Cobertura</p>
          <p className="text-3xl font-bold text-severity-high">
            {Math.round((totalTechniques / mitreTactics.reduce((s, t) => s + t.techniques.length, 0)) * 100)}%
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por severidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas severidades</SelectItem>
            <SelectItem value="critical">Crítica</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
            <SelectItem value="medium">Média</SelectItem>
            <SelectItem value="low">Baixa</SelectItem>
          </SelectContent>
        </Select>
        <Select value={assetFilter} onValueChange={setAssetFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por grupo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os ativos</SelectItem>
            <SelectItem value="servers">Servidores</SelectItem>
            <SelectItem value="network">Rede</SelectItem>
            <SelectItem value="endpoints">Endpoints</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Legend */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-6 flex-wrap">
          <span className="text-sm text-muted-foreground">Legenda:</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-muted/30 border border-border/50" />
            <span className="text-xs text-muted-foreground">0</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-severity-low/30 border border-severity-low/50" />
            <span className="text-xs text-muted-foreground">1-2</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-severity-medium/40 border border-severity-medium/50" />
            <span className="text-xs text-muted-foreground">3-5</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-severity-high/50 border border-severity-high/50" />
            <span className="text-xs text-muted-foreground">6-10</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-severity-critical/60 border border-severity-critical/50" />
            <span className="text-xs text-muted-foreground">10+</span>
          </div>
        </div>
      </div>

      {/* Matrix */}
      <div className="glass-card p-6 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {mitreTactics.map((tactic) => (
            <div key={tactic.id} className="flex-1 min-w-[140px]">
              {/* Tactic header */}
              <div className="bg-primary/20 rounded-t-lg p-2 text-center border border-primary/30">
                <p className="text-xs font-mono text-primary/70">{tactic.id}</p>
                <p className="text-sm font-medium text-foreground truncate">{tactic.name}</p>
              </div>
              
              {/* Techniques */}
              <div className="space-y-1 mt-1">
                {tactic.techniques.map((technique) => (
                  <Tooltip key={technique.id}>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          'p-2 rounded border cursor-pointer transition-all hover:scale-[1.02]',
                          getHeatmapColor(technique.count)
                        )}
                      >
                        <p className="text-xs font-mono text-muted-foreground">{technique.id}</p>
                        <p className="text-xs truncate">{technique.name}</p>
                        {technique.count > 0 && (
                          <Badge 
                            className={cn('mt-1 text-xs', getTextColor(technique.count))}
                            variant="outline"
                          >
                            {technique.count}
                          </Badge>
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <div className="space-y-1">
                        <p className="font-semibold">{technique.name}</p>
                        <p className="text-xs text-muted-foreground">{technique.id}</p>
                        <p className="text-sm">
                          {technique.count > 0 
                            ? `${technique.count} vulnerabilidades detectadas usando esta técnica`
                            : 'Nenhuma vulnerabilidade detectada'
                          }
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="glass-card p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Sobre o MITRE ATT&CK Navigator</p>
          <p>
            Esta visualização mapeia as vulnerabilidades detectadas no seu ambiente para as técnicas 
            do framework MITRE ATT&CK. O heatmap indica a concentração de vulnerabilidades por técnica, 
            ajudando a identificar vetores de ataque mais prováveis e priorizar esforços de remediação.
          </p>
        </div>
      </div>
    </div>
  );
}
