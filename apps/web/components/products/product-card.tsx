import Link from "next/link";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

export function ProductCard({ product, onDelete }: ProductCardProps) {
  const statusColor =
    product.status === "in_stock"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
          >
            {product.status === "in_stock" ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="font-medium">{formatCurrency(product.price)}</p>
            <p className="text-sm text-muted-foreground">
              Quantity: {product.quantity}
            </p>
          </div>

          <div className="flex space-x-2">
            <Link href={`/products/${product.id}/edit`}>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(product.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
