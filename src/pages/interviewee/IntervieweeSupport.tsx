
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Mail, MessageCircle, Phone } from 'lucide-react';
import { toast } from 'sonner';

const IntervieweeSupport: React.FC = () => {
  const handleSubmitSupport = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support request submitted successfully. We'll get back to you soon.");
  };
  
  const handleChatWithSupport = () => {
    toast.info("Connecting you with a support agent...");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Technical Support</h1>
        <p className="text-muted-foreground">Get help with your interviews and technical issues.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Fill out the form below to get in touch with our technical support team.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitSupport}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="e.g., Technical Issue" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="Describe your issue in detail..." 
                      className="min-h-[150px]"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Submit Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about the interview process.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I join an interview?</AccordionTrigger>
                  <AccordionContent>
                    You can join an interview by clicking the "Join Interview" button on your dashboard
                    or interviews page. Make sure to test your camera and microphone beforehand.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What should I do if my video isn't working?</AccordionTrigger>
                  <AccordionContent>
                    First, check if your camera is properly connected and allowed in your browser settings.
                    Try refreshing the page or using a different browser. If the issue persists,
                    contact technical support immediately.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How can I practice coding before my interview?</AccordionTrigger>
                  <AccordionContent>
                    You can use our built-in coding environment in the "Coding Prep" section to practice
                    writing and testing code. We provide sample problems similar to what you might
                    encounter in your technical interview.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What happens if I lose connection during an interview?</AccordionTrigger>
                  <AccordionContent>
                    Don't worry! If you lose connection during an interview, try to reconnect immediately.
                    Your code is saved automatically, and the interviewer will be notified of the connection issue.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Alternative ways to reach our support team.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">techsupport@hirevantage.com</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">555-5678</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Available 9 AM - 5 PM EST</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-100 dark:border-purple-900/20 bg-purple-50 dark:bg-purple-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-purple-700 dark:text-purple-400" />
                Live Chat Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-700 dark:text-purple-400 mb-4">
                Need immediate assistance? Our support team is online and ready to help.
              </p>
              <div className="flex items-center space-x-2">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-sm font-medium text-green-700">Support Online</p>
              </div>
              <Button 
                onClick={handleChatWithSupport}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white"
              >
                Chat with Support
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardContent className="p-5">
              <div className="flex items-start">
                <HelpCircle className="h-5 w-5 text-purple-700 dark:text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-1">Technical Checks</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    Before your interview, make sure to test your camera, microphone, and internet connection.
                    We recommend using Chrome or Firefox for the best experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IntervieweeSupport;
