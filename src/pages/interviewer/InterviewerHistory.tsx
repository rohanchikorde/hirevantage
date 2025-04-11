
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, Star, Eye, FileText } from 'lucide-react';
import { mockInterviewHistory } from '@/data/interviewerMockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useState } from 'react';

const InterviewerHistory: React.FC = () => {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<typeof mockInterviewHistory[0] | null>(null);

  const handleViewDetails = (interview: typeof mockInterviewHistory[0]) => {
    setSelectedInterview(interview);
    setDetailsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Interview History</h1>
        <p className="text-muted-foreground">View your past interviews and feedback</p>
      </div>

      <Card className="border-purple-100 dark:border-purple-900/20">
        <CardContent className="p-5">
          {mockInterviewHistory.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Feedback</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInterviewHistory.map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell className="font-medium">{interview.candidateName}</TableCell>
                    <TableCell>{interview.companyName}</TableCell>
                    <TableCell>{interview.date} at {interview.time}</TableCell>
                    <TableCell>
                      <Badge className={`
                        ${interview.status === 'Completed' 
                          ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' 
                          : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
                        }`}
                      >
                        {interview.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {interview.feedback ? (
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {Array(5).fill(0).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < interview.feedback!.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm">{interview.feedback.rating}/5</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleViewDetails(interview)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <History className="h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Interview History</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You haven't conducted any interviews yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interview Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Interview Details</DialogTitle>
            <DialogDescription>
              Interview with {selectedInterview?.candidateName} on {selectedInterview?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Company</p>
                  <p className="font-medium">{selectedInterview?.companyName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <Badge className={`
                    ${selectedInterview?.status === 'Completed' 
                      ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' 
                      : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
                    }`}
                  >
                    {selectedInterview?.status}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Date & Time</p>
                <p className="font-medium">{selectedInterview?.date} at {selectedInterview?.time}</p>
              </div>
              
              {selectedInterview?.feedback && (
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <FileText className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                    <h3 className="font-medium">Your Feedback</h3>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mr-2">Rating:</p>
                    <div className="flex mr-1">
                      {Array(5).fill(0).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < (selectedInterview?.feedback?.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm">{selectedInterview?.feedback.rating}/5</span>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Comments:</p>
                    <p className="text-sm mt-1 bg-gray-50 dark:bg-gray-800 p-3 rounded">
                      {selectedInterview?.feedback.comments}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InterviewerHistory;
