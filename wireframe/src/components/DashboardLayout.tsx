"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, User, FileText, Activity } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: 'customer' | 'company';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, type }) => {
  const pathname = usePathname();
  const isCustomer = type === 'customer';

  const customerLinks = [
    { href: '/customer/dashboard', label: 'My Vehicle', icon: Car },
    { href: '/customer/history', label: 'Service History', icon: FileText },
  ];

  const companyLinks = [
    { href: '/company/dashboard', label: 'Active Cases', icon: Activity },
    { href: '/company/customers', label: 'Customers', icon: User },
  ];

  const links = isCustomer ? customerLinks : companyLinks;
  const themeColor = isCustomer ? 'bg-blue-600' : 'bg-orange-600';
  const logoText = isCustomer ? 'AutoCare | Customer' : 'AutoCare | Enterprise';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 hidden md:block">
        <div className={`h-16 flex items-center px-6 ${themeColor}`}>
          <Car className="w-6 h-6 text-white mr-2" />
          <span className="font-bold text-white text-lg">{logoText}</span>
        </div>
        <nav className="p-4 space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href; // Simple check, might need startsWith
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? `bg-${isCustomer ? 'blue' : 'orange'}-50 text-${isCustomer ? 'blue' : 'orange'}-700`
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <link.icon className={`w-5 h-5 ${isActive ? `text-${isCustomer ? 'blue' : 'orange'}-600` : 'text-gray-400'}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-0 w-full px-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-xs text-gray-500 font-semibold mb-1">CURRENT USER</p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">
                {isCustomer ? 'JD' : 'AD'}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{isCustomer ? 'John Doe' : 'Admin User'}</p>
                <p className="text-xs text-gray-500">{isCustomer ? 'Tesla Model 3' : 'Service Mgr'}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
};
