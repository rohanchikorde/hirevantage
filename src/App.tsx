
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster.tsx'; 
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AuthProvider } from '@/contexts/AuthContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Import components
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';
import Unauthorized from '@/pages/Unauthorized';
import RequestDemo from '@/pages/RequestDemo';
import Pricing from '@/pages/Pricing';
import About from '@/pages/About';

// Requirements pages
import RequirementsPage from '@/pages/requirements/RequirementsPage';
import NewRequirementPage from '@/pages/requirements/NewRequirementPage';
import RequirementDetailPage from '@/pages/requirements/RequirementDetailPage';

// Tickets pages
import TicketsPage from '@/pages/tickets/TicketsPage';
import TicketDetailPage from '@/pages/tickets/TicketDetailPage';

// Interviews pages
import InterviewsPage from '@/pages/interviews/InterviewsPage';
import InterviewDetailPage from '@/pages/interviews/InterviewDetailPage';
import ScheduleInterviewPage from '@/pages/interviews/ScheduleInterviewPage';

// Candidates pages
import CandidatesPage from '@/pages/candidates/CandidatesPage';
import CandidateDetailPage from '@/pages/candidates/CandidateDetailPage';

// Admin pages
import CompaniesPage from '@/pages/admin/CompaniesPage';
import CompanyDetailPage from '@/pages/admin/CompanyDetailPage';
import NewCompanyPage from '@/pages/admin/NewCompanyPage';
import NewInterviewPage from '@/pages/admin/NewInterviewPage';
import InterviewerDetailPage from '@/pages/admin/InterviewerDetailPage';
import InterviewerDashboardPage from '@/pages/admin/InterviewerDashboardPage';
import InterviewerManagementPage from '@/pages/admin/InterviewerManagementPage';
import NewInterviewerPage from '@/pages/admin/NewInterviewerPage';
import SettingsPage from '@/pages/admin/SettingsPage';
import SkillsPage from '@/pages/admin/SkillsPage';
import SkillDetailPage from '@/pages/admin/SkillDetailPage';

// Organization pages
import OrganizationDashboard from '@/pages/organization/OrganizationDashboard';
import OrganizationInterviews from '@/pages/organization/OrganizationInterviews';
import OrganizationInterviewers from '@/pages/organization/OrganizationInterviewers';
import OrganizationAnalytics from '@/pages/organization/OrganizationAnalytics';
import OrganizationPositions from '@/pages/organization/OrganizationPositions';
import OrganizationNotifications from '@/pages/organization/OrganizationNotifications';
import OrganizationSupport from '@/pages/organization/OrganizationSupport';

// Interviewer pages
import InterviewerDashboard from '@/pages/interviewer/InterviewerDashboard';
import InterviewerOverview from '@/pages/interviewer/InterviewerOverview';
import InterviewerOpportunities from '@/pages/interviewer/InterviewerOpportunities';
import InterviewerAssigned from '@/pages/interviewer/InterviewerAssigned';
import InterviewerHistory from '@/pages/interviewer/InterviewerHistory';
import InterviewerSupport from '@/pages/interviewer/InterviewerSupport';
import InterviewerNotifications from '@/pages/interviewer/InterviewerNotifications';
import InterviewerProfile from '@/pages/interviewer/InterviewerProfile';

// Candidate pages (renamed from Interviewee)
import CandidateDashboard from '@/pages/candidate/CandidateDashboard';
import CandidateOverview from '@/pages/candidate/CandidateOverview';
import CandidateInterviews from '@/pages/candidate/CandidateInterviews';
import CandidateCoding from '@/pages/candidate/CandidateCoding';
import CandidateSupport from '@/pages/candidate/CandidateSupport';
import CandidateNotifications from '@/pages/candidate/CandidateNotifications';
import CandidateProfile from '@/pages/candidate/CandidateProfile';

import './App.css';
import { Toaster as SonnerToaster } from 'sonner';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ThemeProvider
      defaultTheme="system"
      storageKey="vite-react-theme"
    >
      <AuthProvider>
        <SidebarProvider>
          <Toaster />
          <SonnerToaster position="bottom-center" richColors closeButton />
          {!isOnline && (
            <div className="fixed bottom-0 left-0 w-full bg-red-500 text-white p-2 text-center z-50">
              You are currently offline. Some features may not be available.
            </div>
          )}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/request-demo" element={<RequestDemo />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute requiredRoles={['admin', 'client', 'super_coordinator', 'client_coordinator']}>
                <Dashboard />
              </ProtectedRoute>
            }>
              <Route index element={<RequirementsPage />} />
              <Route path="requirements" element={<RequirementsPage />} />
              <Route path="requirements/new" element={<NewRequirementPage />} />
              <Route path="requirements/:id" element={<RequirementDetailPage />} />
              
              <Route path="tickets" element={<TicketsPage />} />
              <Route path="tickets/:id" element={<TicketDetailPage />} />
              
              <Route path="interviews" element={<InterviewsPage />} />
              <Route path="interviews/schedule" element={<ScheduleInterviewPage />} />
              <Route path="interviews/:id" element={<InterviewDetailPage />} />
              
              {/* Candidates Routes */}
              <Route path="candidates" element={<CandidatesPage />} />
              <Route path="candidates/:candidateId" element={<CandidateDetailPage />} />
              
              {/* Admin Routes */}
              <Route path="admin/companies" element={
                <ProtectedRoute requiredRoles={['admin', 'super_coordinator']}>
                  <CompaniesPage />
                </ProtectedRoute>
              } />
              <Route path="admin/companies/new" element={
                <ProtectedRoute requiredRoles={['admin', 'super_coordinator']}>
                  <NewCompanyPage />
                </ProtectedRoute>
              } />
              <Route path="admin/companies/:companyId" element={
                <ProtectedRoute requiredRoles={['admin', 'super_coordinator']}>
                  <CompanyDetailPage />
                </ProtectedRoute>
              } />
              <Route path="admin/companies/:companyId/interviews/new" element={
                <ProtectedRoute requiredRoles={['admin', 'super_coordinator']}>
                  <NewInterviewPage />
                </ProtectedRoute>
              } />
              <Route path="admin/interviewers" element={
                <ProtectedRoute requiredRoles={['admin', 'super_coordinator']}>
                  <InterviewerManagementPage />
                </ProtectedRoute>
              } />
              <Route path="admin/interviewers/new" element={
                <ProtectedRoute requiredRoles={['admin', 'super_coordinator']}>
                  <NewInterviewerPage />
                </ProtectedRoute>
              } />
              <Route path="admin/interviewers/:interviewerId" element={
                <ProtectedRoute requiredRoles={['admin', 'super_coordinator']}>
                  <InterviewerDetailPage />
                </ProtectedRoute>
              } />
              <Route path="admin/interviewers/:interviewerId/dashboard" element={
                <ProtectedRoute requiredRoles={['admin', 'super_coordinator']}>
                  <InterviewerDashboardPage />
                </ProtectedRoute>
              } />
              <Route path="admin/skills" element={
                <ProtectedRoute requiredRoles={['admin', 'super_coordinator']}>
                  <SkillsPage />
                </ProtectedRoute>
              } />
              <Route path="admin/skills/:skillId" element={
                <ProtectedRoute requiredRoles={['admin', 'super_coordinator']}>
                  <SkillDetailPage />
                </ProtectedRoute>
              } />
              <Route path="admin/settings" element={
                <ProtectedRoute requiredRoles={['admin', 'super_coordinator']}>
                  <SettingsPage />
                </ProtectedRoute>
              } />
            </Route>
            
            {/* Organization Client Dashboard Routes */}
            <Route path="/organization" element={
              <ProtectedRoute requiredRoles={['client', 'client_coordinator']}>
                <OrganizationDashboard />
              </ProtectedRoute>
            }>
              <Route index element={<OrganizationInterviews />} />
              <Route path="interviews" element={<OrganizationInterviews />} />
              <Route path="interviewers" element={<OrganizationInterviewers />} />
              <Route path="analytics" element={<OrganizationAnalytics />} />
              <Route path="positions" element={<OrganizationPositions />} />
              <Route path="notifications" element={<OrganizationNotifications />} />
              <Route path="support" element={<OrganizationSupport />} />
            </Route>
            
            {/* Interviewer Dashboard Routes */}
            <Route path="/interviewer" element={
              <ProtectedRoute requiredRoles={['interviewer']}>
                <InterviewerDashboard />
              </ProtectedRoute>
            }>
              <Route index element={<InterviewerOverview />} />
              <Route path="opportunities" element={<InterviewerOpportunities />} />
              <Route path="assigned" element={<InterviewerAssigned />} />
              <Route path="history" element={<InterviewerHistory />} />
              <Route path="support" element={<InterviewerSupport />} />
              <Route path="notifications" element={<InterviewerNotifications />} />
              <Route path="profile" element={<InterviewerProfile />} />
            </Route>
            
            {/* Candidate Dashboard Routes (renamed from Interviewee) */}
            <Route path="/candidate" element={
              <ProtectedRoute requiredRoles={['candidate']}>
                <CandidateDashboard />
              </ProtectedRoute>
            }>
              <Route index element={<CandidateOverview />} />
              <Route path="interviews" element={<CandidateInterviews />} />
              <Route path="coding" element={<CandidateCoding />} />
              <Route path="support" element={<CandidateSupport />} />
              <Route path="notifications" element={<CandidateNotifications />} />
              <Route path="profile" element={<CandidateProfile />} />
            </Route>
            
            {/* Legacy routes (for backward compatibility) */}
            <Route path="/interviewee/*" element={
              <ProtectedRoute requiredRoles={['candidate']}>
                <CandidateDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
