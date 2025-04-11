
import { supabase } from "@/integrations/supabase/client";

// This helper provides a workaround for TypeScript errors with tables not defined in types.ts
export const supabaseTable = (tableName: string) => {
  // Using a more robust type assertion to bypass TypeScript restrictions
  return supabase.from(tableName as any) as any;
};

// For consistent type casting of Supabase results
export const castResult = <T>(data: any): T => {
  return data as T;
};
