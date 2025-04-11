
// Mock data for the Interviewer Dashboard
export interface Opportunity {
  id: string;
  candidateName: string;
  skill: string;
  date: string;
  time: string;
  status: 'Available' | 'Filled';
  companyName: string;
}

export interface AssignedInterview {
  id: string;
  candidateName: string;
  skill: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  companyName: string;
  feedbackSubmitted: boolean;
}

export interface InterviewHistory {
  id: string;
  candidateName: string;
  date: string;
  time: string;
  status: 'Completed' | 'Cancelled';
  companyName: string;
  feedback: {
    rating: number;
    comments: string;
  } | null;
}

export interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
  type: 'interview' | 'feedback' | 'system';
}

export interface InterviewerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
  specialization: string[];
  availability: 'Available' | 'Busy' | 'On Leave';
  stats: {
    totalInterviews: number;
    upcomingInterviews: number;
    cancellationRequests: number;
    feedbackPending: number;
  };
  notifications: Notification[];
}

export const mockInterviewerProfile: InterviewerProfile = {
  id: '101',
  name: 'Alice Chen',
  email: 'alice@hirevantage.com',
  phone: '555-1001',
  profilePicture: '/assets/alice-profile.jpg',
  specialization: ['React', 'JavaScript', 'Node.js', 'TypeScript'],
  availability: 'Available',
  stats: {
    totalInterviews: 24,
    upcomingInterviews: 3,
    cancellationRequests: 1,
    feedbackPending: 2
  },
  notifications: [
    {
      id: 'n1',
      message: 'You have been assigned to an interview with John Doe on April 8, 2025.',
      date: '2025-04-05T14:30:00',
      read: false,
      type: 'interview'
    },
    {
      id: 'n2',
      message: 'Feedback submission pending for interview with Sarah Johnson.',
      date: '2025-04-05T10:15:00',
      read: false,
      type: 'feedback'
    },
    {
      id: 'n3',
      message: 'Your cancellation request for interview #3492 has been approved.',
      date: '2025-04-04T16:45:00',
      read: true,
      type: 'system'
    },
    {
      id: 'n4',
      message: 'System maintenance scheduled for April 10, 2025.',
      date: '2025-04-03T09:20:00',
      read: true,
      type: 'system'
    }
  ]
};

export const mockOpportunities: Opportunity[] = [
  {
    id: 'i2001',
    candidateName: 'Ryan Miller',
    skill: 'React',
    date: '2025-04-07',
    time: '10:00',
    status: 'Available',
    companyName: 'Globex Industries'
  },
  {
    id: 'i2002',
    candidateName: 'Jennifer Lopez',
    skill: 'Node.js',
    date: '2025-04-08',
    time: '14:30',
    status: 'Available',
    companyName: 'Acme Corp'
  },
  {
    id: 'i2003',
    candidateName: 'Michael Brown',
    skill: 'TypeScript',
    date: '2025-04-09',
    time: '11:15',
    status: 'Available',
    companyName: 'Oceanic Airlines'
  },
  {
    id: 'i2004',
    candidateName: 'Emma Wilson',
    skill: 'JavaScript',
    date: '2025-04-10',
    time: '15:45',
    status: 'Available',
    companyName: 'Initech Solutions'
  },
  {
    id: 'i2005',
    candidateName: 'David Clark',
    skill: 'React',
    date: '2025-04-12',
    time: '09:30',
    status: 'Filled',
    companyName: 'Globex Industries'
  }
];

export const mockAssignedInterviews: AssignedInterview[] = [
  {
    id: 'i1001',
    candidateName: 'Sarah Johnson',
    skill: 'React',
    date: '2025-04-08',
    time: '10:00',
    status: 'Upcoming',
    companyName: 'Acme Corp',
    feedbackSubmitted: false
  },
  {
    id: 'i1002',
    candidateName: 'Mike Peterson',
    skill: 'JavaScript',
    date: '2025-04-10',
    time: '14:30',
    status: 'Upcoming',
    companyName: 'Globex Industries',
    feedbackSubmitted: false
  },
  {
    id: 'i1003',
    candidateName: 'Lisa Chen',
    skill: 'TypeScript',
    date: '2025-04-05',
    time: '11:15',
    status: 'Completed',
    companyName: 'Oceanic Airlines',
    feedbackSubmitted: false
  }
];

export const mockInterviewHistory: InterviewHistory[] = [
  {
    id: 'h1001',
    candidateName: 'James Brown',
    date: '2025-04-01',
    time: '09:00',
    status: 'Completed',
    companyName: 'Acme Corp',
    feedback: {
      rating: 4,
      comments: 'Strong technical skills, could improve on communication.'
    }
  },
  {
    id: 'h1002',
    candidateName: 'Rebecca White',
    date: '2025-03-28',
    time: '13:30',
    status: 'Cancelled',
    companyName: 'Initech Solutions',
    feedback: null
  },
  {
    id: 'h1003',
    candidateName: 'Daniel Taylor',
    date: '2025-03-25',
    time: '15:00',
    status: 'Completed',
    companyName: 'Globex Industries',
    feedback: {
      rating: 5,
      comments: 'Excellent candidate, highly recommended.'
    }
  }
];
