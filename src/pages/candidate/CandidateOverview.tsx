
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCandidate, mockScheduledInterviews } from '@/data/candidateMockData';
import { Calendar, Clock, User, Building } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const CandidateOverview: React.FC = () => {
  const candidate = mockCandidate;
  const upcomingInterviews = mockScheduledInterviews.filter(
    interview => interview.status === 'Scheduled'
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const nextInterview = upcomingInterviews[0];
  
  const unreadNotifications = candidate.notifications
    .filter(notification => !notification.read)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome, {candidate.name}</h1>
        <p className="text-muted-foreground">Here's an overview of your upcoming interviews and latest notifications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-purple-100 dark:border-purple-900/20">
          <CardHeader>
            <CardTitle>Next Interview</CardTitle>
          </CardHeader>
          <CardContent>
            {nextInterview ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">{nextInterview.companyName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-purple-600" />
                  <span>Position: {nextInterview.position}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <span>Date: {nextInterview.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span>Time: {nextInterview.time}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Interviewer: {nextInterview.interviewerName}
                  </p>
                </div>
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
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {unreadNotifications.length > 0 ? (
              <div className="space-y-4">
                {unreadNotifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className="p-3 bg-purple-50 dark:bg-purple-900/10 rounded-md">
                    <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatDistanceToNow(new Date(notification.date), { addSuffix: true })}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">No new notifications.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Upcoming Interviews</p>
              <p className="text-3xl font-bold text-purple-600">{candidate.stats.upcomingInterviews}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed Interviews</p>
              <p className="text-3xl font-bold text-purple-600">{candidate.stats.completedInterviews}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Unread Notifications</p>
              <p className="text-3xl font-bold text-purple-600">{unreadNotifications.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-100 dark:border-purple-900/20">
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingInterviews.length > 0 ? (
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="p-4 border rounded-md hover:border-purple-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{interview.companyName}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{interview.position}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{interview.date}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{interview.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">No upcoming interviews.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateOverview;
