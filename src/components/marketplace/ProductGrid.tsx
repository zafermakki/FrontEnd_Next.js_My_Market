import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  loading: boolean;
  error: string;
  onProductClick: (product: Product) => void;
};

const ProductGrid = ({
  products,
  loading,
  error,
  onProductClick,
}: ProductGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
          >
            <div className="h-56 animate-pulse bg-slate-200" />

            <div className="space-y-3 p-5">
              <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />

              <div className="mt-5 flex justify-between">
                <div className="h-7 w-20 animate-pulse rounded bg-slate-200" />
                <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-red-500">
        {error}
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <p className="text-slate-500">
          No products available in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
};

export default ProductGrid;