
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const seedSampleData = async () => {
  console.log("Starting to seed sample data...");
  
  try {
    // Create sample organizations
    const { data: orgs, error: orgsError } = await supabase
      .from('organizations')
      .upsert([
        {
          id: '11111111-1111-1111-1111-111111111111',
          name: 'Acme Corporation',
          industry: 'Technology',
          address: '123 Tech Blvd, San Francisco, CA'
        },
        {
          id: '22222222-2222-2222-2222-222222222222',
          name: 'Globex Inc',
          industry: 'Finance',
          address: '456 Money Ave, New York, NY'
        }
      ], { onConflict: 'id' });
    
    if (orgsError) throw orgsError;
    console.log("Organizations created", orgs);
    
    // Create sample interviewers
    const { data: interviewers, error: interviewersError } = await supabase
      .from('interviewers')
      .upsert([
        {
          id: '33333333-3333-3333-3333-333333333333',
          user_id: '33333333-3333-3333-3333-333333333333',
          company_id: '11111111-1111-1111-1111-111111111111',
          name: 'John Interviewer',
          email: 'john@example.com',
          role: 'interviewer',
          phone: '555-123-4567'
        },
        {
          id: '44444444-4444-4444-4444-444444444444',
          user_id: '44444444-4444-4444-4444-444444444444',
          company_id: '22222222-2222-2222-2222-222222222222',
          name: 'Sarah Interviewer',
          email: 'sarah@example.com',
          role: 'interviewer',
          phone: '555-765-4321'
        }
      ], { onConflict: 'id' });

    if (interviewersError) throw interviewersError;
    console.log("Interviewers created", interviewers);
    
    // Create sample candidates
    const { data: candidates, error: candidatesError } = await supabase
      .from('candidates')
      .upsert([
        {
          id: '55555555-5555-5555-5555-555555555555',
          full_name: 'Alex Candidate',
          email: 'alex@example.com',
          status: 'New',
        },
        {
          id: '66666666-6666-6666-6666-666666666666',
          full_name: 'Taylor Candidate',
          email: 'taylor@example.com',
          status: 'Shortlisted',
        }
      ], { onConflict: 'id' });

    if (candidatesError) throw candidatesError;
    console.log("Candidates created", candidates);
    
    // Create sample requirements
    const { data: requirements, error: requirementsError } = await supabase
      .from('requirements')
      .upsert([
        {
          id: '77777777-7777-7777-7777-777777777777',
          title: 'Senior Frontend Developer',
          company_id: '11111111-1111-1111-1111-111111111111',
          raised_by: '33333333-3333-3333-3333-333333333333',
          skills: ['React', 'TypeScript', 'CSS'],
          years_of_experience: 5,
          price_per_interview: 100,
          number_of_positions: 2,
          status: 'Open',
          description: 'Looking for experienced frontend developers'
        },
        {
          id: '88888888-8888-8888-8888-888888888888',
          title: 'Backend Engineer',
          company_id: '22222222-2222-2222-2222-222222222222',
          raised_by: '44444444-4444-4444-4444-444444444444',
          skills: ['Node.js', 'Python', 'SQL'],
          years_of_experience: 3,
          price_per_interview: 90,
          number_of_positions: 1,
          status: 'Open',
          description: 'Building scalable backend systems'
        }
      ], { onConflict: 'id' });

    if (requirementsError) throw requirementsError;
    console.log("Requirements created", requirements);
    
    // Create sample interviews
    const { data: interviews, error: interviewsError } = await supabase
      .from('interviews_schedule')
      .upsert([
        {
          id: '99999999-9999-9999-9999-999999999999',
          candidate_id: '55555555-5555-5555-5555-555555555555',
          interviewer_id: '33333333-3333-3333-3333-333333333333',
          requirement_id: '77777777-7777-7777-7777-777777777777',
          scheduled_at: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
          status: 'Scheduled'
        },
        {
          id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
          candidate_id: '66666666-6666-6666-6666-666666666666',
          interviewer_id: '44444444-4444-4444-4444-444444444444',
          requirement_id: '88888888-8888-8888-8888-888888888888',
          scheduled_at: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
          status: 'Scheduled'
        }
      ], { onConflict: 'id' });

    if (interviewsError) throw interviewsError;
    console.log("Interviews created", interviews);
    
    toast.success('Sample data seeded successfully');
    return true;
  } catch (error: any) {
    console.error('Error seeding data:', error);
    toast.error(`Failed to seed data: ${error.message}`);
    return false;
  }
};

// Function to check if sample data already exists
export const checkSampleDataExists = async () => {
  try {
    const { data: interviewers, error: interviewersError } = await supabase
      .from('interviewers')
      .select('id')
      .limit(1);
    
    if (interviewersError) throw interviewersError;
    
    const { data: candidates, error: candidatesError } = await supabase
      .from('candidates')
      .select('id')
      .limit(1);
    
    if (candidatesError) throw candidatesError;
    
    return (interviewers && interviewers.length > 0) || 
           (candidates && candidates.length > 0);
  } catch (error) {
    console.error('Error checking for sample data:', error);
    return false;
  }
};
