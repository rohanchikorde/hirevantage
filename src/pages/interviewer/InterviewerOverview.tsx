
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import StatCard from '@/components/organization/StatCard';
import { 
  Briefcase, 
  Calendar, 
  AlertCircle, 
  FileText,
  ArrowRight 
} from 'lucide-react';
import { mockInterviewerProfile, mockAssignedInterviews } from '@/data/interviewerMockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { formatDistance } from 'date-fns';

const InterviewerOverview: React.FC = () => {
  const interviewer = mockInterviewerProfile;
  const upcomingInterviews = mockAssignedInterviews
    .filter(interview => interview.status === 'Upcoming')
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 3);

  // Calculate time remaining for interviews
  const getTimeRemaining = (interviewDate: string, interviewTime: string) => {
    const now = new Date();
    const interviewDateTime = new Date(`${interviewDate}T${interviewTime}`);
    return formatDistance(interviewDateTime, now, { addSuffix: true });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome, {interviewer.name}</h1>
        <p className="text-muted-foreground mt-1">Manage your interviews and submit feedback</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Assigned Interviews"
          value={interviewer.stats.totalInterviews.toString()}
          icon={<Briefcase className="h-4 w-4" />}
          textClass="text-purple-700 dark:text-purple-300"
        />
        <StatCard
          title="Upcoming Interviews"
          value={interviewer.stats.upcomingInterviews.toString()}
          icon={<Calendar className="h-4 w-4" />}
          textClass="text-blue-700 dark:text-blue-300"
        />
        <StatCard
          title="Cancellation Requests"
          value={interviewer.stats.cancellationRequests.toString()}
          icon={<AlertCircle className="h-4 w-4" />}
          textClass="text-yellow-700 dark:text-yellow-300"
        />
        <StatCard
          title="Feedback Pending"
          value={interviewer.stats.feedbackPending.toString()}
          icon={<FileText className="h-4 w-4" />}
          textClass={interviewer.stats.feedbackPending > 0 ? "text-red-700 dark:text-red-300" : "text-gray-700 dark:text-gray-300"}
          bgClass={interviewer.stats.feedbackPending > 0 ? "bg-red-50 dark:bg-red-900/20" : "bg-white dark:bg-gray-800"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Interviews */}
        <Card className="col-span-1 lg:col-span-2 border-purple-100 dark:border-purple-900/20">
          <CardContent className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Next Interviews</h2>
              <Link to="/interviewer/assigned">
                <Button variant="ghost" size="sm" className="text-purple-600 dark:text-purple-400">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            
            {upcomingInterviews.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingInterviews.map((interview) => (
                    <TableRow key={interview.id}>
                      <TableCell className="font-medium">{interview.candidateName}</TableCell>
                      <TableCell>{interview.companyName}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{interview.date} at {interview.time}</span>
                          <span className="text-xs text-purple-600 dark:text-purple-400">
                            {getTimeRemaining(interview.date, interview.time)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800">
                          {interview.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
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

        {/* Quick Stats */}
        <Card className="border-purple-100 dark:border-purple-900/20">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/interviewer/opportunities">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-2">
                  View Available Opportunities
                </Button>
              </Link>
              
              <Link to="/interviewer/assigned">
                <Button variant="outline" className="w-full border-purple-200 text-purple-800 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-200 dark:hover:bg-purple-900/30 mb-2">
                  Manage Assigned Interviews
                </Button>
              </Link>
              
              {interviewer.stats.feedbackPending > 0 && (
                <Link to="/interviewer/assigned">
                  <Button variant="outline" className="w-full border-red-200 text-red-800 hover:bg-red-50 dark:border-red-800 dark:text-red-200 dark:hover:bg-red-900/30">
                    Submit Pending Feedback ({interviewer.stats.feedbackPending})
                  </Button>
                </Link>
              )}
            </div>

            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Availability</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm">Current Status:</span>
                <Badge className={`
                  ${interviewer.availability === 'Available' 
                    ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' 
                    : interviewer.availability === 'Busy' 
                    ? 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800'
                    : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
                  }`}
                >
                  {interviewer.availability}
                </Badge>
              </div>
            </div>

            <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Skills</h3>
              <div className="flex flex-wrap gap-1">
                {interviewer.specialization.map((skill) => (
                  <Badge key={skill} variant="outline" className="bg-gray-50 text-xs dark:bg-gray-900">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Reminder - only show if feedback is pending */}
      {interviewer.stats.feedbackPending > 0 && (
        <Card className="bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200">
          <CardContent className="p-5">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 mr-3 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Feedback Required</h3>
                <p className="text-sm">
                  You have {interviewer.stats.feedbackPending} interviews requiring feedback submission. 
                  Please review and submit feedback to maintain your interviewer rating.
                </p>
                <Link to="/interviewer/assigned">
                  <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700 text-white">
                    Submit Feedback
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InterviewerOverview;
