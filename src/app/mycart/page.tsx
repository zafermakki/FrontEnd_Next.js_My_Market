"use client";

import { useEffect, useState } from "react";
import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/store/store";

import { getCart } from "@/services/cartService";

import {
  setCart,
} from "@/store/features/cart/cartSlice";

const MyCart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCart();

        const formattedItems = data.items.map(
          (item) => ({
            id: item.id,
            productId: item.product.id,
            name: item.product.name,
            price: item.product.price,
            image:
              item.product.images &&
              item.product.images.length > 0
                ? item.product.images[0].image
                : null,
            quantity: item.quantity,
          })
        );

        dispatch(setCart(formattedItems));
      } catch (error) {
        console.error(
          "Error fetching cart:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load cart."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [dispatch]);

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price) * item.quantity,
    0
  );

  const shipping = 0;

  const total = subtotal + shipping;

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

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-3xl border border-red-200 bg-white p-8 text-center">
            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <ShoppingCart size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                My Cart
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Review your items before checkout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {cartItems.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <ShoppingCart
                size={30}
                className="text-slate-400"
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-900">
              Your cart is empty
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Add some products to your cart to see
              them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                {/* Cart Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Shopping Cart
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {cartItems.length}{" "}
                      {cartItems.length === 1
                        ? "item"
                        : "items"}{" "}
                      in your cart
                    </p>
                  </div>

                  <button
                    type="button"
                    className="text-sm font-medium text-slate-500 transition hover:text-red-600"
                  >
                    Clear cart
                  </button>
                </div>

                {/* Items */}
                <div className="divide-y divide-slate-200">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-6"
                    >
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

                            {/* Remove */}
                            <button
                              type="button"
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          <div className="mt-5 flex items-center justify-between">
                            {/* Quantity */}
                            <div className="flex items-center rounded-xl border border-slate-200">
                              <button
                                type="button"
                                className="flex h-9 w-9 items-center justify-center text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={16} />
                              </button>

                              <span className="flex h-9 min-w-10 items-center justify-center border-x border-slate-200 px-3 text-sm font-semibold text-slate-900">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                className="flex h-9 w-9 items-center justify-center text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                                aria-label="Increase quantity"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            {/* Item Total */}
                            <p className="text-lg font-bold text-slate-900">
                              $
                              {(
                                Number(item.price) *
                                item.quantity
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Subtotal
                    </span>

                    <span className="font-medium text-slate-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Shipping
                    </span>

                    <span className="font-medium text-emerald-600">
                      Free
                    </span>
                  </div>
                </div>

                <div className="my-6 border-t border-slate-200" />

                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-slate-900">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-slate-900">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 font-medium text-white transition hover:bg-slate-800"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                  You can review your order before
                  completing your purchase.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyCart;