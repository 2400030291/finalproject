const API_BASE = '/api';

// Helper to get auth headers
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// Generic fetch wrapper
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: getAuthHeaders(),
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }
  return res.json();
}

// ==================== AUTH ====================

export interface AuthResponse {
  token: string;
  user: { id: string; name: string; email: string; role: string };
}

export const authApi = {
  login: (email: string, password: string) =>
    apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string) =>
    apiFetch<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  me: () => apiFetch<any>('/auth/me'),
};

// ==================== CANDIDATES ====================

export interface Candidate {
  _id: string;
  name: string;
  party: string;
  color: string;
  votes: number;
  percentage: number;
}

export const candidatesApi = {
  getAll: () => apiFetch<Candidate[]>('/candidates'),
};

// ==================== POLLING STATIONS ====================

export interface PollingStation {
  _id: string;
  stationId: string;
  name: string;
  location: string;
  district: string;
  status: 'active' | 'closed' | 'pending' | 'reporting';
  totalVoters: number;
  votedCount: number;
  turnoutPercentage: number;
  lastUpdate: string;
}

export const pollingStationsApi = {
  getAll: (params?: { status?: string; district?: string }) => {
    const query = new URLSearchParams();
    if (params?.status) query.set('status', params.status);
    if (params?.district) query.set('district', params.district);
    const qs = query.toString();
    return apiFetch<PollingStation[]>(`/polling-stations${qs ? `?${qs}` : ''}`);
  },
};

// ==================== INCIDENTS ====================

export interface Incident {
  _id: string;
  incidentId: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved';
  location: string;
  reportedBy: string;
  reportedAt: string;
  pollingStationId: string;
}

export const incidentsApi = {
  getAll: (params?: { severity?: string; status?: string }) => {
    const query = new URLSearchParams();
    if (params?.severity) query.set('severity', params.severity);
    if (params?.status) query.set('status', params.status);
    const qs = query.toString();
    return apiFetch<Incident[]>(`/incidents${qs ? `?${qs}` : ''}`);
  },

  create: (data: {
    title: string;
    description: string;
    severity: string;
    location: string;
    reportedBy: string;
    pollingStationId: string;
  }) =>
    apiFetch<Incident>('/incidents', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// ==================== RESULTS ====================

export interface TimeSeriesDataPoint {
  time: string;
  votes: number;
}

export interface DistrictResult {
  district: string;
  candidate1: number;
  candidate2: number;
  candidate3: number;
  candidate4: number;
}

export const resultsApi = {
  getTimeSeries: () => apiFetch<TimeSeriesDataPoint[]>('/results/time-series'),
  getDistricts: () => apiFetch<DistrictResult[]>('/results/districts'),
};

// ==================== DASHBOARD ====================

export interface DashboardSummary {
  totalVotes: number;
  totalVoters: number;
  totalVoted: number;
  averageTurnout: number;
  activeStations: number;
  totalStations: number;
  openIncidents: number;
  criticalIncidents: number;
  totalIncidents: number;
  leadingCandidate: Candidate | null;
}

export const dashboardApi = {
  getSummary: () => apiFetch<DashboardSummary>('/dashboard/summary'),
};
