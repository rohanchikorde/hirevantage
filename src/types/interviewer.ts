
export interface Interviewer {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Busy' | 'On Leave' | 'Inactive';
  created_at?: string;
  updated_at?: string;
  skills?: string[];
  max_capacity?: number;
  total_interviews?: number;
  company_id?: string;
}

export interface InterviewerStats {
  totalInterviewers: number;
  availableInterviewers: number;
  interviewsThisWeek: number;
  interviewersSignedUp: number;
}
