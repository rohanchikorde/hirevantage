# Hirevantage

A modern, full-stack hiring management platform built with React, TypeScript, and Supabase. Hirevantage streamlines the entire hiring process from job postings to candidate management and interview scheduling.

## Features

- **Requirement Management**
  - Create and manage job requirements
  - Track job openings and status
  - Set skill requirements and qualifications

- **Candidate Management**
  - Candidate profile management
  - Resume upload and storage
  - Status tracking (New, In Review, Interviewed, etc.)
  - Bulk candidate import

- **Interview Management**
  - Schedule and manage interviews
  - Interviewer assignment
  - Interview tracking and status updates
  - Interviewee dashboard

- **Ticket System**
  - Issue tracking for hiring process
  - Priority-based ticket management
  - Status updates and notifications

- **Admin Dashboard**
  - Company management
  - Interviewer management
  - Skill management
  - Settings configuration

## Tech Stack

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Shadcn UI components
  - React Router
  - Sonner (Toast notifications)

- **Backend**
  - Supabase (PostgreSQL + Auth)
  - RESTful API
  - File storage for resumes

- **Features**
  - Dark/Light mode support
  - Responsive design
  - Real-time updates
  - File upload support
  - Authentication system

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rohanchikorde/hirevantage.git
   cd hirevantage
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── services/       # API services
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── contexts/       # React context providers
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@hirevantage.com or create an issue in the repository.
