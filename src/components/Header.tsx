'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const isActiveRoute = (route: string) => {
    if (!pathname) return false;
    if (route === '/') return pathname === route;
    return pathname.startsWith(route);
  };

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard',
      icon: '📊'
    },
    { 
      name: 'Organisation', 
      href: '/organisation',
      icon: '🏢'
    },
    { 
      name: 'Impact', 
      href: '/impact',
      icon: '🥊'
    },
    { 
      name: 'Opportunities', 
      href: '/opportunities',
      icon: '💸'
    },
    { 
      name: 'Learning Hub', 
      href: '/learning',
      icon: '📚',
      className: 'bg-pink-100 rounded-full px-4'
    }
  ];

  const demoUser = {
    name: 'Demo User',
    email: 'demo@example.com',
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/dashboard" className="flex items-center">
          {!logoError ? (
            <Image
              src="/raiser-logo.png"
              alt="Raiser Logo"
              width={120}
              height={40}
              className="w-auto h-10"
              style={{ objectFit: 'contain' }}
              priority
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="text-2xl font-bold text-pink-600">Raiser</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-6">
        {navigation.map((item) => (
          <Link 
            key={item.name}
            href={item.href} 
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
              isActiveRoute(item.href)
                ? 'text-pink-600 bg-pink-50 font-medium'
                : 'text-gray-600 hover:text-pink-600 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Demo User Profile */}
      <div className="flex items-center gap-4 relative">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 focus:outline-none group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center overflow-hidden text-white transition-transform group-hover:scale-105">
                <span className="font-medium">
                  {demoUser.name[0]}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-pink-600">{demoUser.name}</span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-medium text-gray-900">{demoUser.name}</p>
                  <p className="text-sm text-gray-500">{demoUser.email}</p>
                </div>
                
                <div className="py-2">
                  <Link 
                    href="/settings/profile" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <span className="text-gray-400">👤</span>
                    Profile Settings
                  </Link>
                  <Link 
                    href="/settings/billing" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <span className="text-gray-400">💳</span>
                    Billing & Subscription
                  </Link>
                  <Link 
                    href="/settings/team" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <span className="text-gray-400">👥</span>
                    Team Management
                  </Link>
                  <Link 
                    href="/settings/notifications" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <span className="text-gray-400">🔔</span>
                    Notification Settings
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 