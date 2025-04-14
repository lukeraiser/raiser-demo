export type GrantStatus = 'researching' | 'eligible' | 'applied' | 'successful' | 'unsuccessful' | 'drafting';

export interface Metric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
}

export interface Project {
  id: number;
  title: string;
  description: string | null;
  budget: number;
  raised: number;
  image_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
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
  application_details: string;
  logo: string | null;
  projects?: Project[];
  created_at: string;
  updated_at: string;
}

export interface Column {
  id: string;
  title: string;
  type: GrantStatus;
  cards: GrantCard[];
}

export interface DatabaseGrant {
  id: number;
  title: string;
  amount: number;
  status: string;
  deadline: string | null;
  description: string | null;
  eligibility: string | null;
  application_details: string | null;
  logo: string | null;
  created_at: string;
  updated_at: string;
  projects: {
    id: number;
    title: string;
    description: string | null;
    budget: number;
    raised: number;
    image_url: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    metrics: Array<{
      id: string;
      name: string;
      value: number;
      target: number;
      unit: string;
    }>;
  }[];
} 