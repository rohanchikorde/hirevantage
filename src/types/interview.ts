
import { Json } from "@/integrations/supabase/types";

export type InterviewStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Canceled';

export interface InterviewFeedback {
  rating: number;
  comments: string;
  strengths?: string[];
  weaknesses?: string[];
  recommendation?: string;
}

export interface Interview {
  id: string;
  candidate_id: string;
  interviewer_id: string;
  requirement_id: string;
  scheduled_at: string;
  status: InterviewStatus;
  feedback?: InterviewFeedback | null;
  created_at: string;
  updated_at: string;
}

export interface InterviewWithDetails extends Interview {
  candidate_name?: string;
  interviewer_name?: string;
  requirement_title?: string;
}

export interface ScheduleInterviewRequest {
  candidate_id: string;
  interviewer_id: string;
  requirement_id: string;
  scheduled_at: string;
}

export interface UpdateInterviewStatusRequest {
  status: InterviewStatus;
}

export interface AddInterviewFeedbackRequest {
  feedback: InterviewFeedback;
}
