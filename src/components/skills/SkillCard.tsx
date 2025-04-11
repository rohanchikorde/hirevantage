
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SkillData } from '@/data/skillsData';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';

interface SkillCardProps {
  skill: SkillData;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const navigate = useNavigate();
  const availableCount = skill.interviewers.filter(interviewer => 
    interviewer.availability === 'Available').length;

  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
      <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 p-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{skill.name}</h3>
        <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Users className="h-4 w-4 mr-1 text-purple-600" />
          <span>{skill.interviewers.length} Interviewers</span>
          <span className="mx-2">•</span>
          <span className={`${availableCount > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
            {availableCount} Available
          </span>
        </div>
      </div>
      <CardContent className="pt-4 pb-2">
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{skill.description}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <Button 
          variant="outline" 
          className="w-full hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900/20 dark:hover:text-purple-400"
          onClick={() => navigate(`/dashboard/admin/skills/${skill.id}`)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SkillCard;
