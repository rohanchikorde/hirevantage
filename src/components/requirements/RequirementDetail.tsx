
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Requirement } from '@/types/requirement';
import { Candidate } from '@/types/candidate';
import { requirementService } from '@/services/requirementService';
import { candidateService } from '@/services/candidateService';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CandidateForm from '@/components/candidates/CandidateForm';
import { ArrowLeft, ChevronRight, Calendar, Users, Briefcase, DollarSign } from 'lucide-react';

const RequirementDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [requirement, setRequirement] = useState<Requirement | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingCandidate, setAddingCandidate] = useState(false);
  const [closingRequirement, setClosingRequirement] = useState(false);
  const [closeStatus, setCloseStatus] = useState<'Fulfilled' | 'Canceled'>('Fulfilled');

  useEffect(() => {
    if (id) {
      fetchRequirementData(id);
    }
  }, [id]);

  const fetchRequirementData = async (reqId: string) => {
    setLoading(true);
    try {
      const reqData = await requirementService.getRequirementById(reqId);
      if (reqData) {
        setRequirement(reqData);
        const candidatesData = await candidateService.getCandidatesByRequirement(reqId);
        setCandidates(candidatesData);
      }
    } catch (error) {
      console.error('Error fetching requirement details:', error);
      toast.error('Failed to load requirement details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (status: 'Approved' | 'Rejected' | 'Hold') => {
    if (!requirement || !id) return;
    
    try {
      const updated = await requirementService.updateRequirement(id, { status });
      if (updated) {
        setRequirement(updated);
        toast.success(`Requirement status updated to ${status}`);
      }
    } catch (error) {
      console.error('Error updating requirement status:', error);
      toast.error('Failed to update requirement status');
    }
  };

  const handleCloseRequirement = async () => {
    if (!requirement || !id) return;
    
    try {
      const success = await requirementService.closeRequirement(id, closeStatus);
      if (success) {
        const updated = await requirementService.getRequirementById(id);
        if (updated) {
          setRequirement(updated);
          toast.success(`Requirement closed as ${closeStatus}`);
          setClosingRequirement(false);
        }
      }
    } catch (error) {
      console.error('Error closing requirement:', error);
      toast.error('Failed to close requirement');
    }
  };

  const handleCandidateAdded = async () => {
    if (id) {
      const candidatesData = await candidateService.getCandidatesByRequirement(id);
      setCandidates(candidatesData);
      setAddingCandidate(false);
    }
  };

  const handleUpdateCandidateStatus = async (candidateId: string, status: 'New' | 'Shortlisted' | 'Interviewed' | 'Hired' | 'Rejected') => {
    try {
      const updated = await candidateService.updateCandidateStatus(candidateId, status);
      if (updated) {
        setCandidates(candidates.map(c => c.id === candidateId ? { ...c, status } : c));
        toast.success(`Candidate status updated to ${status}`);
      }
    } catch (error) {
      console.error('Error updating candidate status:', error);
      toast.error('Failed to update candidate status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-intervue-600"></div>
      </div>
    );
  }

  if (!requirement) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Requirement Not Found</h2>
        <p className="mb-6 text-gray-600">The requirement you're looking for couldn't be found or you don't have permission to view it.</p>
        <Button onClick={() => navigate('/dashboard/requirements')}>
          Back to Requirements
        </Button>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Hold': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Approved': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'Fulfilled': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'Canceled': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    'New': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    'Shortlisted': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Interviewed': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'Hired': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  };

  const isActive = !['Fulfilled', 'Canceled', 'Rejected'].includes(requirement.status);

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate('/dashboard/requirements')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Requirements
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{requirement.title}</CardTitle>
                <CardDescription className="mt-2">
                  Requirement ID: {requirement.id}
                </CardDescription>
              </div>
              <Badge className={statusColors[requirement.status]}>{requirement.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1">{requirement.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Number of Positions</h3>
                    <p>{requirement.number_of_positions}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Years of Experience</h3>
                    <p>{requirement.years_of_experience} years</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Price per Interview</h3>
                    <p>${requirement.price_per_interview}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Date Created</h3>
                    <p>{format(new Date(requirement.created_at), 'MMM d, yyyy')}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Required Skills</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {requirement.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {requirement.status === 'Pending' && (
              <>
                <Button 
                  className="w-full" 
                  onClick={() => handleUpdateStatus('Approved')}
                >
                  Approve Requirement
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleUpdateStatus('Hold')}
                >
                  Put on Hold
                </Button>
                <Button 
                  className="w-full" 
                  variant="destructive"
                  onClick={() => handleUpdateStatus('Rejected')}
                >
                  Reject Requirement
                </Button>
              </>
            )}
            
            {(requirement.status === 'Approved' || requirement.status === 'Hold') && (
              <>
                <Dialog open={closingRequirement} onOpenChange={setClosingRequirement}>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                      Close Requirement
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Close Requirement</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to close this requirement? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Select 
                        value={closeStatus} 
                        onValueChange={(value) => setCloseStatus(value as 'Fulfilled' | 'Canceled')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fulfilled">Fulfilled</SelectItem>
                          <SelectItem value="Canceled">Canceled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setClosingRequirement(false)}>
                        Cancel
                      </Button>
                      <Button variant="default" onClick={handleCloseRequirement}>
                        Confirm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                {requirement.status === 'Hold' && (
                  <Button 
                    className="w-full" 
                    onClick={() => handleUpdateStatus('Approved')}
                  >
                    Move to Approved
                  </Button>
                )}
                
                {requirement.status === 'Approved' && (
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleUpdateStatus('Hold')}
                  >
                    Put on Hold
                  </Button>
                )}
              </>
            )}
            
            {isActive && (
              <Dialog open={addingCandidate} onOpenChange={setAddingCandidate}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    Add Candidate
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Candidate</DialogTitle>
                    <DialogDescription>
                      Add a new candidate for this requirement
                    </DialogDescription>
                  </DialogHeader>
                  <CandidateForm 
                    requirementId={requirement.id} 
                    onSuccess={handleCandidateAdded} 
                  />
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="candidates" className="w-full">
        <TabsList>
          <TabsTrigger value="candidates">Candidates ({candidates.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="candidates" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Candidates</CardTitle>
              <CardDescription>
                Manage candidates for this requirement
              </CardDescription>
            </CardHeader>
            <CardContent>
              {candidates.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No candidates added yet
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {candidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell className="font-medium">{candidate.full_name}</TableCell>
                        <TableCell>{candidate.email}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[candidate.status]}>
                            {candidate.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {format(new Date(candidate.created_at), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell className="text-right">
                          {isActive && (
                            <Select 
                              value={candidate.status} 
                              onValueChange={(value) => 
                                handleUpdateCandidateStatus(
                                  candidate.id, 
                                  value as 'New' | 'Shortlisted' | 'Interviewed' | 'Hired' | 'Rejected'
                                )
                              }
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Update Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="New">New</SelectItem>
                                <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                                <SelectItem value="Interviewed">Interviewed</SelectItem>
                                <SelectItem value="Hired">Hired</SelectItem>
                                <SelectItem value="Rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RequirementDetail;
