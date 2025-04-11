
import { Database } from "@/integrations/supabase/types";

export type RequirementStatus = 'Pending' | 'Hold' | 'Approved' | 'Rejected' | 'Fulfilled' | 'Canceled';

export interface Requirement {
  id: string;
  title: string;
  description: string;
  number_of_positions: number;
  skills: string[];
  years_of_experience: number;
  price_per_interview: number;
  status: RequirementStatus;
  raised_by: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateRequirementRequest {
  title: string;
  description: string;
  number_of_positions: number;
  skills: string[];
  years_of_experience: number;
  price_per_interview: number;
  company_id: string;
}

export interface UpdateRequirementRequest {
  title?: string;
  description?: string;
  number_of_positions?: number;
  skills?: string[];
  years_of_experience?: number;
  price_per_interview?: number;
  status?: RequirementStatus;
}
