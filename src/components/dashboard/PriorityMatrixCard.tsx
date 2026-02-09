import { dashboardData } from '@/lib/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function PriorityMatrixCard() {
  const { priorities } = dashboardData;
  const total = priorities.p1 + priorities.p2 + priorities.p3 + priorities.p4;

  const rows = [
    { label: 'P1', value: priorities.p1, color: 'text-severity-critical', bg: 'bg-severity-critical/10' },
    { label: 'P2', value: priorities.p2, color: 'text-severity-high', bg: 'bg-severity-high/10' },
    { label: 'P3', value: priorities.p3, color: 'text-severity-medium', bg: 'bg-severity-medium/10' },
    { label: 'P4', value: priorities.p4, color: 'text-severity-low', bg: 'bg-severity-low/10' },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Matriz de Priorização</h3>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-xs">Prioridade</TableHead>
            <TableHead className="text-xs text-center">Quantidade</TableHead>
            <TableHead className="text-xs text-right">% do Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.label} className="border-border">
              <TableCell>
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold ${row.color} ${row.bg}`}>
                  {row.label}
                </span>
              </TableCell>
              <TableCell className="text-center text-sm font-mono font-bold">{row.value.toLocaleString()}</TableCell>
              <TableCell className="text-right text-sm font-mono">{((row.value / total) * 100).toFixed(1)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Total</span>
        <span className="text-lg font-bold text-primary">{total.toLocaleString()}</span>
      </div>
    </div>
  );
}
