
import { CreateRequirementRequest, Requirement, UpdateRequirementRequest, RequirementStatus } from '@/types/requirement';
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

    // Cast the data to ensure it matches the Requirement type
    return (data || []) as Requirement[];
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

    // Cast the data to ensure it matches the Requirement type
    return data as Requirement;
  },

  async createRequirement(request: CreateRequirementRequest): Promise<{ id: string } | null> {
    const { data, error } = await typedSupabase.requirements().insert([
      {
        ...request,
        raised_by: supabase.auth.getUser().then(({ data }) => data?.user?.id) || null,
      },
    ]).select('id').single();

    if (error) {
      console.error('Error creating requirement:', error);
      return null;
    }

    return data;
  },

  async updateRequirementStatus(id: string, status: RequirementStatus): Promise<boolean> {
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

  // Add the missing functions that are referenced in RequirementDetail.tsx
  async updateRequirement(id: string, updates: UpdateRequirementRequest): Promise<Requirement | null> {
    const { data, error } = await typedSupabase
      .requirements()
      .update(updates)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Error updating requirement:', error);
      return null;
    }

    return data as Requirement;
  },

  async closeRequirement(id: string, status: 'Fulfilled' | 'Canceled'): Promise<boolean> {
    return this.updateRequirementStatus(id, status as RequirementStatus);
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
