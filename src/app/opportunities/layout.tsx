'use client';

import { OpportunitiesProvider } from '../../context/OpportunitiesContext';

export default function OpportunitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OpportunitiesProvider>{children}</OpportunitiesProvider>;
} 