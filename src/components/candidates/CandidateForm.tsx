
import React, { useState } from 'react';
import { CreateCandidateRequest } from '@/types/candidate';
import { candidateService } from '@/services/candidateService';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  full_name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  resume: z.instanceof(FileList).optional().transform(val => val && val.length > 0 ? val[0] : undefined),
});

type FormData = z.infer<typeof formSchema>;

interface CandidateFormProps {
  requirementId: string;
  onSuccess?: () => void;
}

const CandidateForm: React.FC<CandidateFormProps> = ({ requirementId, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      email: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      let resumeUrl: string | undefined;
      if (data.resume) {
        resumeUrl = await candidateService.uploadResume(data.resume);
      }

      const candidateData: CreateCandidateRequest = {
        full_name: data.full_name,
        email: data.email,
        resume_url: resumeUrl,
        requirement_id: requirementId,
      };

      const result = await candidateService.createCandidate(candidateData);
      if (result) {
        toast.success('Candidate added successfully');
        form.reset();
        onSuccess?.();
      }
    } catch (error: any) {
      toast.error(`Error adding candidate: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resume"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => onChange(e.target.files)}
                  {...fieldProps}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Adding...' : 'Add Candidate'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CandidateForm;
