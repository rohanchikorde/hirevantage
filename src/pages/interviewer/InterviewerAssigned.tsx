
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, AlertTriangle, Video, FileText, Clock } from 'lucide-react';
import { mockAssignedInterviews } from '@/data/interviewerMockData';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { formatDistance } from 'date-fns';

const InterviewerAssigned: React.FC = () => {
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [cancellationDialogOpen, setCancellationDialogOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [selectedInterview, setSelectedInterview] = useState<string | null>(null);
  const [cancellationReason, setCancellationReason] = useState('');
  
  const upcomingInterviews = mockAssignedInterviews.filter(interview => interview.status === 'Upcoming');
  const completedInterviews = mockAssignedInterviews.filter(interview => interview.status === 'Completed');

  const getTimeRemaining = (interviewDate: string, interviewTime: string) => {
    const now = new Date();
    const interviewDateTime = new Date(`${interviewDate}T${interviewTime}`);
    
    // Show countdown only if the interview is today or tomorrow
    const diffTime = interviewDateTime.getTime() - now.getTime();
    const diffHours = diffTime / (1000 * 3600);
    
    if (diffHours < 24) {
      return formatDistance(interviewDateTime, now, { addSuffix: true });
    }
    return '';
  };

  const handleOpenFeedback = (id: string) => {
    setSelectedInterview(id);
    setRating(0);
    setComments('');
    setFeedbackDialogOpen(true);
  };

  const handleOpenCancellation = (id: string) => {
    setSelectedInterview(id);
    setCancellationReason('');
    setCancellationDialogOpen(true);
  };

  const handleOpenJoin = (id: string) => {
    setSelectedInterview(id);
    setJoinDialogOpen(true);
  };

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      toast.error('Please provide a rating');
      return;
    }
    
    toast.success('Feedback submitted successfully');
    setFeedbackDialogOpen(false);
  };

  const handleSubmitCancellation = () => {
    if (!cancellationReason.trim()) {
      toast.error('Please provide a reason for cancellation');
      return;
    }
    
    toast.success('Cancellation request submitted');
    setCancellationDialogOpen(false);
  };

  const handleJoinInterview = () => {
    toast.success('Joining interview session...');
    setJoinDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assigned Interviews</h1>
        <p className="text-muted-foreground">Manage your upcoming and completed interviews</p>
      </div>

      <Card className="border-purple-100 dark:border-purple-900/20">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Interviews</h2>
          
          {upcomingInterviews.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Skill</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingInterviews.map((interview) => {
                  const timeRemaining = getTimeRemaining(interview.date, interview.time);
                  const isToday = timeRemaining.includes('hour') || timeRemaining.includes('minute');
                  
                  return (
                    <TableRow key={interview.id}>
                      <TableCell className="font-medium">{interview.candidateName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{interview.skill}</Badge>
                      </TableCell>
                      <TableCell>{interview.companyName}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{interview.date} at {interview.time}</span>
                          {timeRemaining && (
                            <span className="text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {timeRemaining}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800">
                          {interview.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className={isToday ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-300 text-gray-700 cursor-not-allowed"}
                            onClick={() => isToday && handleOpenJoin(interview.id)}
                            disabled={!isToday}
                          >
                            <Video className="h-4 w-4 mr-1" />
                            Join
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/30"
                            onClick={() => handleOpenCancellation(interview.id)}
                          >
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Calendar className="h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Upcoming Interviews</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You don't have any upcoming interviews scheduled.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-purple-100 dark:border-purple-900/20">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Completed Interviews Pending Feedback</h2>
          
          {completedInterviews.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Skill</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedInterviews.map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell className="font-medium">{interview.candidateName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{interview.skill}</Badge>
                    </TableCell>
                    <TableCell>{interview.companyName}</TableCell>
                    <TableCell>{interview.date} at {interview.time}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800">
                        {interview.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {!interview.feedbackSubmitted ? (
                        <Button 
                          size="sm" 
                          className="bg-orange-600 hover:bg-orange-700 text-white"
                          onClick={() => handleOpenFeedback(interview.id)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Submit Feedback
                        </Button>
                      ) : (
                        <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">
                          Feedback Submitted
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Feedback Pending</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You don't have any completed interviews that require feedback.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feedback Dialog */}
      <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Interview Feedback</DialogTitle>
            <DialogDescription>
              Please provide your assessment of the candidate's interview performance.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Rating (1-5)</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="outline"
                    size="sm"
                    className={`p-2 ${rating >= star ? 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700' : ''}`}
                    onClick={() => setRating(star)}
                  >
                    {star}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Comments</h3>
              <Textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Please provide detailed feedback about the candidate..."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFeedbackDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitFeedback} className="bg-purple-600 hover:bg-purple-700">Submit Feedback</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancellation Dialog */}
      <Dialog open={cancellationDialogOpen} onOpenChange={setCancellationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request Interview Cancellation</DialogTitle>
            <DialogDescription>
              Please provide a reason for your cancellation request. This will be reviewed by an administrator.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Textarea
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                placeholder="Please provide reason for cancellation..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancellationDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitCancellation} className="bg-red-600 hover:bg-red-700">Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Join Interview Dialog */}
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join Interview Session</DialogTitle>
            <DialogDescription>
              You are about to join a live interview session. Please ensure your camera and microphone are working properly.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Audio</p>
                  <p className="font-medium">Connected</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Video</p>
                  <p className="font-medium">Connected</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setJoinDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleJoinInterview} className="bg-green-600 hover:bg-green-700">
              <Video className="h-4 w-4 mr-2" />
              Join Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InterviewerAssigned;
