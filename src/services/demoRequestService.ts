
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface DemoRequest {
  full_name: string;
  work_email: string;
  phone_number: string;
  company_name: string;
  job_title?: string;
  team_size?: string;
  hiring_goals?: string;
  how_heard?: string;
}

export const demoRequestService = {
  /**
   * Submit a new demo request
   */
  async submitDemoRequest(request: DemoRequest): Promise<boolean> {
    try {
      console.log("Submitting demo request:", request);
      
      const { data, error } = await supabase
        .from('demo_requests')
        .insert({
          full_name: request.full_name,
          work_email: request.work_email,
          phone_number: request.phone_number,
          company_name: request.company_name,
          job_title: request.job_title || null,
          team_size: request.team_size || null,
          hiring_goals: request.hiring_goals || null,
          how_heard: request.how_heard || null
        });

      if (error) {
        console.error("Supabase error:", error);
        toast.error(`Error submitting demo request: ${error.message}`);
        return false;
      }

      console.log("Demo request submitted successfully");
      return true;
    } catch (error: any) {
      console.error('Error in submitDemoRequest:', error);
      toast.error(`Failed to submit demo request: ${error.message}`);
      return false;
    }
  }
};
