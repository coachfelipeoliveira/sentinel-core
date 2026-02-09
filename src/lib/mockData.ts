// Mock data for VMS Portal - Layer Risk Methodology

export type Severity = 'critical' | 'cisaCritical' | 'high' | 'medium' | 'low';
export type LayerRisk = 1 | 2 | 3 | 4;
export type Priority = 'P1' | 'P2' | 'P3' | 'P4';
export type AgingBucket = '30d' | '31-60d' | '61-90d' | '91-180d' | '181-365d' | '1+ ano' | '2+ anos';
export type ComplianceTag = 'ACN' | 'SOX' | 'LGPD';

export interface Vulnerability {
  id: string;
  qid: number;
  title: string;
  severity: Severity;
  layerRisk: LayerRisk;
  priority: Priority;
  asset: string;
  assetType: string;
  detectedDate: string;
  agingDays: number;
  agingBucket: AgingBucket;
  status: 'open' | 'in_progress' | 'remediated' | 'accepted';
  eol: boolean;
  compliance: ComplianceTag[];
  mitreAttack: string[];
  exploitability: 'active' | 'poc' | 'theoretical' | 'none';
  description: string;
  remediationSteps: string[];
  references: string[];
}

export interface ETLJob {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed' | 'scheduled';
  startTime: string;
  duration: string;
  progress: number;
  lastRun: string;
  schedule: string;
  description: string;
}

export interface QualysConnection {
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  assetsCount: number;
  rateLimit: { used: number; limit: number };
  recentCalls: { timestamp: string; endpoint: string; status: 'success' | 'error' }[];
}

// Dashboard data following Layer Risk methodology
export const dashboardData = {
  summary: {
    total: 1918,
    trend: -46,
    trendLabel: 'Em relação a Janeiro/26',
    layer12: 868,
    layer12Trend: -2,
    layer34: 1050,
    layer34Trend: -44,
    slaCompliance: 78,
    slaMeta: 85,
  },
  evolution: [
    { month: 'Jan/25', l1: 924, l2: 850, l3: 570, l4: 500, total: 2844 },
    { month: 'Fev/25', l1: 890, l2: 820, l3: 555, l4: 485, total: 2750 },
    { month: 'Mar/25', l1: 860, l2: 790, l3: 540, l4: 470, total: 2660 },
    { month: 'Abr/25', l1: 830, l2: 760, l3: 530, l4: 460, total: 2580 },
    { month: 'Mai/25', l1: 800, l2: 730, l3: 520, l4: 450, total: 2500 },
    { month: 'Jun/25', l1: 770, l2: 700, l3: 510, l4: 445, total: 2425 },
    { month: 'Jul/25', l1: 740, l2: 670, l3: 500, l4: 440, total: 2350 },
    { month: 'Ago/25', l1: 710, l2: 640, l3: 490, l4: 435, total: 2275 },
    { month: 'Set/25', l1: 680, l2: 610, l3: 480, l4: 430, total: 2200 },
    { month: 'Out/25', l1: 620, l2: 560, l3: 470, l4: 420, total: 2070 },
    { month: 'Nov/25', l1: 560, l2: 510, l3: 460, l4: 415, total: 1945 },
    { month: 'Dez/25', l1: 520, l2: 480, l3: 455, l4: 410, total: 1865 },
    { month: 'Jan/26', l1: 490, l2: 460, l3: 450, l4: 405, total: 1964 },
    { month: 'Fev/26', l1: 467, l2: 401, l3: 445, l4: 605, total: 1918 },
  ],
  bySeverity: {
    critical:     { l1: 80,  l2: 42,  l3: 32,  l4: 27,  total: 181 },
    cisaCritical: { l1: 130, l2: 51,  l3: 28,  l4: 27,  total: 236 },
    high:         { l1: 200, l2: 187, l3: 123, l4: 76,  total: 586 },
    medium:       { l1: 37,  l2: 89,  l3: 162, l4: 327, total: 615 },
    low:          { l1: 20,  l2: 32,  l3: 100, l4: 148, total: 300 },
  },
  byAging: {
    '30d':      { critical: 6,  cisaCritical: 12,  high: 87 },
    '31-60d':   { critical: 12, cisaCritical: 28,  high: 38 },
    '61-90d':   { critical: 18, cisaCritical: 35,  high: 65 },
    '91-180d':  { critical: 35, cisaCritical: 52,  high: 120 },
    '181-365d': { critical: 42, cisaCritical: 48,  high: 140 },
    '1+ ano':   { critical: 38, cisaCritical: 35,  high: 86 },
    '2+ anos':  { critical: 30, cisaCritical: 26,  high: 50 },
  },
  eolStatus: {
    eol: 1050,
    nonEol: 868,
  },
  priorities: {
    p1: 11,
    p2: 108,
    p3: 276,
    p4: 1523,
  },
};

function getAgingBucket(days: number): AgingBucket {
  if (days <= 30) return '30d';
  if (days <= 60) return '31-60d';
  if (days <= 90) return '61-90d';
  if (days <= 180) return '91-180d';
  if (days <= 365) return '181-365d';
  if (days <= 730) return '1+ ano';
  return '2+ anos';
}

export const vulnerabilities: Vulnerability[] = [
  {
    id: 'vuln-001',
    qid: 376562,
    title: 'FortiOS Out-of-Bound Write Vulnerability',
    severity: 'critical',
    layerRisk: 1,
    priority: 'P1',
    asset: 'fw-prod-01.corp.local',
    assetType: 'Firewall',
    detectedDate: '2025-08-10',
    agingDays: 185,
    agingBucket: '181-365d',
    status: 'open',
    eol: false,
    compliance: ['ACN', 'SOX'],
    mitreAttack: ['T1190', 'T1059'],
    exploitability: 'active',
    description: 'A out-of-bounds write vulnerability in FortiOS allows a remote unauthenticated attacker to execute arbitrary code via specially crafted HTTP requests.',
    remediationSteps: ['Upgrade FortiOS to version 7.4.3 or later', 'Apply virtual patch if immediate upgrade not possible', 'Enable IPS signatures'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-21762', 'https://fortiguard.com/psirt/FG-IR-24-015']
  },
  {
    id: 'vuln-002',
    qid: 731489,
    title: 'ConnectWise ScreenConnect Authentication Bypass',
    severity: 'cisaCritical',
    layerRisk: 1,
    priority: 'P1',
    asset: 'rmm-server.corp.local',
    assetType: 'Server',
    detectedDate: '2025-09-15',
    agingDays: 148,
    agingBucket: '91-180d',
    status: 'in_progress',
    eol: false,
    compliance: ['ACN', 'SOX', 'LGPD'],
    mitreAttack: ['T1190', 'T1078'],
    exploitability: 'active',
    description: 'An authentication bypass vulnerability in ConnectWise ScreenConnect allows an attacker to create administrator accounts and execute remote code.',
    remediationSteps: ['Update ScreenConnect to version 23.9.8 or later immediately', 'Review access logs for unauthorized access', 'Reset all administrator credentials'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-1709']
  },
  {
    id: 'vuln-003',
    qid: 380234,
    title: 'GoAnywhere MFT Authentication Bypass',
    severity: 'critical',
    layerRisk: 2,
    priority: 'P2',
    asset: 'file-transfer.corp.local',
    assetType: 'Server',
    detectedDate: '2025-06-22',
    agingDays: 233,
    agingBucket: '181-365d',
    status: 'remediated',
    eol: false,
    compliance: [],
    mitreAttack: ['T1190'],
    exploitability: 'active',
    description: 'Authentication bypass in Fortra GoAnywhere MFT allows an unauthorized user to create an admin user via the administration portal.',
    remediationSteps: ['Upgrade to GoAnywhere MFT 7.4.1 or later', 'Review admin accounts for unauthorized users'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-0204']
  },
  {
    id: 'vuln-004',
    qid: 731502,
    title: 'Ivanti Connect Secure Auth Bypass',
    severity: 'cisaCritical',
    layerRisk: 1,
    priority: 'P1',
    asset: 'vpn-gateway.corp.local',
    assetType: 'VPN',
    detectedDate: '2025-04-10',
    agingDays: 306,
    agingBucket: '181-365d',
    status: 'open',
    eol: false,
    compliance: ['ACN'],
    mitreAttack: ['T1190', 'T1059', 'T1505.003'],
    exploitability: 'active',
    description: 'An authentication bypass vulnerability in Ivanti Connect Secure and Policy Secure allows a remote attacker to access restricted resources.',
    remediationSteps: ['Apply Ivanti mitigation XML', 'Monitor for indicators of compromise', 'Plan upgrade to patched version'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2023-46805']
  },
  {
    id: 'vuln-005',
    qid: 379821,
    title: 'Jenkins CLI Arbitrary File Read',
    severity: 'high',
    layerRisk: 3,
    priority: 'P3',
    asset: 'jenkins.dev.corp.local',
    assetType: 'Server',
    detectedDate: '2025-10-24',
    agingDays: 108,
    agingBucket: '91-180d',
    status: 'open',
    eol: false,
    compliance: ['SOX'],
    mitreAttack: ['T1083', 'T1552'],
    exploitability: 'poc',
    description: 'Jenkins CLI contains an arbitrary file read vulnerability through the built-in CLI command parser.',
    remediationSteps: ['Upgrade Jenkins to 2.442 or LTS 2.426.3', 'Disable CLI if not in use', 'Restrict network access to Jenkins'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-23897']
  },
  {
    id: 'vuln-006',
    qid: 110414,
    title: 'Microsoft Outlook Remote Code Execution',
    severity: 'high',
    layerRisk: 4,
    priority: 'P4',
    asset: 'Multiple Workstations',
    assetType: 'Endpoint',
    detectedDate: '2025-12-13',
    agingDays: 58,
    agingBucket: '31-60d',
    status: 'in_progress',
    eol: false,
    compliance: [],
    mitreAttack: ['T1566', 'T1059'],
    exploitability: 'poc',
    description: 'A remote code execution vulnerability in Microsoft Outlook allows attackers to execute code via malicious links.',
    remediationSteps: ['Apply February 2024 Patch Tuesday updates', 'Enable Protected View', 'Block external content in emails'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-21413']
  },
  {
    id: 'vuln-007',
    qid: 316892,
    title: 'Cisco IOS XE Web UI Privilege Escalation',
    severity: 'high',
    layerRisk: 2,
    priority: 'P3',
    asset: 'core-switch-01.corp.local',
    assetType: 'Network',
    detectedDate: '2024-11-28',
    agingDays: 440,
    agingBucket: '1+ ano',
    status: 'accepted',
    eol: true,
    compliance: [],
    mitreAttack: ['T1068'],
    exploitability: 'theoretical',
    description: 'A vulnerability in the web UI of Cisco IOS XE Software could allow privilege escalation.',
    remediationSteps: ['Upgrade to patched IOS XE version', 'Disable web UI if not required', 'Implement ACLs for management access'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-20931']
  },
  {
    id: 'vuln-008',
    qid: 731510,
    title: 'Ivanti Connect Secure XXE Vulnerability',
    severity: 'cisaCritical',
    layerRisk: 1,
    priority: 'P1',
    asset: 'vpn-gateway.corp.local',
    assetType: 'VPN',
    detectedDate: '2025-11-08',
    agingDays: 93,
    agingBucket: '91-180d',
    status: 'open',
    eol: false,
    compliance: ['ACN'],
    mitreAttack: ['T1190'],
    exploitability: 'active',
    description: 'An XML external entity vulnerability in Ivanti Connect Secure SAML component.',
    remediationSteps: ['Apply latest Ivanti patches', 'Disable SAML if not in use', 'Monitor for exploitation attempts'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-22024']
  },
  {
    id: 'vuln-009',
    qid: 376780,
    title: 'Fortinet FortiClientEMS SQL Injection',
    severity: 'critical',
    layerRisk: 1,
    priority: 'P1',
    asset: 'ems-server.corp.local',
    assetType: 'Server',
    detectedDate: '2025-07-12',
    agingDays: 213,
    agingBucket: '181-365d',
    status: 'open',
    eol: false,
    compliance: ['ACN', 'SOX'],
    mitreAttack: ['T1190', 'T1059'],
    exploitability: 'active',
    description: 'An improper neutralization of special elements used in an SQL Command in FortiClientEMS allows an unauthenticated attacker to execute unauthorized code.',
    remediationSteps: ['Upgrade FortiClientEMS to 7.2.3 or 7.0.11', 'Apply network segmentation', 'Monitor for indicators of compromise'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2023-48788']
  },
  {
    id: 'vuln-010',
    qid: 731523,
    title: 'JetBrains TeamCity Auth Bypass',
    severity: 'cisaCritical',
    layerRisk: 3,
    priority: 'P2',
    asset: 'teamcity.dev.corp.local',
    assetType: 'Server',
    detectedDate: '2025-05-04',
    agingDays: 281,
    agingBucket: '181-365d',
    status: 'remediated',
    eol: false,
    compliance: ['SOX'],
    mitreAttack: ['T1190', 'T1078'],
    exploitability: 'active',
    description: 'An authentication bypass vulnerability in JetBrains TeamCity allows unauthenticated remote code execution.',
    remediationSteps: ['Upgrade TeamCity to 2023.11.4 or later', 'Review for unauthorized admin accounts', 'Check for deployed artifacts tampering'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-27198']
  },
  {
    id: 'vuln-011',
    qid: 376900,
    title: 'Palo Alto PAN-OS Command Injection',
    severity: 'critical',
    layerRisk: 1,
    priority: 'P1',
    asset: 'fw-perimeter-01.corp.local',
    assetType: 'Firewall',
    detectedDate: '2025-12-12',
    agingDays: 59,
    agingBucket: '31-60d',
    status: 'in_progress',
    eol: false,
    compliance: ['ACN', 'SOX'],
    mitreAttack: ['T1190', 'T1059'],
    exploitability: 'active',
    description: 'A command injection vulnerability in GlobalProtect feature of Palo Alto Networks PAN-OS allows unauthenticated remote code execution.',
    remediationSteps: ['Apply hotfix immediately', 'Enable Threat Prevention signatures', 'Disable GlobalProtect if possible until patched'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-3400']
  },
  {
    id: 'vuln-012',
    qid: 198765,
    title: 'Linux Kernel Use-After-Free',
    severity: 'high',
    layerRisk: 4,
    priority: 'P4',
    asset: 'Multiple Linux Servers',
    assetType: 'Server',
    detectedDate: '2025-11-15',
    agingDays: 86,
    agingBucket: '61-90d',
    status: 'in_progress',
    eol: false,
    compliance: [],
    mitreAttack: ['T1068'],
    exploitability: 'poc',
    description: 'A use-after-free vulnerability in the Linux kernel netfilter subsystem allows local privilege escalation.',
    remediationSteps: ['Update kernel to patched version', 'Apply vendor-specific patches', 'Monitor for privilege escalation attempts'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-1086']
  },
  {
    id: 'vuln-013',
    qid: 110392,
    title: 'Windows SmartScreen Bypass',
    severity: 'medium',
    layerRisk: 4,
    priority: 'P4',
    asset: 'Multiple Workstations',
    assetType: 'Endpoint',
    detectedDate: '2025-12-13',
    agingDays: 58,
    agingBucket: '31-60d',
    status: 'open',
    eol: false,
    compliance: [],
    mitreAttack: ['T1218'],
    exploitability: 'active',
    description: 'A security feature bypass in Windows SmartScreen allows bypassing Mark-of-the-Web protections.',
    remediationSteps: ['Apply February 2024 security updates', 'Enable Attack Surface Reduction rules', 'User awareness training'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-21351']
  },
  {
    id: 'vuln-014',
    qid: 379510,
    title: 'Chrome V8 Out-of-Bounds Memory Access',
    severity: 'high',
    layerRisk: 4,
    priority: 'P4',
    asset: 'Multiple Workstations',
    assetType: 'Endpoint',
    detectedDate: '2025-06-16',
    agingDays: 238,
    agingBucket: '181-365d',
    status: 'remediated',
    eol: false,
    compliance: [],
    mitreAttack: ['T1189'],
    exploitability: 'active',
    description: 'An out-of-bounds memory access in V8 JavaScript engine allows remote code execution via crafted HTML page.',
    remediationSteps: ['Update Chrome to latest version', 'Enable auto-updates', 'Consider site isolation'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-0519']
  },
  {
    id: 'vuln-015',
    qid: 150234,
    title: 'aiohttp Path Traversal',
    severity: 'medium',
    layerRisk: 3,
    priority: 'P4',
    asset: 'api-gateway.corp.local',
    assetType: 'Server',
    detectedDate: '2025-10-29',
    agingDays: 103,
    agingBucket: '91-180d',
    status: 'open',
    eol: false,
    compliance: ['LGPD'],
    mitreAttack: ['T1083'],
    exploitability: 'theoretical',
    description: 'A path traversal vulnerability in aiohttp when following symlinks allows reading arbitrary files.',
    remediationSteps: ['Update aiohttp to 3.9.2 or later', 'Disable symlink following', 'Review static file serving configuration'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-23334']
  },
  {
    id: 'vuln-016',
    qid: 216752,
    title: 'VMware ESXi Use-After-Free',
    severity: 'critical',
    layerRisk: 3,
    priority: 'P2',
    asset: 'esxi-cluster-01.corp.local',
    assetType: 'Hypervisor',
    detectedDate: '2025-09-05',
    agingDays: 157,
    agingBucket: '91-180d',
    status: 'open',
    eol: false,
    compliance: ['ACN', 'SOX'],
    mitreAttack: ['T1190'],
    exploitability: 'poc',
    description: 'A use-after-free vulnerability in VMware ESXi allows code execution on the host from a VM.',
    remediationSteps: ['Apply ESXi patches immediately', 'Review VM guest permissions', 'Enable host firewall rules'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-22252']
  },
  {
    id: 'vuln-017',
    qid: 110428,
    title: 'Microsoft Exchange Server RCE',
    severity: 'high',
    layerRisk: 2,
    priority: 'P3',
    asset: 'mail.corp.local',
    assetType: 'Server',
    detectedDate: '2025-12-13',
    agingDays: 58,
    agingBucket: '31-60d',
    status: 'in_progress',
    eol: true,
    compliance: [],
    mitreAttack: ['T1190', 'T1059'],
    exploitability: 'poc',
    description: 'A remote code execution vulnerability in Microsoft Exchange Server allows authenticated attackers to execute code.',
    remediationSteps: ['Apply February 2024 cumulative update', 'Enable Extended Protection', 'Review mailbox permissions'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-21378']
  },
  {
    id: 'vuln-018',
    qid: 110395,
    title: 'Windows Kernel Privilege Escalation',
    severity: 'medium',
    layerRisk: 4,
    priority: 'P4',
    asset: 'Multiple Workstations',
    assetType: 'Endpoint',
    detectedDate: '2024-07-09',
    agingDays: 580,
    agingBucket: '1+ ano',
    status: 'remediated',
    eol: true,
    compliance: [],
    mitreAttack: ['T1068'],
    exploitability: 'theoretical',
    description: 'A privilege escalation vulnerability in Windows Kernel allows local attackers to gain SYSTEM privileges.',
    remediationSteps: ['Apply January 2024 security updates', 'Implement least privilege', 'Enable Credential Guard'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-20698']
  },
  {
    id: 'vuln-019',
    qid: 376995,
    title: 'Progress Flowmon Command Injection',
    severity: 'critical',
    layerRisk: 2,
    priority: 'P2',
    asset: 'flowmon.corp.local',
    assetType: 'Network',
    detectedDate: '2025-08-02',
    agingDays: 191,
    agingBucket: '181-365d',
    status: 'open',
    eol: false,
    compliance: [],
    mitreAttack: ['T1190', 'T1059'],
    exploitability: 'active',
    description: 'An unauthenticated command injection vulnerability in Progress Flowmon allows arbitrary command execution.',
    remediationSteps: ['Apply Flowmon patches immediately', 'Restrict management interface access', 'Monitor for exploitation'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-2389']
  },
  {
    id: 'vuln-020',
    qid: 731540,
    title: 'Atlassian Confluence RCE',
    severity: 'high',
    layerRisk: 3,
    priority: 'P3',
    asset: 'wiki.corp.local',
    assetType: 'Server',
    detectedDate: '2025-06-16',
    agingDays: 238,
    agingBucket: '181-365d',
    status: 'open',
    eol: false,
    compliance: ['SOX'],
    mitreAttack: ['T1190'],
    exploitability: 'active',
    description: 'A template injection vulnerability in Atlassian Confluence allows authenticated remote code execution.',
    remediationSteps: ['Upgrade Confluence to latest version', 'Restrict macro usage', 'Review user permissions'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-21683']
  },
];

export const etlJobs: ETLJob[] = [
  {
    id: 'job-001',
    name: 'Qualys Vulnerability Sync',
    status: 'running',
    startTime: '2026-02-09 14:30:00',
    duration: '12m 45s',
    progress: 67,
    lastRun: '2026-02-09 08:30:00',
    schedule: 'Every 6 hours',
    description: 'Synchronizes vulnerability data from Qualys VMDR API'
  },
  {
    id: 'job-002',
    name: 'Asset Inventory Update',
    status: 'completed',
    startTime: '2026-02-09 12:00:00',
    duration: '8m 22s',
    progress: 100,
    lastRun: '2026-02-09 12:08:22',
    schedule: 'Every 4 hours',
    description: 'Updates asset inventory from multiple sources'
  },
  {
    id: 'job-003',
    name: 'Layer Risk Calculation',
    status: 'scheduled',
    startTime: '-',
    duration: '-',
    progress: 0,
    lastRun: '2026-02-09 06:00:00',
    schedule: 'Daily at 06:00',
    description: 'Calculates Layer Risk scores and priority matrix'
  },
  {
    id: 'job-004',
    name: 'Threat Intelligence Feed',
    status: 'completed',
    startTime: '2026-02-09 13:00:00',
    duration: '3m 15s',
    progress: 100,
    lastRun: '2026-02-09 13:03:15',
    schedule: 'Every 2 hours',
    description: 'Ingests threat intelligence from multiple feeds'
  },
  {
    id: 'job-005',
    name: 'MITRE ATT&CK Mapping',
    status: 'failed',
    startTime: '2026-02-09 10:00:00',
    duration: '5m 02s',
    progress: 45,
    lastRun: '2026-02-09 10:05:02',
    schedule: 'Daily at 10:00',
    description: 'Maps vulnerabilities to MITRE ATT&CK techniques'
  },
  {
    id: 'job-006',
    name: 'Compliance Report Generation',
    status: 'completed',
    startTime: '2026-02-09 07:00:00',
    duration: '15m 30s',
    progress: 100,
    lastRun: '2026-02-09 07:15:30',
    schedule: 'Daily at 07:00',
    description: 'Generates ACN, SOX, LGPD compliance reports'
  },
  {
    id: 'job-007',
    name: 'Network Scan Results Import',
    status: 'running',
    startTime: '2026-02-09 14:45:00',
    duration: '3m 10s',
    progress: 35,
    lastRun: '2026-02-09 08:45:00',
    schedule: 'Every 6 hours',
    description: 'Imports scan results from network security tools'
  },
  {
    id: 'job-008',
    name: 'Data Retention Cleanup',
    status: 'scheduled',
    startTime: '-',
    duration: '-',
    progress: 0,
    lastRun: '2026-02-08 02:00:00',
    schedule: 'Daily at 02:00',
    description: 'Cleans up data based on retention policies'
  }
];

export const qualysConnection: QualysConnection = {
  status: 'connected',
  lastSync: '2026-02-09 14:30:00',
  assetsCount: 1247,
  rateLimit: { used: 245, limit: 500 },
  recentCalls: [
    { timestamp: '2026-02-09 14:30:00', endpoint: '/api/2.0/fo/asset/host/', status: 'success' },
    { timestamp: '2026-02-09 14:28:00', endpoint: '/api/2.0/fo/knowledge_base/vuln/', status: 'success' },
    { timestamp: '2026-02-09 14:25:00', endpoint: '/api/2.0/fo/scan/', status: 'success' },
    { timestamp: '2026-02-09 14:20:00', endpoint: '/api/2.0/fo/report/', status: 'error' },
    { timestamp: '2026-02-09 14:15:00', endpoint: '/api/2.0/fo/asset/host/', status: 'success' }
  ]
};

// Keep for backward compat - maps to new structure
export const dashboardMetrics = {
  totalVulnerabilities: {
    critical: dashboardData.bySeverity.critical.total,
    high: dashboardData.bySeverity.high.total,
    medium: dashboardData.bySeverity.medium.total,
    low: dashboardData.bySeverity.low.total
  },
  slaCompliance: dashboardData.summary.slaCompliance,
  scanCompletion: 92,
  riskTrend: -5.2,
  mttr: { critical: 2.3, high: 5.8, medium: 12.4, low: 25.1 },
  topAffectedAssets: [
    { name: 'vpn-gateway.corp.local', count: 4 },
    { name: 'mail.corp.local', count: 3 },
    { name: 'Multiple Workstations', count: 8 },
    { name: 'jenkins.dev.corp.local', count: 2 },
    { name: 'fw-prod-01.corp.local', count: 2 },
    { name: 'wiki.corp.local', count: 2 },
    { name: 'api-gateway.corp.local', count: 1 },
    { name: 'esxi-cluster-01.corp.local', count: 1 },
    { name: 'teamcity.dev.corp.local', count: 1 },
    { name: 'flowmon.corp.local', count: 1 }
  ],
  vulnerabilityTrend: [
    { date: 'Jan', critical: 5, high: 8, medium: 12, low: 6 },
    { date: 'Feb', critical: 7, high: 10, medium: 10, low: 5 },
    { date: 'Mar', critical: 6, high: 12, medium: 8, low: 4 },
    { date: 'Apr', critical: 8, high: 12, medium: 6, low: 4 }
  ],
  mitreDistribution: [
    { technique: 'T1190 - Exploit Public-Facing Application', count: 14 },
    { technique: 'T1059 - Command and Scripting', count: 8 },
    { technique: 'T1078 - Valid Accounts', count: 4 },
    { technique: 'T1068 - Exploitation for Privilege Escalation', count: 4 },
    { technique: 'T1083 - File and Directory Discovery', count: 2 },
    { technique: 'T1566 - Phishing', count: 1 }
  ]
};

export const scanProfiles = [
  { id: 'full', name: 'Full Vulnerability Scan' },
  { id: 'quick', name: 'Quick Security Assessment' },
  { id: 'compliance', name: 'Compliance Audit Scan (ACN/SOX/LGPD)' },
  { id: 'webapp', name: 'Web Application Scan' },
  { id: 'network', name: 'Network Discovery Scan' }
];

export const assetGroups = [
  { id: 'all', name: 'All Assets' },
  { id: 'layer1', name: 'Layer Risk 1 - Internet + Compliance' },
  { id: 'layer2', name: 'Layer Risk 2 - Internet' },
  { id: 'layer3', name: 'Layer Risk 3 - Interna + Compliance' },
  { id: 'layer4', name: 'Layer Risk 4 - Interna' },
  { id: 'eol', name: 'End-of-Life Assets' },
];

export const aiSuggestions = [
  'Analisar vulnerabilidades P1 e recomendar priorização',
  'Calcular exposure window para Layer Risk 1',
  'Gerar relatório de aging para ativos com compliance ACN',
  'Sugerir estratégia de remediação para vulnerabilidades CISA Critical',
  'Resumo executivo do status de vulnerabilidades por Layer Risk'
];
