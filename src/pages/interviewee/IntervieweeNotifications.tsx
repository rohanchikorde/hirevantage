
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockInterviewee } from '@/data/intervieweeMockData';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, CheckCircle, Info } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const IntervieweeNotifications: React.FC = () => {
  const { notifications } = mockInterviewee;
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleMarkAllAsRead = () => {
    toast.success("All notifications marked as read");
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'interview':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'system':
        return <Info className="h-5 w-5 text-gray-500" />;
      default:
        return <Bell className="h-5 w-5 text-purple-500" />;
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, "MMM d, yyyy 'at' h:mm a");
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-muted-foreground">Stay updated on your interview schedule and platform updates.</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleMarkAllAsRead}
          disabled={unreadCount === 0}
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          Mark all as read
        </Button>
      </div>
      
      <Card className="border-purple-100 dark:border-purple-900/20">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>All Notifications</CardTitle>
            <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
              {unreadCount} unread
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`flex gap-4 p-3 rounded-lg ${
                    !notification.read 
                      ? 'bg-purple-50 dark:bg-purple-900/10 border-l-2 border-purple-600' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(notification.date)}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="flex items-center">
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">New</Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                You don't have any notifications yet. Check back later for updates on your interviews and platform changes.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="border-purple-100 dark:border-purple-900/20 bg-purple-50 dark:bg-purple-900/20">
        <CardContent className="p-5">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-purple-700 dark:text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-1">About Notifications</h3>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                You'll receive notifications about your scheduled interviews, technical test submissions,
                and important system updates. Make sure to check this page regularly for updates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntervieweeNotifications;
