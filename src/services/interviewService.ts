
import { supabaseTable, castResult } from "@/utils/supabaseHelpers";
import { 
  Interview, 
  InterviewWithDetails, 
  ScheduleInterviewRequest, 
  UpdateInterviewStatusRequest, 
  AddInterviewFeedbackRequest,
  InterviewStatus,
  InterviewFeedback
} from "@/types/interview";
import { Json } from "@/integrations/supabase/types";

// Helper function to convert Json to InterviewFeedback if needed
const convertFeedback = (feedback: Json | null): InterviewFeedback | null => {
  if (!feedback) return null;
  
  // If it's already the right shape, return it
  if (typeof feedback === 'object' && feedback !== null && 'rating' in feedback && 'comments' in feedback) {
    const typedFeedback = feedback as unknown as InterviewFeedback;
    return {
      rating: Number(typedFeedback.rating),
      comments: String(typedFeedback.comments),
      strengths: Array.isArray(typedFeedback.strengths) ? typedFeedback.strengths.map(String) : undefined,
      weaknesses: Array.isArray(typedFeedback.weaknesses) ? typedFeedback.weaknesses.map(String) : undefined,
      recommendation: typedFeedback.recommendation ? String(typedFeedback.recommendation) : undefined
    };
  }
  
  return null;
};

export const interviewService = {
  /**
   * Schedule a new interview
   */
  async scheduleInterview(request: ScheduleInterviewRequest): Promise<Interview | null> {
    try {
      const { data, error } = await supabaseTable('interviews_schedule')
        .insert({
          candidate_id: request.candidate_id,
          interviewer_id: request.interviewer_id,
          requirement_id: request.requirement_id,
          scheduled_at: request.scheduled_at,
          status: 'Scheduled' as InterviewStatus
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Error scheduling interview: ${error.message}`);
      }

      return castResult<Interview>(data);
    } catch (error: any) {
      console.error('Error in scheduleInterview:', error);
      throw error;
    }
  },

  /**
   * Get interviews with optional filters
   */
  async getInterviews(filters?: { status?: InterviewStatus; interviewer_id?: string }): Promise<InterviewWithDetails[]> {
    try {
      let query = supabaseTable('interviews_schedule')
        .select(`
          *,
          candidates:candidate_id(*),
          interviewers:interviewer_id(*),
          requirements:requirement_id(*)
        `);

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.interviewer_id) {
        query = query.eq('interviewer_id', filters.interviewer_id);
      }

      const { data, error } = await query.order('scheduled_at', { ascending: true });

      if (error) {
        throw new Error(`Error fetching interviews: ${error.message}`);
      }

      // Transform data to match InterviewWithDetails interface using type assertion
      const interviews = castResult<any[]>(data).map(item => {
        return {
          id: item.id,
          candidate_id: item.candidate_id,
          interviewer_id: item.interviewer_id,
          requirement_id: item.requirement_id,
          scheduled_at: item.scheduled_at,
          status: item.status,
          feedback: convertFeedback(item.feedback),
          created_at: item.created_at,
          updated_at: item.updated_at,
          candidate_name: item.candidates?.full_name,
          interviewer_name: item.interviewers?.name,
          requirement_title: item.requirements?.title
        } as InterviewWithDetails;
      });

      return interviews;
    } catch (error: any) {
      console.error('Error in getInterviews:', error);
      throw error;
    }
  },

  /**
   * Get an interview by ID
   */
  async getInterviewById(interviewId: string): Promise<InterviewWithDetails | null> {
    try {
      const { data, error } = await supabaseTable('interviews_schedule')
        .select(`
          *,
          candidates:candidate_id(*),
          interviewers:interviewer_id(*),
          requirements:requirement_id(*)
        `)
        .eq('id', interviewId)
        .single();

      if (error) {
        throw new Error(`Error fetching interview: ${error.message}`);
      }

      if (!data) {
        return null;
      }

      // Transform data to match InterviewWithDetails interface using type assertion
      const item = castResult<any>(data);
      return {
        id: item.id,
        candidate_id: item.candidate_id,
        interviewer_id: item.interviewer_id,
        requirement_id: item.requirement_id,
        scheduled_at: item.scheduled_at,
        status: item.status,
        feedback: convertFeedback(item.feedback),
        created_at: item.created_at,
        updated_at: item.updated_at,
        candidate_name: item.candidates?.full_name,
        interviewer_name: item.interviewers?.name,
        requirement_title: item.requirements?.title
      } as InterviewWithDetails;
    } catch (error: any) {
      console.error('Error in getInterviewById:', error);
      throw error;
    }
  },

  /**
   * Update an interview's status
   */
  async updateInterviewStatus(interviewId: string, request: UpdateInterviewStatusRequest): Promise<Interview | null> {
    try {
      const { data, error } = await supabaseTable('interviews_schedule')
        .update({
          status: request.status
        })
        .eq('id', interviewId)
        .select()
        .single();

      if (error) {
        throw new Error(`Error updating interview status: ${error.message}`);
      }

      return castResult<Interview>(data);
    } catch (error: any) {
      console.error('Error in updateInterviewStatus:', error);
      throw error;
    }
  },

  /**
   * Add feedback to an interview
   */
  async addInterviewFeedback(interviewId: string, request: AddInterviewFeedbackRequest): Promise<Interview | null> {
    try {
      const { data, error } = await supabaseTable('interviews_schedule')
        .update({
          feedback: request.feedback as unknown as Json,
          status: 'Completed' as InterviewStatus // Automatically update status to Completed when feedback is added
        })
        .eq('id', interviewId)
        .select()
        .single();

      if (error) {
        throw new Error(`Error adding interview feedback: ${error.message}`);
      }

      return castResult<Interview>(data);
    } catch (error: any) {
      console.error('Error in addInterviewFeedback:', error);
      throw error;
    }
  }
};
