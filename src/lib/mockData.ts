// Mock data for VMS Portal

export interface Vulnerability {
  id: string;
  cveId: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  cvssScore: number;
  asset: string;
  assetType: string;
  detectedDate: string;
  status: 'open' | 'in_progress' | 'remediated' | 'accepted';
  mitreAttack: string[];
  exploitability: 'active' | 'poc' | 'theoretical' | 'none';
  priorityScore: number;
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

export const vulnerabilities: Vulnerability[] = [
  {
    id: 'vuln-001',
    cveId: 'CVE-2024-21762',
    title: 'FortiOS Out-of-Bound Write Vulnerability',
    severity: 'critical',
    cvssScore: 9.8,
    asset: 'fw-prod-01.corp.local',
    assetType: 'Firewall',
    detectedDate: '2024-02-08',
    status: 'open',
    mitreAttack: ['T1190', 'T1059'],
    exploitability: 'active',
    priorityScore: 98,
    description: 'A out-of-bounds write vulnerability in FortiOS allows a remote unauthenticated attacker to execute arbitrary code or command via specially crafted HTTP requests.',
    remediationSteps: ['Upgrade FortiOS to version 7.4.3 or later', 'Apply virtual patch if immediate upgrade not possible', 'Enable IPS signatures'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-21762', 'https://fortiguard.com/psirt/FG-IR-24-015']
  },
  {
    id: 'vuln-002',
    cveId: 'CVE-2024-1709',
    title: 'ConnectWise ScreenConnect Authentication Bypass',
    severity: 'critical',
    cvssScore: 10.0,
    asset: 'rmm-server.corp.local',
    assetType: 'Server',
    detectedDate: '2024-02-19',
    status: 'in_progress',
    mitreAttack: ['T1190', 'T1078'],
    exploitability: 'active',
    priorityScore: 100,
    description: 'An authentication bypass vulnerability in ConnectWise ScreenConnect allows an attacker to create administrator accounts and execute remote code.',
    remediationSteps: ['Update ScreenConnect to version 23.9.8 or later immediately', 'Review access logs for unauthorized access', 'Reset all administrator credentials'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-1709']
  },
  {
    id: 'vuln-003',
    cveId: 'CVE-2024-0204',
    title: 'GoAnywhere MFT Authentication Bypass',
    severity: 'critical',
    cvssScore: 9.8,
    asset: 'file-transfer.corp.local',
    assetType: 'Server',
    detectedDate: '2024-01-22',
    status: 'remediated',
    mitreAttack: ['T1190'],
    exploitability: 'active',
    priorityScore: 95,
    description: 'Authentication bypass in Fortra GoAnywhere MFT prior to 7.4.1 allows an unauthorized user to create an admin user via the administration portal.',
    remediationSteps: ['Upgrade to GoAnywhere MFT 7.4.1 or later', 'Review admin accounts for unauthorized users'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-0204']
  },
  {
    id: 'vuln-004',
    cveId: 'CVE-2023-46805',
    title: 'Ivanti Connect Secure Auth Bypass',
    severity: 'critical',
    cvssScore: 8.2,
    asset: 'vpn-gateway.corp.local',
    assetType: 'VPN',
    detectedDate: '2024-01-10',
    status: 'open',
    mitreAttack: ['T1190', 'T1059', 'T1505.003'],
    exploitability: 'active',
    priorityScore: 92,
    description: 'An authentication bypass vulnerability in Ivanti Connect Secure and Policy Secure allows a remote attacker to access restricted resources.',
    remediationSteps: ['Apply Ivanti mitigation XML', 'Monitor for indicators of compromise', 'Plan upgrade to patched version'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2023-46805']
  },
  {
    id: 'vuln-005',
    cveId: 'CVE-2024-23897',
    title: 'Jenkins CLI Arbitrary File Read',
    severity: 'high',
    cvssScore: 7.5,
    asset: 'jenkins.dev.corp.local',
    assetType: 'Server',
    detectedDate: '2024-01-24',
    status: 'open',
    mitreAttack: ['T1083', 'T1552'],
    exploitability: 'poc',
    priorityScore: 78,
    description: 'Jenkins CLI contains an arbitrary file read vulnerability through the built-in CLI command parser.',
    remediationSteps: ['Upgrade Jenkins to 2.442 or LTS 2.426.3', 'Disable CLI if not in use', 'Restrict network access to Jenkins'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-23897']
  },
  {
    id: 'vuln-006',
    cveId: 'CVE-2024-21413',
    title: 'Microsoft Outlook Remote Code Execution',
    severity: 'high',
    cvssScore: 8.8,
    asset: 'Multiple Workstations',
    assetType: 'Endpoint',
    detectedDate: '2024-02-13',
    status: 'in_progress',
    mitreAttack: ['T1566', 'T1059'],
    exploitability: 'poc',
    priorityScore: 85,
    description: 'A remote code execution vulnerability in Microsoft Outlook allows attackers to execute code via malicious links.',
    remediationSteps: ['Apply February 2024 Patch Tuesday updates', 'Enable Protected View', 'Block external content in emails'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-21413']
  },
  {
    id: 'vuln-007',
    cveId: 'CVE-2024-20931',
    title: 'Cisco IOS XE Web UI Privilege Escalation',
    severity: 'high',
    cvssScore: 7.2,
    asset: 'core-switch-01.corp.local',
    assetType: 'Network',
    detectedDate: '2024-01-28',
    status: 'accepted',
    mitreAttack: ['T1068'],
    exploitability: 'theoretical',
    priorityScore: 65,
    description: 'A vulnerability in the web UI of Cisco IOS XE Software could allow privilege escalation.',
    remediationSteps: ['Upgrade to patched IOS XE version', 'Disable web UI if not required', 'Implement ACLs for management access'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-20931']
  },
  {
    id: 'vuln-008',
    cveId: 'CVE-2024-22024',
    title: 'Ivanti Connect Secure XXE Vulnerability',
    severity: 'high',
    cvssScore: 8.3,
    asset: 'vpn-gateway.corp.local',
    assetType: 'VPN',
    detectedDate: '2024-02-08',
    status: 'open',
    mitreAttack: ['T1190'],
    exploitability: 'active',
    priorityScore: 88,
    description: 'An XML external entity vulnerability in Ivanti Connect Secure SAML component.',
    remediationSteps: ['Apply latest Ivanti patches', 'Disable SAML if not in use', 'Monitor for exploitation attempts'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-22024']
  },
  {
    id: 'vuln-009',
    cveId: 'CVE-2023-48788',
    title: 'Fortinet FortiClientEMS SQL Injection',
    severity: 'critical',
    cvssScore: 9.8,
    asset: 'ems-server.corp.local',
    assetType: 'Server',
    detectedDate: '2024-03-12',
    status: 'open',
    mitreAttack: ['T1190', 'T1059'],
    exploitability: 'active',
    priorityScore: 96,
    description: 'An improper neutralization of special elements used in an SQL Command in FortiClientEMS allows an unauthenticated attacker to execute unauthorized code.',
    remediationSteps: ['Upgrade FortiClientEMS to 7.2.3 or 7.0.11', 'Apply network segmentation', 'Monitor for indicators of compromise'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2023-48788']
  },
  {
    id: 'vuln-010',
    cveId: 'CVE-2024-27198',
    title: 'JetBrains TeamCity Auth Bypass',
    severity: 'critical',
    cvssScore: 9.8,
    asset: 'teamcity.dev.corp.local',
    assetType: 'Server',
    detectedDate: '2024-03-04',
    status: 'remediated',
    mitreAttack: ['T1190', 'T1078'],
    exploitability: 'active',
    priorityScore: 97,
    description: 'An authentication bypass vulnerability in JetBrains TeamCity allows unauthenticated remote code execution.',
    remediationSteps: ['Upgrade TeamCity to 2023.11.4 or later', 'Review for unauthorized admin accounts', 'Check for deployed artifacts tampering'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-27198']
  },
  {
    id: 'vuln-011',
    cveId: 'CVE-2024-3400',
    title: 'Palo Alto PAN-OS Command Injection',
    severity: 'critical',
    cvssScore: 10.0,
    asset: 'fw-perimeter-01.corp.local',
    assetType: 'Firewall',
    detectedDate: '2024-04-12',
    status: 'in_progress',
    mitreAttack: ['T1190', 'T1059'],
    exploitability: 'active',
    priorityScore: 100,
    description: 'A command injection vulnerability in GlobalProtect feature of Palo Alto Networks PAN-OS allows unauthenticated remote code execution.',
    remediationSteps: ['Apply hotfix immediately', 'Enable Threat Prevention signatures', 'Disable GlobalProtect if possible until patched'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-3400']
  },
  {
    id: 'vuln-012',
    cveId: 'CVE-2024-1086',
    title: 'Linux Kernel Use-After-Free',
    severity: 'high',
    cvssScore: 7.8,
    asset: 'Multiple Linux Servers',
    assetType: 'Server',
    detectedDate: '2024-02-15',
    status: 'in_progress',
    mitreAttack: ['T1068'],
    exploitability: 'poc',
    priorityScore: 72,
    description: 'A use-after-free vulnerability in the Linux kernel netfilter subsystem allows local privilege escalation.',
    remediationSteps: ['Update kernel to patched version', 'Apply vendor-specific patches', 'Monitor for privilege escalation attempts'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-1086']
  },
  {
    id: 'vuln-013',
    cveId: 'CVE-2024-21351',
    title: 'Windows SmartScreen Bypass',
    severity: 'medium',
    cvssScore: 5.4,
    asset: 'Multiple Workstations',
    assetType: 'Endpoint',
    detectedDate: '2024-02-13',
    status: 'open',
    mitreAttack: ['T1218'],
    exploitability: 'active',
    priorityScore: 55,
    description: 'A security feature bypass in Windows SmartScreen allows bypassing Mark-of-the-Web protections.',
    remediationSteps: ['Apply February 2024 security updates', 'Enable Attack Surface Reduction rules', 'User awareness training'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-21351']
  },
  {
    id: 'vuln-014',
    cveId: 'CVE-2024-0519',
    title: 'Chrome V8 Out-of-Bounds Memory Access',
    severity: 'high',
    cvssScore: 8.8,
    asset: 'Multiple Workstations',
    assetType: 'Endpoint',
    detectedDate: '2024-01-16',
    status: 'remediated',
    mitreAttack: ['T1189'],
    exploitability: 'active',
    priorityScore: 82,
    description: 'An out-of-bounds memory access in V8 JavaScript engine allows remote code execution via crafted HTML page.',
    remediationSteps: ['Update Chrome to version 120.0.6099.234 or later', 'Enable auto-updates', 'Consider site isolation'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-0519']
  },
  {
    id: 'vuln-015',
    cveId: 'CVE-2024-23334',
    title: 'aiohttp Path Traversal',
    severity: 'medium',
    cvssScore: 5.9,
    asset: 'api-gateway.corp.local',
    assetType: 'Server',
    detectedDate: '2024-01-29',
    status: 'open',
    mitreAttack: ['T1083'],
    exploitability: 'theoretical',
    priorityScore: 45,
    description: 'A path traversal vulnerability in aiohttp when following symlinks allows reading arbitrary files.',
    remediationSteps: ['Update aiohttp to 3.9.2 or later', 'Disable symlink following', 'Review static file serving configuration'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-23334']
  },
  {
    id: 'vuln-016',
    cveId: 'CVE-2024-22252',
    title: 'VMware ESXi Use-After-Free',
    severity: 'critical',
    cvssScore: 9.3,
    asset: 'esxi-cluster-01.corp.local',
    assetType: 'Hypervisor',
    detectedDate: '2024-03-05',
    status: 'open',
    mitreAttack: ['T1190'],
    exploitability: 'poc',
    priorityScore: 90,
    description: 'A use-after-free vulnerability in VMware ESXi allows code execution on the host from a VM.',
    remediationSteps: ['Apply ESXi patches immediately', 'Review VM guest permissions', 'Enable host firewall rules'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-22252']
  },
  {
    id: 'vuln-017',
    cveId: 'CVE-2024-21378',
    title: 'Microsoft Exchange Server RCE',
    severity: 'high',
    cvssScore: 8.0,
    asset: 'mail.corp.local',
    assetType: 'Server',
    detectedDate: '2024-02-13',
    status: 'in_progress',
    mitreAttack: ['T1190', 'T1059'],
    exploitability: 'poc',
    priorityScore: 80,
    description: 'A remote code execution vulnerability in Microsoft Exchange Server allows authenticated attackers to execute code.',
    remediationSteps: ['Apply February 2024 cumulative update', 'Enable Extended Protection', 'Review mailbox permissions'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-21378']
  },
  {
    id: 'vuln-018',
    cveId: 'CVE-2024-20698',
    title: 'Windows Kernel Privilege Escalation',
    severity: 'medium',
    cvssScore: 6.7,
    asset: 'Multiple Workstations',
    assetType: 'Endpoint',
    detectedDate: '2024-01-09',
    status: 'remediated',
    mitreAttack: ['T1068'],
    exploitability: 'theoretical',
    priorityScore: 50,
    description: 'A privilege escalation vulnerability in Windows Kernel allows local attackers to gain SYSTEM privileges.',
    remediationSteps: ['Apply January 2024 security updates', 'Implement least privilege', 'Enable Credential Guard'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-20698']
  },
  {
    id: 'vuln-019',
    cveId: 'CVE-2024-2389',
    title: 'Progress Flowmon Command Injection',
    severity: 'critical',
    cvssScore: 10.0,
    asset: 'flowmon.corp.local',
    assetType: 'Network',
    detectedDate: '2024-04-02',
    status: 'open',
    mitreAttack: ['T1190', 'T1059'],
    exploitability: 'active',
    priorityScore: 99,
    description: 'An unauthenticated command injection vulnerability in Progress Flowmon allows arbitrary command execution.',
    remediationSteps: ['Apply Flowmon patches immediately', 'Restrict management interface access', 'Monitor for exploitation'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-2389']
  },
  {
    id: 'vuln-020',
    cveId: 'CVE-2024-21683',
    title: 'Atlassian Confluence RCE',
    severity: 'high',
    cvssScore: 8.8,
    asset: 'wiki.corp.local',
    assetType: 'Server',
    detectedDate: '2024-01-16',
    status: 'open',
    mitreAttack: ['T1190'],
    exploitability: 'active',
    priorityScore: 86,
    description: 'A template injection vulnerability in Atlassian Confluence allows authenticated remote code execution.',
    remediationSteps: ['Upgrade Confluence to latest version', 'Restrict macro usage', 'Review user permissions'],
    references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-21683']
  }
];

export const etlJobs: ETLJob[] = [
  {
    id: 'job-001',
    name: 'Qualys Vulnerability Sync',
    status: 'running',
    startTime: '2024-04-15 14:30:00',
    duration: '12m 45s',
    progress: 67,
    lastRun: '2024-04-15 08:30:00',
    schedule: 'Every 6 hours',
    description: 'Synchronizes vulnerability data from Qualys VMDR API'
  },
  {
    id: 'job-002',
    name: 'Asset Inventory Update',
    status: 'completed',
    startTime: '2024-04-15 12:00:00',
    duration: '8m 22s',
    progress: 100,
    lastRun: '2024-04-15 12:08:22',
    schedule: 'Every 4 hours',
    description: 'Updates asset inventory from multiple sources'
  },
  {
    id: 'job-003',
    name: 'Risk Score Calculation',
    status: 'scheduled',
    startTime: '-',
    duration: '-',
    progress: 0,
    lastRun: '2024-04-15 06:00:00',
    schedule: 'Daily at 06:00',
    description: 'Calculates risk scores using FAIR methodology'
  },
  {
    id: 'job-004',
    name: 'Threat Intelligence Feed',
    status: 'completed',
    startTime: '2024-04-15 13:00:00',
    duration: '3m 15s',
    progress: 100,
    lastRun: '2024-04-15 13:03:15',
    schedule: 'Every 2 hours',
    description: 'Ingests threat intelligence from multiple feeds'
  },
  {
    id: 'job-005',
    name: 'MITRE ATT&CK Mapping',
    status: 'failed',
    startTime: '2024-04-15 10:00:00',
    duration: '5m 02s',
    progress: 45,
    lastRun: '2024-04-15 10:05:02',
    schedule: 'Daily at 10:00',
    description: 'Maps vulnerabilities to MITRE ATT&CK techniques'
  },
  {
    id: 'job-006',
    name: 'Compliance Report Generation',
    status: 'completed',
    startTime: '2024-04-15 07:00:00',
    duration: '15m 30s',
    progress: 100,
    lastRun: '2024-04-15 07:15:30',
    schedule: 'Daily at 07:00',
    description: 'Generates compliance reports for various frameworks'
  },
  {
    id: 'job-007',
    name: 'Network Scan Results Import',
    status: 'running',
    startTime: '2024-04-15 14:45:00',
    duration: '3m 10s',
    progress: 35,
    lastRun: '2024-04-15 08:45:00',
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
    lastRun: '2024-04-14 02:00:00',
    schedule: 'Daily at 02:00',
    description: 'Cleans up data based on retention policies'
  }
];

export const qualysConnection: QualysConnection = {
  status: 'connected',
  lastSync: '2024-04-15 14:30:00',
  assetsCount: 1247,
  rateLimit: { used: 245, limit: 500 },
  recentCalls: [
    { timestamp: '2024-04-15 14:30:00', endpoint: '/api/2.0/fo/asset/host/', status: 'success' },
    { timestamp: '2024-04-15 14:28:00', endpoint: '/api/2.0/fo/knowledge_base/vuln/', status: 'success' },
    { timestamp: '2024-04-15 14:25:00', endpoint: '/api/2.0/fo/scan/', status: 'success' },
    { timestamp: '2024-04-15 14:20:00', endpoint: '/api/2.0/fo/report/', status: 'error' },
    { timestamp: '2024-04-15 14:15:00', endpoint: '/api/2.0/fo/asset/host/', status: 'success' }
  ]
};

export const dashboardMetrics = {
  totalVulnerabilities: {
    critical: 8,
    high: 12,
    medium: 6,
    low: 4
  },
  slaCompliance: 78,
  scanCompletion: 92,
  riskTrend: -5.2,
  mttr: {
    critical: 2.3,
    high: 5.8,
    medium: 12.4,
    low: 25.1
  },
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
  { id: 'compliance', name: 'Compliance Audit Scan' },
  { id: 'webapp', name: 'Web Application Scan' },
  { id: 'network', name: 'Network Discovery Scan' }
];

export const assetGroups = [
  { id: 'all', name: 'All Assets' },
  { id: 'servers', name: 'Production Servers' },
  { id: 'workstations', name: 'Workstations' },
  { id: 'network', name: 'Network Devices' },
  { id: 'cloud', name: 'Cloud Infrastructure' },
  { id: 'dmz', name: 'DMZ Assets' }
];

export const aiSuggestions = [
  'Analyze critical vulnerabilities and provide prioritization recommendations',
  'Enrich CVE-2024-3400 with threat intelligence context',
  'Calculate risk score for vpn-gateway.corp.local',
  'Suggest remediation strategy for FortiOS vulnerabilities',
  'Generate executive summary of current security posture'
];
