
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { mockCompanies } from '@/data/mockData';
import { toast } from 'sonner';

const NewInterviewerPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock submission - in real app would create an interviewer
    toast.success("Interviewer added successfully!");
    
    // Navigate back to the interviewers list page
    navigate('/dashboard/admin/interviewers');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Interviewer</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Create a new interviewer record in the system
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Interviewer Information</CardTitle>
            <CardDescription>Enter the interviewer's basic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" placeholder="John Doe" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john.doe@example.com" 
                  required 
                />
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="555-1234" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" placeholder="HR Manager" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Select>
                <SelectTrigger id="company">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  {mockCompanies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/dashboard/admin/interviewers')}
            >
              Cancel
            </Button>
            <Button type="submit">Save Interviewer</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default NewInterviewerPage;
