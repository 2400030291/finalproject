import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { FileText, Download, Calendar, TrendingUp, Users, AlertTriangle, FileBarChart } from 'lucide-react';
import { dashboardApi } from '../services/api';
import type { DashboardSummary } from '../services/api';

export function Reports() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const data = await dashboardApi.getSummary();
        setSummary(data);
      } catch (err) {
        console.error('Failed to fetch summary:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, []);

  const totalVotes = summary?.totalVotes ?? 0;
  const turnout = summary?.averageTurnout?.toFixed(1) ?? '0';
  const stationCount = summary?.totalStations ?? 0;
  const openIncidents = summary?.openIncidents ?? 0;

  const reports = [
    {
      id: 'R001',
      title: 'Hourly Vote Count Report',
      description: 'Comprehensive breakdown of votes cast per hour across all polling stations',
      type: 'Vote Analysis',
      generatedAt: '2 minutes ago',
      size: '2.4 MB',
      format: 'PDF',
    },
    {
      id: 'R002',
      title: 'Polling Station Performance',
      description: 'Analysis of turnout rates, efficiency, and operational metrics by station',
      type: 'Operations',
      generatedAt: '15 minutes ago',
      size: '1.8 MB',
      format: 'PDF',
    },
    {
      id: 'R003',
      title: 'Incident Summary Report',
      description: 'Detailed log of all reported incidents including severity and resolution status',
      type: 'Incidents',
      generatedAt: '30 minutes ago',
      size: '896 KB',
      format: 'PDF',
    },
    {
      id: 'R004',
      title: 'District-wise Results',
      description: 'Vote distribution and candidate performance across all electoral districts',
      type: 'Results',
      generatedAt: '45 minutes ago',
      size: '3.1 MB',
      format: 'PDF',
    },
    {
      id: 'R005',
      title: 'Real-time Dashboard Export',
      description: 'Complete snapshot of all current metrics and statistics',
      type: 'Dashboard',
      generatedAt: '1 hour ago',
      size: '1.2 MB',
      format: 'Excel',
    },
    {
      id: 'R006',
      title: 'Voter Turnout Analysis',
      description: 'Demographic breakdown and turnout patterns by time and location',
      type: 'Analytics',
      generatedAt: '2 hours ago',
      size: '2.7 MB',
      format: 'PDF',
    },
  ];

  const quickStats = [
    {
      title: 'Total Reports Generated',
      value: '24',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Last Generated',
      value: '2 mins ago',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Downloads',
      value: '156',
      icon: Download,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">Generate and download comprehensive reports</p>
        </div>
        <Button>
          <FileBarChart className="w-4 h-4 mr-2" />
          Generate Custom Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Executive Summary */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-600" />
                <p className="text-xs text-gray-500">Total Votes</p>
              </div>
              <p className="text-xl font-semibold text-gray-900">{totalVotes.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <p className="text-xs text-gray-500">Voter Turnout</p>
              </div>
              <p className="text-xl font-semibold text-gray-900">{turnout}%</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-purple-600" />
                <p className="text-xs text-gray-500">Active Stations</p>
              </div>
              <p className="text-xl font-semibold text-gray-900">{stationCount}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <p className="text-xs text-gray-500">Open Incidents</p>
              </div>
              <p className="text-xl font-semibold text-gray-900">{openIncidents}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="default" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Full Summary
            </Button>
            <Button variant="outline" size="sm">
              Email Summary
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-start justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium text-gray-900">{report.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {report.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {report.generatedAt}
                      </span>
                      <span>{report.size}</span>
                      <Badge variant="outline" className="text-xs">
                        {report.format}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <FileText className="w-5 h-5" />
              <span className="text-sm">Export All Data</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm">Turnout Report</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm">Incident Log</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <FileBarChart className="w-5 h-5" />
              <span className="text-sm">Custom Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
