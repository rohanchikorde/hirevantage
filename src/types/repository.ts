
export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  isPrivate: boolean;
  language: string | null;
  updatedAt: string;
  owner: {
    login: string;
    avatarUrl: string;
  };
}
