
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Interviewer } from "@/types/interviewer";

export const interviewerService = {
  /**
   * Fetches the total count of interviewers
   */
  async getTotalInterviewers(): Promise<number> {
    try {
      console.log("Fetching total interviewers count");
      const { count, error } = await supabase
        .from('interviewers')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error("Error fetching total interviewers:", error);
        throw error;
      }
      
      return count || 0;
    } catch (error: any) {
      console.error("Error in getTotalInterviewers:", error);
      toast.error(`Failed to fetch interviewers count: ${error.message}`);
      return 0;
    }
  },

  /**
   * Fetches the count of available interviewers
   */
  async getAvailableInterviewers(): Promise<number> {
    try {
      console.log("Fetching available interviewers count");
      const { count, error } = await supabase
        .from('interviewers')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Active');
      
      if (error) {
        console.error("Error fetching available interviewers:", error);
        throw error;
      }
      
      return count || 0;
    } catch (error: any) {
      console.error("Error in getAvailableInterviewers:", error);
      toast.error(`Failed to fetch available interviewers count: ${error.message}`);
      return 0;
    }
  },

  /**
   * Fetches the count of newly signed-up interviewers within a specified period
   * @param days Number of days to look back (default 30)
   */
  async getNewInterviewers(days: number = 30): Promise<number> {
    try {
      console.log(`Fetching new interviewers in the last ${days} days`);
      // Calculate the date for the specified days ago
      const dateFrom = new Date();
      dateFrom.setDate(dateFrom.getDate() - days);
      
      const { count, error } = await supabase
        .from('interviewers')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', dateFrom.toISOString());
      
      if (error) {
        console.error("Error fetching new interviewers:", error);
        throw error;
      }
      
      return count || 0;
    } catch (error: any) {
      console.error("Error in getNewInterviewers:", error);
      toast.error(`Failed to fetch new interviewers count: ${error.message}`);
      return 0;
    }
  },

  /**
   * Sets up a subscription for real-time updates to the interviewers table
   * @param callback Function to call when changes are detected
   */
  subscribeToInterviewers(callback: () => void): any {
    console.log("Setting up subscription to interviewers table");
    return supabase
      .channel('public:interviewers')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'interviewers' }, 
        () => {
          console.log("Detected a change in interviewers table");
          callback();
        }
      )
      .subscribe();
  },

  /**
   * Sets up a subscription for real-time updates to new interviewers
   * @param callback Function to call when changes are detected
   */
  subscribeToNewInterviewers(callback: () => void): any {
    console.log("Setting up subscription to new interviewers");
    return supabase
      .channel('public:interviewers')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'interviewers' 
        }, 
        () => {
          console.log("New interviewer detected");
          callback();
        }
      )
      .subscribe();
  }
};
