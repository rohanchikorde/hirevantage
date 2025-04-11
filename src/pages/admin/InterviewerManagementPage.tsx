
import React, { useState } from 'react';
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
import { ChevronRight, Edit, Trash2, Plus, Search, FilterX, Calendar, BarChart } from 'lucide-react';
import { toast } from 'sonner';

const InterviewerManagementPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterviewers, setSelectedInterviewers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white dark:bg-gray-800 shadow-sm border-purple-100 dark:border-purple-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Interviewers</p>
                <p className="text-2xl font-bold">{allInterviewers.length}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 shadow-sm border-purple-100 dark:border-purple-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Now</p>
                <p className="text-2xl font-bold">7</p>
              </div>
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                  ✓
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 shadow-sm border-purple-100 dark:border-purple-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Interviews This Week</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
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

// Import the Users icon which was missing
function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
