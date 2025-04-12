
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { InterviewStatus, AddInterviewFeedbackRequest, UpdateInterviewStatusRequest, InterviewFeedback, Interview, InterviewWithDetails, ScheduleInterviewRequest } from "@/types/interview";
import { Json } from "@/integrations/supabase/types";

// Helper function to convert Json to InterviewFeedback
const convertJsonToFeedback = (json: Json | null): InterviewFeedback | null => {
  if (!json) return null;
  
  // Ensure the json has the required properties of InterviewFeedback
  if (typeof json === 'object' && json !== null && 'rating' in json && 'comments' in json) {
    return json as unknown as InterviewFeedback;
  }
  
  return null;
};

export const interviewService = {
  async scheduleInterview(request: ScheduleInterviewRequest): Promise<Interview | null> {
    try {
      const { data, error } = await supabase
        .from('interviews_schedule')
        .insert({
          requirement_id: request.requirement_id,
          interviewer_id: request.interviewer_id,
          candidate_id: request.candidate_id,
          scheduled_at: request.scheduled_at,
          status: 'Scheduled'
        })
        .select()
        .single();

      if (error) throw error;
      toast.success('Interview scheduled successfully');
      
      // Convert data to Interview type with proper feedback handling
      return data ? {
        ...data,
        status: data.status as InterviewStatus,
        updated_at: data.updated_at || null,
        feedback: convertJsonToFeedback(data.feedback)
      } : null;
    } catch (error: any) {
      toast.error(`Failed to schedule interview: ${error.message}`);
      return null;
    }
  },

  async getInterviews(filters?: { status?: string; interviewer_id?: string; candidate_id?: string }): Promise<Interview[]> {
    try {
      let query = supabase
        .from('interviews_schedule')
        .select(`
          *,
          requirement:requirement_id(title, skills),
          interviewer:interviewer_id(name, email),
          candidate:candidate_id(full_name, email)
        `)
        .order('scheduled_at', { ascending: false });

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.interviewer_id) {
        query = query.eq('interviewer_id', filters.interviewer_id);
      }

      if (filters?.candidate_id) {
        query = query.eq('candidate_id', filters.candidate_id);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Convert database rows to Interview objects with proper types and feedback handling
      return (data || []).map(item => ({
        ...item,
        status: item.status as InterviewStatus,
        updated_at: item.updated_at || null,
        feedback: convertJsonToFeedback(item.feedback)
      }));
    } catch (error: any) {
      toast.error(`Failed to fetch interviews: ${error.message}`);
      return [];
    }
  },
  
  async getInterviewById(id: string): Promise<Interview | null> {
    try {
      const { data, error } = await supabase
        .from('interviews_schedule')
        .select(`
          *,
          requirement:requirement_id(title, skills),
          interviewer:interviewer_id(name, email),
          candidate:candidate_id(full_name, email)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      
      // Convert database row to Interview object with proper types and feedback handling
      return data ? {
        ...data,
        status: data.status as InterviewStatus,
        updated_at: data.updated_at || null,
        feedback: convertJsonToFeedback(data.feedback)
      } : null;
    } catch (error: any) {
      toast.error(`Failed to fetch interview: ${error.message}`);
      return null;
    }
  },

  async updateInterviewStatus(id: string, statusRequest: UpdateInterviewStatusRequest): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('interviews_schedule')
        .update({ status: statusRequest.status })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Interview ${statusRequest.status.toLowerCase()} successfully`);
      return true;
    } catch (error: any) {
      toast.error(`Failed to update interview: ${error.message}`);
      return false;
    }
  },

  async addInterviewFeedback(id: string, request: AddInterviewFeedbackRequest): Promise<boolean> {
    try {
      // We need to ensure the feedback object is compatible with Json type
      // by serializing and then parsing it
      const feedbackJson = JSON.parse(JSON.stringify(request.feedback)) as Json;
      
      const { error } = await supabase
        .from('interviews_schedule')
        .update({ 
          feedback: feedbackJson,
          status: 'Completed'
        })
        .eq('id', id);

      if (error) throw error;
      toast.success('Feedback submitted successfully');
      return true;
    } catch (error: any) {
      toast.error(`Failed to submit feedback: ${error.message}`);
      return false;
    }
  },

  async submitFeedback(id: string, feedback: any): Promise<boolean> {
    try {
      // We need to ensure the feedback object is compatible with Json type
      // by serializing and then parsing it
      const feedbackJson = JSON.parse(JSON.stringify(feedback)) as Json;
      
      const { error } = await supabase
        .from('interviews_schedule')
        .update({ 
          feedback: feedbackJson,
          status: 'Completed'
        })
        .eq('id', id);

      if (error) throw error;
      toast.success('Feedback submitted successfully');
      return true;
    } catch (error: any) {
      toast.error(`Failed to submit feedback: ${error.message}`);
      return false;
    }
  }
};
