
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllInterviewers, mockCompanies } from '@/data/mockData';
import { ChevronRight, Edit, Trash2, Plus, Search, FilterX, Calendar, BarChart, Users, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const InterviewerManagementPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterviewers, setSelectedInterviewers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalInterviewers: 0,
    availableInterviewers: 0,
    interviewsThisWeek: 0,
    interviewersSignedUp: 0
  });
  
  const allInterviewers = getAllInterviewers();
  const filteredInterviewers = allInterviewers.filter(interviewer => 
    interviewer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    interviewer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    interviewer.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Helper function to get company name by ID
  const getCompanyName = (companyId: string) => {
    const company = mockCompanies.find(c => c.id === companyId);
    return company ? company.name : 'Unknown Company';
  };
  
  // Fetch statistics from Supabase
  const fetchStats = async () => {
    setIsStatsLoading(true);
    setStatsError(null);
    
    try {
      // Fetch total interviewers count
      const { count: totalInterviewers, error: totalError } = await supabase
        .from('interviewers')
        .select('*', { count: 'exact', head: true });
      
      if (totalError) throw new Error(`Error fetching total interviewers: ${totalError.message}`);
      
      // Fetch registered users with 'interviewer' role in profiles
      const { count: interviewersSignedUp, error: signedUpError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'interviewer');
      
      if (signedUpError) throw new Error(`Error fetching signed up interviewers: ${signedUpError.message}`);
      
      // Calculate current week's start date (Sunday) and end date (Saturday)
      const today = new Date();
      const currentDay = today.getDay(); // 0 is Sunday, 6 is Saturday
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - currentDay); // Go back to Sunday
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + (6 - currentDay)); // Go forward to Saturday
      endDate.setHours(23, 59, 59, 999);
      
      // Format dates for Supabase query
      const startDateISO = startDate.toISOString();
      const endDateISO = endDate.toISOString();
      
      // Fetch interviews scheduled for this week
      const { count: interviewsThisWeek, error: interviewsError } = await supabase
        .from('interviews_schedule')
        .select('*', { count: 'exact', head: true })
        .gte('scheduled_at', startDateISO)
        .lte('scheduled_at', endDateISO);
      
      if (interviewsError) throw new Error(`Error fetching interviews this week: ${interviewsError.message}`);
      
      // For available interviewers, we'll count those who don't have interviews scheduled right now
      // This is a simplification - in a real app, you might have a status field
      const { data: busyInterviewerIds, error: busyError } = await supabase
        .from('interviews_schedule')
        .select('interviewer_id')
        .eq('status', 'Scheduled')
        .lte('scheduled_at', new Date().toISOString());
      
      if (busyError) throw new Error(`Error fetching busy interviewers: ${busyError.message}`);
      
      // Calculate available interviewers (total minus busy)
      const busyInterviewers = new Set(busyInterviewerIds?.map(item => item.interviewer_id) || []);
      const availableInterviewers = totalInterviewers ? totalInterviewers - busyInterviewers.size : 0;
      
      setStats({
        totalInterviewers: totalInterviewers || 0,
        availableInterviewers: availableInterviewers,
        interviewsThisWeek: interviewsThisWeek || 0,
        interviewersSignedUp: interviewersSignedUp || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStatsError(error instanceof Error ? error.message : 'An unknown error occurred');
      toast.error('Failed to load interviewer statistics');
    } finally {
      setIsStatsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchStats();
  }, []);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setSearchQuery(e.target.value);
    
    // Simulate loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };
  
  const toggleSelectAll = () => {
    if (selectedInterviewers.length === filteredInterviewers.length) {
      setSelectedInterviewers([]);
    } else {
      setSelectedInterviewers(filteredInterviewers.map(i => i.id));
    }
  };
  
  const toggleSelect = (id: string) => {
    setSelectedInterviewers(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };
  
  const handleBulkDelete = () => {
    if (selectedInterviewers.length === 0) return;
    
    toast.error(`${selectedInterviewers.length} interviewers would be deleted`, {
      description: "This action cannot be undone",
      action: {
        label: "Cancel",
        onClick: () => toast.success("Deletion canceled")
      },
    });
  };
  
  const handleBulkAssign = () => {
    if (selectedInterviewers.length === 0) return;
    
    toast.success(`${selectedInterviewers.length} interviewers would be assigned to interviews`, {
      description: "Select an interview to continue",
    });
  };
  
  // Get interviewer availability status - mock function
  const getAvailabilityStatus = (interviewerId: string): 'Available' | 'Busy' => {
    // For demo purposes, IDs starting with odd numbers are available
    return parseInt(interviewerId.replace(/\D/g, '')) % 2 === 1 ? 'Available' : 'Busy';
  };
  
  const getLastInterviewDate = (interviewerId: string) => {
    // Mock last interview date - just for demo
    const dates = [
      "03/15/2025",
      "03/22/2025", 
      "03/28/2025",
      "04/02/2025",
      "04/05/2025"
    ];
    return dates[parseInt(interviewerId.slice(-1)) % dates.length];
  };

  // Helper to render a stat card with loading state
  const renderStatCard = (
    title: string, 
    value: number | string, 
    icon: React.ReactNode, 
    bgClass: string, 
    iconBgClass: string
  ) => {
    return (
      <Card className="bg-white dark:bg-gray-800 shadow-sm border-purple-100 dark:border-purple-900/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              {isStatsLoading ? (
                <Skeleton className="h-8 w-16 mt-1" />
              ) : (
                <p className="text-2xl font-bold">{value}</p>
              )}
            </div>
            <div className={`h-12 w-12 ${iconBgClass} rounded-full flex items-center justify-center`}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Interviewer Management</h1>
        <Link to="/dashboard/admin/interviewers/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Interviewer
          </Button>
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderStatCard(
          "Total Interviewers",
          stats.totalInterviewers,
          <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
          "bg-white dark:bg-gray-800",
          "bg-purple-100 dark:bg-purple-900/20"
        )}
        
        {renderStatCard(
          "Available Now",
          stats.availableInterviewers,
          <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white">✓</div>,
          "bg-white dark:bg-gray-800",
          "bg-green-100 dark:bg-green-900/20"
        )}
        
        {renderStatCard(
          "Interviews This Week",
          stats.interviewsThisWeek,
          <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
          "bg-white dark:bg-gray-800",
          "bg-blue-100 dark:bg-blue-900/20"
        )}
        
        {renderStatCard(
          "Interviewers Signed Up",
          stats.interviewersSignedUp,
          <UserPlus className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
          "bg-white dark:bg-gray-800",
          "bg-amber-100 dark:bg-amber-900/20"
        )}
      </div>
      
      {statsError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md">
          <p className="text-red-700 dark:text-red-300 text-sm">
            <strong>Error loading statistics:</strong> {statsError}
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchStats} 
            className="mt-2 text-red-600 border-red-200 hover:bg-red-50"
          >
            Retry
          </Button>
        </div>
      )}
      
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <CardTitle>All Interviewers</CardTitle>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search interviewers..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {selectedInterviewers.length > 0 && (
            <div className="mb-4 flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/10 rounded-md">
              <span className="text-sm font-medium">{selectedInterviewers.length} interviewers selected</span>
              <div className="flex-1"></div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBulkAssign}
                className="text-purple-700 border-purple-200 hover:bg-purple-100 hover:text-purple-800"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Assign to Interview
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBulkDelete}
                className="text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedInterviewers([])}
              >
                <FilterX className="h-4 w-4 mr-2" />
                Clear Selection
              </Button>
            </div>
          )}

          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox 
                        checked={
                          filteredInterviewers.length > 0 && 
                          selectedInterviewers.length === filteredInterviewers.length
                        }
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all interviewers"
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total Interviews</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInterviewers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-10">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                            <Search className="h-6 w-6 text-gray-400" />
                          </div>
                          <p className="text-lg font-medium">No interviewers found</p>
                          <p className="text-sm text-muted-foreground">Try adjusting your search query</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInterviewers.map((interviewer) => {
                      const availability = getAvailabilityStatus(interviewer.id);
                      return (
                        <TableRow key={interviewer.id} className="group">
                          <TableCell>
                            <Checkbox 
                              checked={selectedInterviewers.includes(interviewer.id)}
                              onCheckedChange={() => toggleSelect(interviewer.id)}
                              aria-label={`Select ${interviewer.name}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{interviewer.name}</TableCell>
                          <TableCell>{interviewer.email}</TableCell>
                          <TableCell>{interviewer.role}</TableCell>
                          <TableCell>{getCompanyName(interviewer.companyId)}</TableCell>
                          <TableCell>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge 
                                    variant={availability === 'Available' ? 'default' : 'outline'}
                                    className={availability === 'Available' 
                                      ? 'bg-green-500 hover:bg-green-600' 
                                      : 'text-red-500 border-red-200'
                                    }
                                  >
                                    <span className={`mr-1.5 h-2 w-2 rounded-full ${
                                      availability === 'Available' 
                                        ? 'bg-white animate-pulse' 
                                        : 'bg-red-500'
                                      }`}
                                    ></span>
                                    {availability}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {availability === 'Available' 
                                    ? 'Available for interviews' 
                                    : `Busy until ${getLastInterviewDate(interviewer.id)}`}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <div className="flex items-center gap-2">
                                    <span>{interviewer.totalInterviews || 0}</span>
                                    {interviewer.totalInterviews && interviewer.totalInterviews > 10 && (
                                      <Badge variant="outline" className="text-amber-500 border-amber-200">
                                        Top
                                      </Badge>
                                    )}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="text-xs p-1">
                                    <p>Last interview: {getLastInterviewDate(interviewer.id)}</p>
                                    <p>Satisfaction rate: 4.8/5</p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Link to={`/dashboard/admin/interviewers/${interviewer.id}/dashboard`}>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 px-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                >
                                  <ChevronRight className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Button>
                              </Link>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 px-2 text-slate-600 hover:text-slate-700 hover:bg-slate-50"
                                onClick={() => toast.info(`Editing ${interviewer.name}`)}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => toast.error(`Would delete ${interviewer.name}`)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewerManagementPage;
