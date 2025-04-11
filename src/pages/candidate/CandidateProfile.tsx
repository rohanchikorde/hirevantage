
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockCandidate } from '@/data/candidateMockData';
import { User, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';

const CandidateProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: mockCandidate.name,
    email: mockCandidate.email,
    phone: mockCandidate.phone,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock saving profile data
    setTimeout(() => {
      setIsEditing(false);
      toast.success('Profile updated successfully');
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-purple-600 flex items-center justify-center text-white text-3xl font-medium mb-4">
                  {formData.name.charAt(0)}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{formData.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">Candidate</p>
                <div className="w-full mt-6 space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">{formData.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">{formData.phone}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Personal Information</CardTitle>
                {!isEditing && (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            name: mockCandidate.name,
                            email: mockCandidate.email,
                            phone: mockCandidate.phone,
                          });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-purple-100 dark:border-purple-900/20 mt-6">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Receive email notifications about your interviews</p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Change Password</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Update your password regularly for security</p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Delete Account</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Permanently delete your account and all data</p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 dark:text-red-500 dark:hover:text-red-400 dark:border-red-900/30 dark:hover:border-red-900/50">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
