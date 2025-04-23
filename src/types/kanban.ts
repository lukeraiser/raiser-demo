export type GrantStatus = 'researching' | 'eligible' | 'applied' | 'successful' | 'unsuccessful' | 'drafting';

// Base types that match Prisma schema
interface BaseMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  projectId: string;
}

interface BaseProject {
  id: string;
  title: string;
  description: string | null;
  budget: number;
  raised: number;
  imageUrl: string | null;
  status: string;
}

interface BaseGrant {
  id: string;
  title: string;
  amount: number;
  description: string | null;
  eligibility: string | null;
  applicationDetails: string | null;
  logo: string | null;
  status: GrantStatus;
}

// Database response types
export interface DatabaseMetric extends BaseMetric {
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseProject extends BaseProject {
  createdAt: string;
  updatedAt: string;
  metrics: DatabaseMetric[];
}

export interface DatabaseGrant extends BaseGrant {
  createdAt: string;
  updatedAt: string;
  deadline: string | null;
  projects: DatabaseProject[];
}

// Kanban board types
export interface GrantCard extends BaseGrant {
  createdAt: string;
  updatedAt: string;
  deadline: string;
  projects: DatabaseProject[];
}

export interface Column {
  id: string;
  title: string;
  type: GrantStatus;
  cards: GrantCard[];
  createdAt: string;
  updatedAt: string;
}

// Full application types (with relationships)
export interface Metric extends BaseMetric {
  createdAt: Date;
  updatedAt: Date;
}

export interface Project extends BaseProject {
  createdAt: Date;
  updatedAt: Date;
  metrics: Metric[];
  grants: Grant[];
}

export interface Grant extends BaseGrant {
  createdAt: Date;
  updatedAt: Date;
  deadline: Date | null;
  projects: Project[];
} 