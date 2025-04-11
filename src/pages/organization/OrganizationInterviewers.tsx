
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { organizationMockData } from '@/data/organizationMockData';
import { Users } from 'lucide-react';

const OrganizationInterviewers: React.FC = () => {
  // Helper function to determine status color
  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-500';
      case 'Busy':
        return 'bg-yellow-500';
      case 'On Leave':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Calculate workload percentage
  const calculateWorkloadPercentage = (current: number, max: number) => {
    return Math.min(Math.round((current / max) * 100), 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Interviewers</h1>
          <p className="text-muted-foreground">View details about your organization's interviewers</p>
        </div>
      </div>

      <Card className="border-purple-100 dark:border-purple-900/20 bg-white dark:bg-gray-800">
        <CardContent className="p-5">
          <div className="text-purple-700 dark:text-purple-300 text-sm mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p>Interviewer assignments are managed by your administrator. Contact them for any changes or additional interviewers.</p>
          </div>
          
          {organizationMockData.interviewers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organizationMockData.interviewers.map((interviewer) => {
                const workloadPercentage = calculateWorkloadPercentage(interviewer.totalInterviews, interviewer.maxCapacity);
                return (
                  <Card key={interviewer.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{interviewer.name}</h3>
                          <p className="text-sm text-gray-500">{interviewer.role}</p>
                        </div>
                        <div className={`h-3 w-3 rounded-full ${getAvailabilityColor(interviewer.availability)} ring-2 ring-white`}></div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Workload</span>
                            <span>{interviewer.totalInterviews}/{interviewer.maxCapacity}</span>
                          </div>
                          <Progress 
                            value={workloadPercentage} 
                            className="h-2" 
                            indicatorClassName={
                              workloadPercentage > 85 ? "bg-red-500" :
                              workloadPercentage > 60 ? "bg-yellow-500" :
                              "bg-green-500"
                            }
                          />
                        </div>
                        
                        <div>
                          <div className="text-sm mb-1">Status</div>
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
                        
                        <div>
                          <div className="text-sm mb-1">Skills</div>
                          <div className="flex flex-wrap gap-1">
                            {interviewer.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="bg-gray-50 text-xs dark:bg-gray-900">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No Interviewers Found</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mt-2">
                There are no interviewers assigned to your organization yet. Contact your administrator to add interviewers.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationInterviewers;
