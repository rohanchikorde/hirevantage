
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  mockCompanies, 
  mockInterviewers 
} from '@/data/mockData';
import { toast } from 'sonner';

const NewInterviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { companyId } = useParams<{ companyId: string }>();
  
  // Find the company from mock data
  const company = mockCompanies.find(c => c.id === companyId);
  const interviewers = mockInterviewers[companyId || ''] || [];
  
  if (!company) {
    return <div className="p-4">Company not found</div>;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock submission - in real app would create an interview
    toast.success("Interview scheduled successfully!");
    
    // Navigate back to the company detail page
    navigate(`/dashboard/admin/companies/${companyId}`);
  };

  const statusOptions = ['Pending', 'Scheduled', 'In Progress', 'Completed', 'Canceled'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Schedule New Interview</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Create a new interview for {company.name}
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Interview Details</CardTitle>
            <CardDescription>Schedule a new interview session</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Interview Title/Position</Label>
              <Input id="title" placeholder="Senior Developer Interview" required />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" required />
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input id="duration" type="number" min="15" step="15" defaultValue="60" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status.toLowerCase()}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="interviewer">Select Interviewer</Label>
              <Select>
                <SelectTrigger id="interviewer">
                  <SelectValue placeholder="Select an interviewer" />
                </SelectTrigger>
                <SelectContent>
                  {interviewers.map((interviewer) => (
                    <SelectItem key={interviewer.id} value={interviewer.id}>
                      {interviewer.name} - {interviewer.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium">Candidate Information</h3>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="candidate-name">Candidate Name</Label>
                <Input id="candidate-name" placeholder="Jane Smith" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="candidate-email">Candidate Email</Label>
                <Input 
                  id="candidate-email" 
                  type="email" 
                  placeholder="candidate@example.com" 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="candidate-phone">Candidate Phone</Label>
              <Input id="candidate-phone" placeholder="555-5678" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes/Requirements</Label>
              <Textarea 
                id="notes" 
                placeholder="Any special requirements or notes for this interview"
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate(`/dashboard/admin/companies/${companyId}`)}
            >
              Cancel
            </Button>
            <Button type="submit">Schedule Interview</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default NewInterviewPage;
