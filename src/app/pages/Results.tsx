import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Trophy, TrendingUp, Users } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { candidates, districtResults } from '../data/mockData';

export function Results() {
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
  const leadingCandidate = candidates[0];
  const secondPlace = candidates[1];
  const voteDifference = leadingCandidate.votes - secondPlace.votes;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Election Results</h2>
        <p className="text-sm text-gray-500 mt-1">Live vote counts and analytics</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{totalVotes.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Votes counted so far</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leading Candidate</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{leadingCandidate.name}</div>
            <p className="text-xs text-gray-500 mt-1">{leadingCandidate.percentage}% of votes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vote Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{voteDifference.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">votes ahead of second place</p>
          </CardContent>
        </Card>
      </div>

      {/* Candidate Results */}
      <Card>
        <CardHeader>
          <CardTitle>Candidate Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {candidates.map((candidate, index) => (
              <div key={candidate.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{candidate.name}</p>
                      <p className="text-sm text-gray-500">{candidate.party}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">{candidate.votes.toLocaleString()}</p>
                    <Badge style={{ backgroundColor: candidate.color, borderColor: candidate.color }}>
                      {candidate.percentage}%
                    </Badge>
                  </div>
                </div>
                <Progress value={candidate.percentage} style={{ backgroundColor: `${candidate.color}20` }}>
                  <div 
                    className="h-full transition-all rounded-full"
                    style={{ 
                      width: `${candidate.percentage}%`,
                      backgroundColor: candidate.color
                    }}
                  />
                </Progress>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analytics */}
      <Tabs defaultValue="distribution" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="distribution">Vote Distribution</TabsTrigger>
          <TabsTrigger value="districts">By District</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vote Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={candidates}
                    dataKey="votes"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={140}
                    label={(entry) => `${entry.name}: ${entry.percentage}%`}
                  >
                    {candidates.map((candidate) => (
                      <Cell key={candidate.id} fill={candidate.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => value.toLocaleString()} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="districts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Results by District</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={districtResults}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="district" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => value.toLocaleString()} />
                  <Legend />
                  <Bar dataKey="candidate1" name={candidates[0].name} fill={candidates[0].color} />
                  <Bar dataKey="candidate2" name={candidates[1].name} fill={candidates[1].color} />
                  <Bar dataKey="candidate3" name={candidates[2].name} fill={candidates[2].color} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* District Summary Table */}
          <Card>
            <CardHeader>
              <CardTitle>District Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-3 px-4">District</th>
                      {candidates.map((candidate) => (
                        <th key={candidate.id} className="text-right py-3 px-4">{candidate.name}</th>
                      ))}
                      <th className="text-right py-3 px-4">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {districtResults.map((district, idx) => {
                      const total = district.candidate1 + district.candidate2 + district.candidate3 + district.candidate4;
                      return (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 px-4 font-medium">{district.district}</td>
                          <td className="text-right py-3 px-4">{district.candidate1.toLocaleString()}</td>
                          <td className="text-right py-3 px-4">{district.candidate2.toLocaleString()}</td>
                          <td className="text-right py-3 px-4">{district.candidate3.toLocaleString()}</td>
                          <td className="text-right py-3 px-4">{district.candidate4.toLocaleString()}</td>
                          <td className="text-right py-3 px-4 font-semibold">{total.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Head-to-Head Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={candidates} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip formatter={(value: number) => value.toLocaleString()} />
                  <Bar dataKey="votes" radius={[0, 8, 8, 0]}>
                    {candidates.map((candidate) => (
                      <Cell key={candidate.id} fill={candidate.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Vote Share Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {candidates.map((candidate) => (
              <Card key={candidate.id}>
                <CardHeader>
                  <CardTitle className="text-base">{candidate.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">Vote Share</span>
                        <span className="text-sm font-medium">{candidate.percentage}%</span>
                      </div>
                      <Progress value={candidate.percentage} />
                    </div>
                    <div className="pt-3 border-t">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Total Votes</span>
                        <span className="text-sm font-semibold">{candidate.votes.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-500">Party</span>
                        <span className="text-sm font-medium">{candidate.party}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
