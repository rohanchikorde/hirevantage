
import { supabase } from '@/integrations/supabase/client';
import { Interview, InterviewFeedback, InterviewStatus, UpdateInterviewStatusRequest, AddInterviewFeedbackRequest } from '@/types/interview';
import { Json } from "@/integrations/supabase/types";
import { toJson } from '@/utils/supabaseHelpers';

// Helper function to convert Json to InterviewFeedback
const parseInterviewFeedback = (feedback: Json | null): InterviewFeedback | null => {
  if (!feedback) return null;
  
  try {
    // Ensure the feedback has the required properties
    const parsedFeedback = feedback as any;
    if (typeof parsedFeedback.rating === 'number' && typeof parsedFeedback.comments === 'string') {
      return {
        rating: parsedFeedback.rating,
        comments: parsedFeedback.comments,
        strengths: parsedFeedback.strengths || [],
        weaknesses: parsedFeedback.weaknesses || [],
        recommendation: parsedFeedback.recommendation || ''
      };
    }
    return null;
  } catch (error) {
    console.error("Error parsing interview feedback:", error);
    return null;
  }
};

// Create an interviewService object with all the functions as methods
export const interviewService = {
  async getInterviews(filter?: { status?: InterviewStatus | 'all' }): Promise<Interview[]> {
    try {
      let query = supabase
        .from('interviews_schedule')
        .select(`
          *,
          candidates(full_name),
          interviewers(name),
          requirements(title)
        `);
      
      if (filter?.status && filter.status !== 'all') {
        query = query.eq('status', filter.status);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching interviews:', error);
        throw error;
      }
      
      // Map the data to the expected format and ensure status is of type InterviewStatus
      const interviews = data.map(item => ({
        ...item,
        status: item.status as InterviewStatus,
        candidate_name: item.candidates?.full_name,
        interviewer_name: item.interviewers?.name,
        requirement_title: item.requirements?.title,
        feedback: parseInterviewFeedback(item.feedback)
      })) as unknown as Interview[];
      
      return interviews;
    } catch (error) {
      console.error('Error in getInterviews:', error);
      throw error;
    }
  },

  async getInterviewById(id: string): Promise<Interview | null> {
    try {
      const { data, error } = await supabase
        .from('interviews_schedule')
        .select(`
          *,
          candidates(full_name),
          interviewers(name),
          requirements(title)
        `)
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching interview:', error);
        throw error;
      }
      
      if (!data) return null;
      
      // Ensure status is of type InterviewStatus and convert feedback
      const interview = {
        ...data,
        status: data.status as InterviewStatus,
        candidate_name: data.candidates?.full_name,
        interviewer_name: data.interviewers?.name,
        requirement_title: data.requirements?.title,
        feedback: parseInterviewFeedback(data.feedback)
      } as unknown as Interview;
      
      return interview;
    } catch (error) {
      console.error('Error in getInterviewById:', error);
      throw error;
    }
  },

  async scheduleInterview(interviewData: { 
    candidate_id: string; 
    interviewer_id: string; 
    requirement_id: string; 
    scheduled_at: string; 
  }): Promise<Interview> {
    try {
      const newInterview = {
        ...interviewData,
        status: 'Scheduled' as InterviewStatus,
      };
      
      const { data, error } = await supabase
        .from('interviews_schedule')
        .insert([newInterview])
        .select()
        .single();
      
      if (error) {
        console.error('Error scheduling interview:', error);
        throw error;
      }
      
      // Ensure status is of type InterviewStatus
      return {
        ...data,
        status: data.status as InterviewStatus,
        feedback: parseInterviewFeedback(data.feedback)
      } as unknown as Interview;
    } catch (error) {
      console.error('Error in scheduleInterview:', error);
      throw error;
    }
  },

  async updateInterviewStatus(id: string, { status }: UpdateInterviewStatusRequest): Promise<Interview> {
    try {
      const { data, error } = await supabase
        .from('interviews_schedule')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating interview status:', error);
        throw error;
      }
      
      // Ensure status is of type InterviewStatus
      return {
        ...data,
        status: data.status as InterviewStatus,
        feedback: parseInterviewFeedback(data.feedback)
      } as unknown as Interview;
    } catch (error) {
      console.error('Error in updateInterviewStatus:', error);
      throw error;
    }
  },

  async addInterviewFeedback(id: string, { feedback }: AddInterviewFeedbackRequest): Promise<Interview> {
    try {
      // Convert the feedback object to a format compatible with Supabase's JSON type
      const jsonFeedback = toJson(feedback);
      
      const { data, error } = await supabase
        .from('interviews_schedule')
        .update({ feedback: jsonFeedback })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error adding interview feedback:', error);
        throw error;
      }
      
      // Ensure status is of type InterviewStatus
      return {
        ...data,
        status: data.status as InterviewStatus,
        feedback: parseInterviewFeedback(data.feedback)
      } as unknown as Interview;
    } catch (error) {
      console.error('Error in addInterviewFeedback:', error);
      throw error;
    }
  }
};
