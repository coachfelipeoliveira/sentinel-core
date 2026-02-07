import { Shield, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'vulnerability',
    title: 'Nova vulnerabilidade crítica detectada',
    description: 'CVE-2024-3400 em fw-perimeter-01.corp.local',
    time: '5 min atrás',
    icon: AlertTriangle,
    iconColor: 'text-severity-critical',
    iconBg: 'bg-severity-critical/10',
  },
  {
    id: 2,
    type: 'remediation',
    title: 'Vulnerabilidade remediada',
    description: 'CVE-2024-27198 em teamcity.dev.corp.local',
    time: '32 min atrás',
    icon: CheckCircle,
    iconColor: 'text-status-success',
    iconBg: 'bg-status-success/10',
  },
  {
    id: 3,
    type: 'scan',
    title: 'Scan de vulnerabilidades concluído',
    description: 'Full Scan - 1247 ativos verificados',
    time: '1 hora atrás',
    icon: Shield,
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
  {
    id: 4,
    type: 'job_failed',
    title: 'Job ETL falhou',
    description: 'MITRE ATT&CK Mapping - timeout',
    time: '2 horas atrás',
    icon: XCircle,
    iconColor: 'text-status-error',
    iconBg: 'bg-status-error/10',
  },
  {
    id: 5,
    type: 'assignment',
    title: 'Vulnerabilidade atribuída',
    description: 'CVE-2024-21762 atribuída a Team-Firewall',
    time: '3 horas atrás',
    icon: Clock,
    iconColor: 'text-severity-high',
    iconBg: 'bg-severity-high/10',
  },
];

export function RecentActivity() {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Atividade Recente</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div 
            key={activity.id}
            className="flex items-start gap-3 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`p-2 rounded-lg ${activity.iconBg}`}>
              <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {activity.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {activity.description}
              </p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {activity.time}
            </span>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors">
        Ver toda atividade
      </button>
    </div>
  );
}
