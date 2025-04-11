
import React, { useState } from 'react';
import { skillsMockData, SkillData } from '@/data/skillsData';
import SkillCard from '@/components/skills/SkillCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Search, Plus, Filter, Code, Server, Database, Globe } from 'lucide-react';

// Group skills by category
const SKILL_CATEGORIES = {
  'programming': {
    name: 'Programming',
    icon: <Code className="h-5 w-5" />,
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go']
  },
  'devops': {
    name: 'DevOps',
    icon: <Server className="h-5 w-5" />,
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Terraform']
  },
  'database': {
    name: 'Database',
    icon: <Database className="h-5 w-5" />,
    skills: ['SQL', 'MongoDB', 'PostgreSQL', 'Redis', 'Cassandra']
  },
  'web': {
    name: 'Web',
    icon: <Globe className="h-5 w-5" />,
    skills: ['React', 'Angular', 'Vue', 'HTML/CSS', 'Node.js']
  }
};

const SkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<SkillData[]>(skillsMockData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', description: '', category: 'programming' });
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setSearchQuery(e.target.value);
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 300);
  };

  const filteredSkills = skills
    .filter(skill => 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(skill => {
      if (filterType === 'available') {
        return skill.interviewers.some(interviewer => interviewer.availability === 'Available');
      }
      return true;
    })
    .filter(skill => {
      // Filter by category
      if (activeCategory === 'all') return true;
      
      const skillName = skill.name.toLowerCase();
      const category = Object.keys(SKILL_CATEGORIES).find(cat => 
        SKILL_CATEGORIES[cat as keyof typeof SKILL_CATEGORIES].skills
          .map(s => s.toLowerCase())
          .includes(skillName)
      );
      
      return category === activeCategory;
    });

  const handleAddSkill = () => {
    if (newSkill.name.trim() === '') {
      toast.error('Skill name is required');
      return;
    }

    const newSkillData: SkillData = {
      id: `skill-${Date.now()}`,
      name: newSkill.name,
      description: newSkill.description,
      interviewers: []
    };

    setSkills([...skills, newSkillData]);
    setNewSkill({ name: '', description: '', category: 'programming' });
    setIsDialogOpen(false);
    toast.success(`Skill "${newSkill.name}" added successfully`);
  };

  // Group skills by category for the UI
  const getSkillCategory = (skillName: string): string => {
    skillName = skillName.toLowerCase();
    
    for (const [category, data] of Object.entries(SKILL_CATEGORIES)) {
      if (data.skills.map(s => s.toLowerCase()).includes(skillName)) {
        return category;
      }
    }
    
    return 'other';
  };

  // Get availability percentage for a skill
  const getAvailabilityPercentage = (skill: SkillData): number => {
    if (skill.interviewers.length === 0) return 0;
    const availableCount = skill.interviewers.filter(i => i.availability === 'Available').length;
    return Math.round((availableCount / skill.interviewers.length) * 100);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Skills Management</h1>
        <p className="text-muted-foreground">Assign interviewers by skill and manage skill categories</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-auto flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search skills..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-9"
            aria-label="Search skills"
          />
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Select
            value={filterType}
            onValueChange={setFilterType}
          >
            <SelectTrigger className="w-[180px]" aria-label="Filter skills">
              <Filter className="h-4 w-4 mr-2 text-purple-600" />
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skills</SelectItem>
              <SelectItem value="available">Available Interviewers</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                <Plus className="h-4 w-4 mr-1" /> Add New Skill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Skill</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="skill-name">Skill Name</Label>
                  <Input 
                    id="skill-name" 
                    placeholder="e.g., JavaScript"
                    value={newSkill.name}
                    onChange={e => setNewSkill({...newSkill, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="skill-category">Category</Label>
                  <Select 
                    value={newSkill.category}
                    onValueChange={(value) => setNewSkill({...newSkill, category: value})}
                  >
                    <SelectTrigger id="skill-category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(SKILL_CATEGORIES).map(([key, category]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center">
                            <span className="mr-2">{category.icon}</span>
                            {category.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="skill-description">Description</Label>
                  <Textarea 
                    id="skill-description" 
                    placeholder="Brief description of this skill..."
                    value={newSkill.description}
                    onChange={e => setNewSkill({...newSkill, description: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddSkill}>Add Skill</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Category tabs */}
      <Tabs 
        value={activeCategory} 
        onValueChange={setActiveCategory}
        className="mb-6"
      >
        <TabsList className="mb-4 w-full overflow-x-auto flex flex-nowrap justify-start p-1">
          <TabsTrigger value="all" className="flex items-center">
            <span className="mr-2">🔍</span>
            All Skills
          </TabsTrigger>
          
          {Object.entries(SKILL_CATEGORIES).map(([key, category]) => (
            <TabsTrigger key={key} value={key} className="flex items-center whitespace-nowrap">
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-8 w-full" />
                  <div className="flex justify-between mt-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredSkills.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <Search className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">No skills found</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('all');
                  setActiveCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map(skill => {
                const availableCount = skill.interviewers.filter(i => i.availability === 'Available').length;
                const totalCount = skill.interviewers.length;
                const availabilityPercentage = getAvailabilityPercentage(skill);
                
                return (
                  <div 
                    key={skill.id}
                    className="group bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md hover:scale-[1.02] hover:border-purple-200 dark:hover:border-purple-800"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{skill.name}</h3>
                      {/* Category badge */}
                      {Object.entries(SKILL_CATEGORIES).map(([key, category]) => 
                        category.skills.map(s => s.toLowerCase()).includes(skill.name.toLowerCase()) && (
                          <Badge key={key} variant="outline" className="flex items-center gap-1">
                            {category.icon}
                            <span className="text-xs">{category.name}</span>
                          </Badge>
                        )
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                      {skill.description || `Expertise in ${skill.name} development and best practices.`}
                    </p>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Interviewers Available</span>
                        <span className="font-medium">{availableCount}/{totalCount}</span>
                      </div>
                      <Progress 
                        value={availabilityPercentage} 
                        className="h-2" 
                        indicatorClassName={
                          availabilityPercentage > 60 
                            ? "bg-green-500" 
                            : availabilityPercentage > 30 
                            ? "bg-yellow-500" 
                            : "bg-red-500"
                        }
                      />
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        {availableCount > 0 ? (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            {availableCount} Available
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-red-500 border-red-200 dark:border-red-900/30">
                            No Interviewers Available
                          </Badge>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                        onClick={() => toast.info(`Viewing details for ${skill.name}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
        
        {/* Create tab content for each category */}
        {Object.entries(SKILL_CATEGORIES).map(([key, category]) => (
          <TabsContent key={key} value={key} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills
                .filter(skill => 
                  category.skills
                    .map(s => s.toLowerCase())
                    .includes(skill.name.toLowerCase())
                )
                .map(skill => {
                  const availableCount = skill.interviewers.filter(i => i.availability === 'Available').length;
                  const totalCount = skill.interviewers.length;
                  const availabilityPercentage = getAvailabilityPercentage(skill);
                  
                  return (
                    <div 
                      key={skill.id}
                      className="group bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md hover:scale-[1.02] hover:border-purple-200 dark:hover:border-purple-800"
                    >
                      <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                        {skill.description || `Expertise in ${skill.name} development and best practices.`}
                      </p>
                      
                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Interviewers Available</span>
                          <span className="font-medium">{availableCount}/{totalCount}</span>
                        </div>
                        <Progress 
                          value={availabilityPercentage} 
                          className="h-2" 
                          indicatorClassName={
                            availabilityPercentage > 60 
                              ? "bg-green-500" 
                              : availabilityPercentage > 30 
                              ? "bg-yellow-500" 
                              : "bg-red-500"
                          }
                        />
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          {availableCount > 0 ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              {availableCount} Available
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-red-500 border-red-200 dark:border-red-900/30">
                              No Interviewers Available
                            </Badge>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                          onClick={() => toast.info(`Viewing details for ${skill.name}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  );
                })}
            </div>
            
            {filteredSkills.filter(skill => 
              category.skills
                .map(s => s.toLowerCase())
                .includes(skill.name.toLowerCase())
            ).length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4 flex items-center justify-center">
                  {category.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">No {category.name} skills found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SkillsPage;
