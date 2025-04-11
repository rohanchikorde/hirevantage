
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Filter, Plus, MoreHorizontal, FileUp, UserPlus } from 'lucide-react';
import { CandidateStatus } from '@/types/candidate';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { mockCompanies } from '@/data/mockData';
import { toast } from 'sonner';

// Mock data for candidates
const mockCandidates = [
  {
    id: '1',
    full_name: 'Sarah Johnson',
    email: 'sarah@example.com',
    position: 'Senior Java Developer',
    company: 'Acme Corp',
    status: 'Shortlisted' as CandidateStatus,
    created_at: '2024-03-10T10:00:00Z',
    updated_at: '2024-03-15T14:30:00Z',
    progress: 60
  },
  {
    id: '2',
    full_name: 'Michael Chen',
    email: 'michael@example.com',
    position: 'React Frontend Engineer',
    company: 'Globex Industries',
    status: 'Interviewed' as CandidateStatus,
    created_at: '2024-03-08T09:15:00Z',
    updated_at: '2024-03-16T11:45:00Z',
    progress: 75
  },
  {
    id: '3',
    full_name: 'Emma Wilson',
    email: 'emma@example.com',
    position: 'DevOps Specialist',
    company: 'Initech Solutions',
    status: 'New' as CandidateStatus,
    created_at: '2024-03-17T13:20:00Z',
    updated_at: '2024-03-17T13:20:00Z',
    progress: 25
  },
  {
    id: '4',
    full_name: 'James Brown',
    email: 'james@example.com',
    position: 'Python Backend Developer',
    company: 'Oceanic Airlines',
    status: 'Hired' as CandidateStatus,
    created_at: '2024-03-01T08:30:00Z',
    updated_at: '2024-03-20T16:15:00Z',
    progress: 100
  },
  {
    id: '5',
    full_name: 'Lisa Garcia',
    email: 'lisa@example.com',
    position: 'UI/UX Designer',
    company: 'Acme Corp',
    status: 'Rejected' as CandidateStatus,
    created_at: '2024-03-05T11:45:00Z',
    updated_at: '2024-03-18T10:30:00Z',
    progress: 40
  }
];

const statusColors: Record<CandidateStatus, string> = {
  'New': 'bg-blue-500',
  'Shortlisted': 'bg-amber-500',
  'Interviewed': 'bg-purple-500',
  'Hired': 'bg-green-500',
  'Rejected': 'bg-red-500'
};

const formSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  position: z.string().min(2, { message: "Position is required" }),
  company: z.string().min(1, { message: "Company is required" }),
});

const CandidatesPage: React.FC = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [open, setOpen] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      position: "",
      company: "",
    },
  });

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesCompany = companyFilter === 'all' || candidate.company === companyFilter;
    return matchesStatus && matchesCompany;
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success("Candidate added successfully!");
    setOpen(false);
    form.reset();
  };

  const getProgressColor = (status: CandidateStatus) => {
    switch(status) {
      case 'New': return 'bg-blue-500';
      case 'Shortlisted': return 'bg-amber-500';
      case 'Interviewed': return 'bg-purple-500';
      case 'Hired': return 'bg-green-500';
      case 'Rejected': return 'bg-red-500';
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Candidate Management</h1>
          <p className="text-muted-foreground">Track and manage candidates through the hiring process</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                <Plus className="h-4 w-4 mr-2" /> Add Candidate
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Candidate</DialogTitle>
                <DialogDescription>
                  Enter the candidate's information to add them to the system.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-2">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter job position" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a company" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockCompanies.map(company => (
                              <SelectItem key={company.id} value={company.name}>
                                {company.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mt-4">
                    <Label htmlFor="resume">Resume (Optional)</Label>
                    <div className="mt-2 flex items-center">
                      <Button type="button" variant="outline" className="w-full">
                        <FileUp className="h-4 w-4 mr-2" />
                        Upload Resume
                      </Button>
                    </div>
                  </div>
                  <DialogFooter className="mt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    >
                      <UserPlus className="h-4 w-4 mr-2" /> 
                      Add Candidate
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Candidates List</CardTitle>
          <CardDescription>
            Showing {filteredCandidates.length} total candidates
          </CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex-1">
              <Label htmlFor="statusFilter" className="mb-2 block">Filter by Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="statusFilter" className="w-full">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="Interviewed">Interviewed</SelectItem>
                  <SelectItem value="Hired">Hired</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="companyFilter" className="mb-2 block">Filter by Company</Label>
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger id="companyFilter" className="w-full">
                  <SelectValue placeholder="Filter by company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {mockCompanies.map(company => (
                    <SelectItem key={company.id} value={company.name}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell className="font-medium">{candidate.full_name}</TableCell>
                    <TableCell>{candidate.email}</TableCell>
                    <TableCell>{candidate.position}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${statusColors[candidate.status]}`}></div>
                        <span>{candidate.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>{candidate.company}</TableCell>
                    <TableCell className="w-[180px]">
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={candidate.progress} 
                          className={`h-2 ${getProgressColor(candidate.status)}`} 
                        />
                        <span className="text-xs w-8">{candidate.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/dashboard/candidates/${candidate.id}`)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidatesPage;
