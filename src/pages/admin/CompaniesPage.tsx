
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
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { mockCompanies } from '@/data/mockData';
import { ChevronDown, ChevronRight, Plus, Search, ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';

const CompaniesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const sortedCompanies = [...mockCompanies]
    .filter(company => 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      company.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) || 
      company.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      
      const fieldA = a[sortField as keyof typeof a];
      const fieldB = b[sortField as keyof typeof b];
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc' 
          ? fieldA.localeCompare(fieldB) 
          : fieldB.localeCompare(fieldA);
      } else if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortDirection === 'asc' 
          ? fieldA - fieldB 
          : fieldB - fieldA;
      }
      return 0;
    });
    
  const handleSort = (field: string) => {
    setIsLoading(true);
    setSortField(field);
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };
  
  const handleCompanyAction = (companyId: string, action: string) => {
    const company = mockCompanies.find(c => c.id === companyId);
    if (company) {
      switch (action) {
        case 'view':
          // No toast needed as this navigates
          break;
        case 'edit':
          toast.info(`Editing ${company.name}`);
          break;
        case 'delete':
          toast.error(`Company ${company.name} would be deleted`);
          break;
      }
    }
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(sortedCompanies.length / itemsPerPage);
  const paginatedCompanies = sortedCompanies.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
        <Link to="/dashboard/admin/companies/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Company
          </Button>
        </Link>
      </div>
      
      {/* Summary Card */}
      <Card className="border border-purple-100 dark:border-purple-900/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Total Companies</span>
              <span className="text-2xl font-bold">{mockCompanies.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Active</span>
              <span className="text-2xl font-bold">8</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Interviews (This Month)</span>
              <span className="text-2xl font-bold">32</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Avg. Satisfaction</span>
              <div className="flex items-center mt-1">
                <span className="text-xl font-bold mr-1">4.8</span>
                <span className="text-yellow-500">★★★★★</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-slate-200 dark:border-slate-800">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <CardTitle className="text-xl font-bold">Company Overview</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <CardDescription>Manage and monitor your partner companies</CardDescription>
        </CardHeader>
        <CardContent>
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
                    <TableHead className="w-[30px]">
                      <Checkbox id="select-all" aria-label="Select all companies" />
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                      <div className="flex items-center">
                        Company Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('contactPerson')}>
                      <div className="flex items-center">
                        Contact Person
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('interviewsCount')}>
                      <div className="flex items-center">
                        Interviews
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCompanies.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                            <Search className="h-6 w-6 text-gray-400" />
                          </div>
                          <p className="text-lg font-medium">No companies found</p>
                          <p className="text-sm text-muted-foreground">Try adjusting your search query</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedCompanies.map((company) => (
                      <TableRow key={company.id} className="group">
                        <TableCell>
                          <Checkbox id={`select-${company.id}`} aria-label={`Select ${company.name}`} />
                        </TableCell>
                        <TableCell className="font-medium">{company.name}</TableCell>
                        <TableCell>{company.contactPerson}</TableCell>
                        <TableCell>{company.email}</TableCell>
                        <TableCell>{company.phone}</TableCell>
                        <TableCell>{company.interviewsCount}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="group-hover:bg-slate-100 dark:group-hover:bg-slate-800">
                                Actions <ChevronDown className="ml-1 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link to={`/dashboard/admin/companies/${company.id}`}>
                                  <ChevronRight className="mr-2 h-4 w-4" /> View Dashboard
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCompanyAction(company.id, 'edit')}>
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600 focus:text-red-600"
                                onClick={() => handleCompanyAction(company.id, 'delete')}
                              >
                                Delete Company
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              
              {sortedCompanies.length > itemsPerPage && (
                <div className="mt-4 flex justify-end">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            onClick={() => setCurrentPage(i + 1)}
                            isActive={currentPage === i + 1}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompaniesPage;
