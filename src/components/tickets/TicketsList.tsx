
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Ticket, TicketWithDetails, TicketStatus } from '@/types/ticket';
import { ticketService } from '@/services/ticketService';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';

const statusColors: Record<TicketStatus, string> = {
  'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'Hold': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Approved': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  'Escalated': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
};

const TicketsList: React.FC = () => {
  const [tickets, setTickets] = useState<TicketWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();

    // Subscribe to realtime updates
    const subscription = supabase
      .channel('public:tickets')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'tickets'
      }, () => {
        fetchTickets();
        toast.info('Ticket list updated');
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [statusFilter]);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await ticketService.getTickets(
        statusFilter !== 'all' ? { status: statusFilter } : undefined
      );
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = tickets.filter(ticket => 
    ticket.requirement_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (id: string) => {
    navigate(`/dashboard/tickets/${id}`);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by title or ID..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48 flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select 
              value={statusFilter} 
              onValueChange={(value) => setStatusFilter(value as TicketStatus | 'all')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Hold">Hold</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-intervue-600"></div>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchQuery ? 'No tickets match your search' : 'No tickets found'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Requirement</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id.substring(0, 8)}...</TableCell>
                    <TableCell>{ticket.requirement_title}</TableCell>
                    <TableCell>{ticket.company_name}</TableCell>
                    <TableCell>
                      {format(new Date(ticket.created_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[ticket.status]}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(ticket.id)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TicketsList;
