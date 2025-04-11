// Fix only the type conversion issues in the interviewService.ts file
// We'll create a helper function to convert the Json feedback to InterviewFeedback

import { supabase } from "@/integrations/supabase/client";
import { Interview, InterviewFeedback } from "@/types/interview";
import { Json } from "@/integrations/supabase/types";
import { toast } from "sonner";

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
        .single();

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
      const { data, error } = await supabase
        .from('interviews_schedule')
        .update({ feedback: feedback })
        .eq('id', id)
        .select()
        .single();

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
  }
};
