import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Users, MapPin, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { candidates, pollingStations, incidents, timeSeriesData } from '../data/mockData';

export function Dashboard() {
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
  const totalVoters = pollingStations.reduce((sum, ps) => sum + ps.totalVoters, 0);
  const totalVoted = pollingStations.reduce((sum, ps) => sum + ps.votedCount, 0);
  const averageTurnout = (totalVoted / totalVoters) * 100;
  const activeStations = pollingStations.filter(ps => ps.status === 'active').length;
  const openIncidents = incidents.filter(i => i.status !== 'resolved').length;
  const criticalIncidents = incidents.filter(i => i.severity === 'critical').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-100 via-white to-green-100 dark:from-orange-950 dark:via-gray-800 dark:to-green-950 p-6 rounded-xl border-2 border-orange-200 dark:border-orange-800 shadow-lg">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent dark:from-orange-400 dark:to-green-400">
          Election Dashboard
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Real-time monitoring and analytics • भारत निर्वाचन</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-2 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Votes Cast</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{totalVotes.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              {totalVoted.toLocaleString()} voters out of {totalVoters.toLocaleString()}
            </p>
            <Progress value={averageTurnout} className="mt-2" />
            <p className="text-xs text-gray-500 mt-1">{averageTurnout.toFixed(1)}% turnout</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-2 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Polling Stations</CardTitle>
            <MapPin className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{activeStations}</div>
            <p className="text-xs text-gray-500 mt-1">out of {pollingStations.length} total stations</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                {pollingStations.filter(ps => ps.status === 'closed').length} Closed
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-2 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leading Candidate</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{candidates[0].name}</div>
            <p className="text-xs text-gray-500 mt-1">{candidates[0].party}</p>
            <div className="flex items-center gap-2 mt-2">
              <Progress value={candidates[0].percentage} className="flex-1" />
              <span className="text-sm font-medium">{candidates[0].percentage}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-2 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <AlertCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{openIncidents}</div>
            <p className="text-xs text-gray-500 mt-1">{incidents.length} total incidents</p>
            {criticalIncidents > 0 && (
              <div className="mt-2">
                <Badge variant="destructive" className="text-xs">
                  {criticalIncidents} Critical
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vote Distribution */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-2 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle>Candidate Vote Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={candidates}
                  dataKey="votes"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.percentage}%`}
                >
                  {candidates.map((candidate) => (
                    <Cell key={candidate.id} fill={candidate.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => value.toLocaleString()} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Votes Over Time */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-2 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle>Votes Cast Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip formatter={(value: number) => value.toLocaleString()} />
                <Line type="monotone" dataKey="votes" stroke="#053907" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Candidate Performance */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-2 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle>Candidate Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={candidates}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => value.toLocaleString()} />
              <Legend />
              <Bar dataKey="votes" radius={[8, 8, 0, 0]}>
  {candidates.map((entry) => (
    <Cell key={entry.id} fill={entry.color} />
  ))}
</Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity & Polling Stations Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Incidents */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-2 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incidents.slice(0, 5).map((incident) => (
                <div key={incident.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className={`mt-0.5 p-1.5 rounded-full ${
                    incident.severity === 'critical' ? 'bg-red-100' :
                    incident.severity === 'high' ? 'bg-orange-100' :
                    incident.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <AlertCircle className={`w-4 h-4 ${
                      incident.severity === 'critical' ? 'text-red-600' :
                      incident.severity === 'high' ? 'text-orange-600' :
                      incident.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{incident.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{incident.location}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={incident.status === 'resolved' ? 'secondary' : 'outline'} className="text-xs">
                        {incident.status}
                      </Badge>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {incident.reportedAt}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Polling Stations */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-2 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle>Polling Stations by Turnout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pollingStations
                .sort((a, b) => b.turnoutPercentage - a.turnoutPercentage)
                .slice(0, 6)
                .map((station) => (
                  <div key={station.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{station.name}</p>
                        <p className="text-xs text-gray-500">{station.district}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{station.turnoutPercentage}%</span>
                        <Badge 
                          variant={
                            station.status === 'active' ? 'default' : 
                            station.status === 'closed' ? 'secondary' : 
                            'outline'
                          }
                          className="text-xs"
                        >
                          {station.status}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={station.turnoutPercentage} />
                    <p className="text-xs text-gray-500">
                      {station.votedCount.toLocaleString()} / {station.totalVoters.toLocaleString()} voters
                    </p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}