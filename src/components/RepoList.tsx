
import React from 'react';
import { Code, Star, GitFork, Clock } from 'lucide-react';
import { Repository } from '../types/repository';

interface RepoListProps {
  repositories: Repository[];
  isLoading: boolean;
}

const RepoList: React.FC<RepoListProps> = ({ repositories, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="repo-card animate-pulse-subtle">
            <div className="h-5 w-48 bg-github-medium rounded mb-2"></div>
            <div className="h-4 w-full bg-github-medium rounded mb-4"></div>
            <div className="flex items-center space-x-4">
              <div className="h-4 w-16 bg-github-medium rounded"></div>
              <div className="h-4 w-16 bg-github-medium rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className="text-center py-12">
        <Code className="mx-auto h-12 w-12 text-github-blue mb-4" />
        <h3 className="text-xl font-semibold mb-2">No repositories found</h3>
        <p className="text-muted-foreground">Import a repository to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {repositories.map((repo) => (
        <div key={repo.id} className="repo-card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-github-blue truncate">
              {repo.name}
            </h3>
            <span className="text-xs bg-github-darker px-2 py-1 rounded-full">
              {repo.isPrivate ? 'Private' : 'Public'}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {repo.description || 'No description provided'}
          </p>
          
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            {repo.language && (
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-github-purple mr-1"></span>
                <span>{repo.language}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <Star className="h-3 w-3 mr-1" />
              <span>{repo.stars}</span>
            </div>
            
            <div className="flex items-center">
              <GitFork className="h-3 w-3 mr-1" />
              <span>{repo.forks}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>Updated {repo.updatedAt}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepoList;
