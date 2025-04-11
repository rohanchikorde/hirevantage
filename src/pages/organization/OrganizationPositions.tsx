
import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Briefcase, Eye, Filter, Users, Calendar } from 'lucide-react';
import { organizationMockData } from '@/data/organizationMockData';

const OrganizationPositions: React.FC = () => {
  const [filters, setFilters] = useState({
    department: 'all',
    status: 'all',
    urgency: 'all'
  });
  
  // Helper function for status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800">{status}</Badge>;
      case 'Filled':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800">{status}</Badge>;
      case 'On Hold':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Helper function for urgency badges
  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'Urgent':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800">{urgency}</Badge>;
      case 'High':
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800">{urgency}</Badge>;
      case 'Medium':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">{urgency}</Badge>;
      case 'Low':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800">{urgency}</Badge>;
      default:
        return <Badge variant="outline">{urgency}</Badge>;
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Get unique departments for filter
  const departments = Array.from(new Set(organizationMockData.positions.map(pos => pos.department)));

  // Filter positions
  const filteredPositions = organizationMockData.positions.filter(position => {
    if (filters.department !== 'all' && position.department !== filters.department) return false;
    if (filters.status !== 'all' && position.status !== filters.status) return false;
    if (filters.urgency !== 'all' && position.urgency !== filters.urgency) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Open Positions</h1>
          <p className="text-muted-foreground">View details about your organization's open positions</p>
        </div>
        <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-lg">
          <Users className="text-purple-600 h-5 w-5" />
          <div className="text-sm">
            <span className="font-medium text-purple-700 dark:text-purple-300">
              {organizationMockData.positions.filter(p => p.status === 'Open').length}
            </span>
            <span className="text-gray-600 dark:text-gray-400"> open positions</span>
          </div>
        </div>
      </div>

      <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-purple-600" />
              <span className="font-medium">Filter Positions</span>
            </div>
            
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <Select
                value={filters.department}
                onValueChange={(value) => handleFilterChange('department', value)}
              >
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dep => (
                    <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.status}
                onValueChange={(value) => handleFilterChange('status', value)}
              >
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Filled">Filled</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.urgency}
                onValueChange={(value) => handleFilterChange('urgency', value)}
              >
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Applied Filters */}
          {(filters.department !== 'all' || filters.status !== 'all' || filters.urgency !== 'all') && (
            <div className="flex flex-wrap gap-2 mt-4 items-center">
              <span className="text-sm text-gray-500">Applied Filters:</span>
              {filters.department !== 'all' && (
                <Badge variant="outline" className="bg-white dark:bg-gray-800">
                  Department: {filters.department}
                </Badge>
              )}
              {filters.status !== 'all' && (
                <Badge variant="outline" className="bg-white dark:bg-gray-800">
                  Status: {filters.status}
                </Badge>
              )}
              {filters.urgency !== 'all' && (
                <Badge variant="outline" className="bg-white dark:bg-gray-800">
                  Urgency: {filters.urgency}
                </Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs h-7 text-gray-500"
                onClick={() => setFilters({ department: 'all', status: 'all', urgency: 'all' })}
              >
                Clear All
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {filteredPositions.length > 0 ? (
        <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Open Since</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Candidates</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPositions.map((position) => (
                  <TableRow key={position.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <TableCell className="font-medium">{position.title}</TableCell>
                    <TableCell>{position.department}</TableCell>
                    <TableCell>{format(parseISO(position.openedDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{getStatusBadge(position.status)}</TableCell>
                    <TableCell>{getUrgencyBadge(position.urgency)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{position.candidates}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" className="h-8">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      ) : (
        <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
              <Briefcase className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-medium text-center">No Positions Found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm mt-2">
              Try adjusting your filters or check back later for new positions.
            </p>
          </CardContent>
        </Card>
      )}
      
      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-sm text-gray-600 dark:text-gray-300">
        <p className="flex items-start gap-2">
          <Calendar className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
          <span>Position updates are managed by your administrator. Contact them for any changes or to open new positions.</span>
        </p>
      </div>
    </div>
  );
};

export default OrganizationPositions;
