
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { mockInterviewerProfile } from '@/data/interviewerMockData';
import { Bell, Calendar, FileText, RefreshCw, CheckSquare, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format, formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const InterviewerNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState(mockInterviewerProfile.notifications);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [browserNotifications, setBrowserNotifications] = useState(true);
  const [mobileNotifications, setMobileNotifications] = useState(true);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast.success('All notifications marked as read');
  };
  
  const handleRefresh = () => {
    toast.info('Refreshing notifications...');
    // This would typically fetch fresh notifications
  };
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    toast.success('Notification marked as read');
  };
  
  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast.success('Notification deleted');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'interview':
        return <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case 'feedback':
        return <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />;
      case 'system':
      default:
        return <Bell className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with interview assignments and system alerts</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckSquare className="h-4 w-4 mr-1" />
            Mark All as Read
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-1">Refresh</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
          <TabsTrigger value="all" className="relative">
            All
            {unreadCount > 0 && (
              <Badge className="ml-1 bg-red-500 text-white">{unreadCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardContent className="p-5">
              {notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-lg border flex items-start ${
                        !notification.read 
                          ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800/50'
                          : 'bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700/50'
                      }`}
                    >
                      <div className={`p-2 rounded-lg mr-3 ${
                        notification.type === 'interview'
                          ? 'bg-blue-100 dark:bg-blue-900/30'
                          : notification.type === 'feedback'
                          ? 'bg-orange-100 dark:bg-orange-900/30'
                          : 'bg-purple-100 dark:bg-purple-900/30'
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className={`${!notification.read ? 'font-medium' : ''}`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {formatDistanceToNow(new Date(notification.date), { addSuffix: true })}
                            </p>
                          </div>
                          <div className="flex space-x-1 ml-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                <CheckSquare className="h-4 w-4" />
                                <span className="sr-only">Mark as read</span>
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              onClick={() => handleDelete(notification.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="h-12 w-12 text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Notifications</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    You're all caught up! No notifications to display.
                  </p>
                  <Button variant="outline" className="mt-4" onClick={handleRefresh}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="unread">
          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardContent className="p-5">
              {notifications.filter(n => !n.read).length > 0 ? (
                <div className="space-y-4">
                  {notifications.filter(n => !n.read).map((notification) => (
                    <div 
                      key={notification.id} 
                      className="p-4 rounded-lg border flex items-start bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800/50"
                    >
                      <div className={`p-2 rounded-lg mr-3 ${
                        notification.type === 'interview'
                          ? 'bg-blue-100 dark:bg-blue-900/30'
                          : notification.type === 'feedback'
                          ? 'bg-orange-100 dark:bg-orange-900/30'
                          : 'bg-purple-100 dark:bg-purple-900/30'
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {formatDistanceToNow(new Date(notification.date), { addSuffix: true })}
                            </p>
                          </div>
                          <div className="flex space-x-1 ml-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <CheckSquare className="h-4 w-4" />
                              <span className="sr-only">Mark as read</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              onClick={() => handleDelete(notification.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckSquare className="h-12 w-12 text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Unread Notifications</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    You've read all your notifications. Great job staying up to date!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="browser-notifications">Browser Notifications</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications in your browser</p>
                    </div>
                    <Switch
                      id="browser-notifications"
                      checked={browserNotifications}
                      onCheckedChange={setBrowserNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mobile-notifications">Mobile Notifications</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications on your mobile device</p>
                    </div>
                    <Switch
                      id="mobile-notifications"
                      checked={mobileNotifications}
                      onCheckedChange={setMobileNotifications}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium mb-3">Notify Me About</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="notify-interviews" className="mr-2" defaultChecked />
                      <Label htmlFor="notify-interviews">New Interview Assignments</Label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="notify-feedback" className="mr-2" defaultChecked />
                      <Label htmlFor="notify-feedback">Feedback Requests</Label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="notify-schedule" className="mr-2" defaultChecked />
                      <Label htmlFor="notify-schedule">Schedule Changes</Label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="notify-system" className="mr-2" defaultChecked />
                      <Label htmlFor="notify-system">System Updates</Label>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => toast.success('Notification preferences saved!')}>
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InterviewerNotifications;
