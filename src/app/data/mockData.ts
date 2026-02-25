export interface Candidate {
  id: string;
  name: string;
  party: string;
  color: string;
  votes: number;
  percentage: number;
}

export interface PollingStation {
  id: string;
  name: string;
  location: string;
  district: string;
  status: 'active' | 'closed' | 'pending' | 'reporting';
  totalVoters: number;
  votedCount: number;
  turnoutPercentage: number;
  lastUpdate: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved';
  location: string;
  reportedBy: string;
  reportedAt: string;
  pollingStationId: string;
}

export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Kiran Chowdary',
    party: 'TDP',
    color: '#f2ce00',
    votes: 245678,
    percentage: 43.5,
  },
  {
    id: '2',
    name: 'Surya Naidu',
    party: 'JSP',
    color: '#f12b2b',
    votes: 198543,
    percentage: 26.3,
  },
  {
    id: '3',
    name: 'Srinivas Reddy',
    party: 'YCP',
    color: '#1f5cb8',
    votes: 89234,
    percentage: 22.4,
  },
];

export const pollingStations: PollingStation[] = [
  {
    id: '520007',
    name: 'High School',
    location: 'Chitti Gunta',
    district: 'District 1',
    status: 'active',
    totalVoters: 2500,
    votedCount: 1875,
    turnoutPercentage: 75,
    lastUpdate: '10 minutes ago',
  },
  {
    id: '520010',
    name: 'Canal Road',
    location: 'Peddapalem',
    district: 'District 1',
    status: 'active',
    totalVoters: 1800,
    votedCount: 1260,
    turnoutPercentage: 70,
    lastUpdate: '5 minutes ago',
  },
  {
    id: '520009',
    name: 'Ghat Road',
    location: 'Obulapuram',
    district: 'District 2',
    status: 'reporting',
    totalVoters: 2200,
    votedCount: 1980,
    turnoutPercentage: 90,
    lastUpdate: '2 minutes ago',
  },
  {
    id: '520011',
    name: 'Church Road',
    location: 'Chintapalem',
    district: 'District 2',
    status: 'active',
    totalVoters: 1500,
    votedCount: 900,
    turnoutPercentage: 60,
    lastUpdate: '15 minutes ago',
  },
  {
    id: '520003',
    name: 'Fist Market',
    location: '2 Town',
    district: 'District 3',
    status: 'pending',
    totalVoters: 3000,
    votedCount: 450,
    turnoutPercentage: 15,
    lastUpdate: '30 minutes ago',
  },
];

export const incidents: Incident[] = [
  {
    id: 'INC001',
    title: 'Long Queue Wait Times',
    description: 'Voters reporting wait times exceeding 2 hours due to technical issues with voting machines.',
    severity: 'high',
    status: 'investigating',
    location: 'Central High School',
    reportedBy: 'Observer #234',
    reportedAt: '2 hours ago',
    pollingStationId: 'PS001',
  },
  {
    id: 'INC002',
    title: 'Missing Ballots',
    description: 'Shortage of ballot papers reported. Additional supplies requested.',
    severity: 'critical',
    status: 'resolved',
    location: 'Riverside Community Center',
    reportedBy: 'Station Manager',
    reportedAt: '4 hours ago',
    pollingStationId: 'PS002',
  },
  {
    id: 'INC003',
    title: 'Power Outage',
    description: 'Brief power outage affected voting machines. Backup power activated.',
    severity: 'medium',
    status: 'resolved',
    location: 'Oakwood Elementary',
    reportedBy: 'Observer #156',
    reportedAt: '3 hours ago',
    pollingStationId: 'PS003',
  },
  {
    id: 'INC004',
    title: 'Accessibility Concern',
    description: 'Wheelchair ramp blocked. Issue resolved within 15 minutes.',
    severity: 'low',
    status: 'resolved',
    location: 'Westside Library',
    reportedBy: 'Observer #089',
    reportedAt: '5 hours ago',
    pollingStationId: 'PS004',
  },
  {
    id: 'INC005',
    title: 'Voter Intimidation Reported',
    description: 'Reports of unauthorized individuals near polling station entrance. Security notified.',
    severity: 'critical',
    status: 'investigating',
    location: 'North Plaza Center',
    reportedBy: 'Observer #312',
    reportedAt: '1 hour ago',
    pollingStationId: 'PS005',
  },
];

export const timeSeriesData = [
  { time: '06:00', votes: 1250 },
  { time: '08:00', votes: 8920 },
  { time: '10:00', votes: 23450 },
  { time: '12:00', votes: 45230 },
  { time: '14:00', votes: 78900 },
  { time: '16:00', votes: 124560 },
  { time: '18:00', votes: 198340 },
  { time: '20:00', votes: 289650 },
  { time: '22:00', votes: 456780 },
  { time: 'Now', votes: 578578 },
];

export const districtResults = [
  { district: 'District 1', candidate1: 45000, candidate2: 38000, candidate3: 12000, candidate4: 5000 },
  { district: 'District 2', candidate1: 52000, candidate2: 41000, candidate3: 15000, candidate4: 8000 },
  { district: 'District 3', candidate1: 48000, candidate2: 44000, candidate3: 18000, candidate4: 10000 },
  { district: 'District 4', candidate1: 51000, candidate2: 39000, candidate3: 21000, candidate4: 9000 },
  { district: 'District 5', candidate1: 49678, candidate2: 36543, candidate3: 23234, candidate4: 13123 },
];
