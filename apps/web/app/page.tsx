import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Product Inventory Manager
        </h1>
        <p className="text-lg text-gray-600">
          A simple application to manage your product inventory with ease.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
          <Link href="/products">
            <Button className="w-full sm:w-auto bg-black text-white hover:bg-gray-800">
              View Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
