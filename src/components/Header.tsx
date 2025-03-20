'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { user, isLoaded } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const isActiveRoute = (route: string) => {
    if (route === '/') return pathname === route;
    return pathname.startsWith(route);
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Opportunities', href: '/opportunities' },
    { name: 'Campaigns', href: '/campaigns' },
    { name: 'Reports', href: '/reports' },
    { name: 'Setup', href: '/setup' },
    { name: 'Learning', href: '/learning' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/raiser-logo.png"
            alt="Raiser Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-8">
        {navigation.map((item) => (
          <Link 
            key={item.name}
            href={item.href} 
            className={`${
              isActiveRoute(item.href)
                ? 'text-pink-500 font-bold border-b-2 border-pink-500'
                : 'text-gray-700 hover:text-pink-500'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="flex items-center gap-4 relative">
        {isLoaded && (
          <>
            {user ? (
              <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      {user.imageUrl ? (
                        <Image
                          src={user.imageUrl}
                          alt={user.fullName || 'User'}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-teal-400 font-medium">
                          {user.firstName?.[0] || user.emailAddresses[0].emailAddress[0].toUpperCase()}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium">{user.fullName || user.emailAddresses[0].emailAddress}</span>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                        <p className="text-sm text-gray-500">{user.emailAddresses[0].emailAddress}</p>
                      </div>
                      
                      <div className="py-2">
                        <Link 
                          href="/settings/profile" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Profile Settings
                        </Link>
                        <Link 
                          href="/settings/billing" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Billing & Subscription
                        </Link>
                        <Link 
                          href="/settings/team" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Team Management
                        </Link>
                        <Link 
                          href="/settings/notifications" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Notification Settings
                        </Link>
                      </div>

                      <div className="border-t py-2">
                        <SignOutButton>
                          <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                            Sign out
                          </button>
                        </SignOutButton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-pink-600 hover:text-pink-700">
                  Sign in
                </button>
              </SignInButton>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header; 