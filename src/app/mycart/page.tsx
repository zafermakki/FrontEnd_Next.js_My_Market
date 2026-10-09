
"use client";


import { useMyCart } from "@/hooks/useMyCart";

import CartHeader from "@/components/cart/CartHeader";
import CartEmptyState from "@/components/cart/CartEmptyState";
import CartItemsList from "@/components/cart/CartItemsList";
import CartOrderSummary from "@/components/cart/CartOrderSummary";

export default function MyCart() {
  const {
    cartItems,
    loading,
    loadError,
    actionError,
    updatingItems,
    subtotal,
    shipping,
    total,
    handleQuantityChange,
    handleRemoveItem,
  } = useMyCart();

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-sm text-slate-500">
              Loading your cart...
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-3xl border border-red-200 bg-white p-8 text-center">
            <p className="text-sm text-red-600" role="alert">
              {loadError}
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <CartHeader />

      <section className="mx-auto max-w-7xl px-6 py-10">
        {actionError && (
          <div
            className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
            role="alert"
          >
            {actionError}
          </div>
        )}

        {cartItems.length === 0 ? (
          <CartEmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <CartItemsList
                items={cartItems}
                updatingItems={updatingItems}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <CartOrderSummary
                subtotal={subtotal}
                shipping={shipping}
                total={total}
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}