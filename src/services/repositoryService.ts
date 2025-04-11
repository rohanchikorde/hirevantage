
import { Repository } from "../types/repository";

// This is a mock service that simulates fetching repositories
// In a real app, this would connect to GitHub's API

// Sample repository data
const sampleRepositories: Repository[] = [
  {
    id: "1",
    name: "react",
    fullName: "facebook/react",
    description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    url: "https://github.com/facebook/react",
    stars: 203000,
    forks: 42000,
    isPrivate: false,
    language: "JavaScript",
    updatedAt: "2 days ago",
    owner: {
      login: "facebook",
      avatarUrl: "https://avatars.githubusercontent.com/u/69631?v=4"
    }
  },
  {
    id: "2",
    name: "typescript",
    fullName: "microsoft/typescript",
    description: "TypeScript is a superset of JavaScript that compiles to clean JavaScript output.",
    url: "https://github.com/microsoft/typescript",
    stars: 88000,
    forks: 11000,
    isPrivate: false,
    language: "TypeScript",
    updatedAt: "3 days ago",
    owner: {
      login: "microsoft",
      avatarUrl: "https://avatars.githubusercontent.com/u/6154722?v=4"
    }
  }
];

// In-memory storage for imported repositories
let repositories: Repository[] = [...sampleRepositories];

export const fetchRepositories = async (): Promise<Repository[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [...repositories];
};

export const importRepository = async (repoUrl: string): Promise<Repository> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Parse URL to extract username and repo name
  const urlParts = repoUrl.replace('https://github.com/', '').split('/');
  const username = urlParts[0];
  const repoName = urlParts[1]?.replace('.git', '');
  
  if (!username || !repoName) {
    throw new Error('Invalid repository URL');
  }
  
  // Create a new repository object
  const newRepo: Repository = {
    id: `${Date.now()}`,
    name: repoName,
    fullName: `${username}/${repoName}`,
    description: `This is ${repoName} by ${username}`,
    url: repoUrl,
    stars: Math.floor(Math.random() * 1000),
    forks: Math.floor(Math.random() * 200),
    isPrivate: false,
    language: ["JavaScript", "TypeScript", "Python", "Go", "Rust"][Math.floor(Math.random() * 5)],
    updatedAt: "just now",
    owner: {
      login: username,
      avatarUrl: `https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 100000)}?v=4`
    }
  };
  
  // Add to repositories list
  repositories = [newRepo, ...repositories];
  
  return newRepo;
};
