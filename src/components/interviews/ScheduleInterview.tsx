
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Loader2, CalendarIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { interviewService, ScheduleInterviewRequest } from '@/services/interviewService';

interface Requirement {
  id: string;
  title: string;
  skills: string[];
}

interface Interviewer {
  id: string;
  name: string;
  email: string;
}

interface Candidate {
  id: string;
  full_name: string;
  email: string;
}

const InterviewFormSchema = z.object({
  requirement_id: z.string({
    required_error: "Please select a requirement",
  }),
  interviewer_id: z.string({
    required_error: "Please select an interviewer",
  }),
  candidate_id: z.string({
    required_error: "Please select a candidate",
  }),
  scheduled_at: z.date({
    required_error: "Please select a date and time",
  }),
});

type InterviewFormValues = z.infer<typeof InterviewFormSchema>;

const ScheduleInterview: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [interviewers, setInterviewers] = useState<Interviewer[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedRequirement, setSelectedRequirement] = useState<string | null>(null);

  const form = useForm<InterviewFormValues>({
    resolver: zodResolver(InterviewFormSchema),
  });

  useEffect(() => {
    fetchRequirements();
    fetchInterviewers();
    fetchCandidates();
  }, []);

  const fetchRequirements = async () => {
    try {
      const { data, error } = await supabase
        .from('requirements')
        .select('id, title, skills')
        .eq('status', 'Approved');

      if (error) throw error;
      setRequirements(data || []);
    } catch (error) {
      console.error('Error fetching requirements:', error);
      toast.error('Failed to load requirements');
    }
  };

  const fetchInterviewers = async () => {
    try {
      const { data, error } = await supabase
        .from('interviewers')
        .select('id, name, email');

      if (error) throw error;
      setInterviewers(data || []);
    } catch (error) {
      console.error('Error fetching interviewers:', error);
      toast.error('Failed to load interviewers');
    }
  };

  const fetchCandidates = async () => {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('id, full_name, email');

      if (error) throw error;
      setCandidates(data || []);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      toast.error('Failed to load candidates');
    }
  };

  const onSubmit = async (data: InterviewFormValues) => {
    setIsLoading(true);
    try {
      const interview: ScheduleInterviewRequest = {
        requirement_id: data.requirement_id,
        interviewer_id: data.interviewer_id,
        candidate_id: data.candidate_id,
        scheduled_at: data.scheduled_at.toISOString(),
      };

      const result = await interviewService.scheduleInterview(interview);
      if (result) {
        form.reset();
      }
    } catch (error) {
      console.error('Error scheduling interview:', error);
      toast.error('Failed to schedule interview');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequirementChange = (value: string) => {
    setSelectedRequirement(value);
    form.setValue('requirement_id', value);
  };

  // Filter interviewers by skills if a requirement is selected
  const filteredInterviewers = selectedRequirement
    ? interviewers.filter(interviewer => {
        const req = requirements.find(r => r.id === selectedRequirement);
        // In a real app, you'd check if interviewer has the required skills
        // For now, just return all interviewers
        return req ? true : true;
      })
    : interviewers;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule New Interview</CardTitle>
        <CardDescription>
          Fill out the form below to schedule a new interview
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
                    onValueChange={(value) => handleRequirementChange(value)}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a requirement" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {requirements.map((requirement) => (
                        <SelectItem key={requirement.id} value={requirement.id}>
                          {requirement.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {selectedRequirement && (
                      <div className="mt-2">
                        <p className="text-xs font-medium">Skills required:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {requirements.find(r => r.id === selectedRequirement)?.skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </FormDescription>
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
                      {filteredInterviewers.map((interviewer) => (
                        <SelectItem key={interviewer.id} value={interviewer.id}>
                          {interviewer.name} ({interviewer.email})
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
                          {candidate.full_name} ({candidate.email})
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
                <FormItem className="flex flex-col">
                  <FormLabel>Date and Time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                        >
                          {field.value ? (
                            format(field.value, "PPP 'at' p")
                          ) : (
                            <span>Pick a date and time</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                      <div className="p-3 border-t border-border">
                        <label htmlFor="time" className="text-sm font-medium">
                          Time
                        </label>
                        <input
                          type="time"
                          id="time"
                          className="w-full px-3 py-2 mt-1 border rounded-md"
                          onChange={(e) => {
                            const date = field.value ? new Date(field.value) : new Date();
                            const [hours, minutes] = e.target.value.split(':');
                            date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
                            field.onChange(date);
                          }}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={form.handleSubmit(onSubmit)} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scheduling...
            </>
          ) : (
            'Schedule Interview'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScheduleInterview;
