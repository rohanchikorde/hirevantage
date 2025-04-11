export interface Company {
  id: string;
  name: string;
  industry: string;
  address: string;
  contactPerson: string;
  email: string;
  phone: string;
  dateAdded: string;
  interviewsCount: number;
}

export interface Interviewer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  companyId: string;
  totalInterviews?: number;
}

export interface Interview {
  id: string;
  candidateName: string;
  interviewerId: string;
  interviewerName: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Canceled' | 'Pending';
  companyId: string;
}

export interface InterviewStats {
  total: number;
  upcoming: number;
  completed: number;
}

export interface AdminProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  profilePicture: string;
  preferences: {
    emailNotifications: boolean;
    darkMode: boolean;
    language: string;
  };
  platformSettings: {
    allowPublicAccess: boolean;
    defaultInterviewDuration: string;
  };
}

export interface InterviewTrend {
  week: string;
  count: number;
}

export interface InterviewerPerformance {
  name: string;
  interviews: number;
}

export interface CompanyActivity {
  company: string;
  percentage: number;
}

export interface PlatformStats {
  averageTimeToHire: string;
  demoRequestRate: string;
}

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Acme Corp',
    industry: 'Technology',
    address: '123 Tech Lane, Silicon Valley, CA 94123',
    contactPerson: 'John Doe',
    email: 'john@acme.com',
    phone: '555-1234',
    dateAdded: '2024-02-15',
    interviewsCount: 5
  },
  {
    id: '2',
    name: 'Globex Industries',
    industry: 'Manufacturing',
    address: '456 Factory Ave, Detroit, MI 48201',
    contactPerson: 'Jane Smith',
    email: 'jane@globex.com',
    phone: '555-5678',
    dateAdded: '2024-01-20',
    interviewsCount: 8
  },
  {
    id: '3',
    name: 'Oceanic Airlines',
    industry: 'Transportation',
    address: '789 Sky Blvd, Atlanta, GA 30301',
    contactPerson: 'Robert Johnson',
    email: 'robert@oceanic.com',
    phone: '555-9012',
    dateAdded: '2024-03-05',
    interviewsCount: 3
  },
  {
    id: '4',
    name: 'Initech Solutions',
    industry: 'Information Technology',
    address: '101 Office Park, Austin, TX 78701',
    contactPerson: 'Michael Bolton',
    email: 'michael@initech.com',
    phone: '555-3456',
    dateAdded: '2024-02-28',
    interviewsCount: 12
  }
];

export const mockInterviewers: Record<string, Interviewer[]> = {
  '1': [
    { id: '101', name: 'Alice Chen', email: 'alice@acme.com', phone: '555-1001', role: 'HR Manager', companyId: '1', totalInterviews: 8 },
    { id: '102', name: 'Bob Wilson', email: 'bob@acme.com', phone: '555-1002', role: 'Technical Lead', companyId: '1', totalInterviews: 12 },
    { id: '103', name: 'Carol Davis', email: 'carol@acme.com', phone: '555-1003', role: 'Senior Developer', companyId: '1', totalInterviews: 5 }
  ],
  '2': [
    { id: '201', name: 'David Miller', email: 'david@globex.com', phone: '555-2001', role: 'HR Director', companyId: '2', totalInterviews: 15 },
    { id: '202', name: 'Emily White', email: 'emily@globex.com', phone: '555-2002', role: 'Engineering Manager', companyId: '2', totalInterviews: 9 }
  ],
  '3': [
    { id: '301', name: 'Frank Lopez', email: 'frank@oceanic.com', phone: '555-3001', role: 'HR Specialist', companyId: '3', totalInterviews: 6 },
    { id: '302', name: 'Grace Kim', email: 'grace@oceanic.com', phone: '555-3002', role: 'Department Head', companyId: '3', totalInterviews: 4 }
  ],
  '4': [
    { id: '401', name: 'Henry Adams', email: 'henry@initech.com', phone: '555-4001', role: 'HR Coordinator', companyId: '4', totalInterviews: 10 },
    { id: '402', name: 'Irene Garcia', email: 'irene@initech.com', phone: '555-4002', role: 'Project Manager', companyId: '4', totalInterviews: 8 },
    { id: '403', name: 'Jack Thompson', email: 'jack@initech.com', phone: '555-4003', role: 'Team Lead', companyId: '4', totalInterviews: 14 }
  ]
};

export const mockInterviews: Record<string, Interview[]> = {
  '101': [
    { id: 'i1001', candidateName: 'Sarah Johnson', interviewerId: '101', interviewerName: 'Alice Chen', date: '2024-04-10', time: '10:00', status: 'Scheduled', companyId: '1' },
    { id: 'i1002', candidateName: 'Mike Peterson', interviewerId: '101', interviewerName: 'Alice Chen', date: '2024-04-08', time: '14:30', status: 'Completed', companyId: '1' },
    { id: 'i1003', candidateName: 'Emma Wilson', interviewerId: '101', interviewerName: 'Alice Chen', date: '2024-04-15', time: '11:15', status: 'Pending', companyId: '1' }
  ],
  '102': [
    { id: 'i1004', candidateName: 'James Brown', interviewerId: '102', interviewerName: 'Bob Wilson', date: '2024-04-12', time: '09:00', status: 'Scheduled', companyId: '1' },
    { id: 'i1005', candidateName: 'Lisa Chen', interviewerId: '102', interviewerName: 'Bob Wilson', date: '2024-04-07', time: '15:45', status: 'Completed', companyId: '1' }
  ],
  '201': [
    { id: 'i2001', candidateName: 'Ryan Miller', interviewerId: '201', interviewerName: 'David Miller', date: '2024-04-11', time: '13:30', status: 'Scheduled', companyId: '2' },
    { id: 'i2002', candidateName: 'Jennifer Lopez', interviewerId: '201', interviewerName: 'David Miller', date: '2024-04-09', time: '10:15', status: 'Canceled', companyId: '2' }
  ]
};

export const mockInterviewStats: Record<string, InterviewStats> = {
  '1': { total: 10, upcoming: 3, completed: 7 },
  '2': { total: 15, upcoming: 5, completed: 10 },
  '3': { total: 8, upcoming: 2, completed: 6 },
  '4': { total: 20, upcoming: 8, completed: 12 }
};

export const mockAdminProfile: AdminProfile = {
  id: '1',
  fullName: 'Alex Johnson',
  email: 'alex@hirevantage.com',
  phone: '555-9876',
  jobTitle: 'Admin Manager',
  profilePicture: '/assets/profile.jpg',
  preferences: {
    emailNotifications: true,
    darkMode: false,
    language: 'English'
  },
  platformSettings: {
    allowPublicAccess: false,
    defaultInterviewDuration: '1 hour'
  }
};

// New mock data for analytics
export const mockInterviewTrends: Record<string, InterviewTrend[]> = {
  '1': [
    { week: "03/09/2025", count: 10 },
    { week: "03/16/2025", count: 15 },
    { week: "03/23/2025", count: 8 },
    { week: "03/30/2025", count: 12 }
  ],
  '2': [
    { week: "03/09/2025", count: 8 },
    { week: "03/16/2025", count: 12 },
    { week: "03/23/2025", count: 15 },
    { week: "03/30/2025", count: 10 }
  ],
  '3': [
    { week: "03/09/2025", count: 5 },
    { week: "03/16/2025", count: 7 },
    { week: "03/23/2025", count: 4 },
    { week: "03/30/2025", count: 6 }
  ],
  '4': [
    { week: "03/09/2025", count: 14 },
    { week: "03/16/2025", count: 18 },
    { week: "03/23/2025", count: 16 },
    { week: "03/30/2025", count: 20 }
  ],
};

export const mockInterviewerPerformance: Record<string, InterviewerPerformance[]> = {
  '1': [
    { name: "Alice Chen", interviews: 8 },
    { name: "Bob Wilson", interviews: 12 },
    { name: "Carol Davis", interviews: 5 }
  ],
  '2': [
    { name: "David Miller", interviews: 15 },
    { name: "Emily White", interviews: 9 }
  ],
  '3': [
    { name: "Frank Lopez", interviews: 6 },
    { name: "Grace Kim", interviews: 4 }
  ],
  '4': [
    { name: "Henry Adams", interviews: 10 },
    { name: "Irene Garcia", interviews: 8 },
    { name: "Jack Thompson", interviews: 14 }
  ],
};

export const mockCompanyActivity: CompanyActivity[] = [
  { company: "Acme Corp", percentage: 30 },
  { company: "Globex Industries", percentage: 25 },
  { company: "Oceanic Airlines", percentage: 15 },
  { company: "Initech Solutions", percentage: 30 }
];

export const mockPlatformStats: PlatformStats = {
  averageTimeToHire: "2 days",
  demoRequestRate: "80%"
};

// Helper function to get all interviewers across companies
export const getAllInterviewers = (): Interviewer[] => {
  return Object.values(mockInterviewers).flat();
};
