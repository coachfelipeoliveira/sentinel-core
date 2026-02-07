import { useState } from 'react';
import { Cloud, CheckCircle, XCircle, RefreshCw, Play, Clock, AlertTriangle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { qualysConnection, scanProfiles, assetGroups } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

export default function QualysIntegration() {
  const [selectedAssetGroup, setSelectedAssetGroup] = useState('all');
  const [selectedProfile, setSelectedProfile] = useState('full');
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  const handleSync = () => {
    setIsSyncing(true);
    toast({
      title: "Sincronização iniciada",
      description: "Sincronizando dados com Qualys API...",
    });
    
    setTimeout(() => {
      setIsSyncing(false);
      toast({
        title: "Sincronização concluída",
        description: "Dados sincronizados com sucesso.",
      });
    }, 3000);
  };

  const handleTriggerScan = () => {
    const profile = scanProfiles.find(p => p.id === selectedProfile);
    const group = assetGroups.find(g => g.id === selectedAssetGroup);
    
    toast({
      title: "Scan iniciado",
      description: `${profile?.name} em ${group?.name}`,
    });
  };

  const rateLimitPercentage = (qualysConnection.rateLimit.used / qualysConnection.rateLimit.limit) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Integração Qualys</h1>
          <p className="text-muted-foreground">Gerenciamento de conexão e scans Qualys VMDR</p>
        </div>
        <Button 
          className="gap-2" 
          onClick={handleSync}
          disabled={isSyncing}
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Sincronizando...' : 'Sincronizar'}
        </Button>
      </div>

      {/* Connection status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Status da Conexão</h3>
            <Badge className={qualysConnection.status === 'connected' ? 'status-success' : 'status-error'}>
              {qualysConnection.status === 'connected' ? (
                <>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Conectado
                </>
              ) : (
                <>
                  <XCircle className="w-3 h-3 mr-1" />
                  Desconectado
                </>
              )}
            </Badge>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Última sincronização</span>
              <span>{qualysConnection.lastSync}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Ativos sincronizados</span>
              <span className="font-medium text-primary">{qualysConnection.assetsCount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Rate Limit</h3>
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Requisições usadas</span>
              <span>{qualysConnection.rateLimit.used} / {qualysConnection.rateLimit.limit}</span>
            </div>
            <Progress 
              value={rateLimitPercentage} 
              className="h-2"
            />
            <p className={`text-xs ${rateLimitPercentage > 80 ? 'text-severity-high' : 'text-muted-foreground'}`}>
              {rateLimitPercentage > 80 ? (
                <span className="flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Atenção: Limite próximo do máximo
                </span>
              ) : (
                'Rate limit dentro do normal'
              )}
            </p>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Inventário de Ativos</h3>
            <Cloud className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total de ativos</span>
              <span className="text-2xl font-bold text-primary">{qualysConnection.assetsCount.toLocaleString()}</span>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Ver inventário completo
            </Button>
          </div>
        </div>
      </div>

      {/* Trigger scan section */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Iniciar Scan Manual</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Grupo de Ativos</label>
            <Select value={selectedAssetGroup} onValueChange={setSelectedAssetGroup}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o grupo" />
              </SelectTrigger>
              <SelectContent>
                {assetGroups.map((group) => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Perfil de Scan</label>
            <Select value={selectedProfile} onValueChange={setSelectedProfile}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o perfil" />
              </SelectTrigger>
              <SelectContent>
                {scanProfiles.map((profile) => (
                  <SelectItem key={profile.id} value={profile.id}>
                    {profile.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Agendamento</label>
            <Select defaultValue="now">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="now">Executar agora</SelectItem>
                <SelectItem value="1h">Em 1 hora</SelectItem>
                <SelectItem value="6h">Em 6 horas</SelectItem>
                <SelectItem value="24h">Em 24 horas</SelectItem>
                <SelectItem value="custom">Agendar...</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleTriggerScan} className="gap-2">
            <Play className="w-4 h-4" />
            Iniciar Scan
          </Button>
        </div>
      </div>

      {/* Recent API calls */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Chamadas API Recentes</h3>
        <div className="space-y-3">
          {qualysConnection.recentCalls.map((call, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  call.status === 'success' ? 'bg-status-success' : 'bg-status-error'
                }`} />
                <div>
                  <code className="text-sm font-mono text-foreground">{call.endpoint}</code>
                  <p className="text-xs text-muted-foreground">{call.timestamp}</p>
                </div>
              </div>
              <Badge variant={call.status === 'success' ? 'default' : 'destructive'}>
                {call.status === 'success' ? '200 OK' : '500 Error'}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
