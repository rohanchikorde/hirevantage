
import { supabaseTable, castResult } from "@/utils/supabaseHelpers";
import { Ticket, TicketWithDetails, CreateTicketRequest, UpdateTicketRequest, TicketStatus } from "@/types/ticket";
import { supabase } from "@/integrations/supabase/client";

export const ticketService = {
  /**
   * Get tickets with optional filters
   */
  async getTickets(filters?: { status?: TicketStatus; company_id?: string }): Promise<TicketWithDetails[]> {
    try {
      let query = supabaseTable('tickets')
        .select(`
          *,
          requirements:requirement_id(title),
          organizations:company_id(name)
        `);

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.company_id) {
        query = query.eq('company_id', filters.company_id);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Error fetching tickets: ${error.message}`);
      }

      // Transform data to match TicketWithDetails interface
      const tickets = castResult<any[]>(data).map(item => ({
        id: item.id,
        requirement_id: item.requirement_id,
        status: item.status,
        raised_by: item.raised_by,
        company_id: item.company_id,
        created_at: item.created_at,
        updated_at: item.updated_at,
        requirement_title: item.requirements?.title,
        company_name: item.organizations?.name
      })) as TicketWithDetails[];

      return tickets;
    } catch (error: any) {
      console.error('Error in getTickets:', error);
      throw error;
    }
  },

  /**
   * Get a ticket by ID
   */
  async getTicketById(ticketId: string): Promise<TicketWithDetails | null> {
    try {
      const { data, error } = await supabaseTable('tickets')
        .select(`
          *,
          requirements:requirement_id(title, description, skills, number_of_positions, years_of_experience, price_per_interview),
          organizations:company_id(name)
        `)
        .eq('id', ticketId)
        .single();

      if (error) {
        throw new Error(`Error fetching ticket: ${error.message}`);
      }

      if (!data) {
        return null;
      }

      // Transform data to match TicketWithDetails interface
      const item = castResult<any>(data);
      return {
        id: item.id,
        requirement_id: item.requirement_id,
        status: item.status,
        raised_by: item.raised_by,
        company_id: item.company_id,
        created_at: item.created_at,
        updated_at: item.updated_at,
        requirement_title: item.requirements?.title,
        company_name: item.organizations?.name
      } as TicketWithDetails;
    } catch (error: any) {
      console.error('Error in getTicketById:', error);
      throw error;
    }
  },

  /**
   * Create a new ticket
   */
  async createTicket(request: CreateTicketRequest): Promise<Ticket | null> {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      if (!user?.user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabaseTable('tickets')
        .insert({
          requirement_id: request.requirement_id,
          company_id: request.company_id,
          raised_by: user.user.id
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Error creating ticket: ${error.message}`);
      }

      return castResult<Ticket>(data);
    } catch (error: any) {
      console.error('Error in createTicket:', error);
      throw error;
    }
  },

  /**
   * Update a ticket's status
   */
  async updateTicketStatus(ticketId: string, request: UpdateTicketRequest): Promise<Ticket | null> {
    try {
      const { data, error } = await supabaseTable('tickets')
        .update({
          status: request.status
        })
        .eq('id', ticketId)
        .select()
        .single();

      if (error) {
        throw new Error(`Error updating ticket: ${error.message}`);
      }

      return castResult<Ticket>(data);
    } catch (error: any) {
      console.error('Error in updateTicketStatus:', error);
      throw error;
    }
  },

  /**
   * Escalate a ticket for rejection
   */
  async escalateTicket(ticketId: string, reason: string): Promise<Ticket | null> {
    try {
      const { data, error } = await supabaseTable('tickets')
        .update({
          status: 'Escalated',
          // In a real application, we would store the reason in a separate table
          // For simplicity, we're not implementing that here
        })
        .eq('id', ticketId)
        .select()
        .single();

      if (error) {
        throw new Error(`Error escalating ticket: ${error.message}`);
      }

      return castResult<Ticket>(data);
    } catch (error: any) {
      console.error('Error in escalateTicket:', error);
      throw error;
    }
  }
};
