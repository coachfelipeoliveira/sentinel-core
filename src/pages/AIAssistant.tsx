import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Copy, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { aiSuggestions } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Olá! Sou o assistente de inteligência artificial do Portal VMS. Posso ajudá-lo com:\n\n• **Análise de vulnerabilidades** - Priorização e recomendações\n• **Threat intelligence** - Contexto e enriquecimento de dados\n• **Risk assessment** - Cálculos e métricas de risco\n• **Estratégias de remediação** - Sugestões e melhores práticas\n\nComo posso ajudar você hoje?',
    timestamp: new Date(),
  },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'crítica': `## Análise de Vulnerabilidades Críticas

Baseado na análise atual do seu ambiente, identifiquei **8 vulnerabilidades críticas** que requerem atenção imediata:

### Top 3 Prioridades:
1. **CVE-2024-3400** (CVSS 10.0) - Palo Alto PAN-OS
   - Exploração ativa confirmada
   - Impacto: RCE não autenticado
   - Recomendação: Aplicar hotfix imediatamente

2. **CVE-2024-1709** (CVSS 10.0) - ConnectWise ScreenConnect
   - Bypass de autenticação
   - Permite criação de admin
   - Recomendação: Atualizar para v23.9.8+

3. **CVE-2024-21762** (CVSS 9.8) - FortiOS
   - Out-of-bounds write
   - Exploração ativa em andamento
   - Recomendação: Upgrade para 7.4.3+

### Fatores de Priorização:
- ✅ Exploitability Score
- ✅ Asset Criticality
- ✅ Business Impact
- ✅ Threat Intelligence Context`,

        'risco': `## Cálculo de Risk Score

### Metodologia FAIR Aplicada

Para o ativo **vpn-gateway.corp.local**:

| Fator | Valor | Peso |
|-------|-------|------|
| Loss Event Frequency | Alto | 0.85 |
| Probable Loss Magnitude | Crítico | 0.95 |
| Vulnerability Exposure | 4 vulns | 0.80 |
| Threat Landscape | Ativo | 0.90 |

**Risk Score Final: 87/100** 🔴

### Recomendações:
1. Priorizar remediação das 2 vulnerabilidades críticas
2. Implementar controles compensatórios
3. Aumentar frequência de monitoramento
4. Revisar políticas de acesso`,

        'mitre': `## Mapeamento MITRE ATT&CK

### Técnicas Detectadas no Ambiente:

| Tática | Técnica | Ocorrências |
|--------|---------|-------------|
| Initial Access | T1190 - Exploit Public App | 14 |
| Execution | T1059 - Command/Script | 8 |
| Privilege Escalation | T1068 - Exploitation | 4 |
| Credential Access | T1078 - Valid Accounts | 4 |

### Grupos de Ameaça Associados:
- **APT28** - Técnicas T1190, T1059
- **FIN7** - Técnicas T1078, T1059
- **Lazarus** - Técnicas T1190, T1068

### Recomendações de Detecção:
1. Configurar alertas para T1190 (IDS/IPS)
2. Monitorar execução de scripts (SIEM)
3. Implementar MFA para T1078`,
      };

      let response = `Analisei sua solicitação. Baseado nos dados do Portal VMS, aqui está minha análise:

${Object.entries(responses).find(([key]) => input.toLowerCase().includes(key))?.[1] || 
`Posso ajudá-lo com análises específicas sobre:
- Priorização de vulnerabilidades críticas
- Cálculo de risk scores (FAIR/CVSS)
- Mapeamento MITRE ATT&CK
- Estratégias de remediação
- Enriquecimento com threat intelligence

Por favor, especifique sua necessidade para uma análise mais detalhada.`}`;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copiado!",
      description: "Conteúdo copiado para a área de transferência.",
    });
  };

  const handleClearChat = () => {
    setMessages(initialMessages);
    toast({
      title: "Conversa limpa",
      description: "Histórico de mensagens foi removido.",
    });
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Chat area */}
      <div className="flex-1 flex flex-col glass-card overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Assistente IA</h2>
              <p className="text-xs text-muted-foreground">Análise de segurança inteligente</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleClearChat}>
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3 animate-fade-in',
                  message.role === 'user' ? 'flex-row-reverse' : ''
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                  message.role === 'user' ? 'bg-primary/20' : 'bg-primary/10'
                )}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-primary" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div className={cn(
                  'flex-1 max-w-[80%] rounded-lg p-4',
                  message.role === 'user' 
                    ? 'bg-primary/20 ml-auto' 
                    : 'bg-secondary'
                )}>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  </div>
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => handleCopy(message.content)}
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copiar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-secondary rounded-lg p-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Textarea
              placeholder="Digite sua pergunta sobre vulnerabilidades, riscos ou ameaças..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="min-h-[60px] max-h-[120px] resize-none"
            />
            <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Suggestions sidebar */}
      <div className="w-80 glass-card p-4 hidden lg:block">
        <h3 className="font-semibold mb-4">Sugestões de Consulta</h3>
        <div className="space-y-2">
          {aiSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-medium mb-3 text-sm">Capacidades</h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Análise de CVEs e vulnerabilidades
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Cálculo de risk scores
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Mapeamento MITRE ATT&CK
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Recomendações de remediação
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Threat intelligence
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
