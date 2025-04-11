
import { supabaseTable, castResult } from "@/utils/supabaseHelpers";
import { supabase } from "@/integrations/supabase/client";
import { 
  Candidate, 
  CreateCandidateRequest, 
  UpdateCandidateStatus,
  CandidateStatus 
} from "@/types/candidate";
import { toast } from "sonner";

export const candidateService = {
  async createCandidate(request: CreateCandidateRequest): Promise<Candidate | null> {
    try {
      const { data, error } = await supabaseTable('candidates')
        .insert({
          full_name: request.full_name,
          email: request.email,
          resume_url: request.resume_url,
          requirement_id: request.requirement_id,
          status: 'New' as CandidateStatus
        })
        .select()
        .single();

      if (error) throw error;
      return castResult<Candidate>(data);
    } catch (error: any) {
      toast.error(`Failed to create candidate: ${error.message}`);
      return null;
    }
  },

  async getCandidatesByRequirement(requirementId: string): Promise<Candidate[]> {
    try {
      const { data, error } = await supabaseTable('candidates')
        .select('*')
        .eq('requirement_id', requirementId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return castResult<Candidate[]>(data);
    } catch (error: any) {
      toast.error(`Failed to fetch candidates: ${error.message}`);
      return [];
    }
  },

  async updateCandidateStatus(id: string, status: CandidateStatus): Promise<Candidate | null> {
    try {
      const { data, error } = await supabaseTable('candidates')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return castResult<Candidate>(data);
    } catch (error: any) {
      toast.error(`Failed to update candidate status: ${error.message}`);
      return null;
    }
  },

  async uploadResume(file: File): Promise<string | null> {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `resumes/${fileName}`;
      
      const { error } = await supabase.storage
        .from('candidates')
        .upload(filePath, file);

      if (error) throw error;
      
      const { data } = supabase.storage
        .from('candidates')
        .getPublicUrl(filePath);
      
      return data.publicUrl;
    } catch (error: any) {
      toast.error(`Failed to upload resume: ${error.message}`);
      return null;
    }
  },

  async bulkCreateCandidates(candidates: CreateCandidateRequest[]): Promise<number> {
    try {
      const { data, error } = await supabaseTable('candidates')
        .insert(candidates.map(c => ({
          full_name: c.full_name,
          email: c.email,
          resume_url: c.resume_url,
          requirement_id: c.requirement_id,
          status: 'New' as CandidateStatus
        })))
        .select();

      if (error) throw error;
      return data?.length || 0;
    } catch (error: any) {
      toast.error(`Failed to bulk create candidates: ${error.message}`);
      return 0;
    }
  }
};
