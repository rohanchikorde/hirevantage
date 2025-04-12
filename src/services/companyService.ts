
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Company {
  id: string;
  name: string;
  industry: string;
  address: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  interviewsCount?: number;
  createdAt: string;
}

export const companyService = {
  async getCompanies(searchQuery?: string): Promise<Company[]> {
    try {
      let query = supabase
        .from('organizations')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Transform the data to match the expected Company interface
      return (data || []).map(org => ({
        id: org.id,
        name: org.name,
        industry: org.industry || '',
        address: org.address || '',
        createdAt: org.created_at,
        // Adding placeholder for interview count until we implement that query
        interviewsCount: 0
      }));
    } catch (error: any) {
      toast.error(`Failed to fetch companies: ${error.message}`);
      return [];
    }
  },

  async getCompanyById(id: string): Promise<Company | null> {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return {
        id: data.id,
        name: data.name,
        industry: data.industry || '',
        address: data.address || '',
        createdAt: data.created_at,
        interviewsCount: 0 // Placeholder
      };
    } catch (error: any) {
      toast.error(`Failed to fetch company: ${error.message}`);
      return null;
    }
  }
};
