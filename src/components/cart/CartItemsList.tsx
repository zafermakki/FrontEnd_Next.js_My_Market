
"use client";

import CartItemRow from "@/components/cart/CartItemRow";
import type { CartItem } from "@/store/features/cart/cartSlice";

type CartItemsListProps = {
  items: CartItem[];
  updatingItems: number[];
  onQuantityChange: (
    itemId: number,
    productId: number,
    currentQuantity: number,
    change: number
  ) => void;
  onRemove: (itemId: number) => void;
};

export default function CartItemsList({
  items,
  updatingItems,
  onQuantityChange,
  onRemove,
}: CartItemsListProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Shopping Cart
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-200">
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            isUpdating={updatingItems.includes(item.id)}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}