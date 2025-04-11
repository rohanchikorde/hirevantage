
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockAdminProfile } from '@/data/mockData';
import { toast } from "sonner";

const SettingsPage = () => {
  const [profile, setProfile] = useState(mockAdminProfile);
  const [activeTab, setActiveTab] = useState('profile');
  
  const profileForm = useForm({
    defaultValues: {
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      jobTitle: profile.jobTitle,
    }
  });

  const preferencesForm = useForm({
    defaultValues: {
      emailNotifications: profile.preferences.emailNotifications,
      darkMode: profile.preferences.darkMode,
      language: profile.preferences.language,
    }
  });

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  });

  const platformForm = useForm({
    defaultValues: {
      allowPublicAccess: profile.platformSettings.allowPublicAccess,
      defaultInterviewDuration: profile.platformSettings.defaultInterviewDuration,
    }
  });

  const handleProfileSubmit = (data: any) => {
    console.log('Profile updated:', data);
    toast.success("Profile updated successfully!");
  };

  const handlePreferencesSubmit = (data: any) => {
    console.log('Preferences updated:', data);
    toast.success("Preferences saved successfully!");
  };

  const handlePasswordSubmit = (data: any) => {
    console.log('Password updated:', data);
    toast.success("Password updated successfully!");
  };

  const handlePlatformSubmit = (data: any) => {
    console.log('Platform settings updated:', data);
    toast.success("Platform settings saved successfully!");
  };

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your account settings and preferences</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">Profile</TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">Preferences</TabsTrigger>
          <TabsTrigger value="password" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">Password</TabsTrigger>
          <TabsTrigger value="platform" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">Platform</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-1">
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle>Profile Information</CardTitle>
                <CardDescription className="text-gray-100">Update your account profile information</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3 flex flex-col items-center justify-start">
                        <div className="w-40 h-40 rounded-full relative overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-600 mb-4">
                          {profile.profilePicture ? (
                            <img 
                              src={profile.profilePicture} 
                              alt={profile.fullName} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                              {profile.fullName.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                        </div>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="mt-2 border-purple-500 text-purple-600 hover:bg-purple-50"
                        >
                          Change Photo
                        </Button>
                      </div>
                      <div className="w-full md:w-2/3 space-y-4">
                        <FormField
                          control={profileForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center">
                              <FormLabel className="text-right mr-4 text-gray-700">Full Name</FormLabel>
                              <FormControl>
                                <Input {...field} className="col-span-3" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center">
                              <FormLabel className="text-right mr-4 text-gray-700">Email</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" className="col-span-3" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center">
                              <FormLabel className="text-right mr-4 text-gray-700">Phone</FormLabel>
                              <FormControl>
                                <Input {...field} className="col-span-3" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="jobTitle"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center">
                              <FormLabel className="text-right mr-4 text-gray-700">Job Title</FormLabel>
                              <FormControl>
                                <Input {...field} className="col-span-3" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline">Cancel</Button>
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
              <CardTitle>User Preferences</CardTitle>
              <CardDescription className="text-gray-100">Customize your application experience</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...preferencesForm}>
                <form onSubmit={preferencesForm.handleSubmit(handlePreferencesSubmit)} className="space-y-6">
                  <FormField
                    control={preferencesForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Email Notifications</FormLabel>
                          <FormDescription>
                            Receive email notifications for important updates
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-purple-500"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={preferencesForm.control}
                    name="darkMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Dark Mode</FormLabel>
                          <FormDescription>
                            Enable dark mode for the interface
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-purple-500"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={preferencesForm.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-center">
                        <FormLabel className="text-right mr-4">Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Spanish">Spanish</SelectItem>
                            <SelectItem value="French">French</SelectItem>
                            <SelectItem value="German">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline">Cancel</Button>
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700"
                    >
                      Save Preferences
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
              <CardTitle>Update Password</CardTitle>
              <CardDescription className="text-gray-100">Change your account password</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-6">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-center">
                        <FormLabel className="text-right mr-4">Current Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" className="col-span-3" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-center">
                        <FormLabel className="text-right mr-4">New Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" className="col-span-3" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-center">
                        <FormLabel className="text-right mr-4">Confirm Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" className="col-span-3" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline">Cancel</Button>
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700"
                    >
                      Update Password
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platform">
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription className="text-gray-100">Configure global platform settings</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...platformForm}>
                <form onSubmit={platformForm.handleSubmit(handlePlatformSubmit)} className="space-y-6">
                  <FormField
                    control={platformForm.control}
                    name="allowPublicAccess"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Allow Public Access to Dashboards</FormLabel>
                          <FormDescription>
                            Enable public access to specific dashboard data
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-purple-500"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={platformForm.control}
                    name="defaultInterviewDuration"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-center">
                        <FormLabel className="text-right mr-4">Default Interview Duration</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="30 minutes">30 minutes</SelectItem>
                            <SelectItem value="45 minutes">45 minutes</SelectItem>
                            <SelectItem value="1 hour">1 hour</SelectItem>
                            <SelectItem value="1.5 hours">1.5 hours</SelectItem>
                            <SelectItem value="2 hours">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline">Cancel</Button>
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700"
                    >
                      Save Settings
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
