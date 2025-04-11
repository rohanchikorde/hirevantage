
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import ImportRepo from '@/components/ImportRepo';
import RepoList from '@/components/RepoList';
import { Repository } from '@/types/repository';
import { fetchRepositories, importRepository } from '@/services/repositoryService';

const Index = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadRepositories();
  }, []);

  const loadRepositories = async () => {
    try {
      setIsLoading(true);
      const repos = await fetchRepositories();
      setRepositories(repos);
    } catch (error) {
      toast({
        title: "Error loading repositories",
        description: "Failed to load repositories. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportRepo = async (repoUrl: string) => {
    try {
      setIsImporting(true);
      const importedRepo = await importRepository(repoUrl);
      
      setRepositories(prevRepos => [importedRepo, ...prevRepos]);
      
      toast({
        title: "Repository imported",
        description: `Successfully imported ${importedRepo.fullName}`,
      });
    } catch (error) {
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container flex-1 px-4 py-8 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">GitHub Repository Vault</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <ImportRepo onImport={handleImportRepo} isLoading={isImporting} />
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-github-medium p-5 rounded-lg border border-github-medium">
                <h2 className="text-lg font-semibold mb-2">Your Repositories</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse and manage your imported repositories
                </p>
                
                <RepoList repositories={repositories} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-github-medium py-6 mt-auto">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            CodeVault - A GitHub Repository Importer
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
