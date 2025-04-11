
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, SearchIcon, RefreshCw } from 'lucide-react';
import { mockOpportunities } from '@/data/interviewerMockData';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

const InterviewerOpportunities: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [assignInProgress, setAssignInProgress] = useState<Record<string, boolean>>({});
  
  const filteredOpportunities = mockOpportunities.filter(opportunity => 
    opportunity.status === 'Available' && 
    (searchQuery === '' || 
      opportunity.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleAssign = (id: string) => {
    setAssignInProgress(prev => ({ ...prev, [id]: true }));
    
    // Mock assignment process with a delay
    setTimeout(() => {
      toast.success('Interview assigned successfully!');
      setAssignInProgress(prev => ({ ...prev, [id]: false }));
    }, 1000);
  };

  const handleRefresh = () => {
    toast.info('Refreshing opportunities...');
    // This would typically fetch fresh data
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Available Opportunities</h1>
          <p className="text-muted-foreground">Interviews available for assignment in the next 7 days</p>
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 self-start"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Card className="border-purple-100 dark:border-purple-900/20">
        <CardContent className="p-5">
          <div className="mb-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search opportunities..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {filteredOpportunities.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Skill</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOpportunities.map((opportunity) => (
                  <TableRow key={opportunity.id}>
                    <TableCell className="font-mono text-sm">{opportunity.id}</TableCell>
                    <TableCell className="font-medium">{opportunity.candidateName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{opportunity.skill}</Badge>
                    </TableCell>
                    <TableCell>{opportunity.companyName}</TableCell>
                    <TableCell>{opportunity.date} at {opportunity.time}</TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => handleAssign(opportunity.id)}
                        disabled={assignInProgress[opportunity.id]}
                      >
                        {assignInProgress[opportunity.id] ? 'Assigning...' : 'Assign to Me'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Calendar className="h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Opportunities Available</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                There are no interview opportunities available that match your skills and availability.
                Check back later or adjust your search criteria.
              </p>
              <Button variant="outline" className="mt-4" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-purple-100 dark:border-purple-900/20 bg-purple-50 dark:bg-purple-900/20">
        <CardContent className="p-5">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-purple-700 dark:text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-1">How Interview Assignment Works</h3>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                Opportunities shown are based on your skills and availability. Once assigned, interviews will appear in 
                your "Assigned Interviews" section. You can raise a cancellation request if you need to withdraw from an 
                assigned interview.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewerOpportunities;
