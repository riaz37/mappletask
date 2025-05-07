"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/api";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/formatters";
import { Loading } from "@/components/ui/loading";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <Loading size="lg" text="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Products</h1>
          <Link href="/products/new">
            <Button className="bg-black text-white hover:bg-gray-800">
              Add Product
            </Button>
          </Link>
        </div>
        <div className="text-center py-10 border border-gray-200 rounded-lg">
          <p className="text-gray-500">No products found</p>
          <Link href="/products/new" className="mt-4 inline-block">
            <Button className="bg-black text-white hover:bg-gray-800 mt-4">
              Add Your First Product
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/products/new">
          <Button className="bg-black text-white hover:bg-gray-800">
            Add Product
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-medium">{product.name}</h2>
            <div className="mt-2 text-gray-600">
              <p>{formatCurrency(product.price)}</p>
              <p className="mt-1">Stock: {product.quantity}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <Link href={`/products/${product.id}`}>
                <Button className="bg-white text-black border border-gray-300 hover:bg-gray-100 text-sm">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
