import { dashboardData } from '@/lib/mockData';

export function SlaGaugeCard() {
  const { slaCompliance, slaMeta } = dashboardData.summary;
  const circumference = 2 * Math.PI * 52;
  const progress = (slaCompliance / 100) * circumference;
  const metaProgress = (slaMeta / 100) * circumference;
  const isBelow = slaCompliance < slaMeta;

  return (
    <div className="metric-card border-l-4 border-l-primary transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center gap-4">
        <div className="relative w-28 h-28 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(230 20% 20%)" strokeWidth="8" />
            {/* Meta indicator */}
            <circle
              cx="60" cy="60" r="52" fill="none"
              stroke="hsl(215 20% 35%)"
              strokeWidth="2"
              strokeDasharray={`${metaProgress} ${circumference}`}
              strokeLinecap="round"
              opacity={0.5}
            />
            {/* Progress */}
            <circle
              cx="60" cy="60" r="52" fill="none"
              stroke={isBelow ? 'hsl(38 92% 50%)' : 'hsl(160 84% 39%)'}
              strokeWidth="8"
              strokeDasharray={`${progress} ${circumference}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{slaCompliance}%</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground mb-1">Conformidade SLA</p>
          <p className="text-xs text-muted-foreground">Meta: {slaMeta}%</p>
          <div className={`mt-2 text-xs font-medium ${isBelow ? 'text-status-warning' : 'text-status-success'}`}>
            {isBelow ? `${slaMeta - slaCompliance}% abaixo da meta` : 'Meta atingida ✓'}
          </div>
        </div>
      </div>
    </div>
  );
}
