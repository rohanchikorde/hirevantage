
import React, { useState, useEffect } from 'react';
import { Requirement, RequirementStatus } from '@/types/requirement';
import { requirementService } from '@/services/requirementService';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
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
import { Search, Plus, Filter } from 'lucide-react';

const statusColors: Record<RequirementStatus, string> = {
  'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'Hold': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Approved': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  'Fulfilled': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  'Canceled': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
};

const RequirementsList: React.FC = () => {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<RequirementStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequirements();
  }, [statusFilter]);

  const fetchRequirements = async () => {
    setLoading(true);
    try {
      const data = await requirementService.getRequirements(
        statusFilter !== 'all' ? { status: statusFilter as RequirementStatus } : undefined
      );
      setRequirements(data);
    } catch (error) {
      console.error('Error fetching requirements:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequirements = requirements.filter(req => 
    req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (id: string) => {
    navigate(`/dashboard/requirements/${id}`);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Requirements</CardTitle>
        <Button onClick={() => navigate('/dashboard/requirements/new')}>
          <Plus className="mr-2 h-4 w-4" />
          New Requirement
        </Button>
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
              onValueChange={(value) => setStatusFilter(value as RequirementStatus | 'all')}
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
                <SelectItem value="Fulfilled">Fulfilled</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-intervue-600"></div>
          </div>
        ) : filteredRequirements.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchQuery ? 'No requirements match your search' : 'No requirements found'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Positions</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequirements.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{req.title}</TableCell>
                    <TableCell>{req.number_of_positions}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {req.skills.slice(0, 3).map((skill, i) => (
                          <Badge key={i} variant="outline" className="whitespace-nowrap">
                            {skill}
                          </Badge>
                        ))}
                        {req.skills.length > 3 && (
                          <Badge variant="outline" className="whitespace-nowrap">
                            +{req.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(req.created_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[req.status]}>
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(req.id)}
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

export default RequirementsList;
