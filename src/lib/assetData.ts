import { Severity, LayerRisk, Priority, ComplianceTag, AgingBucket } from './mockData';

export interface AssetVulnerability {
  vulnId: string;
  qid: number;
  title: string;
  severity: Severity;
  layerRisk: LayerRisk;
  priority: Priority;
  hostname: string;
  ip: string;
  empresa: string;
  os: string;
  assetEol: boolean;
  status: 'open' | 'in_progress' | 'remediated' | 'accepted';
  agingDays: number;
  agingBucket: AgingBucket;
  lastDetected: string;
  compliance: ComplianceTag[];
  assetType: string;
}

// Expanded asset-level data: each row = one vuln+asset combo
export const assetVulnerabilities: AssetVulnerability[] = [
  // QID 376562 - FortiOS (2 assets)
  { vulnId: 'av-001', qid: 376562, title: 'FortiOS Out-of-Bound Write Vulnerability', severity: 'critical', layerRisk: 1, priority: 'P1', hostname: 'fw-prod-01.corp.local', ip: '10.0.1.10', empresa: 'iFood', os: 'FortiOS 6.4.8', assetEol: false, status: 'open', agingDays: 185, agingBucket: '181-365d', lastDetected: '2026-02-01', compliance: ['ACN', 'SOX'], assetType: 'Firewall' },
  { vulnId: 'av-002', qid: 376562, title: 'FortiOS Out-of-Bound Write Vulnerability', severity: 'critical', layerRisk: 1, priority: 'P1', hostname: 'fw-prod-02.corp.local', ip: '10.0.1.11', empresa: 'iFood', os: 'FortiOS 6.2.1', assetEol: true, status: 'open', agingDays: 185, agingBucket: '181-365d', lastDetected: '2026-01-28', compliance: ['ACN', 'SOX'], assetType: 'Firewall' },
  // QID 731489 - ScreenConnect (2 assets)
  { vulnId: 'av-003', qid: 731489, title: 'ConnectWise ScreenConnect Authentication Bypass', severity: 'cisaCritical', layerRisk: 1, priority: 'P1', hostname: 'rmm-server.corp.local', ip: '10.10.5.50', empresa: 'Nubank', os: 'Windows Server 2022', assetEol: false, status: 'in_progress', agingDays: 148, agingBucket: '91-180d', lastDetected: '2026-02-05', compliance: ['ACN', 'SOX', 'LGPD'], assetType: 'Server' },
  { vulnId: 'av-004', qid: 731489, title: 'ConnectWise ScreenConnect Authentication Bypass', severity: 'cisaCritical', layerRisk: 1, priority: 'P1', hostname: 'rmm-backup.corp.local', ip: '10.10.5.51', empresa: 'Nubank', os: 'Windows Server 2022', assetEol: false, status: 'in_progress', agingDays: 148, agingBucket: '91-180d', lastDetected: '2026-02-05', compliance: ['ACN', 'SOX', 'LGPD'], assetType: 'Server' },
  // QID 380234 - GoAnywhere (1 asset)
  { vulnId: 'av-005', qid: 380234, title: 'GoAnywhere MFT Authentication Bypass', severity: 'critical', layerRisk: 2, priority: 'P2', hostname: 'file-transfer.corp.local', ip: '10.20.3.10', empresa: 'Rappi', os: 'Windows Server 2019', assetEol: false, status: 'remediated', agingDays: 233, agingBucket: '181-365d', lastDetected: '2026-01-15', compliance: [], assetType: 'Server' },
  // QID 731502 - Ivanti (3 assets)
  { vulnId: 'av-006', qid: 731502, title: 'Ivanti Connect Secure Auth Bypass', severity: 'cisaCritical', layerRisk: 1, priority: 'P1', hostname: 'vpn-gateway.corp.local', ip: '10.10.1.200', empresa: 'iFood', os: 'Ivanti CS 22.4R2', assetEol: false, status: 'open', agingDays: 306, agingBucket: '181-365d', lastDetected: '2026-02-10', compliance: ['ACN'], assetType: 'VPN' },
  { vulnId: 'av-007', qid: 731502, title: 'Ivanti Connect Secure Auth Bypass', severity: 'cisaCritical', layerRisk: 1, priority: 'P1', hostname: 'vpn-dr.corp.local', ip: '10.10.2.200', empresa: 'iFood', os: 'Ivanti CS 22.3R1', assetEol: true, status: 'open', agingDays: 306, agingBucket: '181-365d', lastDetected: '2026-02-10', compliance: ['ACN'], assetType: 'VPN' },
  { vulnId: 'av-008', qid: 731502, title: 'Ivanti Connect Secure Auth Bypass', severity: 'cisaCritical', layerRisk: 1, priority: 'P1', hostname: 'vpn-branch.corp.local', ip: '10.30.1.200', empresa: 'Magazine Luiza', os: 'Ivanti CS 22.4R1', assetEol: false, status: 'in_progress', agingDays: 306, agingBucket: '181-365d', lastDetected: '2026-02-08', compliance: ['ACN', 'SOX'], assetType: 'VPN' },
  // QID 379821 - Jenkins (1 asset)
  { vulnId: 'av-009', qid: 379821, title: 'Jenkins CLI Arbitrary File Read', severity: 'high', layerRisk: 3, priority: 'P3', hostname: 'jenkins.dev.corp.local', ip: '10.50.1.30', empresa: 'Creditas', os: 'Ubuntu 22.04', assetEol: false, status: 'open', agingDays: 108, agingBucket: '91-180d', lastDetected: '2026-01-20', compliance: ['SOX'], assetType: 'Server' },
  // QID 110414 - Outlook (4 assets)
  { vulnId: 'av-010', qid: 110414, title: 'Microsoft Outlook Remote Code Execution', severity: 'high', layerRisk: 4, priority: 'P4', hostname: 'ws-fin-001.corp.local', ip: '10.60.1.10', empresa: 'C6 Bank', os: 'Windows 11 23H2', assetEol: false, status: 'in_progress', agingDays: 58, agingBucket: '31-60d', lastDetected: '2026-02-10', compliance: [], assetType: 'Endpoint' },
  { vulnId: 'av-011', qid: 110414, title: 'Microsoft Outlook Remote Code Execution', severity: 'high', layerRisk: 4, priority: 'P4', hostname: 'ws-fin-002.corp.local', ip: '10.60.1.11', empresa: 'C6 Bank', os: 'Windows 11 23H2', assetEol: false, status: 'in_progress', agingDays: 58, agingBucket: '31-60d', lastDetected: '2026-02-10', compliance: [], assetType: 'Endpoint' },
  { vulnId: 'av-012', qid: 110414, title: 'Microsoft Outlook Remote Code Execution', severity: 'high', layerRisk: 4, priority: 'P4', hostname: 'ws-mkt-001.corp.local', ip: '10.60.2.10', empresa: 'PagSeguro', os: 'Windows 10 22H2', assetEol: true, status: 'open', agingDays: 58, agingBucket: '31-60d', lastDetected: '2026-02-09', compliance: [], assetType: 'Endpoint' },
  { vulnId: 'av-013', qid: 110414, title: 'Microsoft Outlook Remote Code Execution', severity: 'high', layerRisk: 4, priority: 'P4', hostname: 'ws-rh-003.corp.local', ip: '10.60.3.15', empresa: 'Stone', os: 'Windows 11 22H2', assetEol: false, status: 'in_progress', agingDays: 58, agingBucket: '31-60d', lastDetected: '2026-02-08', compliance: [], assetType: 'Endpoint' },
  // QID 316892 - Cisco (1 asset)
  { vulnId: 'av-014', qid: 316892, title: 'Cisco IOS XE Web UI Privilege Escalation', severity: 'high', layerRisk: 2, priority: 'P3', hostname: 'core-switch-01.corp.local', ip: '10.10.0.1', empresa: 'Localiza', os: 'IOS XE 17.9.3', assetEol: true, status: 'accepted', agingDays: 440, agingBucket: '1+ ano', lastDetected: '2026-01-30', compliance: [], assetType: 'Network' },
  // QID 731510 - Ivanti XXE (1 asset)
  { vulnId: 'av-015', qid: 731510, title: 'Ivanti Connect Secure XXE Vulnerability', severity: 'cisaCritical', layerRisk: 1, priority: 'P1', hostname: 'vpn-gateway.corp.local', ip: '10.10.1.200', empresa: 'iFood', os: 'Ivanti CS 22.4R2', assetEol: false, status: 'open', agingDays: 93, agingBucket: '91-180d', lastDetected: '2026-02-10', compliance: ['ACN'], assetType: 'VPN' },
  // QID 376780 - FortiClientEMS (2 assets)
  { vulnId: 'av-016', qid: 376780, title: 'Fortinet FortiClientEMS SQL Injection', severity: 'critical', layerRisk: 1, priority: 'P1', hostname: 'ems-server.corp.local', ip: '10.10.3.50', empresa: 'Nubank', os: 'Windows Server 2022', assetEol: false, status: 'open', agingDays: 213, agingBucket: '181-365d', lastDetected: '2026-02-05', compliance: ['ACN', 'SOX'], assetType: 'Server' },
  { vulnId: 'av-017', qid: 376780, title: 'Fortinet FortiClientEMS SQL Injection', severity: 'critical', layerRisk: 1, priority: 'P1', hostname: 'ems-dr.corp.local', ip: '10.10.4.50', empresa: 'Nubank', os: 'Windows Server 2019', assetEol: true, status: 'open', agingDays: 213, agingBucket: '181-365d', lastDetected: '2026-02-03', compliance: ['ACN', 'SOX'], assetType: 'Server' },
  // QID 731523 - TeamCity (1 asset)
  { vulnId: 'av-018', qid: 731523, title: 'JetBrains TeamCity Auth Bypass', severity: 'cisaCritical', layerRisk: 3, priority: 'P2', hostname: 'teamcity.dev.corp.local', ip: '10.50.2.20', empresa: 'QuintoAndar', os: 'Ubuntu 22.04', assetEol: false, status: 'remediated', agingDays: 281, agingBucket: '181-365d', lastDetected: '2026-01-10', compliance: ['SOX'], assetType: 'Server' },
  // QID 376900 - PAN-OS (1 asset)
  { vulnId: 'av-019', qid: 376900, title: 'Palo Alto PAN-OS Command Injection', severity: 'critical', layerRisk: 1, priority: 'P1', hostname: 'fw-perimeter-01.corp.local', ip: '10.10.1.101', empresa: 'iFood', os: 'PAN-OS 10.2.4', assetEol: false, status: 'in_progress', agingDays: 59, agingBucket: '31-60d', lastDetected: '2026-02-11', compliance: ['ACN', 'SOX'], assetType: 'Firewall' },
  // QID 198765 - Linux Kernel (3 assets)
  { vulnId: 'av-020', qid: 198765, title: 'Linux Kernel Use-After-Free', severity: 'high', layerRisk: 4, priority: 'P4', hostname: 'app-server-01.corp.local', ip: '10.50.5.10', empresa: 'Loggi', os: 'Ubuntu 22.04', assetEol: false, status: 'in_progress', agingDays: 86, agingBucket: '61-90d', lastDetected: '2026-02-01', compliance: [], assetType: 'Server' },
  { vulnId: 'av-021', qid: 198765, title: 'Linux Kernel Use-After-Free', severity: 'high', layerRisk: 4, priority: 'P4', hostname: 'app-server-02.corp.local', ip: '10.50.5.11', empresa: 'Loggi', os: 'Ubuntu 20.04', assetEol: true, status: 'open', agingDays: 86, agingBucket: '61-90d', lastDetected: '2026-01-28', compliance: [], assetType: 'Server' },
  { vulnId: 'av-022', qid: 198765, title: 'Linux Kernel Use-After-Free', severity: 'high', layerRisk: 4, priority: 'P4', hostname: 'db-replica.corp.local', ip: '10.50.6.20', empresa: 'Warren', os: 'CentOS 7', assetEol: true, status: 'open', agingDays: 86, agingBucket: '61-90d', lastDetected: '2026-01-25', compliance: [], assetType: 'Server' },
  // QID 110392 - SmartScreen (2 assets)
  { vulnId: 'av-023', qid: 110392, title: 'Windows SmartScreen Bypass', severity: 'medium', layerRisk: 4, priority: 'P4', hostname: 'ws-dev-010.corp.local', ip: '10.60.4.10', empresa: 'Gympass', os: 'Windows 11 23H2', assetEol: false, status: 'open', agingDays: 58, agingBucket: '31-60d', lastDetected: '2026-02-09', compliance: [], assetType: 'Endpoint' },
  { vulnId: 'av-024', qid: 110392, title: 'Windows SmartScreen Bypass', severity: 'medium', layerRisk: 4, priority: 'P4', hostname: 'ws-dev-011.corp.local', ip: '10.60.4.11', empresa: 'Gympass', os: 'Windows 10 21H2', assetEol: true, status: 'open', agingDays: 58, agingBucket: '31-60d', lastDetected: '2026-02-09', compliance: [], assetType: 'Endpoint' },
  // Remaining QIDs with single assets
  { vulnId: 'av-025', qid: 379510, title: 'Chrome V8 Out-of-Bounds Memory Access', severity: 'high', layerRisk: 4, priority: 'P4', hostname: 'ws-all-fleet.corp.local', ip: '10.60.0.0/16', empresa: 'Neon', os: 'Various', assetEol: false, status: 'remediated', agingDays: 238, agingBucket: '181-365d', lastDetected: '2026-01-05', compliance: [], assetType: 'Endpoint' },
  { vulnId: 'av-026', qid: 150234, title: 'aiohttp Path Traversal', severity: 'medium', layerRisk: 3, priority: 'P4', hostname: 'api-gateway.corp.local', ip: '10.50.1.100', empresa: 'Mercado Bitcoin', os: 'Ubuntu 22.04', assetEol: false, status: 'open', agingDays: 103, agingBucket: '91-180d', lastDetected: '2026-01-20', compliance: ['LGPD'], assetType: 'Server' },
  { vulnId: 'av-027', qid: 216752, title: 'VMware ESXi Use-After-Free', severity: 'critical', layerRisk: 3, priority: 'P2', hostname: 'esxi-cluster-01.corp.local', ip: '10.50.10.1', empresa: 'Banco Inter', os: 'ESXi 8.0u1', assetEol: false, status: 'open', agingDays: 157, agingBucket: '91-180d', lastDetected: '2026-02-01', compliance: ['ACN', 'SOX'], assetType: 'Hypervisor' },
  { vulnId: 'av-028', qid: 110428, title: 'Microsoft Exchange Server RCE', severity: 'high', layerRisk: 2, priority: 'P3', hostname: 'mail.corp.local', ip: '10.20.1.10', empresa: 'Via Varejo', os: 'Exchange 2019 CU13', assetEol: true, status: 'in_progress', agingDays: 58, agingBucket: '31-60d', lastDetected: '2026-02-10', compliance: [], assetType: 'Server' },
  { vulnId: 'av-029', qid: 110395, title: 'Windows Kernel Privilege Escalation', severity: 'medium', layerRisk: 4, priority: 'P4', hostname: 'legacy-ws.corp.local', ip: '10.60.9.5', empresa: 'GetNinjas', os: 'Windows 10 1809', assetEol: true, status: 'remediated', agingDays: 580, agingBucket: '1+ ano', lastDetected: '2025-12-15', compliance: [], assetType: 'Endpoint' },
  { vulnId: 'av-030', qid: 376995, title: 'Progress Flowmon Command Injection', severity: 'critical', layerRisk: 2, priority: 'P2', hostname: 'flowmon.corp.local', ip: '10.20.5.30', empresa: 'Vindi', os: 'Flowmon 12.3', assetEol: false, status: 'open', agingDays: 191, agingBucket: '181-365d', lastDetected: '2026-02-05', compliance: [], assetType: 'Network' },
  { vulnId: 'av-031', qid: 731540, title: 'Atlassian Confluence RCE', severity: 'high', layerRisk: 3, priority: 'P3', hostname: 'wiki.corp.local', ip: '10.50.3.10', empresa: 'Pagar.me', os: 'Ubuntu 22.04', assetEol: false, status: 'open', agingDays: 238, agingBucket: '181-365d', lastDetected: '2026-01-18', compliance: ['SOX'], assetType: 'Server' },
];

// Count of assets per QID
export function getAssetCountByQid(qid: number): number {
  return assetVulnerabilities.filter(av => av.qid === qid).length;
}
