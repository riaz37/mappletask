"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { Loading } from "@/components/ui/loading";

export function Navbar() {
  const { isAuthenticated, logout, isLoading } = useAuth();

  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="font-medium text-lg">
            Inventory
          </Link>

          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="flex items-center">
                <Loading size="sm" variant="dots" className="text-gray-600" />
              </div>
            ) : isAuthenticated ? (
              <Button
                className="text-sm text-gray-600 border hover:text-gray-900 bg-transparent"
                onClick={() => logout()}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link href="/register">
                  <Button className="bg-white text-black border border-gray-300 hover:bg-gray-100 text-sm">
                    Register
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="bg-black text-white hover:bg-gray-800 text-sm">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
