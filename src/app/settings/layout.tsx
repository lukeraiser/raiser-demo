'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';

const settingsNavItems = [
  { href: '/settings/profile', label: 'Profile Settings' },
  { href: '/settings/billing', label: 'Billing & Subscription' },
  { href: '/settings/team', label: 'Team Management' },
  { href: '/settings/notifications', label: 'Notification Settings' },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="col-span-1">
              <nav className="space-y-1">
                {settingsNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-4 py-2 rounded-md text-sm font-medium ${
                        isActive
                          ? 'bg-pink-50 text-pink-700'
                          : 'text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="col-span-3">
              <div className="bg-white shadow rounded-lg">
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 