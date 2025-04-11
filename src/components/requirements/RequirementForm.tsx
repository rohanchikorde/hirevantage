
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { CreateRequirementRequest } from '@/types/requirement';
import { requirementService } from '@/services/requirementService';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

// Define form schema with Zod
const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  number_of_positions: z.coerce.number().positive({ message: 'Number of positions must be positive' }),
  skills: z.string().transform((val) => val.split(',').map(skill => skill.trim()).filter(Boolean)),
  years_of_experience: z.coerce.number().nonnegative({ message: 'Years of experience must be non-negative' }),
  price_per_interview: z.coerce.number().positive({ message: 'Price per interview must be positive' }),
});

// Define the form data type based on the Zod schema
type FormData = z.input<typeof formSchema>;
// This defines the type after Zod transformations
type ProcessedFormData = z.output<typeof formSchema>;

interface RequirementFormProps {
  onSuccess?: (requirementId: string) => void;
}

const RequirementForm: React.FC<RequirementFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      number_of_positions: 1,
      skills: '', // String for user input, transformed to string[] by Zod during submission
      years_of_experience: 0,
      price_per_interview: 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast.error('You must be logged in to create a requirement');
      return;
    }

    setIsSubmitting(true);

    try {
      // For demo purposes, use the first organization
      // In a real app, we would let the user select their organization
      const companyId = user.company || '';
      
      // Transform the data with Zod to ensure skills is a string[]
      const processedData = formSchema.parse(data) as ProcessedFormData;

      const request: CreateRequirementRequest = {
        title: processedData.title,
        description: processedData.description,
        number_of_positions: processedData.number_of_positions,
        skills: processedData.skills, // Now this is correctly a string[]
        years_of_experience: processedData.years_of_experience,
        price_per_interview: processedData.price_per_interview,
        company_id: companyId,
      };

      const result = await requirementService.createRequirement(request);
      if (result) {
        toast.success('Requirement created successfully');
        form.reset();
        onSuccess?.(result.id);
      }
    } catch (error: any) {
      toast.error(`Error creating requirement: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Raise New Requirement</CardTitle>
        <CardDescription>
          Fill out the form below to raise a new interview requirement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Senior React Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Detailed description of the position and interview requirements"
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="number_of_positions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Positions</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="years_of_experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="React, TypeScript, Node.js" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price_per_interview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per Interview ($)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Submitting...' : 'Raise Requirement'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RequirementForm;
