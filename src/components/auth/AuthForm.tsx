
import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AuthFormProps {
  type: 'login' | 'register';
}

// Schema for login form
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// Schema for registration form
const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  company: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Please confirm your password' }),
  role: z.enum(['client', 'interviewer', 'coordinator'], { message: 'Please select a role' })
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with the appropriate schema
  const form = useForm<LoginFormValues | RegisterFormValues>({
    resolver: zodResolver(type === 'login' ? loginSchema : registerSchema),
    defaultValues: type === 'login' 
      ? { email: '', password: '' } 
      : { name: '', company: '', email: '', password: '', confirmPassword: '', role: 'client' }
  });

  const onSubmit = async (data: LoginFormValues | RegisterFormValues) => {
    try {
      setIsSubmitting(true);
      
      if (type === 'login') {
        const loginData = data as LoginFormValues;
        await login(loginData.email, loginData.password);
        navigate('/dashboard');
      } else {
        const registerData = data as RegisterFormValues;
        await register({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          role: registerData.role,
          company: registerData.company
        });
        navigate('/login');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      // Toast notifications are now handled in the auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {type === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          {type === 'login' 
            ? 'Sign in to your Intervue account' 
            : 'Start streamlining your interview process'}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {type === 'register' && (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your company" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>I am a</FormLabel>
                    <select
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-intervue-600/50 focus:border-intervue-600 dark:focus:ring-intervue-500/50 dark:focus:border-intervue-500 transition-all"
                      {...field}
                    >
                      <option value="client">Hiring Manager / Client</option>
                      <option value="interviewer">Interviewer</option>
                      <option value="coordinator">Coordinator</option>
                    </select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="you@example.com" 
                    autoComplete="email"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Password</FormLabel>
                  {type === 'login' && (
                    <Link to="/forgot-password" className="text-sm text-intervue-600 hover:text-intervue-700 dark:text-intervue-400 dark:hover:text-intervue-300 transition-colors">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="••••••••" 
                      autoComplete={type === 'login' ? 'current-password' : 'new-password'}
                      {...field} 
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {type === 'register' && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        placeholder="••••••••" 
                        autoComplete="new-password"
                        {...field} 
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button 
            type="submit" 
            className="w-full py-3 flex items-center justify-center space-x-2"
            disabled={isSubmitting}
          >
            <span>{type === 'login' ? 'Sign in' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          {type === 'login' ? (
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-intervue-600 hover:text-intervue-700 dark:text-intervue-400 dark:hover:text-intervue-300 font-medium transition-colors">
                Sign up
              </Link>
            </p>
          ) : (
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-intervue-600 hover:text-intervue-700 dark:text-intervue-400 dark:hover:text-intervue-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          )}
        </form>
      </Form>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full inline-flex justify-center py-2.5 px-4 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            onClick={() => toast.info('Google authentication will be implemented with Supabase')}
          >
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
          </button>

          <button
            type="button"
            className="w-full inline-flex justify-center py-2.5 px-4 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            onClick={() => toast.info('GitHub authentication will be implemented with Supabase')}
          >
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
