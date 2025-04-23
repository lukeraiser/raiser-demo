'use client';

import Link from 'next/link';

interface NavItem {
  id: string;
  label: string;
  icon?: string;
  path?: string;
}

interface LeftNavbarProps {
  title: string;
  items: NavItem[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  previewPath?: string;
}

const LeftNavbar = ({ title, items, activeSection, onSectionChange, previewPath = '/ogarta' }: LeftNavbarProps) => {
  return (
    <div className="fixed top-16 left-0 w-64 bg-white border-r border-gray-200 h-[calc(100vh-64px)] z-20">
      <div className="p-4">
        <div className="bg-[#ff65c3] text-white rounded-t-lg px-4 py-3">
          <h2 className="font-bold text-center text-white">{title}</h2>
        </div>
        <nav className="space-y-1 border border-gray-200 rounded-b-lg p-2 mb-6">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-[#fde9f3] text-[#ff65c3] font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-6 border-t border-gray-200 pt-6">
          <Link 
            href={previewPath}
            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors"
          >
            <span>🌐</span>
            Preview Public Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftNavbar; 