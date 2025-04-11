
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calendar, Clock, Filter, Users, List, Eye, CalendarDays } from 'lucide-react';
import StatCard from '@/components/organization/StatCard';
import { organizationMockData } from '@/data/organizationMockData';

const OrganizationInterviews: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [filters, setFilters] = useState({
    status: 'all',
    date: 'all'
  });

  // Status badge configuration
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800">{status}</Badge>;
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800">{status}</Badge>;
      case 'Canceled':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800">{status}</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Filter interviews based on filters
  const filteredInterviews = organizationMockData.interviews.filter(interview => {
    if (filters.status !== 'all' && interview.status !== filters.status) return false;
    
    // Date filtering is just for show in this mock
    return true;
  });

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return format(date, 'MMM dd, yyyy • h:mm a');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Interview Management</h1>
        <p className="text-muted-foreground">View and manage your organization's interviews</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Interviews"
          value={organizationMockData.stats.totalInterviews}
          icon={<Calendar className="h-5 w-5" />}
        />
        <StatCard
          title="Upcoming Interviews"
          value={organizationMockData.stats.upcomingInterviews}
          icon={<Clock className="h-5 w-5" />}
        />
        <StatCard
          title="Completed Interviews"
          value={organizationMockData.stats.completedInterviews}
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          title="Open Positions"
          value={organizationMockData.stats.openPositions}
          icon={<CalendarDays className="h-5 w-5" />}
        />
      </div>

      {/* Filters and View Toggle */}
      <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-purple-600" />
              <span className="font-medium">Filter Interviews</span>
            </div>
            
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <Select
                value={filters.status}
                onValueChange={(value) => handleFilterChange('status', value)}
              >
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Canceled">Canceled</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.date}
                onValueChange={(value) => handleFilterChange('date', value)}
              >
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-md">
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'ghost'} 
                  size="sm"
                  className={viewMode === 'list' ? 'bg-white text-gray-800 shadow-sm dark:bg-gray-700 dark:text-white' : ''}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4 mr-1" />
                  List
                </Button>
                <Button 
                  variant={viewMode === 'calendar' ? 'default' : 'ghost'} 
                  size="sm"
                  className={viewMode === 'calendar' ? 'bg-white text-gray-800 shadow-sm dark:bg-gray-700 dark:text-white' : ''}
                  onClick={() => setViewMode('calendar')}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Calendar
                </Button>
              </div>
            </div>
          </div>

          {/* Applied Filters */}
          {(filters.status !== 'all' || filters.date !== 'all') && (
            <div className="flex flex-wrap gap-2 mt-4 items-center">
              <span className="text-sm text-gray-500">Applied Filters:</span>
              {filters.status !== 'all' && (
                <Badge variant="outline" className="bg-white dark:bg-gray-800">
                  Status: {filters.status}
                </Badge>
              )}
              {filters.date !== 'all' && (
                <Badge variant="outline" className="bg-white dark:bg-gray-800">
                  Date: {filters.date === 'today' ? 'Today' : filters.date === 'week' ? 'This Week' : 'This Month'}
                </Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs h-7 text-gray-500"
                onClick={() => setFilters({ status: 'all', date: 'all' })}
              >
                Clear All
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interviews Table */}
      {filteredInterviews.length > 0 ? (
        viewMode === 'list' ? (
          <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <TableHead>Interview ID</TableHead>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Interviewer</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInterviews.map((interview) => (
                    <TableRow key={interview.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <TableCell className="font-medium">{interview.id}</TableCell>
                      <TableCell>{interview.candidateName}</TableCell>
                      <TableCell>{interview.interviewer}</TableCell>
                      <TableCell>{formatDateTime(interview.dateTime)}</TableCell>
                      <TableCell>{getStatusBadge(interview.status)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {interview.skillsAssessed.map(skill => (
                            <Badge key={skill} variant="outline" className="bg-gray-50 text-xs dark:bg-gray-900">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" className="h-8">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        ) : (
          <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
            <CardContent className="p-4">
              <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-purple-600/50" />
                <h3 className="text-lg font-medium">Calendar View</h3>
                <p className="max-w-xs mx-auto mt-2">
                  Calendar view is available in the full version. This is a view-only mock.
                </p>
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-medium text-center">No Interviews Found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm mt-2">
              Try adjusting your filters or check back later for scheduled interviews.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrganizationInterviews;
