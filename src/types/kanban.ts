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
  metrics: Metric[];
}

export interface GrantCard {
  id: string;
  title: string;
  amount: number;
  deadline: string;
  status: GrantStatus;
  description: string;
  eligibility: string;
  applicationDetails: string;
  logo: string | null;
  projects?: Project[];
}

export interface Column {
  id: string;
  title: string;
  type: GrantStatus;
  cards: GrantCard[];
}

export interface DatabaseGrant {
  id: string;
  title: string;
  amount: number;
  status: string;
  deadline: string | null;
  description: string | null;
  eligibility: string | null;
  applicationDetails: string | null;
  logo: string | null;
  createdAt: Date;
  updatedAt: Date;
  projects: {
    id: string;
    title: string;
    metrics: Array<{
      id: string;
      name: string;
      value: number;
      target: number;
      unit: string;
    }>;
  }[];
} 