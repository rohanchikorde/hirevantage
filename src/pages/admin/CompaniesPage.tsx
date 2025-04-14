import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronDown, ChevronRight, Plus, Search, ArrowUpDown, Users, FileText, Building, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { companyService, Company } from '@/services/companyService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Form validation schema
const companyFormSchema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  industry: z.string().optional(),
  address: z.string().optional(),
  contactPerson: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal('')),
  phone: z.string().optional(),
});

type CompanyFormValues = z.infer<typeof companyFormSchema>;

const CompaniesPage: React.FC = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteCompanyId, setDeleteCompanyId] = useState<string | null>(null);
  const [editCompany, setEditCompany] = useState<Company | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: '',
      industry: '',
      address: '',
      contactPerson: '',
      email: '',
      phone: '',
    }
  });
  
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const data = await companyService.getCompanies();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const data = await companyService.getCompanies(searchQuery);
      setCompanies(data);
    } catch (error) {
      console.error('Error searching companies:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const sortedCompanies = [...companies]
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
    const company = companies.find(c => c.id === companyId);
    if (!company) return;
    
    switch (action) {
      case 'view':
        navigate(`/dashboard/admin/companies/${companyId}`);
        break;
      case 'representatives':
        navigate(`/dashboard/admin/representatives?company=${companyId}`, {
          state: { companyName: company.name }
        });
        break;
      case 'requirements':
        navigate(`/dashboard/admin/requirements?company=${companyId}`, {
          state: { companyName: company.name }
        });
        break;
      case 'edit':
        setEditCompany(company);
        form.reset({
          name: company.name,
          industry: company.industry || '',
          address: company.address || '',
          // Note: These fields don't exist in the database but are kept in the form
          // for potential future implementation
          contactPerson: '',
          email: '',
          phone: '',
        });
        break;
      case 'delete':
        setDeleteCompanyId(companyId);
        break;
    }
  };
  
  const handleDeleteConfirm = async () => {
    if (!deleteCompanyId) return;
    
    setIsDeleting(true);
    try {
      const success = await companyService.deleteCompany(deleteCompanyId);
      if (success) {
        setCompanies(prev => prev.filter(c => c.id !== deleteCompanyId));
        toast.success('Company deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting company:', error);
      toast.error('Failed to delete company');
    } finally {
      setIsDeleting(false);
      setDeleteCompanyId(null);
    }
  };
  
  const handleUpdateCompany = async (data: CompanyFormValues) => {
    if (!editCompany) return;
    
    setIsSubmitting(true);
    try {
      console.log('Submitting company update:', data);
      const success = await companyService.updateCompany(editCompany.id, data);
      
      if (success) {
        // Update the local state with the edited company
        setCompanies(prev => prev.map(c => 
          c.id === editCompany.id ? { 
            ...c, 
            name: data.name,
            industry: data.industry || '',
            address: data.address || '',
            // Keep other properties that might not be in the form
            contactPerson: data.contactPerson,
            email: data.email,
            phone: data.phone
          } : c
        ));
        toast.success('Company updated successfully');
        setEditCompany(null);
      }
    } catch (error) {
      console.error('Error updating company:', error);
      toast.error('Failed to update company');
    } finally {
      setIsSubmitting(false);
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
              <span className="text-2xl font-bold">{companies.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Active</span>
              <span className="text-2xl font-bold">{companies.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Interviews (This Month)</span>
              <span className="text-2xl font-bold">0</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Avg. Satisfaction</span>
              <div className="flex items-center mt-1">
                <span className="text-xl font-bold mr-1">0</span>
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
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
                    <TableHead className="cursor-pointer" onClick={() => handleSort('industry')}>
                      <div className="flex items-center">
                        Industry
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Address</TableHead>
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
                        <TableCell>{company.industry}</TableCell>
                        <TableCell>{company.address}</TableCell>
                        <TableCell>{company.interviewsCount || 0}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="group-hover:bg-slate-100 dark:group-hover:bg-slate-800">
                                Actions <ChevronDown className="ml-1 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleCompanyAction(company.id, 'view')}>
                                <Building className="mr-2 h-4 w-4" />
                                View Details Page
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCompanyAction(company.id, 'representatives')}>
                                <Users className="mr-2 h-4 w-4" />
                                View Representatives
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCompanyAction(company.id, 'requirements')}>
                                <FileText className="mr-2 h-4 w-4" />
                                View Requirements
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCompanyAction(company.id, 'edit')}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Company
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600 focus:text-red-600"
                                onClick={() => handleCompanyAction(company.id, 'delete')}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
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
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteCompanyId} onOpenChange={(open) => !open && setDeleteCompanyId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected company and all related data including representatives and requirements.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <span className="mr-2">Deleting...</span>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Edit Company Dialog */}
      <Dialog open={!!editCompany} onOpenChange={(open) => !open && setEditCompany(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Company</DialogTitle>
            <DialogDescription>
              Make changes to the company information below.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateCompany)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="Industry" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact Person" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground">This field is not stored in the database yet.</p>
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
                      <Input placeholder="Email" type="email" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground">This field is not stored in the database yet.</p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground">This field is not stored in the database yet.</p>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={isSubmitting}>Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="mr-2">Saving...</span>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </>
                  ) : (
                    'Save changes'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompaniesPage;
