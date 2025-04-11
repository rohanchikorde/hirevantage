
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

// Define types for our context
type Role = 'admin' | 'candidate' | 'interviewer' | 'client' | 'client_coordinator' | 'super_coordinator' | 'accountant' | 'guest';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  company?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  session: Session | null;
  redirectToDashboard: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
  company?: string;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Create a guest user that will be used if no authenticated user
const GUEST_USER: AuthUser = {
  id: 'guest',
  email: 'guest@hirevantage.com',
  name: 'Guest User',
  role: 'guest' as Role
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state changed:', event);
        setSession(newSession);
        
        if (newSession?.user) {
          // Only set synchronous state updates here
          // We'll fetch complete user data in the setTimeout below
          setUser({
            id: newSession.user.id,
            email: newSession.user.email || '',
            name: newSession.user.user_metadata?.name || 'User',
            role: (newSession.user.user_metadata?.role as Role) || 'guest',
            company: newSession.user.user_metadata?.company,
          });
        } else {
          setUser(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      if (currentSession?.user) {
        setUser({
          id: currentSession.user.id,
          email: currentSession.user.email || '',
          name: currentSession.user.user_metadata?.name || 'User',
          role: (currentSession.user.user_metadata?.role as Role) || 'guest',
          company: currentSession.user.user_metadata?.company,
        });
      } else {
        // Use guest user as fallback if no authenticated user
        setUser(GUEST_USER);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function to direct users to their appropriate dashboard based on role
  const redirectToDashboard = () => {
    if (!user) return;

    switch (user.role) {
      case 'admin':
        navigate('/dashboard/admin/companies');
        break;
      case 'interviewer':
        navigate('/interviewer');
        break;
      case 'candidate':
        navigate('/interviewee');
        break;
      case 'client':
      case 'client_coordinator':
        navigate('/organization');
        break;
      default:
        navigate('/dashboard');
        break;
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast.error(`Login failed: ${error.message}`);
        throw error;
      }
      
      if (data?.user) {
        toast.success(`Welcome back, ${data.user.user_metadata?.name || data.user.email}!`);
        // Use setTimeout to ensure state has updated before redirecting
        setTimeout(() => {
          const role = data.user.user_metadata?.role as Role;
          switch (role) {
            case 'admin':
              navigate('/dashboard/admin/companies');
              break;
            case 'interviewer':
              navigate('/interviewer');
              break;
            case 'candidate':
              navigate('/interviewee');
              break;
            case 'client':
            case 'client_coordinator':
              navigate('/organization');
              break;
            default:
              navigate('/dashboard');
              break;
          }
        }, 0);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            role: userData.role,
            company: userData.company || null
          }
        }
      });
      
      if (error) {
        toast.error(`Registration failed: ${error.message}`);
        throw error;
      }
      
      if (data?.user) {
        toast.success('Account created successfully! Please check your email for verification.');
        navigate('/login');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error(`Logout failed: ${error.message}`);
        throw error;
      }
      
      // Reset to guest user
      setUser(GUEST_USER);
      toast.success('You have been logged out');
      navigate('/');
    } catch (error: any) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!session,
        session,
        redirectToDashboard
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
