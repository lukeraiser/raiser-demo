'use client';

import { useEffect } from 'react';

interface BaseModalProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export default function BaseModal({ children, onClose, className = '' }: BaseModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto ${className}`}>
        {children}
      </div>
    </div>
  );
} 