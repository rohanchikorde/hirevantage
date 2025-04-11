
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockScheduledInterviews } from '@/data/candidateMockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';

const CandidateInterviews: React.FC = () => {
  const scheduledInterviews = mockScheduledInterviews.filter(
    interview => interview.status === 'Scheduled'
  );
  
  const completedInterviews = mockScheduledInterviews.filter(
    interview => interview.status === 'Completed'
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Interviews</h1>
        <p className="text-muted-foreground">View and manage your upcoming and past interviews.</p>
      </div>

      <Card className="border-purple-100 dark:border-purple-900/20">
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          {scheduledInterviews.length > 0 ? (
            <div className="space-y-4">
              {scheduledInterviews.map((interview) => (
                <div key={interview.id} className="p-4 border rounded-md hover:border-purple-300 transition-colors">
                  <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{interview.companyName}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{interview.position}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <User className="h-3 w-3 mr-1" />
                        <span>Interviewer: {interview.interviewerName}</span>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end space-y-2">
                      <div className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-300">
                        <Calendar className="h-4 w-4" />
                        <span>{interview.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-300">
                        <Clock className="h-4 w-4" />
                        <span>{interview.time}</span>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50">
                        {interview.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-end space-x-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">Join Interview</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">No upcoming interviews scheduled.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-purple-100 dark:border-purple-900/20">
        <CardHeader>
          <CardTitle>Completed Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          {completedInterviews.length > 0 ? (
            <div className="space-y-4">
              {completedInterviews.map((interview) => (
                <div key={interview.id} className="p-4 border rounded-md">
                  <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{interview.companyName}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{interview.position}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <User className="h-3 w-3 mr-1" />
                        <span>Interviewer: {interview.interviewerName}</span>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end space-y-2">
                      <div className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-300">
                        <Calendar className="h-4 w-4" />
                        <span>{interview.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-300">
                        <Clock className="h-4 w-4" />
                        <span>{interview.time}</span>
                      </div>
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                        {interview.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                    <Button variant="outline" size="sm">View Feedback</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">No completed interviews yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateInterviews;
