
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockInterviewee } from '@/data/intervieweeMockData';
import { User, Mail, Phone, Camera, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

const IntervieweeProfile: React.FC = () => {
  const interviewee = mockInterviewee;
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };
  
  const handleChangePhoto = () => {
    toast.info("This feature is not available in the demo version");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-purple-100 dark:border-purple-900/20 md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input id="name" placeholder="Your name" className="pl-10" defaultValue={interviewee.name} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input id="email" type="email" placeholder="Your email" className="pl-10" defaultValue={interviewee.email} />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input id="phone" placeholder="Your phone number" className="pl-10" defaultValue={interviewee.phone} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="City, Country" defaultValue="San Francisco, USA" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell us about yourself..." 
                    className="min-h-[100px]"
                    defaultValue="Frontend developer with 3 years of experience in React and TypeScript. Looking for new opportunities to grow my career."
                  />
                </div>
                
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Update Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-32 w-32 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-purple-100 dark:border-purple-900/30 mb-4 flex items-center justify-center overflow-hidden">
                <User className="h-16 w-16 text-gray-400" />
              </div>
              <Button onClick={handleChangePhoto} variant="outline" className="mb-4">
                <Camera className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardHeader>
              <CardTitle>Interview Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Email Notifications</div>
                    <div className="text-xs text-gray-500">Receive email reminders for interviews</div>
                  </div>
                  <Button variant="outline" size="sm" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    Enabled
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Calendar Integration</div>
                    <div className="text-xs text-gray-500">Sync interviews with your calendar</div>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Resume & Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Upload your resume and other relevant documents for your interviews.
              </p>
              <Button variant="outline" className="w-full">
                Upload Documents
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IntervieweeProfile;
