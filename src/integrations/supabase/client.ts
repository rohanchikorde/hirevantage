
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qvxwcnrdpjpwxdopfiyn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2eHdjbnJkcGpwd3hkb3BmaXluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNTUxMDgsImV4cCI6MjA1OTkzMTEwOH0.l7Euj0XvrS_x1yZWYvg9gk6x74lBZppWtqdquInuTks";

// Using a more specific type definition for our Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Create a typed helper for each table to improve type safety
export const typedSupabase = {
  candidates: () => supabase.from('candidates'),
  requirements: () => supabase.from('requirements'),
  interviewers: () => supabase.from('interviewers'),
  interviews_schedule: () => supabase.from('interviews_schedule'),
  tickets: () => supabase.from('tickets'),
  organizations: () => supabase.from('organizations'),
  user_profiles: () => supabase.from('user_profiles'),
  admins: () => supabase.from('admins'),
  clients: () => supabase.from('clients'),
  auth: {
    signUp: (data: any) => supabase.auth.signUp(data),
    signIn: (data: any) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
    getSession: () => supabase.auth.getSession(),
    onAuthStateChange: (callback: any) => supabase.auth.onAuthStateChange(callback),
  },
  storage: {
    from: (bucket: string) => supabase.storage.from(bucket)
  }
};
