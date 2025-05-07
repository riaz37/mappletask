import { useState } from 'react';
import { ProductFormData } from '@/types';
import { Loading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button"; 
import router from 'next/router';

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => Promise<void>;
  isSubmitting: boolean;
}

export default function ProductForm({ initialData, onSubmit, isSubmitting }: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [quantity, setQuantity] = useState(initialData?.quantity?.toString() || '0');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Product name is required');
      return;
    }

    if (isNaN(parseFloat(price)) || parseFloat(price) < 0) {
      setError('Price must be a valid positive number');
      return;
    }

    if (isNaN(parseInt(quantity)) || parseInt(quantity) < 0) {
      setError('Quantity must be a valid positive number');
      return;
    }

    try {
      const productData: ProductFormData = {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        status: parseInt(quantity) > 0 ? 'in_stock' : 'out_of_stock'
      };

      await onSubmit(productData);
    } catch (err) {
      setError('Failed to save product');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto p-4">
      {error && (
        <p className="text-sm text-red-500 bg-red-100 p-2 rounded">{error}</p>
      )}

      <div className="space-y-1">
        <label htmlFor="name" className="text-sm text-gray-700">Product Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="price" className="text-sm text-gray-700">Price</label>
        <div className="flex items-center border border-gray-300 rounded px-3 py-2">
          <span className="text-gray-500 text-sm mr-2">$</span>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full outline-none text-sm"
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="quantity" className="text-sm text-gray-700">Quantity</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600"
          min="0"
          step="1"
        />
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mr-4"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="border border-primary"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <Loading size="sm" variant="dots" className="mr-2" />
              {initialData ? "Saving..." : "Creating..."}
            </span>
          ) : (
            initialData ? "Save Changes" : "Create Product"
          )}
        </Button>
      </div>
    </form>
  );
}
