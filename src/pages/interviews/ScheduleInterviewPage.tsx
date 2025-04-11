
import React from 'react';
import ScheduleInterview from '@/components/interviews/ScheduleInterview';

const ScheduleInterviewPage: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Schedule Interview</h1>
      <ScheduleInterview />
    </div>
  );
};

export default ScheduleInterviewPage;
