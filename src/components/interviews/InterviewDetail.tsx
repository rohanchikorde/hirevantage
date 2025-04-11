
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InterviewWithDetails, InterviewStatus, AddInterviewFeedbackRequest, InterviewFeedback } from '@/types/interview';
import { interviewService } from '@/services/interviewService';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Briefcase, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare 
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

// Status badge color mapping
const statusColors: Record<InterviewStatus, string> = {
  'Scheduled': 'bg-blue-500',
  'In Progress': 'bg-yellow-500',
  'Completed': 'bg-green-500',
  'Canceled': 'bg-red-500'
};

// Form schema for feedback
interface FeedbackFormValues {
  rating: number;
  comments: string;
  strengths: string;
  weaknesses: string;
  recommendation: string;
}

/**
 * Type guard to check if an object is a valid InterviewFeedback object
 */
const isValidFeedback = (feedback: any): feedback is InterviewFeedback => {
  return (
    feedback !== null &&
    typeof feedback === 'object' &&
    typeof feedback.rating === 'number' &&
    typeof feedback.comments === 'string'
  );
};

/**
 * Interview Detail component displays information about a specific interview
 */
const InterviewDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [interview, setInterview] = useState<InterviewWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  
  // Form for feedback
  const form = useForm<FeedbackFormValues>({
    defaultValues: {
      rating: 3,
      comments: '',
      strengths: '',
      weaknesses: '',
      recommendation: ''
    }
  });
  
  // Fetch interview data
  useEffect(() => {
    if (!id) return;
    
    const fetchInterview = async () => {
      try {
        setIsLoading(true);
        const data = await interviewService.getInterviewById(id);
        setInterview(data);
        
        // Prefill form if feedback exists
        if (data?.feedback && isValidFeedback(data.feedback)) {
          form.reset({
            rating: data.feedback.rating,
            comments: data.feedback.comments,
            strengths: data.feedback.strengths?.join(', ') || '',
            weaknesses: data.feedback.weaknesses?.join(', ') || '',
            recommendation: data.feedback.recommendation || ''
          });
        }
      } catch (error) {
        toast.error('Failed to load interview details');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInterview();
  }, [id, form]);
  
  // Handle status change
  const handleStatusChange = async (newStatus: InterviewStatus) => {
    if (!id || !interview) return;
    
    try {
      setIsUpdating(true);
      await interviewService.updateInterviewStatus(id, { status: newStatus });
      setInterview(prev => prev ? { ...prev, status: newStatus } : null);
      toast.success(`Interview status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update interview status');
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Handle feedback submission
  const onSubmitFeedback = async (values: FeedbackFormValues) => {
    if (!id) return;
    
    try {
      setIsUpdating(true);
      
      // Prepare feedback data
      const feedbackRequest: AddInterviewFeedbackRequest = {
        feedback: {
          rating: values.rating,
          comments: values.comments,
          strengths: values.strengths.split(',').map(s => s.trim()).filter(Boolean),
          weaknesses: values.weaknesses.split(',').map(s => s.trim()).filter(Boolean),
          recommendation: values.recommendation
        }
      };
      
      await interviewService.addInterviewFeedback(id, feedbackRequest);
      
      // Update local state
      const updatedInterview = await interviewService.getInterviewById(id);
      setInterview(updatedInterview);
      
      toast.success('Feedback submitted successfully');
    } catch (error) {
      toast.error('Failed to submit feedback');
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full"></div>
      </div>
    );
  }
  
  if (!interview) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Interview not found</h2>
        <p className="text-muted-foreground mb-4">The interview you're looking for doesn't exist or you don't have permission to view it.</p>
        <Button onClick={() => navigate('/dashboard/interviews')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Interviews
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate('/dashboard/interviews')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Interviews
        </Button>
      </div>
      
      {/* Interview Information Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Interview Details</CardTitle>
              <CardDescription>
                {interview.candidate_name && `Interview with ${interview.candidate_name}`}
              </CardDescription>
            </div>
            <Badge className={statusColors[interview.status]}>
              {interview.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Interview Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Candidate:</span>
                <span className="ml-2">{interview.candidate_name || 'Unknown'}</span>
              </div>
              <div className="flex items-center text-sm">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Interviewer:</span>
                <span className="ml-2">{interview.interviewer_name || 'Unknown'}</span>
              </div>
              <div className="flex items-center text-sm">
                <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Requirement:</span>
                <span className="ml-2">{interview.requirement_title || 'Unknown'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Scheduled At:</span>
                <span className="ml-2">
                  {interview.scheduled_at ? format(new Date(interview.scheduled_at), 'PPpp') : 'Not scheduled'}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Created:</span>
                <span className="ml-2">
                  {interview.created_at ? format(new Date(interview.created_at), 'PPp') : 'Unknown'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Status Management */}
          {interview.status !== 'Completed' && (
            <>
              <Separator className="my-4" />
              <div>
                <h3 className="text-sm font-medium mb-2">Update Status</h3>
                <Select
                  disabled={isUpdating}
                  defaultValue={interview.status}
                  onValueChange={(value) => handleStatusChange(value as InterviewStatus)}
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
          
          {/* Feedback Section */}
          {interview.status === 'Completed' && interview.feedback && isValidFeedback(interview.feedback) && (
            <>
              <Separator className="my-4" />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Interview Feedback</h3>
                
                {/* Rating */}
                <div className="space-y-1">
                  <span className="text-sm font-medium">Rating:</span>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < interview.feedback!.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                
                {/* Comments */}
                <div className="space-y-1">
                  <span className="text-sm font-medium">Comments:</span>
                  <p className="text-sm p-3 bg-muted rounded-md">{interview.feedback.comments}</p>
                </div>
                
                {/* Strengths */}
                {interview.feedback.strengths && interview.feedback.strengths.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-sm font-medium">Strengths:</span>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {interview.feedback.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <ThumbsUp className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Weaknesses */}
                {interview.feedback.weaknesses && interview.feedback.weaknesses.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-sm font-medium">Areas for Improvement:</span>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {interview.feedback.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start">
                          <ThumbsDown className="h-4 w-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Recommendation */}
                {interview.feedback.recommendation && (
                  <div className="space-y-1">
                    <span className="text-sm font-medium">Recommendation:</span>
                    <p className="text-sm p-3 bg-muted rounded-md">{interview.feedback.recommendation}</p>
                  </div>
                )}
              </div>
            </>
          )}
          
          {/* Add Feedback Form */}
          {(interview.status === 'In Progress' || interview.status === 'Completed') && 
           (!interview.feedback || !isValidFeedback(interview.feedback)) && (
            <>
              <Separator className="my-4" />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Add Interview Feedback</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitFeedback)} className="space-y-4">
                    {/* Rating */}
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rating (1-5)</FormLabel>
                          <FormControl>
                            <Select
                              disabled={isUpdating}
                              onValueChange={(value) => field.onChange(parseInt(value))}
                              defaultValue={field.value.toString()}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a rating" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 - Poor</SelectItem>
                                <SelectItem value="2">2 - Below Average</SelectItem>
                                <SelectItem value="3">3 - Average</SelectItem>
                                <SelectItem value="4">4 - Good</SelectItem>
                                <SelectItem value="5">5 - Excellent</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>
                            How would you rate the candidate overall?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Comments */}
                    <FormField
                      control={form.control}
                      name="comments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Comments</FormLabel>
                          <FormControl>
                            <Textarea 
                              disabled={isUpdating}
                              placeholder="Enter your general feedback about the candidate" 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Provide overall assessment of the interview
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Strengths */}
                    <FormField
                      control={form.control}
                      name="strengths"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Strengths</FormLabel>
                          <FormControl>
                            <Textarea 
                              disabled={isUpdating}
                              placeholder="List candidate's strengths (comma separated)" 
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            What were the candidate's key strengths? (separate with commas)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Weaknesses */}
                    <FormField
                      control={form.control}
                      name="weaknesses"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Areas for Improvement</FormLabel>
                          <FormControl>
                            <Textarea 
                              disabled={isUpdating}
                              placeholder="List areas where candidate could improve (comma separated)" 
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            What areas could the candidate improve? (separate with commas)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Recommendation */}
                    <FormField
                      control={form.control}
                      name="recommendation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recommendation</FormLabel>
                          <FormControl>
                            <Textarea 
                              disabled={isUpdating}
                              placeholder="Your hiring recommendation" 
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Would you recommend hiring this candidate? Why or why not?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={isUpdating}
                      className="w-full md:w-auto"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {isUpdating ? 'Submitting...' : 'Submit Feedback'}
                    </Button>
                  </form>
                </Form>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* Additional actions can be added here */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default InterviewDetail;
