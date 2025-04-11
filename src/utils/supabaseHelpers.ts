
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

// This helper provides type-safe operations when working with Supabase tables
export const supabaseTable = <T extends keyof Database['public']['Tables']>(tableName: T) => {
  // Using type assertion to properly type the table
  return supabase.from(tableName);
};

// For consistent type casting of Supabase results
export const castResult = <T>(data: any): T => {
  return data as T;
};

// Helper to check Supabase connection
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('demo_requests').select('count(*)', { count: 'exact', head: true });
    
    if (error) {
      console.error("Supabase connection check failed:", error);
      return false;
    }
    
    console.log("Supabase connection check succeeded");
    return true;
  } catch (error) {
    console.error("Error checking Supabase connection:", error);
    return false;
  }
};
