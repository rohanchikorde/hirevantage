
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
      console.log("Creating requirement with data:", request);
      const { data, error } = await supabase
        .from('requirements')
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

      if (error) {
        console.error("Error in createRequirement:", error);
        throw error;
      }
      console.log("Requirement created successfully:", data);
      return castResult<Requirement>(data);
    } catch (error: any) {
      console.error("Failed to create requirement:", error);
      toast.error(`Failed to create requirement: ${error.message}`);
      return null;
    }
  },

  async getRequirements(filters?: { status?: RequirementStatus }): Promise<Requirement[]> {
    try {
      let query = supabase
        .from('requirements')
        .select('*');

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return castResult<Requirement[]>(data);
    } catch (error: any) {
      console.error("Error fetching requirements:", error);
      toast.error(`Failed to fetch requirements: ${error.message}`);
      return [];
    }
  },

  async getRequirementById(id: string): Promise<Requirement | null> {
    try {
      const { data, error } = await supabase
        .from('requirements')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return castResult<Requirement>(data);
    } catch (error: any) {
      console.error("Error fetching requirement by ID:", error);
      toast.error(`Failed to fetch requirement: ${error.message}`);
      return null;
    }
  },

  async updateRequirement(id: string, updates: UpdateRequirementRequest): Promise<Requirement | null> {
    try {
      console.log("Updating requirement with ID:", id, "Updates:", updates);
      const { data, error } = await supabase
        .from('requirements')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error("Error in updateRequirement:", error);
        throw error;
      }
      console.log("Requirement updated successfully:", data);
      return castResult<Requirement>(data);
    } catch (error: any) {
      console.error("Failed to update requirement:", error);
      toast.error(`Failed to update requirement: ${error.message}`);
      return null;
    }
  },

  async closeRequirement(id: string, status: 'Fulfilled' | 'Canceled'): Promise<boolean> {
    try {
      console.log("Closing requirement with ID:", id, "Status:", status);
      const { error } = await supabase
        .from('requirements')
        .update({ status })
        .eq('id', id);

      if (error) {
        console.error("Error in closeRequirement:", error);
        throw error;
      }
      console.log("Requirement closed successfully");
      return true;
    } catch (error: any) {
      console.error("Failed to close requirement:", error);
      toast.error(`Failed to close requirement: ${error.message}`);
      return false;
    }
  },
  
  async deleteRequirement(id: string): Promise<boolean> {
    try {
      console.log("Deleting requirement with ID:", id);
      const { error } = await supabase
        .from('requirements')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error in deleteRequirement:", error);
        throw error;
      }
      console.log("Requirement deleted successfully");
      return true;
    } catch (error: any) {
      console.error("Failed to delete requirement:", error);
      toast.error(`Failed to delete requirement: ${error.message}`);
      return false;
    }
  }
};
