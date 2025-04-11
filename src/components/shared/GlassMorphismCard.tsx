
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassMorphismCardProps {
  className?: string;
  children: React.ReactNode;
  blur?: 'none' | 'sm' | 'md' | 'lg';
}

const GlassMorphismCard: React.FC<GlassMorphismCardProps> = ({ 
  className, 
  children,
  blur = 'md'
}) => {
  const blurClass = {
    'none': 'backdrop-blur-none',
    'sm': 'backdrop-blur-sm',
    'md': 'backdrop-blur-md',
    'lg': 'backdrop-blur-lg'
  };
  
  return (
    <div 
      className={cn(
        'bg-white/70 dark:bg-slate-800/70',
        blurClass[blur], 
        'border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-glass transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassMorphismCard;
