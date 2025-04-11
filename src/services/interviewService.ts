
import { supabase } from '@/integrations/supabase/client';
import { Interview, InterviewFeedback, InterviewStatus } from '@/types/interview';

export interface ScheduleInterviewRequest {
  candidate_id: string;
  interviewer_id: string;
  requirement_id: string;
  scheduled_at: Date;
}

export interface AddInterviewFeedbackRequest {
  rating: number;
  comments: string;
}

export const getInterviews = async (): Promise<Interview[]> => {
  try {
    const { data, error } = await supabase
      .from('interviews_schedule')
      .select('*');

    if (error) {
      console.error('Error fetching interviews:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getInterviews:', error);
    throw error;
  }
};

export const getInterviewById = async (id: string): Promise<Interview | null> => {
  try {
    const { data, error } = await supabase
      .from('interviews_schedule')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching interview:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getInterviewById:', error);
    throw error;
  }
};

export const scheduleInterview = async (interviewData: ScheduleInterviewRequest): Promise<Interview> => {
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

    return data;
  } catch (error) {
    console.error('Error in scheduleInterview:', error);
    throw error;
  }
};

export const updateInterviewStatus = async (id: string, status: InterviewStatus): Promise<Interview> => {
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

    return data;
  } catch (error) {
    console.error('Error in updateInterviewStatus:', error);
    throw error;
  }
};

export const addInterviewFeedback = async (id: string, feedback: AddInterviewFeedbackRequest): Promise<Interview> => {
  try {
    const { data, error } = await supabase
      .from('interviews_schedule')
      .update({ feedback })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error adding interview feedback:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in addInterviewFeedback:', error);
    throw error;
  }
};
