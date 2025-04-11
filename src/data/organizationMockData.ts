
export interface OrganizationData {
  id: string;
  name: string;
  logo?: string;
  stats: {
    totalInterviews: number;
    upcomingInterviews: number;
    completedInterviews: number;
    openPositions: number;
  };
  interviews: OrganizationInterview[];
  interviewers: OrganizationInterviewer[];
  positions: OrganizationPosition[];
  notifications: OrganizationNotification[];
  analytics: {
    interviewTrends: InterviewTrend[];
    interviewerPerformance: InterviewerPerformanceData[];
    candidateStatus: CandidateStatusData[];
    metrics: {
      averageTimeToHire: string;
      completionRate: number;
      timeToFill: string;
      candidateDropoffRate: number;
    };
  };
}

export interface OrganizationInterview {
  id: string;
  candidateName: string;
  interviewer: string;
  dateTime: string;
  status: 'Scheduled' | 'Completed' | 'Canceled' | 'Pending';
  skillsAssessed: string[];
}

export interface OrganizationInterviewer {
  id: string;
  name: string;
  role: string;
  totalInterviews: number;
  maxCapacity: number;
  availability: 'Available' | 'Busy' | 'On Leave';
  skills: string[];
}

export interface OrganizationPosition {
  id: string;
  title: string;
  department: string;
  openedDate: string;
  status: 'Open' | 'Filled' | 'On Hold';
  urgency: 'Low' | 'Medium' | 'High' | 'Urgent';
  candidates: number;
}

export interface OrganizationNotification {
  id: string;
  message: string;
  date: string;
  status: 'Read' | 'Unread';
  type: 'Interview' | 'Position' | 'System';
}

export interface InterviewTrend {
  week: string;
  scheduled: number;
  completed: number;
}

export interface InterviewerPerformanceData {
  name: string;
  interviews: number;
}

export interface CandidateStatusData {
  status: string;
  value: number;
}

export const organizationMockData: OrganizationData = {
  id: '1',
  name: 'Acme Corp',
  logo: '/assets/logo.png',
  stats: {
    totalInterviews: 45,
    upcomingInterviews: 12,
    completedInterviews: 28,
    openPositions: 5
  },
  interviews: [
    {
      id: 'INT001',
      candidateName: 'Jane Doe',
      interviewer: 'Alice Chen',
      dateTime: '2025-04-10T10:00:00',
      status: 'Scheduled',
      skillsAssessed: ['Java', 'Spring Boot', 'Microservices']
    },
    {
      id: 'INT002',
      candidateName: 'John Smith',
      interviewer: 'Bob Wilson',
      dateTime: '2025-04-08T14:30:00',
      status: 'Completed',
      skillsAssessed: ['React', 'TypeScript', 'Redux']
    },
    {
      id: 'INT003',
      candidateName: 'Emily Brown',
      interviewer: 'Carol Davis',
      dateTime: '2025-04-15T11:15:00',
      status: 'Scheduled',
      skillsAssessed: ['Python', 'Django', 'Flask']
    },
    {
      id: 'INT004',
      candidateName: 'Michael Johnson',
      interviewer: 'Alice Chen',
      dateTime: '2025-04-12T09:00:00',
      status: 'Pending',
      skillsAssessed: ['DevOps', 'Kubernetes', 'Docker']
    },
    {
      id: 'INT005',
      candidateName: 'Sarah Williams',
      interviewer: 'Bob Wilson',
      dateTime: '2025-04-07T15:45:00',
      status: 'Canceled',
      skillsAssessed: ['Android', 'Kotlin', 'Firebase']
    }
  ],
  interviewers: [
    {
      id: '101',
      name: 'Alice Chen',
      role: 'Technical Lead',
      totalInterviews: 8,
      maxCapacity: 10,
      availability: 'Available',
      skills: ['Java', 'Spring Boot', 'Microservices', 'DevOps']
    },
    {
      id: '102',
      name: 'Bob Wilson',
      role: 'Senior Developer',
      totalInterviews: 12,
      maxCapacity: 15,
      availability: 'Busy',
      skills: ['React', 'TypeScript', 'Redux', 'JavaScript']
    },
    {
      id: '103',
      name: 'Carol Davis',
      role: 'Backend Engineer',
      totalInterviews: 5,
      maxCapacity: 8,
      availability: 'Available',
      skills: ['Python', 'Django', 'Flask', 'FastAPI']
    },
    {
      id: '104',
      name: 'David Miller',
      role: 'DevOps Engineer',
      totalInterviews: 3,
      maxCapacity: 10,
      availability: 'On Leave',
      skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform']
    }
  ],
  positions: [
    {
      id: 'POS001',
      title: 'Senior Java Developer',
      department: 'Engineering',
      openedDate: '2025-03-15',
      status: 'Open',
      urgency: 'High',
      candidates: 4
    },
    {
      id: 'POS002',
      title: 'Frontend Engineer',
      department: 'Product',
      openedDate: '2025-03-20',
      status: 'Open',
      urgency: 'Medium',
      candidates: 6
    },
    {
      id: 'POS003',
      title: 'DevOps Specialist',
      department: 'Operations',
      openedDate: '2025-03-10',
      status: 'Open',
      urgency: 'Urgent',
      candidates: 2
    },
    {
      id: 'POS004',
      title: 'QA Engineer',
      department: 'Quality Assurance',
      openedDate: '2025-03-05',
      status: 'Filled',
      urgency: 'Low',
      candidates: 8
    },
    {
      id: 'POS005',
      title: 'Product Manager',
      department: 'Product',
      openedDate: '2025-03-25',
      status: 'Open',
      urgency: 'Medium',
      candidates: 3
    }
  ],
  notifications: [
    {
      id: 'NOT001',
      message: 'Interview scheduled with Jane Doe for Senior Java Developer position',
      date: '2025-04-05',
      status: 'Unread',
      type: 'Interview'
    },
    {
      id: 'NOT002',
      message: 'John Smith interview completed. Feedback available.',
      date: '2025-04-03',
      status: 'Read',
      type: 'Interview'
    },
    {
      id: 'NOT003',
      message: 'New position added: Frontend Engineer',
      date: '2025-03-20',
      status: 'Read',
      type: 'Position'
    },
    {
      id: 'NOT004',
      message: 'System maintenance scheduled for April 15, 2025',
      date: '2025-04-01',
      status: 'Unread',
      type: 'System'
    },
    {
      id: 'NOT005',
      message: 'DevOps Specialist position marked as urgent',
      date: '2025-04-02',
      status: 'Unread',
      type: 'Position'
    }
  ],
  analytics: {
    interviewTrends: [
      { week: '03/01/2025', scheduled: 8, completed: 6 },
      { week: '03/08/2025', scheduled: 10, completed: 9 },
      { week: '03/15/2025', scheduled: 7, completed: 6 },
      { week: '03/22/2025', scheduled: 12, completed: 10 },
      { week: '03/29/2025', scheduled: 9, completed: 8 },
      { week: '04/05/2025', scheduled: 11, completed: 7 }
    ],
    interviewerPerformance: [
      { name: 'Alice Chen', interviews: 8 },
      { name: 'Bob Wilson', interviews: 12 },
      { name: 'Carol Davis', interviews: 5 },
      { name: 'David Miller', interviews: 3 }
    ],
    candidateStatus: [
      { status: 'Scheduled', value: 12 },
      { status: 'Completed', value: 28 },
      { status: 'Canceled', value: 5 },
      { status: 'Pending', value: 10 }
    ],
    metrics: {
      averageTimeToHire: '15 days',
      completionRate: 85,
      timeToFill: '10 days',
      candidateDropoffRate: 15
    }
  }
};
