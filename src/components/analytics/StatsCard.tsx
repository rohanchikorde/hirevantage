
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgClass?: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon,
  bgClass = "bg-gradient-to-br from-purple-500 to-indigo-600",
  description,
  trend
}) => {
  return (
    <Card className="overflow-hidden">
      <div className={cn("p-4 text-white", bgClass)}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{title}</h3>
          <div className="text-white/80">
            {icon}
          </div>
        </div>
        <div className="flex items-baseline mt-2">
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <span className={cn("ml-2 text-sm px-1.5 py-0.5 rounded-full", 
              trend.isPositive 
                ? "bg-green-400/20 text-green-100" 
                : "bg-red-400/20 text-red-100"
            )}>
              {trend.isPositive ? '▲' : '▼'} {Math.abs(trend.value)}%
            </span>
          )}
        </div>
        {description && (
          <p className="mt-1 text-sm text-white/80">{description}</p>
        )}
      </div>
      <CardContent className="bg-white dark:bg-gray-800 p-4">
        <div className="h-10 flex items-center justify-center">
          {/* This is where a small chart could go */}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
