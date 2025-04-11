
// Mock data for the Interviewee Dashboard

export interface Interviewee {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
  stats: {
    upcomingInterviews: number;
    completedInterviews: number;
  };
  notifications: IntervieweeNotification[];
}

export interface ScheduledInterview {
  id: string;
  companyName: string;
  position: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed';
  interviewerId: string;
  interviewerName: string;
}

export interface IntervieweeNotification {
  id: string;
  message: string;
  date: string;
  read: boolean;
  type: 'interview' | 'system';
}

export const mockInterviewee: Interviewee = {
  id: '201',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '555-1234',
  profilePicture: '/assets/jane-profile.jpg',
  stats: {
    upcomingInterviews: 2,
    completedInterviews: 1
  },
  notifications: [
    {
      id: 'n1',
      message: 'Your interview with Acme Corp is scheduled for April 10, 2025.',
      date: '2025-04-05T10:30:00',
      read: false,
      type: 'interview'
    },
    {
      id: 'n2',
      message: 'Technical test submission received for Globex Industries.',
      date: '2025-04-04T15:45:00',
      read: false,
      type: 'system'
    },
    {
      id: 'n3',
      message: 'Profile updated successfully.',
      date: '2025-04-03T09:20:00',
      read: true,
      type: 'system'
    }
  ]
};

export const mockScheduledInterviews: ScheduledInterview[] = [
  {
    id: 'i1001',
    companyName: 'Acme Corp',
    position: 'Frontend Developer',
    date: '2025-04-10',
    time: '10:00',
    status: 'Scheduled',
    interviewerId: '101',
    interviewerName: 'Alice Chen'
  },
  {
    id: 'i1002',
    companyName: 'Globex Industries',
    position: 'React Developer',
    date: '2025-04-08',
    time: '14:30',
    status: 'Scheduled',
    interviewerId: '102',
    interviewerName: 'Bob Wilson'
  },
  {
    id: 'i1003',
    companyName: 'Oceanic Airlines',
    position: 'Full-stack Engineer',
    date: '2025-04-02',
    time: '11:15',
    status: 'Completed',
    interviewerId: '103',
    interviewerName: 'Carol Davis'
  }
];
