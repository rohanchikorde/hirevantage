
import { supabase } from '@/integrations/supabase/client';

export const checkSupabaseConnection = async () => {
  console.log("Checking Supabase connection...");
  try {
    // Try a simple query to test connection
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error("Supabase connection check failed:", error);
      return {
        success: false,
        message: error.message,
        error
      };
    }
    
    console.log("Supabase connection successful");
    return {
      success: true,
      message: "Connection successful",
      data
    };
  } catch (error: any) {
    console.error("Error checking Supabase connection:", error);
    return {
      success: false,
      message: error.message,
      error
    };
  }
};

export const logTableSchemas = async () => {
  // Define explicitly-typed table names to match Supabase schema
  const tables = [
    'profiles',
    'interviewers', 
    'candidates', 
    'organizations',
    'requirements',
    'interviews_schedule'
  ] as const; // Using const assertion to create a tuple of literal types
  
  console.log("Checking Supabase table schemas...");
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        console.error(`Error querying ${table} table:`, error);
      } else {
        console.log(`${table} table schema:`, data && data.length > 0 ? Object.keys(data[0]) : 'No data');
      }
    } catch (error) {
      console.error(`Error checking ${table} table:`, error);
    }
  }
};
