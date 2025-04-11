
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Unauthorized = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-md w-full text-center">
        <div className="bg-red-100 dark:bg-red-900/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-10 h-10 text-red-600 dark:text-red-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Access Denied</h1>
        
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="outline">
            <Link to="/">
              Return to Home
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="/dashboard">
              Go to Dashboard
            </Link>
          </Button>
          
          <Button variant="ghost" onClick={logout}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
