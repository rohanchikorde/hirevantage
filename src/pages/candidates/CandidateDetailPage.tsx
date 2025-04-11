
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, Download, Mail, Phone, Edit, Building } from 'lucide-react';
import { CandidateStatus } from '@/types/candidate';

const mockCandidate = {
  id: '1',
  full_name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  phone: '(555) 123-4567',
  position: 'Senior Java Developer',
  company: 'Acme Corp',
  status: 'Shortlisted' as CandidateStatus,
  created_at: '2024-03-10T10:00:00Z',
  updated_at: '2024-03-15T14:30:00Z',
  resume_url: '#',
  description: 'Sarah has over 8 years of experience in Java development with a focus on Spring Boot and microservices architecture. She has previously worked at tech startups and enterprise companies.',
  education: [
    { degree: 'Master of Science in Computer Science', institution: 'Stanford University', year: '2016' },
    { degree: 'Bachelor of Science in Software Engineering', institution: 'MIT', year: '2014' }
  ],
  experience: [
    { title: 'Senior Java Developer', company: 'TechStart Inc.', duration: '2018-2023', description: 'Led a team of 5 developers, built microservices architecture' },
    { title: 'Java Developer', company: 'Enterprise Solutions', duration: '2016-2018', description: 'Worked on the backend team for financial software' }
  ],
  skills: ['Java', 'Spring Boot', 'Microservices', 'Docker', 'Kubernetes', 'AWS'],
  interviews: [
    { id: 'i1', date: '2024-03-12', time: '10:00 AM', interviewer: 'Bob Wilson', type: 'Technical', feedback: 'Strong technical skills, particularly in Java and microservices. Recommended for next stage.', status: 'Completed' },
    { id: 'i2', date: '2024-03-15', time: '2:00 PM', interviewer: 'Alice Chen', type: 'Cultural Fit', feedback: 'Good team fit, shows leadership qualities and collaborative mindset.', status: 'Completed' },
    { id: 'i3', date: '2024-03-20', time: '11:30 AM', interviewer: 'David Miller', type: 'Final Round', status: 'Scheduled' }
  ],
  progress: 60
};

const statusColors: Record<CandidateStatus, string> = {
  'New': 'bg-blue-500 text-white',
  'Shortlisted': 'bg-amber-500 text-white',
  'Interviewed': 'bg-purple-500 text-white',
  'Hired': 'bg-green-500 text-white',
  'Rejected': 'bg-red-500 text-white'
};

const statusProgressColor: Record<CandidateStatus, string> = {
  'New': 'bg-blue-500',
  'Shortlisted': 'bg-amber-500',
  'Interviewed': 'bg-purple-500',
  'Hired': 'bg-green-500',
  'Rejected': 'bg-red-500'
};

const CandidateDetailPage: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();
  
  // In real app, fetch candidate data based on candidateId
  const candidate = mockCandidate;
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2"
          onClick={() => navigate('/dashboard/candidates')}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Candidates
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-purple-100">
                    <AvatarFallback className="text-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                      {getInitials(candidate.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{candidate.full_name}</CardTitle>
                    <CardDescription>{candidate.position}</CardDescription>
                  </div>
                </div>
                <Badge className={statusColors[candidate.status]}>
                  {candidate.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">{candidate.email}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-muted-foreground">{candidate.phone}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Company</div>
                    <div className="text-sm text-muted-foreground">{candidate.company}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Application Date</div>
                    <div className="text-sm text-muted-foreground">{formatDate(candidate.created_at)}</div>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />
              
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="font-medium">Hiring Progress</div>
                  <div className="text-sm">{candidate.progress}%</div>
                </div>
                <Progress 
                  value={candidate.progress} 
                  className={`h-2 ${statusProgressColor[candidate.status]}`} 
                />
              </div>

              <div className="mt-6 space-y-3">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                  Schedule Interview
                </Button>
                <Button variant="outline" className="w-full">
                  <Edit className="h-4 w-4 mr-2" /> Update Status
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" /> Download Resume
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map(skill => (
                  <Badge key={skill} variant="outline" className="bg-purple-50 dark:bg-purple-900/10 text-purple-700 dark:text-purple-400 hover:bg-purple-100">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Candidate Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{candidate.description}</p>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="interviews" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="interviews">Interviews</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            
            <TabsContent value="interviews">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Interview History</CardTitle>
                  <CardDescription>All scheduled and completed interviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Interviewer</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {candidate.interviews.map((interview) => (
                          <TableRow key={interview.id}>
                            <TableCell>
                              <div className="font-medium">{interview.date}</div>
                              <div className="text-sm text-muted-foreground">{interview.time}</div>
                            </TableCell>
                            <TableCell>{interview.interviewer}</TableCell>
                            <TableCell>{interview.type}</TableCell>
                            <TableCell>
                              <Badge variant={interview.status === 'Scheduled' ? 'outline' : 'default'} className={interview.status === 'Scheduled' ? 'bg-blue-50 text-blue-700' : ''}>
                                {interview.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => navigate(`/dashboard/interviews/${interview.id}`)}>
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {candidate.interviews.some(i => i.status === 'Completed' && i.feedback) && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-2">Latest Feedback</h4>
                      <div className="space-y-3">
                        {candidate.interviews
                          .filter(i => i.status === 'Completed' && i.feedback)
                          .map(interview => (
                            <Card key={interview.id}>
                              <CardContent className="p-4">
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">{interview.type} Interview</span>
                                  <span className="text-sm text-muted-foreground">by {interview.interviewer}</span>
                                </div>
                                <p className="text-sm">{interview.feedback}</p>
                              </CardContent>
                            </Card>
                          ))
                        }
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="ml-auto">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule New Interview
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {candidate.experience.map((exp, idx) => (
                      <div key={idx} className="border-l-2 border-purple-200 pl-4 pb-2">
                        <div className="text-lg font-medium">{exp.title}</div>
                        <div className="text-sm text-purple-600 font-medium">{exp.company}</div>
                        <div className="text-sm text-muted-foreground mb-2">{exp.duration}</div>
                        <p className="text-sm">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="education">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {candidate.education.map((edu, idx) => (
                      <div key={idx} className="border-l-2 border-purple-200 pl-4 pb-2">
                        <div className="text-lg font-medium">{edu.degree}</div>
                        <div className="text-sm text-purple-600 font-medium">{edu.institution}</div>
                        <div className="text-sm text-muted-foreground">{edu.year}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailPage;
