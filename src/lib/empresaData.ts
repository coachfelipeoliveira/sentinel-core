import { dashboardData } from './mockData';

interface EmpresaMetrics {
  total: number;
  trend: number;
  layers: { layer: number; value: number; trend: number }[];
  cisaCritical: { current: number; trend: number; layers: { layer: number; value: number; trend: number }[] };
  critical: { current: number; trend: number; layers: { layer: number; value: number; trend: number }[] };
  eolCount: number;
  nonEolCount: number;
  bySeverity: typeof dashboardData.bySeverity;
  evolution: typeof dashboardData.evolution;
  evolutionBySeverity: typeof dashboardData.evolutionBySeverity;
  agingByLayer: typeof dashboardData.agingByLayer;
  priorities: typeof dashboardData.priorities;
}

function generateEmpresa(seed: number, total: number): EmpresaMetrics {
  const r = (base: number, variance: number) => Math.round(base + (Math.sin(seed * 3.7) * variance));
  const l1 = Math.round(total * 0.22);
  const l2 = Math.round(total * 0.2);
  const l3 = Math.round(total * 0.28);
  const l4 = total - l1 - l2 - l3;
  const eolRatio = 0.45 + Math.sin(seed) * 0.15;

  return {
    total,
    trend: r(-10, 8),
    layers: [
      { layer: 1, value: l1, trend: r(-3, 4) },
      { layer: 2, value: l2, trend: r(1, 5) },
      { layer: 3, value: l3, trend: r(-5, 6) },
      { layer: 4, value: l4, trend: r(-3, 4) },
    ],
    cisaCritical: {
      current: Math.round(total * 0.12),
      trend: r(-2, 3),
      layers: [
        { layer: 1, value: Math.round(total * 0.06), trend: r(-1, 2) },
        { layer: 2, value: Math.round(total * 0.025), trend: r(0, 2) },
        { layer: 3, value: Math.round(total * 0.02), trend: r(-1, 1) },
        { layer: 4, value: Math.round(total * 0.015), trend: r(-1, 1) },
      ],
    },
    critical: {
      current: Math.round(total * 0.09),
      trend: r(-4, 5),
      layers: [
        { layer: 1, value: Math.round(total * 0.035), trend: r(-2, 2) },
        { layer: 2, value: Math.round(total * 0.02), trend: r(-1, 2) },
        { layer: 3, value: Math.round(total * 0.02), trend: r(-1, 1) },
        { layer: 4, value: Math.round(total * 0.015), trend: r(-1, 1) },
      ],
    },
    eolCount: Math.round(total * eolRatio),
    nonEolCount: Math.round(total * (1 - eolRatio)),
    bySeverity: {
      critical: { l1: Math.round(l1 * 0.17), l2: Math.round(l2 * 0.1), l3: Math.round(l3 * 0.07), l4: Math.round(l4 * 0.04), total: Math.round(total * 0.09) },
      cisaCritical: { l1: Math.round(l1 * 0.28), l2: Math.round(l2 * 0.13), l3: Math.round(l3 * 0.06), l4: Math.round(l4 * 0.04), total: Math.round(total * 0.12) },
      high: { l1: Math.round(l1 * 0.43), l2: Math.round(l2 * 0.47), l3: Math.round(l3 * 0.28), l4: Math.round(l4 * 0.13), total: Math.round(total * 0.31) },
      medium: { l1: Math.round(l1 * 0.08), l2: Math.round(l2 * 0.22), l3: Math.round(l3 * 0.36), l4: Math.round(l4 * 0.54), total: Math.round(total * 0.32) },
      low: { l1: Math.round(l1 * 0.04), l2: Math.round(l2 * 0.08), l3: Math.round(l3 * 0.22), l4: Math.round(l4 * 0.24), total: Math.round(total * 0.16) },
    },
    evolution: dashboardData.evolution.map((m) => ({
      ...m,
      l1: Math.round(m.l1 * total / 1918),
      l2: Math.round(m.l2 * total / 1918),
      l3: Math.round(m.l3 * total / 1918),
      l4: Math.round(m.l4 * total / 1918),
      total: Math.round(m.total * total / 1918),
    })),
    evolutionBySeverity: dashboardData.evolutionBySeverity.map((m) => ({
      ...m,
      critical: Math.round(m.critical * total / 1918),
      cisaCritical: Math.round(m.cisaCritical * total / 1918),
      high: Math.round(m.high * total / 1918),
      medium: Math.round(m.medium * total / 1918),
      low: Math.round(m.low * total / 1918),
      total: Math.round(m.total * total / 1918),
    })),
    agingByLayer: {
      layer1: { ...dashboardData.agingByLayer.layer1, total: l1, aging: dashboardData.agingByLayer.layer1.aging.map(a => ({ ...a, critical: Math.round(a.critical * l1 / 467), cisaCritical: Math.round(a.cisaCritical * l1 / 467), high: Math.round(a.high * l1 / 467) })) },
      layer2: { ...dashboardData.agingByLayer.layer2, total: l2, aging: dashboardData.agingByLayer.layer2.aging.map(a => ({ ...a, critical: Math.round(a.critical * l2 / 401), cisaCritical: Math.round(a.cisaCritical * l2 / 401), high: Math.round(a.high * l2 / 401) })) },
      layer3: { ...dashboardData.agingByLayer.layer3, total: l3, aging: dashboardData.agingByLayer.layer3.aging.map(a => ({ ...a, critical: Math.round(a.critical * l3 / 445), cisaCritical: Math.round(a.cisaCritical * l3 / 445), high: Math.round(a.high * l3 / 445) })) },
      layer4: { ...dashboardData.agingByLayer.layer4, total: l4, aging: dashboardData.agingByLayer.layer4.aging.map(a => ({ ...a, critical: Math.round(a.critical * l4 / 605), cisaCritical: Math.round(a.cisaCritical * l4 / 605), high: Math.round(a.high * l4 / 605) })) },
    },
    priorities: {
      p1: Math.round(total * 0.006),
      p2: Math.round(total * 0.056),
      p3: Math.round(total * 0.144),
      p4: Math.round(total * 0.794),
    },
  };
}

const empresaTotals: Record<string, number> = {
  'iFood': 287,
  'Nubank': 412,
  'Rappi': 198,
  'Magazine Luiza': 156,
  'Via Varejo': 134,
  'Localiza': 89,
  'C6 Bank': 201,
  'PagSeguro': 167,
  'Stone': 143,
  'Creditas': 78,
  'QuintoAndar': 65,
  'Loggi': 112,
  'Mercado Bitcoin': 94,
  'Warren': 52,
  'Neon': 88,
  'Banco Inter': 175,
  'GetNinjas': 43,
  'Vindi': 37,
  'Pagar.me': 121,
  'Gympass': 96,
};

export const empresaMetrics: Record<string, EmpresaMetrics> = {};
Object.entries(empresaTotals).forEach(([name, total], i) => {
  empresaMetrics[name] = generateEmpresa(i + 1, total);
});

export function getFilteredDashboardData(empresa: string, eolStatus: 'todos' | 'eol' | 'non-eol') {
  let data = empresa !== 'Todas as Empresas' && empresaMetrics[empresa]
    ? empresaMetrics[empresa]
    : {
        total: dashboardData.totalCard.current,
        trend: dashboardData.totalCard.trend,
        layers: dashboardData.totalCard.layers,
        cisaCritical: { current: dashboardData.cisaCriticalCard.current, trend: dashboardData.cisaCriticalCard.trend, layers: dashboardData.cisaCriticalCard.layers },
        critical: { current: dashboardData.criticalCard.current, trend: dashboardData.criticalCard.trend, layers: dashboardData.criticalCard.layers },
        eolCount: dashboardData.eolStatus.eol,
        nonEolCount: dashboardData.eolStatus.nonEol,
        bySeverity: dashboardData.bySeverity,
        evolution: dashboardData.evolution,
        evolutionBySeverity: dashboardData.evolutionBySeverity,
        agingByLayer: dashboardData.agingByLayer,
        priorities: dashboardData.priorities,
      };

  if (eolStatus !== 'todos') {
    const eolTotal = data.eolCount + data.nonEolCount;
    const ratio = eolStatus === 'eol' ? data.eolCount / eolTotal : data.nonEolCount / eolTotal;

    data = {
      ...data,
      total: Math.round(data.total * ratio),
      layers: data.layers.map(l => ({ ...l, value: Math.round(l.value * ratio), trend: Math.round(l.trend * ratio) })),
      cisaCritical: {
        ...data.cisaCritical,
        current: Math.round(data.cisaCritical.current * ratio),
        layers: data.cisaCritical.layers.map(l => ({ ...l, value: Math.round(l.value * ratio), trend: Math.round(l.trend * ratio) })),
      },
      critical: {
        ...data.critical,
        current: Math.round(data.critical.current * ratio),
        layers: data.critical.layers.map(l => ({ ...l, value: Math.round(l.value * ratio), trend: Math.round(l.trend * ratio) })),
      },
      bySeverity: Object.fromEntries(
        Object.entries(data.bySeverity).map(([k, v]) => [k, {
          l1: Math.round(v.l1 * ratio),
          l2: Math.round(v.l2 * ratio),
          l3: Math.round(v.l3 * ratio),
          l4: Math.round(v.l4 * ratio),
          total: Math.round(v.total * ratio),
        }])
      ) as typeof data.bySeverity,
      evolution: data.evolution.map(m => ({
        ...m,
        l1: Math.round(m.l1 * ratio),
        l2: Math.round(m.l2 * ratio),
        l3: Math.round(m.l3 * ratio),
        l4: Math.round(m.l4 * ratio),
        total: Math.round(m.total * ratio),
      })),
      evolutionBySeverity: data.evolutionBySeverity.map(m => ({
        ...m,
        critical: Math.round(m.critical * ratio),
        cisaCritical: Math.round(m.cisaCritical * ratio),
        high: Math.round(m.high * ratio),
        medium: Math.round(m.medium * ratio),
        low: Math.round(m.low * ratio),
        total: Math.round(m.total * ratio),
      })),
      priorities: {
        p1: Math.round(data.priorities.p1 * ratio),
        p2: Math.round(data.priorities.p2 * ratio),
        p3: Math.round(data.priorities.p3 * ratio),
        p4: Math.round(data.priorities.p4 * ratio),
      },
    };
  }

  return data;
}
