
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import { mockInterviewee, mockScheduledInterviews } from '@/data/intervieweeMockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { format, parseISO, differenceInDays } from 'date-fns';

const IntervieweeOverview: React.FC = () => {
  const today = new Date();
  const interviewee = mockInterviewee;
  const upcomingInterviews = mockScheduledInterviews.filter(
    interview => interview.status === 'Scheduled'
  ).sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  }).slice(0, 2); // Show only the next 2 upcoming interviews

  const getInterviewStatusColor = (date: string) => {
    const interviewDate = new Date(date);
    const diffDays = differenceInDays(interviewDate, today);
    
    if (diffDays <= 1) return "text-orange-500";
    if (diffDays <= 3) return "text-yellow-500";
    return "text-green-500";
  };
  
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
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome, {interviewee.name}</h1>
        <p className="text-muted-foreground">Prepare for your interviews and contact support if needed.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-purple-100 dark:border-purple-900/20">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-purple-700 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Upcoming Interviews</p>
              <h3 className="text-2xl font-bold">{interviewee.stats.upcomingInterviews}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-100 dark:border-purple-900/20">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-purple-700 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completed Interviews</p>
              <h3 className="text-2xl font-bold">{interviewee.stats.completedInterviews}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Upcoming Interviews</h2>
          <Button variant="outline" size="sm" className="text-purple-700 dark:text-purple-400" asChild>
            <a href="/interviewee/interviews">View All</a>
          </Button>
        </div>

        {upcomingInterviews.length > 0 ? (
          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingInterviews.map(interview => (
                    <TableRow key={interview.id}>
                      <TableCell className="font-medium">{interview.companyName}</TableCell>
                      <TableCell>{interview.position}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className={`h-3 w-3 mr-1 ${getInterviewStatusColor(interview.date)}`} />
                          {formatDateTime(interview.date, interview.time)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                          Join Interview
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center justify-center py-10">
                <Calendar className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Upcoming Interviews</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                  You don't have any interviews scheduled for the next 7 days.
                  Check back later or contact support if you have any questions.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="border-purple-100 dark:border-purple-900/20 bg-purple-50 dark:bg-purple-900/20">
        <CardContent className="p-5">
          <div className="flex items-start">
            <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-full mr-4">
              <CheckCircle className="h-5 w-5 text-purple-700 dark:text-purple-300" />
            </div>
            <div>
              <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-1">Prepare for Success</h3>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                Make sure to test your camera and microphone before the interview. 
                Access the coding environment to practice coding exercises beforehand.
              </p>
              <Button variant="link" className="mt-2 p-0 text-purple-700 dark:text-purple-400" asChild>
                <a href="/interviewee/coding">Go to Coding Environment</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntervieweeOverview;
