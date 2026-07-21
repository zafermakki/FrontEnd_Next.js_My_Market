"use client";

import { ShoppingCart, Star } from "lucide-react";

type ProductCardProps = {
  id: string;
  title: string;
  price: number;
  image: string;
  stock: number;
};

const ProductCard = ({
  title,
  price,
  image,
  stock,
}: ProductCardProps) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Product Image */}

      <div className="aspect-square overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}

      <div className="p-5">

        <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
          {title}
        </h3>

        {/* Rating */}

        <div className="mt-3 flex items-center gap-1">

          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}

          <span className="ml-2 text-sm text-slate-500">
            (5.0)
          </span>

        </div>

        {/* Price */}

        <div className="mt-5 flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-500">
              Price
            </p>

            <h2 className="text-2xl font-bold text-slate-900">
              ${price}
            </h2>

          </div>

          <div className="text-right">

            <p className="text-sm text-slate-500">
              Stock
            </p>

            <p
              className={`font-semibold ${
                stock > 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {stock > 0 ? `${stock} Available` : "Out of Stock"}
            </p>

          </div>

        </div>

        {/* Button */}

        <button
          disabled={stock === 0}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <ShoppingCart size={20} />

          Add To Cart
        </button>

      </div>

    </div>
  );
};

export default ProductCard;