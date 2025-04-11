
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';
import { Info, DownloadCloud, HelpCircle } from 'lucide-react';
import { organizationMockData } from '@/data/organizationMockData';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { toast } from 'sonner';

const OrganizationAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('3months');
  const { analytics } = organizationMockData;

  // Custom colors for charts
  const colors = {
    scheduled: '#8b5cf6',
    completed: '#3b82f6',
    purple: '#8b5cf6',
    blue: '#3b82f6',
    green: '#10b981',
    yellow: '#f59e0b',
    red: '#ef4444',
  };

  const PIE_COLORS = [colors.blue, colors.green, colors.red, colors.yellow];

  const handleExportReport = () => {
    toast.info("This would download a report CSV in a real application.");
  };

  const handleCustomReportRequest = () => {
    toast.success("Request sent to your administrator");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics Dashboard</h1>
          <p className="text-muted-foreground">View insights and metrics about your hiring process</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select
            value={dateRange}
            onValueChange={setDateRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={handleExportReport}>
            <DownloadCloud className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
          <CardContent className="p-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">Average Time to Hire</div>
                <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="text-2xl font-bold">{analytics.metrics.averageTimeToHire}</div>
              <div className="text-xs text-gray-500">From application to offer</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
          <CardContent className="p-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">Interview Completion Rate</div>
                <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="text-2xl font-bold">{analytics.metrics.completionRate}%</div>
              <Progress 
                value={analytics.metrics.completionRate} 
                className="h-1.5 mt-1" 
                indicatorClassName={
                  analytics.metrics.completionRate > 70 ? "bg-green-500" :
                  analytics.metrics.completionRate > 50 ? "bg-yellow-500" :
                  "bg-red-500"
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
          <CardContent className="p-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">Time to Fill</div>
                <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="text-2xl font-bold">{analytics.metrics.timeToFill}</div>
              <div className="text-xs text-gray-500">Open position to placement</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
          <CardContent className="p-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">Candidate Drop-off Rate</div>
                <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="text-2xl font-bold">{analytics.metrics.candidateDropoffRate}%</div>
              <Progress 
                value={analytics.metrics.candidateDropoffRate} 
                className="h-1.5 mt-1" 
                indicatorClassName={
                  analytics.metrics.candidateDropoffRate > 25 ? "bg-red-500" :
                  analytics.metrics.candidateDropoffRate > 15 ? "bg-yellow-500" :
                  "bg-green-500"
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interview Trends Chart */}
        <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Interview Trends</span>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.interviewTrends} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.05)',
                      fontSize: '12px'
                    }} 
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="scheduled" 
                    name="Scheduled" 
                    stroke={colors.scheduled}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    name="Completed" 
                    stroke={colors.completed} 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Interviewer Performance Chart */}
        <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Interviewer Performance</span>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.interviewerPerformance} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.05)',
                      fontSize: '12px'
                    }} 
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                  <Bar 
                    dataKey="interviews" 
                    name="Interviews Conducted"
                    fill={colors.purple}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Candidate Status Chart */}
        <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Candidate Status</span>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <Pie
                    data={analytics.candidateStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="status"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {analytics.candidateStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value}`, `${name}`]}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.05)',
                      fontSize: '12px'
                    }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Request Custom Report */}
        <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
          <CardHeader>
            <CardTitle className="text-lg">Request Custom Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Need more detailed analytics or custom reporting? Our admin team can prepare specialized reports for your organization.
              </p>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-purple-700 dark:text-purple-300">Available Custom Reports:</h4>
                <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    Candidate Pipeline Analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    Department Hiring Performance
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    Skill Gap Assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                    Time-to-Hire Breakdown
                  </li>
                </ul>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                onClick={handleCustomReportRequest}
              >
                Request Custom Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationAnalytics;
