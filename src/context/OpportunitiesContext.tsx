'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Opportunity {
  id: string;
  title: string;
  funder: string;
  amount: number;
  deadline: string;
  status: string;
  description: string;
  statusColor?: string;
}

interface OpportunitiesContextType {
  opportunities: Opportunity[];
  setOpportunities: (opportunities: Opportunity[]) => void;
}

const OpportunitiesContext = createContext<OpportunitiesContextType | undefined>(undefined);

export function OpportunitiesProvider({ children }: { children: ReactNode }) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  return (
    <OpportunitiesContext.Provider value={{ opportunities, setOpportunities }}>
      {children}
    </OpportunitiesContext.Provider>
  );
}

export function useOpportunities() {
  const context = useContext(OpportunitiesContext);
  if (context === undefined) {
    throw new Error('useOpportunities must be used within an OpportunitiesProvider');
  }
  return context;
} 