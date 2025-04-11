
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { Json } from "@/integrations/supabase/types";

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
    // Perform a basic health check query without auth
    const { error } = await supabase
      .from('demo_requests')
      .select('count(*)', { count: 'exact', head: true });
    
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

// Helper to convert TypeScript types to Json type for Supabase
export const toJson = <T>(data: T): Json => {
  return data as unknown as Json;
};

// Helper to check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
    
    return !!session;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error("Error getting current user:", error);
      return null;
    }
    
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Get user profile from profiles table
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error("Error getting user profile:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
};

// Update user profile in profiles table
export const updateUserProfile = async (userId: string, profileData: any) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) {
      console.error("Error updating user profile:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return null;
  }
};

// Helper to log out a user
export const logoutUser = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Error logging out:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    return false;
  }
};
