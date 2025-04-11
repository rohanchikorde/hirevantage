
import React from 'react';
import RequirementForm from '@/components/requirements/RequirementForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewRequirementPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = (requirementId: string) => {
    navigate(`/dashboard/requirements/${requirementId}`);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate('/dashboard/requirements')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Requirements
        </Button>
      </div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">New Requirement</h1>
      <RequirementForm onSuccess={handleSuccess} />
    </div>
  );
};

export default NewRequirementPage;
