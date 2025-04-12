
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { InterviewStatus, AddInterviewFeedbackRequest, UpdateInterviewStatusRequest } from "@/types/interview";

export interface ScheduleInterviewRequest {
  requirement_id: string;
  interviewer_id: string;
  candidate_id: string;
  scheduled_at: string;
}

export interface Interview {
  id: string;
  requirement_id: string;
  interviewer_id: string;
  candidate_id: string;
  scheduled_at: string;
  status: InterviewStatus;
  feedback?: any;
  created_at: string;
  updated_at?: string;
  requirement?: {
    title: string;
    skills: string[];
  };
  interviewer?: {
    name: string;
    email: string;
  };
  candidate?: {
    full_name: string;
    email: string;
  };
}

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
      return data;
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
      return data || [];
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
      return data;
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
      const { error } = await supabase
        .from('interviews_schedule')
        .update({ 
          feedback: request.feedback,
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
      const { error } = await supabase
        .from('interviews_schedule')
        .update({ 
          feedback,
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
