
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { mockScheduledInterviews } from '@/data/intervieweeMockData';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

const IntervieweeInterviews: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5);

  const handleJoinClick = (interviewId: string) => {
    setSelectedInterview(interviewId);
    setJoinDialogOpen(true);
    setCountdown(5);
    
    // Mock countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const filteredInterviews = mockScheduledInterviews.filter(interview => 
    interview.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    interview.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDateTime = (date: string, time: string) => {
    try {
      const dateTime = new Date(`${date}T${time}`);
      return format(dateTime, "MMM d, yyyy 'at' h:mm a");
    } catch (e) {
      return `${date} ${time}`;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Interviews</h1>
        <p className="text-muted-foreground">View and join your scheduled interviews.</p>
      </div>

      <Card className="border-purple-100 dark:border-purple-900/20">
        <CardContent className="p-5">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by company or position..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {filteredInterviews.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterviews.map(interview => (
                  <TableRow key={interview.id}>
                    <TableCell className="font-medium">{interview.companyName}</TableCell>
                    <TableCell>{interview.position}</TableCell>
                    <TableCell>{formatDateTime(interview.date, interview.time)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={interview.status === 'Scheduled' ? 'outline' : 'secondary'}
                        className={interview.status === 'Scheduled' 
                          ? 'border-green-500 text-green-700' 
                          : 'bg-gray-200 text-gray-700'}
                      >
                        {interview.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {interview.status === 'Scheduled' ? (
                        <Button 
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => handleJoinClick(interview.id)}
                        >
                          Join Interview
                        </Button>
                      ) : (
                        <Button variant="outline" className="text-gray-500" disabled>
                          Completed
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Calendar className="h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Interviews Found</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                No interviews match your search criteria. Try adjusting your search or check back later.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Joining Interview</DialogTitle>
            <DialogDescription>
              {countdown > 0 
                ? `Preparing your interview environment... ${countdown}`
                : "Your interview is ready!"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Coding Environment</h3>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4">
                <pre className="text-sm font-mono whitespace-pre-wrap">
{`// Write your code here
function solution(input) {
  // Implement your solution
  return input;
}

// Test your solution
console.log(solution("test"));`}
                </pre>
              </div>
              
              <div className="flex space-x-2 mt-2">
                <Button variant="outline" size="sm">Run Code</Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">Submit Solution</Button>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Output</h3>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 h-24 overflow-y-auto">
                <pre className="text-sm font-mono text-gray-700 dark:text-gray-300">
                  {`> "test"`}
                </pre>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setJoinDialogOpen(false)}>End Session</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IntervieweeInterviews;
