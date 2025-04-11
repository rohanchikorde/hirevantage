
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
