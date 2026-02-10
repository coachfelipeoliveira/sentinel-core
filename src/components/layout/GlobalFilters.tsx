import { X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { useGlobalFilters, empresas, EolStatus } from '@/hooks/useGlobalFilters';

export function GlobalFilters() {
  const { empresa, eolStatus, setEmpresa, setEolStatus, resetFilters, isFiltered } = useGlobalFilters();
  const filtered = isFiltered();

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-muted-foreground whitespace-nowrap">Empresa:</span>
        <Select value={empresa} onValueChange={setEmpresa}>
          <SelectTrigger className="w-48 h-8 text-xs bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {empresas.map((e) => (
              <SelectItem key={e} value={e} className="text-xs">{e}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {empresa !== 'Todas as Empresas' && (
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setEmpresa('Todas as Empresas')}>
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-xs text-muted-foreground whitespace-nowrap">Asset EoL:</span>
        <Select value={eolStatus} onValueChange={(v) => setEolStatus(v as EolStatus)}>
          <SelectTrigger className="w-36 h-8 text-xs bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos" className="text-xs">Todos os Ativos</SelectItem>
            <SelectItem value="eol" className="text-xs">Apenas EoL</SelectItem>
            <SelectItem value="non-eol" className="text-xs">Apenas Non-EoL</SelectItem>
          </SelectContent>
        </Select>
        {eolStatus !== 'todos' && (
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setEolStatus('todos')}>
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>

      {filtered && (
        <>
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30 gap-1">
            <Filter className="w-3 h-3" />
            Filtrado
          </Badge>
          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground" onClick={resetFilters}>
            <X className="w-3 h-3" />
            Limpar filtros
          </Button>
        </>
      )}
    </div>
  );
}
