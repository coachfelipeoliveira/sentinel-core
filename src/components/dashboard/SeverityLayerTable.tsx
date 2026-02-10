import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface BySeverity {
  critical: { l1: number; l2: number; l3: number; l4: number; total: number };
  cisaCritical: { l1: number; l2: number; l3: number; l4: number; total: number };
  high: { l1: number; l2: number; l3: number; l4: number; total: number };
  medium: { l1: number; l2: number; l3: number; l4: number; total: number };
  low: { l1: number; l2: number; l3: number; l4: number; total: number };
}

interface SeverityLayerTableProps {
  data?: BySeverity;
}

export function SeverityLayerTable({ data }: SeverityLayerTableProps) {
  const navigate = useNavigate();

  // Fallback to dashboardData if no data prop
  const bySeverity: BySeverity = data ?? require('@/lib/mockData').dashboardData.bySeverity;

  const rows = [
    { label: 'Critical', key: 'critical' as const, color: 'text-severity-critical', filter: 'critical' },
    { label: 'CISA Critical', key: 'cisaCritical' as const, color: 'text-[hsl(0_50%_35%)]', filter: 'cisaCritical' },
    { label: 'High', key: 'high' as const, color: 'text-severity-high', filter: 'high' },
    { label: 'Medium', key: 'medium' as const, color: 'text-severity-medium', filter: 'medium' },
    { label: 'Low', key: 'low' as const, color: 'text-severity-low', filter: 'low' },
  ];

  const totalL1 = Object.values(bySeverity).reduce((s: number, v: any) => s + v.l1, 0);
  const totalL2 = Object.values(bySeverity).reduce((s: number, v: any) => s + v.l2, 0);
  const totalL3 = Object.values(bySeverity).reduce((s: number, v: any) => s + v.l3, 0);
  const totalL4 = Object.values(bySeverity).reduce((s: number, v: any) => s + v.l4, 0);
  const grandTotal = Object.values(bySeverity).reduce((s: number, v: any) => s + v.total, 0);

  const handleCellClick = (severity: string, layer?: number) => {
    const params = new URLSearchParams();
    params.set('severity', severity);
    if (layer) params.set('layer', layer.toString());
    navigate(`/vulnerabilities?${params.toString()}`);
  };

  const cellClass = 'text-center text-sm font-mono cursor-pointer hover:bg-primary/10 transition-colors rounded';

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Distribuição por Severidade e Layer</h3>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-xs">Severidade</TableHead>
            <TableHead className="text-xs text-center">L1</TableHead>
            <TableHead className="text-xs text-center">L2</TableHead>
            <TableHead className="text-xs text-center">L3</TableHead>
            <TableHead className="text-xs text-center">L4</TableHead>
            <TableHead className="text-xs text-center">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.key} className="border-border">
              <TableCell className={cn('text-sm font-medium cursor-pointer hover:underline', row.color)} onClick={() => handleCellClick(row.filter)}>
                {row.label}
              </TableCell>
              <TableCell className={cellClass} onClick={() => handleCellClick(row.filter, 1)}>{bySeverity[row.key].l1}</TableCell>
              <TableCell className={cellClass} onClick={() => handleCellClick(row.filter, 2)}>{bySeverity[row.key].l2}</TableCell>
              <TableCell className={cellClass} onClick={() => handleCellClick(row.filter, 3)}>{bySeverity[row.key].l3}</TableCell>
              <TableCell className={cellClass} onClick={() => handleCellClick(row.filter, 4)}>{bySeverity[row.key].l4}</TableCell>
              <TableCell className={cn(cellClass, 'font-bold')} onClick={() => handleCellClick(row.filter)}>{bySeverity[row.key].total}</TableCell>
            </TableRow>
          ))}
          <TableRow className="border-border border-t-2">
            <TableCell className="text-sm font-bold">Total</TableCell>
            <TableCell className="text-center text-sm font-mono font-bold">{totalL1}</TableCell>
            <TableCell className="text-center text-sm font-mono font-bold">{totalL2}</TableCell>
            <TableCell className="text-center text-sm font-mono font-bold">{totalL3}</TableCell>
            <TableCell className="text-center text-sm font-mono font-bold">{totalL4}</TableCell>
            <TableCell className="text-center text-sm font-mono font-bold text-primary">{grandTotal}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
