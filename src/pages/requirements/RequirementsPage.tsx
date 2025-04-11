
import React from 'react';
import RequirementsList from '@/components/requirements/RequirementsList';

const RequirementsPage: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Requirements</h1>
      <RequirementsList />
    </div>
  );
};

export default RequirementsPage;
