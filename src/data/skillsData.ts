
// Mock data for skills management feature

export interface SkillData {
  id: string;
  name: string;
  description: string;
  interviewers: SkillInterviewer[];
}

export interface SkillInterviewer {
  id: string;
  name: string;
  email: string;
  availability: 'Available' | 'Busy' | string;
  totalInterviews: number;
  avatar?: string;
}

export interface InterviewToAssign {
  id: string;
  candidate: string;
  date: string;
  type: string;
}

export const skillsMockData: SkillData[] = [
  {
    id: "skill-001",
    name: "Java",
    description: "Java programming language expertise including Spring Boot, JUnit, and enterprise application development",
    interviewers: [
      {
        id: "int-001",
        name: "Alice Chen",
        email: "alice@acme.com",
        availability: "Available",
        totalInterviews: 8,
        avatar: "AC"
      },
      {
        id: "int-002",
        name: "Bob Wilson",
        email: "bob@acme.com",
        availability: "Busy until 04/10/2025",
        totalInterviews: 12
      },
      {
        id: "int-003",
        name: "Carol Smith",
        email: "carol@acme.com",
        availability: "Available",
        totalInterviews: 5
      },
      {
        id: "int-004",
        name: "Dave Johnson",
        email: "dave@acme.com",
        availability: "Available",
        totalInterviews: 10
      },
      {
        id: "int-005",
        name: "Eva Brown",
        email: "eva@acme.com",
        availability: "Busy until 04/15/2025",
        totalInterviews: 7
      }
    ]
  },
  {
    id: "skill-002",
    name: "React",
    description: "Frontend development with React, Redux, and modern JavaScript frameworks",
    interviewers: [
      {
        id: "int-006",
        name: "Frank Lee",
        email: "frank@acme.com",
        availability: "Available",
        totalInterviews: 9
      },
      {
        id: "int-007",
        name: "Grace Kim",
        email: "grace@acme.com",
        availability: "Available",
        totalInterviews: 14
      },
      {
        id: "int-003",
        name: "Carol Smith",
        email: "carol@acme.com",
        availability: "Available",
        totalInterviews: 5
      }
    ]
  },
  {
    id: "skill-003",
    name: "Python",
    description: "Python programming including data science, Django, Flask, and automation",
    interviewers: [
      {
        id: "int-008",
        name: "Henry Zhang",
        email: "henry@acme.com",
        availability: "Busy until 04/12/2025",
        totalInterviews: 6
      },
      {
        id: "int-009",
        name: "Isabella Lopez",
        email: "isabella@acme.com",
        availability: "Available",
        totalInterviews: 11
      }
    ]
  },
  {
    id: "skill-004",
    name: "DevOps",
    description: "CI/CD, Docker, Kubernetes, AWS, and cloud infrastructure",
    interviewers: [
      {
        id: "int-010",
        name: "Jack Taylor",
        email: "jack@acme.com",
        availability: "Available",
        totalInterviews: 13
      },
      {
        id: "int-011",
        name: "Karen Miller",
        email: "karen@acme.com",
        availability: "Available",
        totalInterviews: 7
      },
      {
        id: "int-012",
        name: "Liam Davis",
        email: "liam@acme.com",
        availability: "Busy until 04/20/2025",
        totalInterviews: 9
      }
    ]
  },
  {
    id: "skill-005",
    name: "Data Science",
    description: "Machine learning, data analysis, statistical modeling, and AI",
    interviewers: [
      {
        id: "int-013",
        name: "Maya Patel",
        email: "maya@acme.com",
        availability: "Available",
        totalInterviews: 8
      },
      {
        id: "int-014",
        name: "Noah Garcia",
        email: "noah@acme.com",
        availability: "Busy until 04/18/2025",
        totalInterviews: 10
      }
    ]
  },
  {
    id: "skill-006",
    name: "UI/UX Design",
    description: "User interface design, user experience research, and prototyping",
    interviewers: [
      {
        id: "int-015",
        name: "Olivia Wright",
        email: "olivia@acme.com",
        availability: "Available",
        totalInterviews: 12
      }
    ]
  }
];

export const interviewsToAssign: InterviewToAssign[] = [
  {
    id: "int-001",
    candidate: "Jane Doe",
    date: "04/10/2025",
    type: "Java Technical Interview"
  },
  {
    id: "int-002",
    candidate: "John Smith",
    date: "04/12/2025",
    type: "React Frontend Interview"
  },
  {
    id: "int-003",
    candidate: "Emily Johnson",
    date: "04/15/2025",
    type: "Python Backend Interview"
  },
  {
    id: "int-004",
    candidate: "Michael Brown",
    date: "04/18/2025",
    type: "DevOps Infrastructure Interview"
  }
];
