
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
        contactPerson: org.contact_person || '',
        email: org.email || '',
        phone: org.phone || '',
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
        contactPerson: data.contact_person || '',
        email: data.email || '',
        phone: data.phone || '',
        createdAt: data.created_at,
        interviewsCount: 0 // Placeholder
      };
    } catch (error: any) {
      toast.error(`Failed to fetch company: ${error.message}`);
      return null;
    }
  },
  
  async updateCompany(id: string, companyData: Partial<Company>): Promise<boolean> {
    try {
      // Convert from our interface to database column names
      const dbData = {
        name: companyData.name,
        industry: companyData.industry,
        address: companyData.address,
        contact_person: companyData.contactPerson,
        email: companyData.email,
        phone: companyData.phone
      };
      
      const { error } = await supabase
        .from('organizations')
        .update(dbData)
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Company updated successfully');
      return true;
    } catch (error: any) {
      toast.error(`Failed to update company: ${error.message}`);
      return false;
    }
  },
  
  async deleteCompany(id: string): Promise<boolean> {
    try {
      // Delete the company
      const { error } = await supabase
        .from('organizations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Company deleted successfully');
      return true;
    } catch (error: any) {
      toast.error(`Failed to delete company: ${error.message}`);
      return false;
    }
  },
  
  async getCompanyRepresentatives(companyId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select(`
          id,
          profiles (id, full_name, email)
        `)
        .eq('organization_id', companyId);

      if (error) throw error;
      
      return data || [];
    } catch (error: any) {
      toast.error(`Failed to fetch company representatives: ${error.message}`);
      return [];
    }
  },
  
  async getCompanyRequirements(companyId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('requirements')
        .select('*')
        .eq('company_id', companyId)
        .eq('status', 'Pending');

      if (error) throw error;
      
      return data || [];
    } catch (error: any) {
      toast.error(`Failed to fetch company requirements: ${error.message}`);
      return [];
    }
  }
};
