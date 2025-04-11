
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { mockInterviewee } from '@/data/intervieweeMockData';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Code, HelpCircle, Bell, User } from 'lucide-react';

const IntervieweeDashboard: React.FC = () => {
  const interviewee = mockInterviewee;
  const unreadNotifications = interviewee.notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar>
        <SidebarContent>
          <div className="px-3 py-4">
            <div className="flex items-center space-x-2 mb-8">
              <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                {interviewee.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Candidate Portal</p>
                <p className="text-xs text-muted-foreground">{interviewee.name}</p>
              </div>
            </div>
          </div>

          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/interviewee" end className={({ isActive }) => isActive ? "text-purple-600" : ""}>
                      <Home />
                      <span>Overview</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/interviewee/interviews" className={({ isActive }) => isActive ? "text-purple-600" : ""}>
                      <Calendar />
                      <span>Interviews</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/interviewee/coding" className={({ isActive }) => isActive ? "text-purple-600" : ""}>
                      <Code />
                      <span>Coding Prep</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/interviewee/support" className={({ isActive }) => isActive ? "text-purple-600" : ""}>
                      <HelpCircle />
                      <span>Support</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/interviewee/notifications" className={({ isActive }) => isActive ? "text-purple-600" : ""}>
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
                    <NavLink to="/interviewee/profile" className={({ isActive }) => isActive ? "text-purple-600" : ""}>
                      <User />
                      <span>Profile</span>
                    </NavLink>
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
                    to="/interviewee/support" 
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

export default IntervieweeDashboard;
