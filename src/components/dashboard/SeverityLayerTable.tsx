import { dashboardData } from '@/lib/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function SeverityLayerTable() {
  const { bySeverity } = dashboardData;

  const rows = [
    { label: 'Critical', key: 'critical' as const, color: 'text-severity-critical' },
    { label: 'CISA Critical', key: 'cisaCritical' as const, color: 'text-[hsl(0_50%_35%)]' },
    { label: 'High', key: 'high' as const, color: 'text-severity-high' },
    { label: 'Medium', key: 'medium' as const, color: 'text-severity-medium' },
    { label: 'Low', key: 'low' as const, color: 'text-severity-low' },
  ];

  const totalL1 = Object.values(bySeverity).reduce((s, v) => s + v.l1, 0);
  const totalL2 = Object.values(bySeverity).reduce((s, v) => s + v.l2, 0);
  const totalL3 = Object.values(bySeverity).reduce((s, v) => s + v.l3, 0);
  const totalL4 = Object.values(bySeverity).reduce((s, v) => s + v.l4, 0);
  const grandTotal = Object.values(bySeverity).reduce((s, v) => s + v.total, 0);

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
              <TableCell className={`text-sm font-medium ${row.color}`}>{row.label}</TableCell>
              <TableCell className="text-center text-sm font-mono">{bySeverity[row.key].l1}</TableCell>
              <TableCell className="text-center text-sm font-mono">{bySeverity[row.key].l2}</TableCell>
              <TableCell className="text-center text-sm font-mono">{bySeverity[row.key].l3}</TableCell>
              <TableCell className="text-center text-sm font-mono">{bySeverity[row.key].l4}</TableCell>
              <TableCell className="text-center text-sm font-mono font-bold">{bySeverity[row.key].total}</TableCell>
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
