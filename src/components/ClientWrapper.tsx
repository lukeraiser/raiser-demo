'use client';

import { OpportunitiesProvider } from '@/context/OpportunitiesContext';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return <OpportunitiesProvider>{children}</OpportunitiesProvider>;
} 