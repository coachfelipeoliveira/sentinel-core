import { useState } from 'react';
import { FileText, Download, Calendar, Clock, Play, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const reportTemplates = [
  {
    id: 'executive',
    name: 'Resumo Executivo',
    description: 'Visão geral de alto nível do estado de segurança para stakeholders executivos',
    icon: '📊',
    lastGenerated: '2024-04-15 08:00',
    schedule: 'Semanal',
  },
  {
    id: 'technical',
    name: 'Relatório Técnico de Vulnerabilidades',
    description: 'Análise detalhada de todas as vulnerabilidades com informações técnicas e remediação',
    icon: '🔧',
    lastGenerated: '2024-04-15 12:00',
    schedule: 'Diário',
  },
  {
    id: 'compliance',
    name: 'Relatório de Compliance',
    description: 'Status de conformidade com frameworks de segurança (ISO 27001, NIST, PCI-DSS)',
    icon: '✅',
    lastGenerated: '2024-04-14 06:00',
    schedule: 'Mensal',
  },
  {
    id: 'trend',
    name: 'Análise de Tendências',
    description: 'Evolução histórica de vulnerabilidades e métricas de segurança',
    icon: '📈',
    lastGenerated: '2024-04-15 06:00',
    schedule: 'Mensal',
  },
  {
    id: 'risk',
    name: 'Relatório de Risco',
    description: 'Avaliação de risco utilizando metodologia FAIR com scores e recomendações',
    icon: '⚠️',
    lastGenerated: '2024-04-13 09:00',
    schedule: 'Quinzenal',
  },
  {
    id: 'mitre',
    name: 'Mapeamento MITRE ATT&CK',
    description: 'Relatório de técnicas e táticas detectadas mapeadas para o framework MITRE',
    icon: '🎯',
    lastGenerated: '2024-04-15 10:00',
    schedule: 'Semanal',
  },
];

const recentReports = [
  { name: 'Resumo Executivo - Abril 2024', date: '2024-04-15', format: 'PDF', size: '2.4 MB' },
  { name: 'Relatório Técnico - 15/04/2024', date: '2024-04-15', format: 'PDF', size: '8.7 MB' },
  { name: 'Compliance Report Q1 2024', date: '2024-04-01', format: 'PDF', size: '4.2 MB' },
  { name: 'Trend Analysis - Mar 2024', date: '2024-04-01', format: 'Excel', size: '1.8 MB' },
  { name: 'Risk Assessment - Março 2024', date: '2024-03-28', format: 'PDF', size: '3.1 MB' },
];

export default function Reports() {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const { toast } = useToast();

  const handleGenerateReport = (reportName: string) => {
    toast({
      title: "Gerando relatório",
      description: `${reportName} está sendo gerado...`,
    });
    
    setTimeout(() => {
      toast({
        title: "Relatório pronto",
        description: `${reportName} foi gerado com sucesso.`,
      });
    }, 2000);
  };

  const handleDownload = (reportName: string) => {
    toast({
      title: "Download iniciado",
      description: `Baixando ${reportName}...`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground">Geração e gestão de relatórios de segurança</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Relatório Customizado
        </Button>
      </div>

      {/* Report templates */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Templates de Relatórios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTemplates.map((template) => (
            <Card key={template.id} className="glass-card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="text-3xl">{template.icon}</div>
                  <Badge variant="outline" className="text-xs">
                    {template.schedule}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription className="text-sm">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Último: {template.lastGenerated}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1 gap-1"
                    onClick={() => handleGenerateReport(template.name)}
                  >
                    <Play className="w-3 h-3" />
                    Gerar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Export options */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4">Opções de Exportação</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Template</label>
            <Select defaultValue="executive">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reportTemplates.map((t) => (
                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Período</label>
            <Select defaultValue="month">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Última semana</SelectItem>
                <SelectItem value="month">Último mês</SelectItem>
                <SelectItem value="quarter">Último trimestre</SelectItem>
                <SelectItem value="year">Último ano</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Formato</label>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">&nbsp;</label>
            <Button className="w-full gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </div>
      </div>

      {/* Scheduled reports */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Relatórios Agendados</h2>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="w-4 h-4" />
            Configurar Agendamento
          </Button>
        </div>
        <div className="space-y-3">
          {[
            { name: 'Resumo Executivo', schedule: 'Segundas às 08:00', recipients: 'CISO, CTO' },
            { name: 'Relatório Técnico', schedule: 'Diariamente às 06:00', recipients: 'Security Team' },
            { name: 'Compliance Report', schedule: 'Primeiro dia do mês', recipients: 'Compliance, Audit' },
          ].map((scheduled, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">{scheduled.name}</p>
                  <p className="text-xs text-muted-foreground">{scheduled.schedule}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">→ {scheduled.recipients}</span>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent reports */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4">Relatórios Recentes</h2>
        <div className="space-y-2">
          {recentReports.map((report, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">{report.name}</p>
                  <p className="text-xs text-muted-foreground">{report.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline">{report.format}</Badge>
                <span className="text-xs text-muted-foreground">{report.size}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDownload(report.name)}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
