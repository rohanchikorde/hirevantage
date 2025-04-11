
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MessageSquare, HelpCircle, ExternalLink, FileQuestion } from 'lucide-react';
import { toast } from 'sonner';

const OrganizationSupport: React.FC = () => {
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been submitted to the admin team.");
  };

  const handleChatRequest = () => {
    toast.info("Chat support is not available in this demo.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Contact Support</h1>
        <p className="text-muted-foreground">Get assistance with your organization's account</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                Contact Admin Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input id="name" placeholder="Enter your name" defaultValue="John Smith" readOnly />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input id="email" placeholder="Enter your email" defaultValue="john@acmecorp.com" readOnly />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your issue or question in detail..."
                    rows={5}
                  />
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                  <p className="flex items-start gap-2">
                    <HelpCircle className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                    <span>
                      All requests are sent to your organization's admin team. For urgent issues, please use the phone support option.
                    </span>
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                    Submit Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileQuestion className="h-5 w-5 text-purple-600" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-medium">How do I update my organization's information?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Please contact your admin who can update your organization details through the admin dashboard.
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">Who can schedule interviews?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Only admin users with scheduling permissions can create and manage interviews.
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">How can I add a new position?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Contact your admin team who can create new positions through the admin dashboard.
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">Can I export interview data?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Yes, you can export basic reports from the Analytics page. For custom reports, submit a request through this page.
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">How do I add a new interviewer?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your admin team can add and manage interviewers through the admin dashboard.
                </p>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Full Knowledge Base
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900/20">
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Email Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    support@hirevantage.com
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Response time: 1-2 business days
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    +1 (555) 123-4567
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Monday-Friday, 9am-5pm EST
                  </p>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 mt-4"
                onClick={handleChatRequest}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Start Live Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-full">
                  <HelpCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-purple-700 dark:text-purple-300">
                    Need Admin Assistance?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    Your organization's admin can help with:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 mt-2 space-y-1 list-disc list-inside">
                    <li>User account management</li>
                    <li>Interview scheduling</li>
                    <li>Position updates</li>
                    <li>Custom report generation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSupport;
