'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to Raiser</h1>
    </main>
  );
}
