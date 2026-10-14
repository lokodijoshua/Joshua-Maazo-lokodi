export type ProjectCategory = 'all' | 'ux-design' | 'full-stack' | 'ui-design' | 'crud-app';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'ux-design' | 'full-stack' | 'ui-design' | 'crud-app';
  categoryLabel: string;
  client: string;
  year: string;
  description: string;
  image: string;
  tags: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  challenge: string;
  solution: string;
  architecture: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  category: 'web-dev' | 'frontend' | 'backend' | 'database' | 'tools' | 'ai-ml';
  categoryLabel: string;
  skills: string[];
  description: string;
  credentialUrl: string;
  isRecent?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level: string;
    iconName?: string;
  }[];
}
