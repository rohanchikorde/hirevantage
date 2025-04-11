
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { 
  Menu, 
  LayoutDashboard, 
  Calendar, 
  Users, 
  BarChart3, 
  Briefcase, 
  Bell, 
  HelpCircle,
  Building
} from 'lucide-react';
import { organizationMockData } from '@/data/organizationMockData';

const OrganizationDashboard: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:flex border-r border-gray-200 dark:border-gray-800">
        <div className="flex flex-col h-full">
          <div className="py-6 px-7 flex items-center space-x-3">
            <Building className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {organizationMockData.name}
            </h2>
          </div>
          <div className="pt-2 pb-4 px-5">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-purple-700 dark:text-purple-400">Client Portal</span>
                <p className="text-xs mt-1">View-only access. Contact your admin for changes.</p>
              </div>
            </div>
          </div>
          <div className="flex-1 py-4">
            <nav className="space-y-1 px-4">
              <Link
                to="/organization/interviews"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                  (location.pathname === '/organization' || location.pathname === '/organization/interviews') &&
                    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                )}
              >
                <Calendar className="h-4 w-4" />
                Interviews
              </Link>
              <Link
                to="/organization/interviewers"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                  location.pathname === '/organization/interviewers' &&
                    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                )}
              >
                <Users className="h-4 w-4" />
                Interviewers
              </Link>
              <Link
                to="/organization/analytics"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                  location.pathname === '/organization/analytics' &&
                    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                )}
              >
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Link>
              <Link
                to="/organization/positions"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                  location.pathname === '/organization/positions' &&
                    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                )}
              >
                <Briefcase className="h-4 w-4" />
                Positions
              </Link>
              <Link
                to="/organization/notifications"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                  location.pathname === '/organization/notifications' &&
                    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                )}
              >
                <Bell className="h-4 w-4" />
                Notifications
                {organizationMockData.notifications.filter(n => n.status === 'Unread').length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {organizationMockData.notifications.filter(n => n.status === 'Unread').length}
                  </span>
                )}
              </Link>
              <Link
                to="/organization/support"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                  location.pathname === '/organization/support' &&
                    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                )}
              >
                <HelpCircle className="h-4 w-4" />
                Contact Support
              </Link>
            </nav>
          </div>
          <div className="py-4 px-6">
            <Link to="/">
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900/20 dark:hover:text-purple-400 transition-colors"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Switch to Admin
              </Button>
            </Link>
          </div>
        </div>
      </Sidebar>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b shrink-0 bg-white dark:bg-gray-950 sm:px-6 shadow-sm">
          <div className="flex items-center gap-4 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col p-0">
                <div className="p-6 flex items-center space-x-2">
                  <Building className="h-6 w-6 text-purple-600" />
                  <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    {organizationMockData.name}
                  </h2>
                </div>
                <div className="px-5 pb-4">
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-purple-700 dark:text-purple-400">Client Portal</span>
                      <p className="text-xs mt-1">View-only access. Contact your admin for changes.</p>
                    </div>
                  </div>
                </div>
                <nav className="grid gap-2 px-2 py-4">
                  <Link
                    to="/organization/interviews"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                      (location.pathname === '/organization' || location.pathname === '/organization/interviews') &&
                        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    )}
                  >
                    <Calendar className="h-4 w-4" />
                    Interviews
                  </Link>
                  <Link
                    to="/organization/interviewers"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                      location.pathname === '/organization/interviewers' &&
                        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    )}
                  >
                    <Users className="h-4 w-4" />
                    Interviewers
                  </Link>
                  <Link
                    to="/organization/analytics"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                      location.pathname === '/organization/analytics' &&
                        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    )}
                  >
                    <BarChart3 className="h-4 w-4" />
                    Analytics
                  </Link>
                  <Link
                    to="/organization/positions"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                      location.pathname === '/organization/positions' &&
                        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    )}
                  >
                    <Briefcase className="h-4 w-4" />
                    Positions
                  </Link>
                  <Link
                    to="/organization/notifications"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                      location.pathname === '/organization/notifications' &&
                        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    )}
                  >
                    <Bell className="h-4 w-4" />
                    Notifications
                    {organizationMockData.notifications.filter(n => n.status === 'Unread').length > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {organizationMockData.notifications.filter(n => n.status === 'Unread').length}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/organization/support"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                      location.pathname === '/organization/support' &&
                        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    )}
                  >
                    <HelpCircle className="h-4 w-4" />
                    Contact Support
                  </Link>
                  <Link
                    to="/"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Switch to Admin
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link to="/" className="flex items-center gap-2 lg:hidden">
              <Building className="h-5 w-5 text-purple-600" />
              <span className="font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {organizationMockData.name}
              </span>
            </Link>
          </div>
          {/* Company Name */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200 hidden lg:block">
              {organizationMockData.name} Client Portal
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/organization/notifications" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {organizationMockData.notifications.filter(n => n.status === 'Unread').length > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {organizationMockData.notifications.filter(n => n.status === 'Unread').length}
                  </span>
                )}
              </Button>
            </Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-medium">
              AC
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
