
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Calendar, Clock, Award, Edit2, Save, X } from 'lucide-react';
import { mockInterviewerProfile } from '@/data/interviewerMockData';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const InterviewerProfile: React.FC = () => {
  const [interviewer, setInterviewer] = useState(mockInterviewerProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPhone, setEditedPhone] = useState(interviewer.phone);
  const [editedSkills, setEditedSkills] = useState<string[]>(interviewer.specialization);
  const [newSkill, setNewSkill] = useState('');
  
  const profileInitials = interviewer.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
    
  const handleSaveProfile = () => {
    setInterviewer({
      ...interviewer,
      phone: editedPhone,
      specialization: editedSkills,
    });
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };
  
  const handleAddSkill = () => {
    if (newSkill.trim() && !editedSkills.includes(newSkill.trim())) {
      setEditedSkills([...editedSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };
  
  const handleRemoveSkill = (skill: string) => {
    setEditedSkills(editedSkills.filter(s => s !== skill));
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
        <p className="text-muted-foreground">View and manage your profile information</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex">
              <TabsTrigger value="details">Profile Details</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <Card className="border-purple-100 dark:border-purple-900/20">
                <CardContent className="p-5 space-y-6">
                  <div className="flex justify-between">
                    <h2 className="text-lg font-semibold">Personal Information</h2>
                    {!isEditing ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setIsEditing(true)}
                        className="text-purple-600 border-purple-200 hover:bg-purple-50 dark:text-purple-400 dark:border-purple-800 dark:hover:bg-purple-900/20"
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setIsEditing(false)}
                          className="text-gray-600 border-gray-200 hover:bg-gray-50 dark:text-gray-400 dark:border-gray-800 dark:hover:bg-gray-900/20"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={handleSaveProfile}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <User className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                        Full Name
                      </p>
                      <p className="font-medium">{interviewer.name}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                        Email Address
                      </p>
                      <p className="font-medium">{interviewer.email}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                        Phone Number
                      </p>
                      {isEditing ? (
                        <Input 
                          value={editedPhone} 
                          onChange={(e) => setEditedPhone(e.target.value)} 
                        />
                      ) : (
                        <p className="font-medium">{interviewer.phone}</p>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Award className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                        Current Status
                      </p>
                      <Badge className={`
                        ${interviewer.availability === 'Available' 
                          ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' 
                          : interviewer.availability === 'Busy' 
                          ? 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800'
                          : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
                        }`}
                      >
                        {interviewer.availability}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium mb-3">Skills & Expertise</h3>
                    
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {editedSkills.map((skill) => (
                            <Badge key={skill} variant="outline" className="flex items-center gap-1 bg-gray-50 dark:bg-gray-900">
                              {skill}
                              <button 
                                onClick={() => handleRemoveSkill(skill)}
                                className="ml-1 hover:text-red-500 transition-colors" 
                                aria-label="Remove skill"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Add a new skill" 
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddSkill();
                              }
                            }}
                          />
                          <Button 
                            onClick={handleAddSkill}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {interviewer.specialization.map((skill) => (
                          <Badge key={skill} variant="outline" className="bg-gray-50 dark:bg-gray-900">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity">
              <Card className="border-purple-100 dark:border-purple-900/20">
                <CardContent className="p-5">
                  <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center dark:bg-purple-900/30">
                          <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700 mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">Interview Completed</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          You completed an interview with Lisa Chen.
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          April 5, 2025
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/30">
                          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700 mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">Interview Assigned</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          You were assigned to an interview with Sarah Johnson.
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          April 3, 2025
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900/30">
                          <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">Skills Updated</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          You updated your skills profile.
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          March 29, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <Button variant="link" className="text-purple-600 dark:text-purple-400">
                      View All Activity
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardContent className="p-5 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-medium mb-4">
                {profileInitials}
              </div>
              <h2 className="text-xl font-semibold">{interviewer.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Interviewer</p>
              
              <div className="w-full space-y-3 mt-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Total Interviews
                  </span>
                  <span className="font-medium">{interviewer.stats.totalInterviews}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Upcoming
                  </span>
                  <span className="font-medium">{interviewer.stats.upcomingInterviews}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    Status
                  </span>
                  <Badge className={`
                    ${interviewer.availability === 'Available' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : interviewer.availability === 'Busy' 
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}
                  >
                    {interviewer.availability}
                  </Badge>
                </div>
              </div>
              
              <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                Change Availability
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-purple-100 dark:border-purple-900/20 mt-6">
            <CardContent className="p-5">
              <h3 className="font-medium mb-3">Quick Links</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  asChild
                >
                  <a href="/interviewer/opportunities">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Available Opportunities
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  asChild
                >
                  <a href="/interviewer/assigned">
                    <Clock className="h-4 w-4 mr-2" />
                    Manage Assigned Interviews
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  asChild
                >
                  <a href="/interviewer/history">
                    <Award className="h-4 w-4 mr-2" />
                    View Interview History
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewerProfile;
