
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qvxwcnrdpjpwxdopfiyn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2eHdjbnJkcGpwd3hkb3BmaXluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNTUxMDgsImV4cCI6MjA1OTkzMTEwOH0.l7Euj0XvrS_x1yZWYvg9gk6x74lBZppWtqdquInuTks";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
