
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TicketWithDetails, UpdateTicketRequest } from '@/types/ticket';
import { ticketService } from '@/services/ticketService';
import { requirementService } from '@/services/requirementService';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Requirement } from '@/types/requirement';
import { toast } from 'sonner';
import { ArrowLeft, Check, Clock, X, AlertTriangle } from 'lucide-react';

const statusColors = {
  'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'Hold': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Approved': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  'Escalated': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
};

const TicketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<TicketWithDetails | null>(null);
  const [requirement, setRequirement] = useState<Requirement | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [escalationReason, setEscalationReason] = useState('');
  const [escalationDialogOpen, setEscalationDialogOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTicketData(id);
    }
  }, [id]);

  const fetchTicketData = async (ticketId: string) => {
    setLoading(true);
    try {
      const ticketData = await ticketService.getTicketById(ticketId);
      setTicket(ticketData);
      
      if (ticketData?.requirement_id) {
        const requirementData = await requirementService.getRequirementById(ticketData.requirement_id);
        setRequirement(requirementData);
      }
    } catch (error) {
      console.error('Error fetching ticket data:', error);
      toast.error('Failed to load ticket details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status: 'Approved' | 'Hold' | 'Rejected') => {
    if (!id) return;
    
    setUpdating(true);
    try {
      const request: UpdateTicketRequest = { status };
      await ticketService.updateTicketStatus(id, request);
      
      // Refresh the ticket data
      await fetchTicketData(id);
      toast.success(`Ticket ${status.toLowerCase()} successfully`);
    } catch (error) {
      console.error(`Error updating ticket status to ${status}:`, error);
      toast.error(`Failed to ${status.toLowerCase()} ticket`);
    } finally {
      setUpdating(false);
    }
  };

  const handleEscalation = async () => {
    if (!id || !escalationReason.trim()) return;
    
    setUpdating(true);
    try {
      await ticketService.escalateTicket(id, escalationReason);
      
      // Refresh the ticket data
      await fetchTicketData(id);
      setEscalationDialogOpen(false);
      toast.success('Ticket escalated successfully');
    } catch (error) {
      console.error('Error escalating ticket:', error);
      toast.error('Failed to escalate ticket');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-intervue-600"></div>
      </div>
    );
  }

  if (!ticket || !requirement) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold">Ticket not found</h2>
        <p className="mt-2 text-gray-500">The requested ticket does not exist or has been removed.</p>
        <Button 
          className="mt-4" 
          variant="outline"
          onClick={() => navigate('/dashboard/tickets')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tickets
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard/tickets')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tickets
        </Button>
        <Badge className={statusColors[ticket.status]}>
          {ticket.status}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ticket Details</CardTitle>
          <CardDescription>
            Ticket ID: {ticket.id}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Company</h3>
            <p className="mt-1">{ticket.company_name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Created At</h3>
            <p className="mt-1">{format(new Date(ticket.created_at), 'PPP p')}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
            <p className="mt-1">{format(new Date(ticket.updated_at), 'PPP p')}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Requirement Details</CardTitle>
          <CardDescription>
            {requirement.title}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1">{requirement.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Number of Positions</h3>
              <p className="mt-1">{requirement.number_of_positions}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Years of Experience</h3>
              <p className="mt-1">{requirement.years_of_experience} years</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Skills</h3>
            <div className="mt-1 flex flex-wrap gap-2">
              {requirement.skills.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Price per Interview</h3>
            <p className="mt-1">${requirement.price_per_interview}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          {ticket.status === 'Pending' && (
            <>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleStatusUpdate('Hold')}
                  disabled={updating}
                >
                  <Clock className="mr-2 h-4 w-4" /> Hold
                </Button>
                <Dialog open={escalationDialogOpen} onOpenChange={setEscalationDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      disabled={updating}
                    >
                      <X className="mr-2 h-4 w-4" /> Reject
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Escalate for Rejection</DialogTitle>
                      <DialogDescription>
                        Please provide a reason for rejecting this requirement.
                      </DialogDescription>
                    </DialogHeader>
                    <Textarea
                      placeholder="Enter rejection reason..."
                      className="min-h-[100px] mt-2"
                      value={escalationReason}
                      onChange={(e) => setEscalationReason(e.target.value)}
                    />
                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => setEscalationDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={handleEscalation}
                        disabled={!escalationReason.trim() || updating}
                      >
                        <AlertTriangle className="mr-2 h-4 w-4" /> Escalate
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <Button 
                onClick={() => handleStatusUpdate('Approved')}
                disabled={updating}
              >
                <Check className="mr-2 h-4 w-4" /> Approve
              </Button>
            </>
          )}
          {ticket.status === 'Hold' && (
            <>
              <Button 
                variant="outline" 
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => handleStatusUpdate('Rejected')}
                disabled={updating}
              >
                <X className="mr-2 h-4 w-4" /> Reject
              </Button>
              <Button 
                onClick={() => handleStatusUpdate('Approved')}
                disabled={updating}
              >
                <Check className="mr-2 h-4 w-4" /> Approve
              </Button>
            </>
          )}
          {ticket.status === 'Approved' && (
            <Button 
              variant="outline"
              onClick={() => navigate(`/dashboard/interviews/schedule?requirementId=${requirement.id}`)}
            >
              Schedule Interviews
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default TicketDetail;
