
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Phone, Headset, SendHorizonal, Link2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const InterviewerSupport: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  
  const handleSendMessage = () => {
    if (!subject.trim() || !message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    toast.success('Support request has been sent');
    setSubject('');
    setMessage('');
  };

  const handleSendChatMessage = () => {
    if (!chatMessage.trim()) {
      return;
    }
    
    toast.success('Message sent to support');
    setChatMessage('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Technical Support</h1>
        <p className="text-muted-foreground">Contact the admin technical team for assistance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="form">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="form">Contact Form</TabsTrigger>
              <TabsTrigger value="chat">Live Chat</TabsTrigger>
            </TabsList>
            
            <TabsContent value="form">
              <Card className="border-purple-100 dark:border-purple-900/20">
                <CardContent className="p-5 space-y-4">
                  <div>
                    <h3 className="font-medium text-lg mb-1">Send Support Request</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Fill out the form below to contact our technical support team.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                        <Input 
                          id="subject" 
                          placeholder="e.g., Issue with Video Call" 
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                        <Textarea 
                          id="message" 
                          placeholder="Please describe your issue in detail..."
                          rows={5}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                      <Button 
                        className="bg-purple-600 hover:bg-purple-700 w-full"
                        onClick={handleSendMessage}
                      >
                        <SendHorizonal className="mr-2 h-4 w-4" />
                        Send Request
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="chat">
              <Card className="border-purple-100 dark:border-purple-900/20">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Headset className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <h3 className="font-medium text-lg">Live Support Chat</h3>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Support Online</Badge>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 h-80 mb-4 overflow-y-auto">
                    <div className="flex flex-col space-y-3">
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg rounded-tl-none max-w-[80%] self-start">
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          Hello! How can I help you today?
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                          Support Agent • 10:30 AM
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Type your message..." 
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendChatMessage();
                        }
                      }}
                    />
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={handleSendChatMessage}
                    >
                      <SendHorizonal className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="border-purple-100 dark:border-purple-900/20">
            <CardContent className="p-5">
              <h3 className="font-medium text-lg mb-3">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg mr-3">
                    <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">techsupport@hirevantage.com</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg mr-3">
                    <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">555-5678</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Available 9 AM - 5 PM ET</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg mr-3">
                    <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Click on Live Chat tab</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Available 24/7</p>
                  </div>
                </div>
              </div>
              
              <hr className="my-4 border-gray-200 dark:border-gray-700" />
              
              <h3 className="font-medium mb-3">Resources</h3>
              <div className="space-y-2">
                <a href="#" className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Link2 className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm">Interview Guidelines</span>
                </a>
                <a href="#" className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Link2 className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm">Video Tutorial: Using the Platform</span>
                </a>
                <a href="#" className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Link2 className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm">FAQ: Technical Requirements</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewerSupport;
