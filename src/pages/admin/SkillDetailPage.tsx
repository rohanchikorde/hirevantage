
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  skillsMockData, 
  interviewsToAssign, 
  SkillData, 
  SkillInterviewer, 
  InterviewToAssign 
} from '@/data/skillsData';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Users, Calendar, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SkillDetailPage: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const [selectedInterview, setSelectedInterview] = useState<string>('');
  
  const skill = skillsMockData.find(s => s.id === skillId);
  
  if (!skill) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-500 mb-2">Skill not found</h3>
          <Link to="/dashboard/admin/skills">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Skills
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAssignInterview = (interviewerId: string) => {
    if (!selectedInterview) {
      toast.error('Please select an interview first');
      return;
    }

    const interview = interviewsToAssign.find(i => i.id === selectedInterview);
    const interviewer = skill.interviewers.find(i => i.id === interviewerId);
    
    if (interviewer && interview) {
      toast.success(`Assigned ${interviewer.name} to "${interview.type}" for ${interview.candidate}`);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Link to="/dashboard/admin/skills">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{skill.name} Skill</h1>
          <p className="text-muted-foreground">Manage interviewers with {skill.name} expertise</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{skill.description}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Interviewers</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <Users className="h-8 w-8 mr-3 text-purple-600" />
            <span className="text-2xl font-semibold">{skill.interviewers.length}</span>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Available Now</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <CheckCircle className="h-8 w-8 mr-3 text-green-600" />
            <span className="text-2xl font-semibold">
              {skill.interviewers.filter(i => i.availability === 'Available').length}
            </span>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-4">
        <h2 className="text-lg font-medium mb-4">Assign Interview</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Select value={selectedInterview} onValueChange={setSelectedInterview}>
              <SelectTrigger>
                <SelectValue placeholder="Select an interview to assign" />
              </SelectTrigger>
              <SelectContent>
                {interviewsToAssign.map(interview => (
                  <SelectItem key={interview.id} value={interview.id}>
                    {interview.type} - {interview.candidate} ({interview.date})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
              <Calendar className="h-4 w-4 inline mr-1" />
              Select an interview and assign an interviewer from the table below
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <h2 className="text-lg font-medium p-4 border-b">Interviewers with {skill.name} Expertise</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead className="text-center">Total Interviews</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skill.interviewers.map(interviewer => (
                <TableRow key={interviewer.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                      {interviewer.avatar || interviewer.name.charAt(0)}
                    </div>
                    {interviewer.name}
                  </TableCell>
                  <TableCell>{interviewer.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      interviewer.availability === 'Available' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {interviewer.availability}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">{interviewer.totalInterviews}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm"
                      disabled={interviewer.availability !== 'Available' || !selectedInterview}
                      onClick={() => handleAssignInterview(interviewer.id)}
                    >
                      Assign to Interview
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SkillDetailPage;
