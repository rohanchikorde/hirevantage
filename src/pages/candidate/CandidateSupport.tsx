
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HelpCircle, Mail, Phone, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const CandidateSupport: React.FC = () => {
  const [formData, setFormData] = useState({
    issueType: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.issueType || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Mock API call for sending support request
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Support request submitted successfully');
      setFormData({
        issueType: '',
        subject: '',
        message: '',
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support</h1>
        <p className="text-muted-foreground">Get help with your interview process.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-100 rounded-full text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Email Support</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">support@hirevantage.com</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">24/7 response time</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-100 rounded-full text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Phone Support</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">+1 (555) 123-4567</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Mon-Fri, 9am-5pm ET</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-100 rounded-full text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Live Chat</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Available during business hours</p>
                    <Button variant="link" className="p-0 h-auto text-xs text-purple-600 dark:text-purple-400 mt-1">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardHeader>
              <CardTitle>FAQs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">How do I prepare for my interview?</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Check out our coding prep section for practice problems and resources.</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">What if I can't make my scheduled interview?</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Please contact us at least 24 hours in advance to reschedule.</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">How do I access interview feedback?</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Feedback will be available in your completed interviews section after review.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardHeader>
              <CardTitle>Submit a Support Request</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="issueType">Issue Type</Label>
                  <Select 
                    value={formData.issueType} 
                    onValueChange={(value) => handleSelectChange('issueType', value)}
                  >
                    <SelectTrigger id="issueType">
                      <SelectValue placeholder="Select an issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="scheduling">Scheduling Issue</SelectItem>
                      <SelectItem value="feedback">Feedback Question</SelectItem>
                      <SelectItem value="account">Account Issue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Brief description of your issue"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Please provide details about your issue"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-purple-100 dark:border-purple-900/20 mt-6">
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border rounded-md hover:border-purple-300 transition-colors">
                  <HelpCircle className="h-5 w-5 text-purple-600 mb-2" />
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Interview Guide</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Tips and best practices for acing your technical interview.</p>
                  <Button variant="link" className="p-0 h-auto text-sm text-purple-600 dark:text-purple-400 mt-2">
                    Read More
                  </Button>
                </div>
                <div className="p-4 border rounded-md hover:border-purple-300 transition-colors">
                  <HelpCircle className="h-5 w-5 text-purple-600 mb-2" />
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Technical Preparation</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Resources to help you prepare for coding challenges.</p>
                  <Button variant="link" className="p-0 h-auto text-sm text-purple-600 dark:text-purple-400 mt-2">
                    Read More
                  </Button>
                </div>
                <div className="p-4 border rounded-md hover:border-purple-300 transition-colors">
                  <HelpCircle className="h-5 w-5 text-purple-600 mb-2" />
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Platform Tutorial</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Learn how to use all features of the candidate portal.</p>
                  <Button variant="link" className="p-0 h-auto text-sm text-purple-600 dark:text-purple-400 mt-2">
                    Watch Video
                  </Button>
                </div>
                <div className="p-4 border rounded-md hover:border-purple-300 transition-colors">
                  <HelpCircle className="h-5 w-5 text-purple-600 mb-2" />
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Common Issues</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Solutions to frequently encountered problems.</p>
                  <Button variant="link" className="p-0 h-auto text-sm text-purple-600 dark:text-purple-400 mt-2">
                    View Solutions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CandidateSupport;
