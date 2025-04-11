
import { supabase } from "@/integrations/supabase/client";

// This helper provides a workaround for TypeScript errors with tables not defined in types.ts
export const supabaseTable = (tableName: string) => {
  // Using type assertion to bypass the TypeScript restriction since we know these tables exist
  return supabase.from(tableName as any);
};

// For consistent type casting of Supabase results
export const castResult = <T>(data: any): T => {
  return data as T;
};
