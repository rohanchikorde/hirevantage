
import { supabase } from "@/integrations/supabase/client";
import { Interview, InterviewFeedback } from "@/types/interview";
import { Json } from "@/integrations/supabase/types";
import { toast } from "sonner";
import { toJson } from "@/utils/supabaseHelpers";

// Helper function to safely convert Json to InterviewFeedback
const convertFeedback = (feedback: Json | null): InterviewFeedback | null => {
  if (!feedback) return null;
  
  try {
    // If it's already a valid InterviewFeedback object
    if (typeof feedback === 'object' && feedback !== null && 'rating' in feedback && 'comments' in feedback) {
      return feedback as unknown as InterviewFeedback;
    }
    
    // Default empty feedback structure if we can't parse it
    return {
      rating: 0,
      comments: ''
    };
  } catch (error) {
    console.error('Error converting feedback:', error);
    return null;
  }
};

export const interviewService = {
  /**
   * Get all interviews
   * @returns {Promise<Interview[]>}
   */
  async getInterviews(): Promise<Interview[]> {
    try {
      const { data, error } = await supabase
        .from('interviews_schedule')
        .select('*');

      if (error) {
        throw new Error(`Error fetching interviews: ${error.message}`);
      }

      if (!data) {
        console.warn('No interviews found.');
        return [];
      }

      return data.map(interview => ({
        ...interview,
        feedback: convertFeedback(interview.feedback)
      })) as Interview[];
    } catch (error: any) {
      console.error('Error in getInterviews:', error);
      toast.error(`Failed to fetch interviews: ${error.message}`);
      return [];
    }
  },

  /**
   * Get an interview by ID
   * @param {string} id
   * @returns {Promise<Interview | null>}
   */
  async getInterviewById(id: string): Promise<Interview | null> {
    try {
      const { data, error } = await supabase
        .from('interviews_schedule')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        throw new Error(`Error fetching interview: ${error.message}`);
      }

      if (!data) {
        console.warn(`Interview with ID ${id} not found.`);
        return null;
      }

      return {
        ...data,
        feedback: convertFeedback(data.feedback)
      } as Interview;
    } catch (error: any) {
      console.error('Error in getInterviewById:', error);
      toast.error(`Failed to fetch interview: ${error.message}`);
      return null;
    }
  },

  /**
   * Add feedback to an interview
   * @param {string} id
   * @param {InterviewFeedback} feedback
   * @returns {Promise<Interview | null>}
   */
  async addInterviewFeedback(id: string, feedback: InterviewFeedback): Promise<Interview | null> {
    try {
      // Convert the feedback to Json type for Supabase
      const { data, error } = await supabase
        .from('interviews_schedule')
        .update({ feedback: toJson(feedback) })
        .eq('id', id)
        .select()
        .maybeSingle();

      if (error) {
        throw new Error(`Error adding feedback to interview: ${error.message}`);
      }

      if (!data) {
        console.warn(`Interview with ID ${id} not found.`);
        return null;
      }

      return {
        ...data,
        feedback: convertFeedback(data.feedback)
      } as Interview;
    } catch (error: any) {
      console.error('Error in addInterviewFeedback:', error);
      toast.error(`Failed to add feedback to interview: ${error.message}`);
      return null;
    }
  },

  /**
   * Update interview status
   * @param {string} id 
   * @param {string} status 
   * @returns {Promise<Interview | null>}
   */
  async updateInterviewStatus(id: string, status: string): Promise<Interview | null> {
    try {
      const { data, error } = await supabase
        .from('interviews_schedule')
        .update({ status })
        .eq('id', id)
        .select()
        .maybeSingle();

      if (error) {
        throw new Error(`Error updating interview status: ${error.message}`);
      }

      if (!data) {
        console.warn(`Interview with ID ${id} not found.`);
        return null;
      }

      return {
        ...data,
        feedback: convertFeedback(data.feedback)
      } as Interview;
    } catch (error: any) {
      console.error('Error in updateInterviewStatus:', error);
      toast.error(`Failed to update interview status: ${error.message}`);
      return null;
    }
  },

  /**
   * Schedule a new interview
   * @param interviewData The interview data to schedule
   * @returns {Promise<Interview | null>}
   */
  async scheduleInterview(interviewData: Omit<Interview, 'id' | 'created_at' | 'updated_at'>): Promise<Interview | null> {
    try {
      // Ensure interviewData has all required fields and proper Json format for feedback
      const processedData = {
        ...interviewData,
        feedback: interviewData.feedback ? toJson(interviewData.feedback) : null
      };

      const { data, error } = await supabase
        .from('interviews_schedule')
        .insert(processedData)
        .select()
        .maybeSingle();

      if (error) {
        throw new Error(`Error scheduling interview: ${error.message}`);
      }

      if (!data) {
        console.warn(`Failed to schedule interview.`);
        return null;
      }

      return {
        ...data,
        feedback: convertFeedback(data.feedback)
      } as Interview;
    } catch (error: any) {
      console.error('Error in scheduleInterview:', error);
      toast.error(`Failed to schedule interview: ${error.message}`);
      return null;
    }
  }
};
