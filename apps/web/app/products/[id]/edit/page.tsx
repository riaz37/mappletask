'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProduct, updateProduct } from '@/lib/api';
import { useAuth } from '@/context/auth-context';
import { Product, ProductFormData } from '@/types';
import ProductForm from '@/components/products/product-form';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }
    
    const fetchProduct = async () => {
      try {
        const data = await getProduct(params.id);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isAuthenticated) {
      fetchProduct();
    }
  }, [params.id, isAuthenticated, authLoading, router]);
  
  const handleSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      await updateProduct(params.id, data);
      router.push('/products');
    } catch (err) {
      setError('Failed to update product');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (authLoading || isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        {error}
      </div>
    );
  }
  
  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Edit Product</h1>
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <ProductForm 
          initialData={product}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
