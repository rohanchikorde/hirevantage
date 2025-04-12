
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Skill {
  id: string;
  name: string;
  category: string;
  created_at: string;
}

export const skillsService = {
  async getSkills(searchQuery?: string, category?: string): Promise<Skill[]> {
    try {
      let query = supabase
        .from('skills')
        .select('*')
        .order('name');

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      toast.error(`Failed to fetch skills: ${error.message}`);
      return [];
    }
  },

  async addSkill(skillData: { name: string; category: string }): Promise<Skill | null> {
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert(skillData)
        .select()
        .single();

      if (error) throw error;
      toast.success(`Skill "${skillData.name}" added successfully`);
      return data;
    } catch (error: any) {
      toast.error(`Failed to add skill: ${error.message}`);
      return null;
    }
  },

  async updateSkill(id: string, skillData: { name?: string; category?: string }): Promise<Skill | null> {
    try {
      const { data, error } = await supabase
        .from('skills')
        .update(skillData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      toast.success(`Skill updated successfully`);
      return data;
    } catch (error: any) {
      toast.error(`Failed to update skill: ${error.message}`);
      return null;
    }
  },

  async deleteSkill(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Skill deleted successfully');
      return true;
    } catch (error: any) {
      toast.error(`Failed to delete skill: ${error.message}`);
      return false;
    }
  }
};
