
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
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { mockInterviewers, mockInterviews, mockCompanies } from '@/data/mockData';
import { ArrowLeft, Edit, Trash2, Mail, Phone, Briefcase, Building, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const InterviewerDashboardPage: React.FC = () => {
  const { interviewerId } = useParams<{ interviewerId: string }>();
  const navigate = useNavigate();
  
  // Find the interviewer from mock data
  let interviewer;
  let company;
  let interviews = [];
  
  // Search through all companies' interviewers to find the matching ID
  for (const companyId in mockInterviewers) {
    const found = mockInterviewers[companyId].find(i => i.id === interviewerId);
    if (found) {
      interviewer = found;
      company = mockCompanies.find(c => c.id === companyId);
      interviews = mockInterviews[interviewerId] || [];
      break;
    }
  }
  
  if (!interviewer || !company) {
    return <div className="p-4">Interviewer not found</div>;
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Scheduled':
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case 'Completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'Canceled':
        return <Badge className="bg-red-500">Canceled</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{interviewer.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">{interviewer.role} at {company.name}</p>
        </div>
        <Button variant="outline" onClick={() => navigate(`/dashboard/admin/companies/${company.id}`)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Company
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Interviewer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p>{interviewer.email}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p>{interviewer.phone || 'Not provided'}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Briefcase className="mr-2 h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p>{interviewer.role}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Building className="mr-2 h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Company</p>
                <p>{company.name}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Total Interviews</p>
                <p>{interviewer.totalInterviews || 0}</p>
              </div>
            </div>
            
            <div className="flex space-x-2 pt-4">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Interview Stats</CardTitle>
            <CardDescription>Overview of interview activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Scheduled</p>
                <p className="text-2xl font-bold">{interviews.filter(i => i.status === 'Scheduled').length}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold">{interviews.filter(i => i.status === 'Completed').length}</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Canceled</p>
                <p className="text-2xl font-bold">{interviews.filter(i => i.status === 'Canceled').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Interview History</CardTitle>
          <CardDescription>All interviews assigned to this interviewer</CardDescription>
        </CardHeader>
        <CardContent>
          {interviews.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interviews.map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell>{interview.id}</TableCell>
                    <TableCell>{interview.candidateName}</TableCell>
                    <TableCell>{interview.date}</TableCell>
                    <TableCell>{interview.time}</TableCell>
                    <TableCell>{getStatusBadge(interview.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center p-6 text-gray-500">
              <p>No interviews assigned to this interviewer</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewerDashboardPage;
