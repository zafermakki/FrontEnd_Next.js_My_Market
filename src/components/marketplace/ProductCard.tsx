import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  onClick: (product: Product) => void;
};

const ProductCard = ({
  product,
  onClick,
}: ProductCardProps) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="h-56 overflow-hidden bg-slate-100">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No image
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-slate-500">
          {product.description}
        </p>

        <div className="mt-3">
          <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
            {product.category.name}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">
            ${product.price}
          </span>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;