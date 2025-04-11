import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { interviewService } from '@/services/interviewService';
import { requirementService } from '@/services/requirementService';
import { Requirement } from '@/types/requirement';
import { ScheduleInterviewRequest } from '@/types/interview';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { supabaseTable, castResult } from '@/utils/supabaseHelpers';

// Define the form schema with Zod
const formSchema = z.object({
  candidate_id: z.string().uuid({ message: 'Please select a candidate' }),
  interviewer_id: z.string().uuid({ message: 'Please select an interviewer' }),
  requirement_id: z.string().uuid({ message: 'Please select a requirement' }),
  scheduled_at: z.string().refine(
    (date) => new Date(date) > new Date(),
    {
      message: 'Interview must be scheduled in the future',
    }
  ),
});

type FormData = z.infer<typeof formSchema>;

const ScheduleInterview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const requirementId = queryParams.get('requirementId');
  
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [interviewers, setInterviewers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requirement_id: requirementId || '',
      candidate_id: '',
      interviewer_id: '',
      scheduled_at: '',
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [requirementsData, candidatesData, interviewersData] = await Promise.all([
        requirementService.getRequirements({ status: 'Approved' }),
        fetchCandidates(),
        fetchInterviewers(),
      ]);
      
      setRequirements(requirementsData);
      setCandidates(candidatesData);
      setInterviewers(interviewersData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchCandidates = async () => {
    try {
      const { data, error } = await supabaseTable('candidates')
        .select('*')
        .order('full_name');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching candidates:', error);
      return [];
    }
  };

  const fetchInterviewers = async () => {
    try {
      const { data, error } = await supabaseTable('interviewers')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching interviewers:', error);
      return [];
    }
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const request: ScheduleInterviewRequest = {
        candidate_id: data.candidate_id,
        interviewer_id: data.interviewer_id,
        requirement_id: data.requirement_id,
        scheduled_at: data.scheduled_at,
      };
      
      await interviewService.scheduleInterview(request);
      toast.success('Interview scheduled successfully');
      navigate('/dashboard/interviews');
    } catch (error) {
      console.error('Error scheduling interview:', error);
      toast.error('Failed to schedule interview');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-intervue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard/interviews')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Interviews
        </Button>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Schedule Interview</CardTitle>
          <CardDescription>
            Create a new interview by filling out the form below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="requirement_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requirement</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={!!requirementId}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a requirement" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {requirements.map((req) => (
                          <SelectItem key={req.id} value={req.id}>
                            {req.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the job requirement for this interview
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="candidate_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Candidate</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a candidate" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {candidates.map((candidate) => (
                          <SelectItem key={candidate.id} value={candidate.id}>
                            {candidate.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interviewer_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interviewer</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an interviewer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {interviewers.map((interviewer) => (
                          <SelectItem key={interviewer.id} value={interviewer.id}>
                            {interviewer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scheduled_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interview Date & Time</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <input
                          type="datetime-local"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Select date and time for the interview (must be in the future)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? 'Scheduling...' : 'Schedule Interview'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleInterview;
