
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Download, Github } from 'lucide-react';

interface ImportRepoProps {
  onImport: (repoUrl: string) => void;
  isLoading: boolean;
}

const ImportRepo: React.FC<ImportRepoProps> = ({ onImport, isLoading }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!repoUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a repository URL",
        variant: "destructive",
      });
      return;
    }
    
    // Basic validation for GitHub URLs
    if (!repoUrl.includes('github.com')) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid GitHub repository URL",
        variant: "destructive",
      });
      return;
    }
    
    onImport(repoUrl.trim());
  };

  return (
    <div className="bg-github-medium p-5 rounded-lg border border-github-medium">
      <div className="flex items-center mb-4">
        <Github className="h-5 w-5 text-github-blue mr-2" />
        <h2 className="text-lg font-semibold">Import Repository</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="repoUrl" className="block text-sm font-medium mb-1">
            GitHub Repository URL
          </label>
          <Input
            id="repoUrl"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/username/repository"
            className="bg-github-darker border-github-medium focus:border-github-blue"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Example: https://github.com/facebook/react
          </p>
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-github-blue hover:bg-github-blue/90 text-white"
        >
          {isLoading ? (
            <>
              <span className="animate-pulse-subtle mr-2">Importing...</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Import Repository
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ImportRepo;
