
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from '@/components/ui/card';
import { DateRange } from 'react-day-picker';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { 
  mockCompanies, 
  mockInterviewers, 
  mockInterviewStats,
  mockInterviewTrends,
  mockInterviewerPerformance,
  mockCompanyActivity,
  mockPlatformStats
} from '@/data/mockData';
import { 
  CalendarPlus, 
  ChevronRight, 
  Building, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  Clock,
  BarChart3,
  Download
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import InterviewTrendChart from '@/components/analytics/InterviewTrendChart';
import InterviewerPerformanceChart from '@/components/analytics/InterviewerPerformanceChart';
import CompanyActivityChart from '@/components/analytics/CompanyActivityChart';
import StatsCard from '@/components/analytics/StatsCard';
import { Badge } from '@/components/ui/badge';

const CompanyDetailPage: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 2, 1),
    to: new Date(2025, 2, 31)
  });
  
  // Find the company from mock data
  const company = mockCompanies.find(c => c.id === companyId);
  const interviewers = mockInterviewers[companyId || ''] || [];
  const stats = mockInterviewStats[companyId || ''] || { total: 0, upcoming: 0, completed: 0 };
  const trends = mockInterviewTrends[companyId || ''] || [];
  const performance = mockInterviewerPerformance[companyId || ''] || [];
  
  if (!company) {
    return <div className="p-4">Company not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{company.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {company.industry} <Badge variant="outline" className="ml-2">{company.interviewsCount} Interviews</Badge>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <DateRangePicker 
            dateRange={dateRange} 
            setDateRange={setDateRange} 
          />
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
          <Link to={`/dashboard/admin/companies/${companyId}/interviews/new`}>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0">
              <CalendarPlus className="mr-2 h-4 w-4" />
              Create Interview
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Interviews" 
          value={stats.total.toString()} 
          icon={<Calendar className="h-5 w-5" />} 
          bgClass="bg-gradient-to-br from-purple-500 to-indigo-600"
        />
        <StatsCard 
          title="Upcoming" 
          value={stats.upcoming.toString()} 
          icon={<CalendarPlus className="h-5 w-5" />} 
          bgClass="bg-gradient-to-br from-blue-500 to-cyan-600"
        />
        <StatsCard 
          title="Completed" 
          value={stats.completed.toString()} 
          icon={<BarChart3 className="h-5 w-5" />} 
          bgClass="bg-gradient-to-br from-green-500 to-emerald-600"
        />
        <StatsCard 
          title="Avg. Time to Hire" 
          value={mockPlatformStats.averageTimeToHire} 
          icon={<Clock className="h-5 w-5" />} 
          bgClass="bg-gradient-to-br from-amber-500 to-orange-600"
        />
      </div>
      
      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <InterviewTrendChart data={trends} />
        <InterviewerPerformanceChart data={performance} />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Building className="mr-2 h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p>{company.address}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <User className="mr-2 h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Contact Person</p>
                  <p>{company.contactPerson}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{company.email}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p>{company.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Date Added</p>
                  <p>{company.dateAdded}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <CompanyActivityChart data={mockCompanyActivity} />
      </div>
      
      <Card className="overflow-hidden border border-purple-100 dark:border-purple-900/20">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
          <CardTitle>Interviewers</CardTitle>
          <CardDescription>Interviewers associated with {company.name}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviewers.map((interviewer) => (
                <TableRow key={interviewer.id}>
                  <TableCell className="font-medium">{interviewer.name}</TableCell>
                  <TableCell>{interviewer.email}</TableCell>
                  <TableCell>{interviewer.role}</TableCell>
                  <TableCell className="text-right">
                    <Link to={`/dashboard/admin/interviewers/${interviewer.id}`}>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-purple-900/20"
                      >
                        View Dashboard
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDetailPage;
