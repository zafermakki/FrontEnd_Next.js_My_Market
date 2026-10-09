
"use client";

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import type { CartItem } from "@/store/features/cart/cartSlice";

type CartItemRowProps = {
  item: CartItem;
  isUpdating: boolean;
  onQuantityChange: (
    itemId: number,
    productId: number,
    currentQuantity: number,
    change: number
  ) => void;
  onRemove: (itemId: number) => void;
};

export default function CartItemRow({
  item,
  isUpdating,
  onQuantityChange,
  onRemove,
}: CartItemRowProps) {
  return (
    <div className="p-6">
      <div className="flex gap-5">
        {/* Product Image */}
        <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <ShoppingCart
              size={30}
              className="text-slate-300"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {item.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                ${item.price} per item
              </p>
            </div>

            <button
              type="button"
              onClick={() => onRemove(item.id)}
              disabled={isUpdating}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={`Remove ${item.name}`}
              title="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            {/* Quantity */}
            <div className="flex items-center rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() =>
                  onQuantityChange(
                    item.id,
                    item.productId,
                    item.quantity,
                    -1
                  )
                }
                disabled={item.quantity <= 1 || isUpdating}
                className="flex h-9 w-9 items-center justify-center text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>

              <span className="flex h-9 min-w-10 items-center justify-center border-x border-slate-200 px-3 text-sm font-semibold text-slate-900">
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  onQuantityChange(
                    item.id,
                    item.productId,
                    item.quantity,
                    1
                  )
                }
                disabled={isUpdating}
                className="flex h-9 w-9 items-center justify-center text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Item Total */}
            <p className="text-lg font-bold text-slate-900">
              $
              {(Number(item.price) * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}