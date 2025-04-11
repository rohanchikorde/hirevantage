
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  hoverEffect?: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  className, 
  children, 
  delay = 0,
  hoverEffect = true
}) => {
  const delayStyle = { animationDelay: `${delay}s` };
  
  return (
    <div 
      className={cn(
        'animate-fade-in opacity-0 transition-all duration-300', 
        hoverEffect && 'hover:-translate-y-1 hover:shadow-lg',
        className
      )} 
      style={delayStyle}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
