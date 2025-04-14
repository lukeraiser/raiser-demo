export type GrantStatus = 'researching' | 'eligible' | 'applied' | 'successful' | 'unsuccessful' | 'drafting';

export interface Metric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  raised: number;
  imageUrl: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  metrics: Metric[];
}

export interface GrantCard {
  id: number;
  title: string;
  amount: number;
  deadline: string;
  status: GrantStatus;
  description: string;
  eligibility: string;
  applicationDetails: string | null;
  logo: string | null;
  projects?: Project[];
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  title: string;
  type: GrantStatus;
  cards: GrantCard[];
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseGrant {
  id: number;
  title: string;
  amount: number;
  status: string;
  deadline: string | null;
  description: string | null;
  eligibility: string | null;
  applicationDetails: string | null;
  logo: string | null;
  createdAt: string;
  updatedAt: string;
  projects: {
    id: number;
    title: string;
    description: string | null;
    budget: number;
    raised: number;
    image_url: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    metrics: Array<{
      id: string;
      name: string;
      value: number;
      target: number;
      unit: string;
    }>;
  }[];
} 