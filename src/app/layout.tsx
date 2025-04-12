'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { OpportunitiesProvider } from '@/context/OpportunitiesContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OpportunitiesProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </OpportunitiesProvider>
      </body>
    </html>
  );
}
