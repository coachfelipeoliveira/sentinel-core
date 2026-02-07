import { useState } from 'react';
import { Play, RefreshCw, Clock, CheckCircle, XCircle, Loader2, Calendar, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { etlJobs } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

export default function ETLJobs() {
  const [jobs, setJobs] = useState(etlJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredJobs = jobs.filter(job => 
    job.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTriggerJob = (jobId: string, jobName: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: 'running' as const, progress: 0, startTime: new Date().toLocaleString() }
        : job
    ));
    
    toast({
      title: "Job iniciado",
      description: `${jobName} foi iniciado manualmente.`,
    });

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setJobs(prev => prev.map(job => 
          job.id === jobId 
            ? { ...job, status: 'completed' as const, progress: 100, duration: '2m 15s' }
            : job
        ));
        toast({
          title: "Job concluído",
          description: `${jobName} foi concluído com sucesso.`,
        });
      } else {
        setJobs(prev => prev.map(job => 
          job.id === jobId ? { ...job, progress: Math.min(progress, 100) } : job
        ));
      }
    }, 500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return (
          <Badge className="status-running gap-1">
            <Loader2 className="w-3 h-3 animate-spin" />
            Executando
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="status-success gap-1">
            <CheckCircle className="w-3 h-3" />
            Concluído
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="status-error gap-1">
            <XCircle className="w-3 h-3" />
            Falhou
          </Badge>
        );
      case 'scheduled':
        return (
          <Badge className="bg-muted text-muted-foreground gap-1">
            <Clock className="w-3 h-3" />
            Agendado
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Jobs ETL</h1>
          <p className="text-muted-foreground">Monitoramento e gestão de jobs de processamento</p>
        </div>
        <Button className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Atualizar
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-status-running/10">
              <Loader2 className="w-5 h-5 text-status-running animate-spin" />
            </div>
            <div>
              <p className="text-2xl font-bold">{jobs.filter(j => j.status === 'running').length}</p>
              <p className="text-sm text-muted-foreground">Em execução</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-status-success/10">
              <CheckCircle className="w-5 h-5 text-status-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{jobs.filter(j => j.status === 'completed').length}</p>
              <p className="text-sm text-muted-foreground">Concluídos</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-status-error/10">
              <XCircle className="w-5 h-5 text-status-error" />
            </div>
            <div>
              <p className="text-2xl font-bold">{jobs.filter(j => j.status === 'failed').length}</p>
              <p className="text-sm text-muted-foreground">Falharam</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted">
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">{jobs.filter(j => j.status === 'scheduled').length}</p>
              <p className="text-sm text-muted-foreground">Agendados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filtros
        </Button>
      </div>

      {/* Jobs table */}
      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Nome do Job</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progresso</TableHead>
              <TableHead>Início</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Agendamento</TableHead>
              <TableHead>Última Execução</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job.id} className="border-border">
                <TableCell>
                  <div>
                    <p className="font-medium">{job.name}</p>
                    <p className="text-xs text-muted-foreground">{job.description}</p>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(job.status)}</TableCell>
                <TableCell>
                  <div className="w-24">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>{job.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          job.status === 'running' ? 'bg-status-running' :
                          job.status === 'completed' ? 'bg-status-success' : 
                          job.status === 'failed' ? 'bg-status-error' : 'bg-muted-foreground'
                        }`}
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{job.startTime}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{job.duration}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{job.schedule}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{job.lastRun}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1"
                    disabled={job.status === 'running'}
                    onClick={() => handleTriggerJob(job.id, job.name)}
                  >
                    <Play className="w-3 h-3" />
                    Executar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
