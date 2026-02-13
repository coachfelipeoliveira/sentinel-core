import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, User, ChevronDown, LogOut, Settings, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GlobalFilters } from './GlobalFilters';
import { vulnerabilities } from '@/lib/mockData';
import { assetVulnerabilities } from '@/lib/assetData';
import { vulnerabilityDetails } from '@/lib/vulnerabilityDetailsData';
import { cn } from '@/lib/utils';

interface SearchResult {
  type: 'vulnerability' | 'asset' | 'cve';
  label: string;
  sublabel: string;
  qid?: number;
  hostname?: string;
  cve?: string;
  severity?: string;
}

function useGlobalSearch(query: string): { results: SearchResult[]; loading: boolean } {
  const [loading, setLoading] = useState(false);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 3) return [];
    setLoading(true);

    const out: SearchResult[] = [];

    // Search vulnerabilities by QID or title
    for (const v of vulnerabilities) {
      if (out.length >= 10) break;
      if (
        v.qid.toString().includes(q) ||
        v.title.toLowerCase().includes(q)
      ) {
        out.push({
          type: 'vulnerability',
          label: `QID ${v.qid} — ${v.title}`,
          sublabel: `${v.severity} • L${v.layerRisk} • ${v.priority}`,
          qid: v.qid,
          severity: v.severity,
        });
      }
    }

    // Search assets by hostname
    const seenHostnames = new Set<string>();
    for (const av of assetVulnerabilities) {
      if (out.length >= 10) break;
      if (seenHostnames.has(av.hostname)) continue;
      if (av.hostname.toLowerCase().includes(q) || av.ip.includes(q)) {
        seenHostnames.add(av.hostname);
        const vulnCount = assetVulnerabilities.filter(a => a.hostname === av.hostname).length;
        out.push({
          type: 'asset',
          label: av.hostname,
          sublabel: `${av.ip} • ${av.empresa} • ${vulnCount} vulnerabilidades`,
          hostname: av.hostname,
        });
      }
    }

    // Search CVEs
    const seenCves = new Set<string>();
    if (q.startsWith('cve') || q.match(/^\d{4}-/)) {
      for (const [, detail] of Object.entries(vulnerabilityDetails)) {
        if (out.length >= 10) break;
        for (const cve of (detail.cveIds || [])) {
          if (seenCves.has(cve)) continue;
          if (cve.toLowerCase().includes(q)) {
            seenCves.add(cve);
            out.push({
              type: 'cve',
              label: cve,
              sublabel: `QID ${detail.qid} — ${detail.title}`,
              qid: detail.qid,
              cve,
            });
          }
        }
      }
    }

    return out;
  }, [query]);

  // Simulate async
  useEffect(() => {
    if (query.trim().length >= 3) {
      setLoading(true);
      const t = setTimeout(() => setLoading(false), 150);
      return () => clearTimeout(t);
    }
    setLoading(false);
  }, [query]);

  return { results, loading };
}

export function TopBar() {
  const [notifications] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { results, loading } = useGlobalSearch(searchQuery);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowResults(false);
    };
    const clickHandler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('keydown', handler);
    document.addEventListener('mousedown', clickHandler);
    return () => {
      document.removeEventListener('keydown', handler);
      document.removeEventListener('mousedown', clickHandler);
    };
  }, []);

  const handleResultClick = (result: SearchResult) => {
    setShowResults(false);
    setSearchQuery('');
    if (result.type === 'vulnerability' || result.type === 'cve') {
      navigate(`/vulnerabilities?qid=${result.qid}`);
    } else if (result.type === 'asset') {
      navigate(`/vulnerabilities?hostname=${encodeURIComponent(result.hostname!)}`);
    }
  };

  const typeIcons: Record<string, string> = {
    vulnerability: '🛡️',
    asset: '🖥️',
    cve: '📋',
  };

  return (
    <header className="bg-card border-b border-border">
      {/* Top row */}
      <div className="h-14 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-foreground">
            Portal <span className="text-primary">VMS</span>
          </h1>
        </div>

        <div className="flex-1 max-w-md mx-8" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            {loading && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />}
            <Input
              placeholder="Buscar vulnerabilidades, ativos, CVEs..."
              className="pl-10 bg-secondary border-border focus:ring-primary"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
            />
            {showResults && searchQuery.trim().length >= 3 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-[400px] overflow-y-auto">
                {results.length === 0 && !loading && (
                  <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                    Nenhum resultado encontrado
                  </div>
                )}
                {results.map((r, i) => (
                  <button
                    key={i}
                    className="w-full text-left px-4 py-3 hover:bg-accent/50 transition-colors flex items-start gap-3 border-b border-border/50 last:border-0"
                    onClick={() => handleResultClick(r)}
                  >
                    <span className="text-lg mt-0.5">{typeIcons[r.type]}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{r.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{r.sublabel}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-muted-foreground" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-severity-critical text-white text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="px-4 py-3 border-b border-border">
                <h3 className="font-semibold">Notificações</h3>
              </div>
              <div className="py-2">
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-severity-critical" />
                    <span className="font-medium text-sm">Nova vulnerabilidade crítica</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-4">CVE-2024-3400 detectada em fw-perimeter-01</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-status-error" />
                    <span className="font-medium text-sm">Job ETL falhou</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-4">MITRE ATT&CK Mapping - erro de conexão</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-status-success" />
                    <span className="font-medium text-sm">Scan concluído</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-4">Full Vulnerability Scan - 1247 ativos</p>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-primary cursor-pointer">
                Ver todas as notificações
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium">Admin Security</p>
                  <p className="text-xs text-muted-foreground">Administrador</p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Meu Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-severity-critical">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filter row */}
      <div className="px-6 py-2 border-t border-border/50 bg-card/50">
        <GlobalFilters />
      </div>
    </header>
  );
}
