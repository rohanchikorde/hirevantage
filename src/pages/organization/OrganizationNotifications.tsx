
import React, { useState } from 'react';
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
import { Bell, Calendar, Filter, Briefcase, InfoIcon, Check, X } from 'lucide-react';
import { organizationMockData } from '@/data/organizationMockData';
import { format, parseISO } from 'date-fns';
import { toast } from 'sonner';

const OrganizationNotifications: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState(organizationMockData.notifications);

  // Helper function to get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'Interview':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'Position':
        return <Briefcase className="h-5 w-5 text-green-500" />;
      case 'System':
        return <InfoIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, status: 'Read' } : notification
      )
    );
    toast.success("Notification marked as read");
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, status: 'Read' }))
    );
    toast.success("All notifications marked as read");
  };

  // Filter notifications
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread'
      ? notifications.filter(n => n.status === 'Unread')
      : notifications.filter(n => n.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with important alerts and information</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={!notifications.some(n => n.status === 'Unread')}
          onClick={markAllAsRead}
        >
          <Check className="h-4 w-4 mr-2" />
          Mark All as Read
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-purple-600" />
          <span className="font-medium">Filter:</span>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            size="sm"
            className={filter === 'all' ? 'bg-purple-600 hover:bg-purple-700' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'unread' ? 'default' : 'outline'} 
            size="sm"
            className={filter === 'unread' ? 'bg-purple-600 hover:bg-purple-700' : ''}
            onClick={() => setFilter('unread')}
          >
            Unread
            {notifications.filter(n => n.status === 'Unread').length > 0 && (
              <Badge className="ml-2 bg-white text-purple-700 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {notifications.filter(n => n.status === 'Unread').length}
              </Badge>
            )}
          </Button>
          <Button 
            variant={filter === 'Interview' ? 'default' : 'outline'} 
            size="sm"
            className={filter === 'Interview' ? 'bg-purple-600 hover:bg-purple-700' : ''}
            onClick={() => setFilter('Interview')}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Interviews
          </Button>
          <Button 
            variant={filter === 'Position' ? 'default' : 'outline'} 
            size="sm"
            className={filter === 'Position' ? 'bg-purple-600 hover:bg-purple-700' : ''}
            onClick={() => setFilter('Position')}
          >
            <Briefcase className="h-4 w-4 mr-1" />
            Positions
          </Button>
          <Button 
            variant={filter === 'System' ? 'default' : 'outline'} 
            size="sm"
            className={filter === 'System' ? 'bg-purple-600 hover:bg-purple-700' : ''}
            onClick={() => setFilter('System')}
          >
            <InfoIcon className="h-4 w-4 mr-1" />
            System
          </Button>
        </div>
      </div>

      {filteredNotifications.length > 0 ? (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`border-l-4 ${
                notification.status === 'Unread' 
                  ? 'border-l-purple-500 bg-purple-50/50 dark:bg-purple-900/10' 
                  : 'bg-white dark:bg-gray-800'
              } border-purple-100 dark:border-purple-900/20`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-sm">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="outline" className="bg-white dark:bg-gray-700">
                        {notification.type}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {format(parseISO(notification.date), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200">{notification.message}</p>
                  </div>
                  {notification.status === 'Unread' && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Mark as read</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
              <Bell className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-medium text-center">No Notifications</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm mt-2">
              {filter !== 'all' 
                ? `No ${filter === 'unread' ? 'unread' : filter.toLowerCase()} notifications found.` 
                : "You're all caught up! Check back later for new notifications."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrganizationNotifications;
