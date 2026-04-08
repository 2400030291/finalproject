import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, MapPin, Users, Clock, TrendingUp } from 'lucide-react';
import { pollingStationsApi } from '../services/api';
import type { PollingStation } from '../services/api';

export function PollingStations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('all');
  const [allStations, setAllStations] = useState<PollingStation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStations() {
      try {
        const data = await pollingStationsApi.getAll();
        setAllStations(data);
      } catch (err) {
        console.error('Failed to fetch polling stations:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStations();
  }, []);

  const districts = Array.from(new Set(allStations.map(ps => ps.district)));

  const filteredStations = allStations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         station.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || station.status === statusFilter;
    const matchesDistrict = districtFilter === 'all' || station.district === districtFilter;
    return matchesSearch && matchesStatus && matchesDistrict;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reporting':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading polling stations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Polling Stations</h2>
        <p className="text-sm text-gray-500 mt-1">Monitor all polling stations in real-time</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reporting">Reporting</SelectItem>
              </SelectContent>
            </Select>
            <Select value={districtFilter} onValueChange={setDistrictFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by district" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                {districts.map(district => (
                  <SelectItem key={district} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {filteredStations.length} of {allStations.length} polling stations
        </p>
        <Button variant="outline" size="sm">
          Export Data
        </Button>
      </div>

      {/* Polling Stations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredStations.map((station) => (
          <Card key={station._id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{station.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {station.location}
                  </div>
                </div>
                <Badge className={getStatusColor(station.status)}>
                  {station.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* District & ID */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Station ID:</span>
                  <span className="font-medium">{station.stationId}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">District:</span>
                  <span className="font-medium">{station.district}</span>
                </div>

                {/* Voter Turnout */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">Voter Turnout</span>
                    </div>
                    <span className="font-semibold text-gray-900">{station.turnoutPercentage}%</span>
                  </div>
                  <Progress value={station.turnoutPercentage} />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{station.votedCount.toLocaleString()} voted</span>
                    <span>{station.totalVoters.toLocaleString()} total</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 rounded">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Remaining</p>
                      <p className="text-sm font-medium">{(station.totalVoters - station.votedCount).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-50 rounded">
                      <Clock className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Last Update</p>
                      <p className="text-sm font-medium">{station.lastUpdate}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Report Issue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStations.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No polling stations found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
