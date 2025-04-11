
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockInterviewers, mockCompanies } from '@/data/mockData';
import { Mail, User, Building, ArrowLeft, ExternalLink } from 'lucide-react';

const InterviewerDetailPage: React.FC = () => {
  const { interviewerId } = useParams<{ interviewerId: string }>();
  const navigate = useNavigate();
  
  // Find the interviewer from mock data
  let interviewer;
  let company;
  
  // Search through all companies' interviewers to find the matching ID
  for (const companyId in mockInterviewers) {
    const found = mockInterviewers[companyId].find(i => i.id === interviewerId);
    if (found) {
      interviewer = found;
      company = mockCompanies.find(c => c.id === companyId);
      break;
    }
  }
  
  if (!interviewer || !company) {
    return <div className="p-4">Interviewer not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{interviewer.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">{interviewer.role} at {company.name}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigate(`/dashboard/admin/companies/${company.id}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Company
          </Button>
          <Button onClick={() => navigate(`/dashboard/admin/interviewers/${interviewerId}/dashboard`)}>
            <ExternalLink className="mr-2 h-4 w-4" />
            View Dashboard
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Interviewer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <User className="mr-2 h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p>{interviewer.name}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p>{interviewer.email}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Building className="mr-2 h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Company</p>
                <p>{company.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Interview Schedule</CardTitle>
            <CardDescription>Upcoming interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6 text-gray-500">
              <p>No upcoming interviews scheduled</p>
              <Button className="mt-4" variant="outline">
                Schedule Interview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Interview History</CardTitle>
          <CardDescription>Past interviews conducted</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6 text-gray-500">
            <p>No interview history available</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewerDetailPage;
