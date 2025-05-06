'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { user, logout, isLoading } = useAuth();

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl">Inventory</span>
            </Link>
            <nav className="ml-6 flex space-x-8">
              <Link href="/products" className="inline-flex items-center px-1 pt-1 text-sm font-medium">
                Products
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            {isLoading ? (
              <div>Loading...</div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">{user.email}</span>
                <Button 
                  onClick={logout}
                  variant="outline"
                  className="text-sm"
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link href="/login">
                  <Button variant="outline" className="text-sm">
                    Sign in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-black text-white hover:bg-gray-800 text-sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}