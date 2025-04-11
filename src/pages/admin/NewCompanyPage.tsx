
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const NewCompanyPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock submission - in real app would create a company
    toast.success("Company created successfully!");
    
    // Navigate back to the companies page
    navigate('/dashboard/admin/companies');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Company</h1>
        <p className="text-gray-500 dark:text-gray-400">Create a new company record in the system</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Enter the details about the company</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" placeholder="Acme Corp" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" placeholder="Technology" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="123 Business St, City, State, ZIP" required />
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium">Contact Information</h3>
              <p className="text-sm text-gray-500">Enter the primary contact person details</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-person">Contact Person</Label>
                <Input id="contact-person" placeholder="John Doe" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="contact@company.com" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="555-1234" required />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/dashboard/admin/companies')}
            >
              Cancel
            </Button>
            <Button type="submit">Create Company</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default NewCompanyPage;
