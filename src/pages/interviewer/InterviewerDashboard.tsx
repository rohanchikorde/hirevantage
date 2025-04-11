
import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Clock, 
  History, 
  MessageCircle, 
  Bell, 
  LogOut, 
  User
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { mockInterviewerProfile } from '@/data/interviewerMockData';

const InterviewerDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const interviewer = mockInterviewerProfile;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const profileInitials = getInitials(interviewer.name);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:flex border-r border-gray-200 dark:border-gray-800">
        <div className="flex flex-col h-full">
          <div className="py-6 px-7">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Hirevantage
            </h2>
          </div>
          <div className="flex-1 py-4">
            <nav className="space-y-1 px-4">
              <Link
                to="/interviewer"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                  location.pathname === '/interviewer' &&
                    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                )}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/interviewer/opportunities"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                  location.pathname.includes('/interviewer/opportunities') &&
                    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                )}
              >
                <Calendar className="h-4 w-4" />
                Opportunities
              </Link>
              <Link
                to="/interviewer/assigned"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                  location.pathname.includes('/interviewer/assigned') &&
                    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                )}
              >
                <Clock className="h-4 w-4" />
                Assigned Interviews
              </Link>
              <Link
                to="/interviewer/history"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                  location.pathname.includes('/interviewer/history') &&
                    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                )}
              >
                <History className="h-4 w-4" />
                Interview History
              </Link>
              <Link
                to="/interviewer/support"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                  location.pathname.includes('/interviewer/support') &&
                    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                )}
              >
                <MessageCircle className="h-4 w-4" />
                Support
              </Link>
              <Link
                to="/interviewer/notifications"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                  location.pathname.includes('/interviewer/notifications') &&
                    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                )}
              >
                <Bell className="h-4 w-4" />
                Notifications
                {interviewer.notifications.filter(n => !n.read).length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {interviewer.notifications.filter(n => !n.read).length}
                  </span>
                )}
              </Link>
              <Link
                to="/interviewer/profile"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                  location.pathname.includes('/interviewer/profile') &&
                    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                )}
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
            </nav>
          </div>
          <div className="py-4 px-6">
            <Button
              variant="outline"
              className="w-full justify-start hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900/20 dark:hover:text-purple-400 transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b shrink-0 bg-white dark:bg-gray-950 sm:px-6 shadow-sm">
          <div className="flex items-center gap-4 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col p-0">
                <div className="p-6">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Hirevantage
                  </h2>
                </div>
                <nav className="grid gap-2 px-2 py-4">
                  <Link
                    to="/interviewer"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                      location.pathname === '/interviewer' &&
                        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    )}
                  >
                    <Home className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    to="/interviewer/opportunities"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                      location.pathname.includes('/interviewer/opportunities') &&
                        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    )}
                  >
                    <Calendar className="h-4 w-4" />
                    Opportunities
                  </Link>
                  <Link
                    to="/interviewer/assigned"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                      location.pathname.includes('/interviewer/assigned') &&
                        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    )}
                  >
                    <Clock className="h-4 w-4" />
                    Assigned Interviews
                  </Link>
                  <Link
                    to="/interviewer/history"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                      location.pathname.includes('/interviewer/history') &&
                        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    )}
                  >
                    <History className="h-4 w-4" />
                    Interview History
                  </Link>
                  <Link
                    to="/interviewer/support"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                      location.pathname.includes('/interviewer/support') &&
                        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    )}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Support
                  </Link>
                  <Link
                    to="/interviewer/notifications"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                      location.pathname.includes('/interviewer/notifications') &&
                        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    )}
                  >
                    <Bell className="h-4 w-4" />
                    Notifications
                    {interviewer.notifications.filter(n => !n.read).length > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {interviewer.notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/interviewer/profile"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                      location.pathname.includes('/interviewer/profile') &&
                        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    )}
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full justify-start mt-4 hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900/20 dark:hover:text-purple-400 transition-colors"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
            <Link to="/interviewer" className="flex items-center gap-2 lg:hidden">
              <span className="font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Hirevantage</span>
            </Link>
          </div>
          
          {/* Profile in Header */}
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <Link to="/interviewer/profile" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                {profileInitials}
              </div>
              <span className="text-sm font-medium hidden sm:inline">{interviewer.name}</span>
            </Link>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default InterviewerDashboard;
