
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InterviewsList from '@/components/interviews/InterviewsList';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Clock, Filter, Plus, Briefcase, X, BarChart } from 'lucide-react';
import { toast } from 'sonner';

const InterviewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'this-week',
    status: 'all',
    skill: 'all'
  });

  // Mock stats
  const interviewStats = {
    total: 25,
    scheduled: 10,
    completed: 12,
    canceled: 3
  };

  const handleAssignBySkill = () => {
    navigate('/dashboard/admin/skills');
    toast.info('Redirected to Skills Management to assign an interviewer by skill');
  };

  const clearFilters = () => {
    setFilters({
      dateRange: 'all',
      status: 'all',
      skill: 'all'
    });
    toast.success('Filters cleared');
  };

  const handleFilterChange = (key: string, value: string) => {
    setLoading(true);
    setFilters(prev => ({ ...prev, [key]: value }));
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manage Interviews</h1>
          <p className="text-muted-foreground">Schedule and manage technical interviews</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={() => navigate('/dashboard/interviews/schedule')} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
            <Plus className="h-4 w-4 mr-2" /> Schedule Interview
          </Button>
          <Button variant="outline" onClick={handleAssignBySkill}>
            <Briefcase className="h-4 w-4 mr-2" /> Assign by Skill
          </Button>
        </div>
      </div>
      
      {/* Stats Widget */}
      <Card className="mb-6 bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Total Interviews</span>
              <div className="flex items-center mt-1">
                <BarChart className="h-5 w-5 mr-2 text-purple-500" />
                <span className="text-2xl font-bold">{interviewStats.total}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Scheduled</span>
              <div className="flex items-center mt-1">
                <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                <span className="text-2xl font-bold">{interviewStats.scheduled}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Completed</span>
              <div className="flex items-center mt-1">
                <div className="h-5 w-5 mr-2 rounded-full bg-green-500 flex items-center justify-center text-white">
                  ✓
                </div>
                <span className="text-2xl font-bold">{interviewStats.completed}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Canceled</span>
              <div className="flex items-center mt-1">
                <div className="h-5 w-5 mr-2 rounded-full bg-red-500 flex items-center justify-center text-white">
                  ✕
                </div>
                <span className="text-2xl font-bold">{interviewStats.canceled}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <h2 className="text-lg font-medium flex items-center">
            <Filter className="h-5 w-5 mr-2 text-purple-600" /> Filter Interviews
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full sm:w-auto">
            <Select 
              value={filters.dateRange}
              onValueChange={(value) => handleFilterChange('dateRange', value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]" aria-label="Select date range">
                <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Date Range</SelectLabel>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                  <SelectItem value="all">All Dates</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]" aria-label="Select status">
                <Clock className="h-4 w-4 mr-2 text-purple-600" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Select
              value={filters.skill}
              onValueChange={(value) => handleFilterChange('skill', value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]" aria-label="Select skill">
                <Briefcase className="h-4 w-4 mr-2 text-purple-600" />
                <SelectValue placeholder="Skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Skill</SelectLabel>
                  <SelectItem value="all">All Skills</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Applied Filters */}
        {(filters.dateRange !== 'all' || filters.status !== 'all' || filters.skill !== 'all') && (
          <div className="flex flex-wrap gap-2 mt-4 items-center">
            <span className="text-sm text-gray-500">Applied Filters:</span>
            {filters.dateRange !== 'all' && (
              <Badge variant="outline" className="flex items-center gap-1 bg-white dark:bg-gray-800">
                Date: {filters.dateRange.replace('-', ' ')}
                <button onClick={() => handleFilterChange('dateRange', 'all')} className="ml-1 hover:text-red-500">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.status !== 'all' && (
              <Badge variant="outline" className="flex items-center gap-1 bg-white dark:bg-gray-800">
                Status: {filters.status}
                <button onClick={() => handleFilterChange('status', 'all')} className="ml-1 hover:text-red-500">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.skill !== 'all' && (
              <Badge variant="outline" className="flex items-center gap-1 bg-white dark:bg-gray-800">
                Skill: {filters.skill}
                <button onClick={() => handleFilterChange('skill', 'all')} className="ml-1 hover:text-red-500">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
              Clear All
            </Button>
          </div>
        )}
      </div>
      
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        <InterviewsList />
      )}
    </div>
  );
};

export default InterviewsPage;
