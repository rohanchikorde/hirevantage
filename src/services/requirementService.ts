
import { supabaseTable, castResult } from "@/utils/supabaseHelpers";
import { supabase } from "@/integrations/supabase/client";
import { 
  Requirement, 
  CreateRequirementRequest, 
  UpdateRequirementRequest,
  RequirementStatus 
} from "@/types/requirement";
import { toast } from "sonner";

export const requirementService = {
  async createRequirement(request: CreateRequirementRequest): Promise<Requirement | null> {
    try {
      const { data, error } = await supabaseTable('requirements')
        .insert({
          title: request.title,
          description: request.description,
          number_of_positions: request.number_of_positions,
          skills: request.skills,
          years_of_experience: request.years_of_experience,
          price_per_interview: request.price_per_interview,
          company_id: request.company_id,
          raised_by: (await supabase.auth.getUser()).data.user?.id || '',
        })
        .select()
        .single();

      if (error) throw error;
      return castResult<Requirement>(data);
    } catch (error: any) {
      toast.error(`Failed to create requirement: ${error.message}`);
      return null;
    }
  },

  async getRequirements(filters?: { status?: RequirementStatus }): Promise<Requirement[]> {
    try {
      let query = supabaseTable('requirements')
        .select('*');

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return castResult<Requirement[]>(data);
    } catch (error: any) {
      toast.error(`Failed to fetch requirements: ${error.message}`);
      return [];
    }
  },

  async getRequirementById(id: string): Promise<Requirement | null> {
    try {
      const { data, error } = await supabaseTable('requirements')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return castResult<Requirement>(data);
    } catch (error: any) {
      toast.error(`Failed to fetch requirement: ${error.message}`);
      return null;
    }
  },

  async updateRequirement(id: string, updates: UpdateRequirementRequest): Promise<Requirement | null> {
    try {
      const { data, error } = await supabaseTable('requirements')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return castResult<Requirement>(data);
    } catch (error: any) {
      toast.error(`Failed to update requirement: ${error.message}`);
      return null;
    }
  },

  async closeRequirement(id: string, status: 'Fulfilled' | 'Canceled'): Promise<boolean> {
    try {
      const { error } = await supabaseTable('requirements')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error: any) {
      toast.error(`Failed to close requirement: ${error.message}`);
      return false;
    }
  }
};
