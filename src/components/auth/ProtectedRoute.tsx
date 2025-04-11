import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRoles = [] 
}) => {
  const { isLoading } = useAuth();
  const location = useLocation();

  // Show loading state if still loading (keeping loading state for future authentication reimplementation)
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-intervue-600"></div>
      </div>
    );
  }

  // Previously checked for authentication, now bypassing all checks
  // This allows any user to access protected content
  return <>{children}</>;
};

export default ProtectedRoute;
