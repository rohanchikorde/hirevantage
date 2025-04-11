import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
import { useAuth } from '@/contexts/AuthContext';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Image } from '@/components/ui/image';
import { 
  Menu, 
  List, 
  LogOut, 
  Calendar, 
  Ticket,
  Building,
  Users,
  Settings,
  Briefcase,
  UserRound
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
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
                to="/dashboard/requirements"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                  location.pathname.includes('/dashboard/requirements') &&
                    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                )}
              >
                <List className="h-4 w-4" />
                Requirements
              </Link>
              <Link
                to="/dashboard/tickets"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                  location.pathname.includes('/dashboard/tickets') &&
                    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                )}
              >
                <Ticket className="h-4 w-4" />
                Tickets
              </Link>
              <Link
                to="/dashboard/interviews"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                  location.pathname.includes('/dashboard/interviews') &&
                    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                )}
              >
                <Calendar className="h-4 w-4" />
                Interviews
              </Link>
              <Link
                to="/dashboard/candidates"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                  location.pathname.includes('/dashboard/candidates') &&
                    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                )}
              >
                <UserRound className="h-4 w-4" />
                Candidates
              </Link>
              
              {/* Admin Section */}
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="px-3 mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Administration
                </h3>
                <Link
                  to="/dashboard/admin/companies"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                    location.pathname.includes('/dashboard/admin/companies') &&
                      "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  )}
                >
                  <Building className="h-4 w-4" />
                  Companies
                </Link>
                <Link
                  to="/dashboard/admin/interviewers"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                    location.pathname.includes('/dashboard/admin/interviewers') &&
                      "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  )}
                >
                  <Users className="h-4 w-4" />
                  Interviewers
                </Link>
                <Link
                  to="/dashboard/admin/skills"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                    location.pathname.includes('/dashboard/admin/skills') &&
                      "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  )}
                >
                  <Briefcase className="h-4 w-4" />
                  Skills
                </Link>
                <Link
                  to="/dashboard/admin/settings"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                    location.pathname.includes('/dashboard/admin/settings') &&
                      "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  )}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </div>
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
                <div className="p-6">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Hirevantage
                  </h2>
                </div>
                <nav className="grid gap-2 px-2 py-4">
                  <Link
                    to="/dashboard/requirements"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                      location.pathname.includes('/dashboard/requirements') &&
                        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    )}
                  >
                    <List className="h-4 w-4" />
                    Requirements
                  </Link>
                  <Link
                    to="/dashboard/tickets"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                      location.pathname.includes('/dashboard/tickets') &&
                        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    )}
                  >
                    <Ticket className="h-4 w-4" />
                    Tickets
                  </Link>
                  <Link
                    to="/dashboard/interviews"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                      location.pathname.includes('/dashboard/interviews') &&
                        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    )}
                  >
                    <Calendar className="h-4 w-4" />
                    Interviews
                  </Link>
                  <Link
                    to="/dashboard/candidates"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                      location.pathname.includes('/dashboard/candidates') &&
                        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    )}
                  >
                    <UserRound className="h-4 w-4" />
                    Candidates
                  </Link>
                  
                  {/* Admin Section in Mobile Menu */}
                  <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="px-3 mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Administration
                    </h3>
                    <Link
                      to="/dashboard/admin/companies"
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                        location.pathname.includes('/dashboard/admin/companies') &&
                          "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                      )}
                    >
                      <Building className="h-4 w-4" />
                      Companies
                    </Link>
                    <Link
                      to="/dashboard/admin/interviewers"
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                        location.pathname.includes('/dashboard/admin/interviewers') &&
                          "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                      )}
                    >
                      <Users className="h-4 w-4" />
                      Interviewers
                    </Link>
                    <Link
                      to="/dashboard/admin/skills"
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                        location.pathname.includes('/dashboard/admin/skills') &&
                          "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                      )}
                    >
                      <Briefcase className="h-4 w-4" />
                      Skills
                    </Link>
                    <Link
                      to="/dashboard/admin/settings"
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400",
                        location.pathname.includes('/dashboard/admin/settings') &&
                          "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                      )}
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </div>
                  <Link
                    to="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-purple-600 dark:hover:text-purple-400"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link to="/" className="flex items-center gap-2 lg:hidden">
              <Image src="/assets/logo.png" alt="Logo" className="h-8 w-8" />
              <span className="font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Hirevantage</span>
            </Link>
          </div>
          {/* Remove top navigation bar and keep just the profile */}
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard/admin/settings" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                AJ
              </div>
              <span className="text-sm font-medium hidden sm:inline">Alex Johnson</span>
            </Link>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
