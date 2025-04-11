
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { mockCandidate } from '@/data/candidateMockData';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Code, HelpCircle, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const CandidateDashboard: React.FC = () => {
  const candidate = mockCandidate;
  const unreadNotifications = candidate.notifications.filter(n => !n.read).length;
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Error will be handled by the toast in the AuthContext
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar>
        <SidebarContent>
          <div className="px-3 py-4">
            <div className="flex items-center space-x-2 mb-8">
              <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                {candidate.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Candidate Portal</p>
                <p className="text-xs text-muted-foreground">{candidate.name}</p>
              </div>
            </div>
          </div>

          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/candidate" end className={({ isActive }) => isActive ? "text-purple-600" : ""}>
                      <Home />
                      <span>Overview</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/candidate/interviews" className={({ isActive }) => isActive ? "text-purple-600" : ""}>
                      <Calendar />
                      <span>Interviews</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/candidate/coding" className={({ isActive }) => isActive ? "text-purple-600" : ""}>
                      <Code />
                      <span>Coding Prep</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/candidate/support" className={({ isActive }) => isActive ? "text-purple-600" : ""}>
                      <HelpCircle />
                      <span>Support</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/candidate/notifications" className={({ isActive }) => isActive ? "text-purple-600" : ""}>
                      <Bell />
                      <span>Notifications</span>
                      {unreadNotifications > 0 && (
                        <span className="ml-auto bg-purple-600 text-white text-xs rounded-full px-2 py-0.5">
                          {unreadNotifications}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/candidate/profile" className={({ isActive }) => isActive ? "text-purple-600" : ""}>
                      <User />
                      <span>Profile</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleLogout}>
                    <LogOut />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-auto pb-4">
            <SidebarGroupContent>
              <div className="px-3 py-2">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-md p-3 border border-purple-100 dark:border-purple-900/30">
                  <h4 className="text-sm font-medium text-purple-800 dark:text-purple-300 mb-1">Need help?</h4>
                  <p className="text-xs text-purple-700 dark:text-purple-400 mb-2">
                    Contact our support team for assistance with your interviews.
                  </p>
                  <NavLink 
                    to="/candidate/support" 
                    className="text-xs text-purple-700 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-200 font-medium underline underline-offset-2"
                  >
                    Go to support
                  </NavLink>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <div className="flex-1 overflow-auto">
        <div className="container px-4 py-6 md:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
