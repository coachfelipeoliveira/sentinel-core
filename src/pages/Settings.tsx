import { useState } from 'react';
import { Key, Bell, Database, Shield, User, Save, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [showAiKey, setShowAiKey] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas configurações foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">Gerenciar preferências e integrações do portal</p>
      </div>

      <Tabs defaultValue="credentials" className="space-y-6">
        <TabsList className="glass-card p-1">
          <TabsTrigger value="credentials" className="gap-2">
            <Key className="w-4 h-4" />
            Credenciais API
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="data" className="gap-2">
            <Database className="w-4 h-4" />
            Dados
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            Perfil
          </TabsTrigger>
        </TabsList>

        {/* API Credentials */}
        <TabsContent value="credentials" className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Qualys API</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">API URL</label>
                  <Input defaultValue="https://qualysapi.qualys.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Username</label>
                  <Input defaultValue="api_user@corp.local" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">API Key</label>
                <div className="relative">
                  <Input 
                    type={showApiKey ? 'text' : 'password'} 
                    defaultValue="qsc_xxxxxxxxxxxxxxxxxxxxx" 
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <Button onClick={handleSave}>Testar Conexão</Button>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Serviço de IA</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Provedor</label>
                  <Select defaultValue="openai">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="azure">Azure OpenAI</SelectItem>
                      <SelectItem value="anthropic">Anthropic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Modelo</label>
                  <Select defaultValue="gpt4">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt4">GPT-4</SelectItem>
                      <SelectItem value="gpt4-turbo">GPT-4 Turbo</SelectItem>
                      <SelectItem value="gpt35">GPT-3.5 Turbo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">API Key</label>
                <div className="relative">
                  <Input 
                    type={showAiKey ? 'text' : 'password'} 
                    defaultValue="sk-xxxxxxxxxxxxxxxxxxxxx" 
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowAiKey(!showAiKey)}
                  >
                    {showAiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Preferências de Notificação</h3>
            <div className="space-y-4">
              {[
                { label: 'Novas vulnerabilidades críticas', description: 'Receber alerta quando novas vulnerabilidades críticas forem detectadas' },
                { label: 'Falhas em jobs ETL', description: 'Notificar quando jobs de processamento falharem' },
                { label: 'Scans concluídos', description: 'Alertar quando scans de vulnerabilidade forem concluídos' },
                { label: 'Violações de SLA', description: 'Notificar quando vulnerabilidades ultrapassarem o tempo de SLA' },
                { label: 'Relatórios prontos', description: 'Alertar quando relatórios agendados forem gerados' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch defaultChecked={index < 3} />
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Canais de Notificação</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">admin@corp.local</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium">Slack</p>
                  <p className="text-sm text-muted-foreground">#security-alerts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Microsoft Teams</p>
                  <p className="text-sm text-muted-foreground">Não configurado</p>
                </div>
                <Button variant="outline" size="sm">Configurar</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Data */}
        <TabsContent value="data" className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Políticas de Retenção</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Dados de vulnerabilidades</label>
                  <Select defaultValue="365">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">90 dias</SelectItem>
                      <SelectItem value="180">180 dias</SelectItem>
                      <SelectItem value="365">1 ano</SelectItem>
                      <SelectItem value="730">2 anos</SelectItem>
                      <SelectItem value="forever">Indefinido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Logs de auditoria</label>
                  <Select defaultValue="730">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">90 dias</SelectItem>
                      <SelectItem value="180">180 dias</SelectItem>
                      <SelectItem value="365">1 ano</SelectItem>
                      <SelectItem value="730">2 anos</SelectItem>
                      <SelectItem value="forever">Indefinido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Relatórios gerados</label>
                  <Select defaultValue="180">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 dias</SelectItem>
                      <SelectItem value="90">90 dias</SelectItem>
                      <SelectItem value="180">180 dias</SelectItem>
                      <SelectItem value="365">1 ano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Histórico de chat IA</label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 dias</SelectItem>
                      <SelectItem value="30">30 dias</SelectItem>
                      <SelectItem value="90">90 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Configurações de Segurança</h3>
            <div className="space-y-4">
              {[
                { label: 'Autenticação de dois fatores (2FA)', description: 'Exigir 2FA para todos os usuários', checked: true },
                { label: 'Timeout de sessão', description: 'Encerrar sessão após 30 minutos de inatividade', checked: true },
                { label: 'Bloqueio de conta', description: 'Bloquear conta após 5 tentativas de login falhas', checked: true },
                { label: 'Log de auditoria completo', description: 'Registrar todas as ações de usuários', checked: true },
                { label: 'Acesso via API', description: 'Permitir acesso via API REST', checked: false },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch defaultChecked={item.checked} />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Profile */}
        <TabsContent value="profile" className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Informações do Perfil</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">AS</span>
                </div>
                <Button variant="outline">Alterar foto</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Nome</label>
                  <Input defaultValue="Admin Security" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Email</label>
                  <Input defaultValue="admin@corp.local" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Cargo</label>
                  <Input defaultValue="Security Administrator" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Departamento</label>
                  <Input defaultValue="Information Security" />
                </div>
              </div>
              <div className="pt-4">
                <Button onClick={handleSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Salvar Alterações
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
