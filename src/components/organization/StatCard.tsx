
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  bgClass?: string;
  textClass?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  bgClass = "bg-white dark:bg-gray-800",
  textClass = "text-gray-800 dark:text-white",
  className,
}) => {
  return (
    <Card className={cn("overflow-hidden border-purple-100 dark:border-purple-900/20", className)}>
      <CardContent className={cn("p-5", bgClass)}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className={cn("text-2xl font-bold mt-1", textClass)}>{value}</h3>
            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
            )}
          </div>
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
