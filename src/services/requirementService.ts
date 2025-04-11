import { CreateRequirementRequest, Requirement } from '@/types/requirement';
import { supabase, typedSupabase } from '@/integrations/supabase/client';

export const requirementService = {
  async getRequirements(filters?: { status: string }): Promise<Requirement[]> {
    let query = typedSupabase.requirements().select('*');

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching requirements:', error);
      throw new Error('Failed to fetch requirements');
    }

    return data || [];
  },

  async getRequirementById(id: string): Promise<Requirement | null> {
    const { data, error } = await typedSupabase
      .requirements()
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching requirement:', error);
      return null;
    }

    return data;
  },

  async createRequirement(request: CreateRequirementRequest): Promise<{ id: string } | null> {
    const { data, error } = await typedSupabase.requirements().insert([
      {
        ...request,
        raised_by: supabase.auth.currentUser?.id,
      },
    ]).select('id').single();

    if (error) {
      console.error('Error creating requirement:', error);
      return null;
    }

    return data;
  },

  async updateRequirementStatus(id: string, status: string): Promise<boolean> {
    const { error } = await typedSupabase
      .requirements()
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating requirement status:', error);
      return false;
    }

    return true;
  },

  async getClientData(userId: string) {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('organization_id')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching client data:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error in getClientData:', error);
      return null;
    }
  }
};
