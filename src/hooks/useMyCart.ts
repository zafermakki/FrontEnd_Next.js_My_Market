
"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCart,
  updateCartItemQuantity,
  deleteCartItem,
} from "@/services/cartService";

import {
  setCart,
  updateQuantity,
  removeFromCart,
} from "@/store/features/cart/cartSlice";

import type { RootState } from "@/store/store";

export function useMyCart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [updatingItems, setUpdatingItems] = useState<number[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchCart = async () => {
      try {
        setLoading(true);
        setLoadError("");

        const data = await getCart();

        const formattedItems = data.items.map((item) => ({
          id: item.id,
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          image:
            item.product.images?.length > 0
              ? item.product.images[0].image
              : null,
          quantity: item.quantity,
        }));

        if (isMounted) {
          dispatch(setCart(formattedItems));
        }
      } catch (error) {
        console.error("Error fetching cart:", error);

        if (isMounted) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Failed to load cart."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCart();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const handleQuantityChange = useCallback(
    async (
      itemId: number,
      productId: number,
      currentQuantity: number,
      change: number
    ) => {
      const newQuantity = currentQuantity + change;

      if (newQuantity < 1 || updatingItems.includes(itemId)) {
        return;
      }

      setActionError("");
      setUpdatingItems((prev) => [...prev, itemId]);

      try {
        const updatedItem = await updateCartItemQuantity(
          itemId,
          newQuantity
        );

        dispatch(
          updateQuantity({
            productId,
            quantity: updatedItem.quantity,
          })
        );
      } catch (error) {
        console.error("Failed to update quantity:", error);

        setActionError(
          error instanceof Error
            ? error.message
            : "Failed to update quantity."
        );
      } finally {
        setUpdatingItems((prev) =>
          prev.filter((id) => id !== itemId)
        );
      }
    },
    [dispatch, updatingItems]
  );

  const handleRemoveItem = useCallback(
    async (itemId: number) => {
      if (updatingItems.includes(itemId)) {
        return;
      }

      setActionError("");
      setUpdatingItems((prev) => [...prev, itemId]);

      try {
        await deleteCartItem(itemId);

        // Update Redux after the API confirms deletion.
        dispatch(removeFromCart(itemId));
      } catch (error) {
        console.error("Failed to remove cart item:", error);

        setActionError(
          error instanceof Error
            ? error.message
            : "Failed to remove item from cart."
        );
      } finally {
        setUpdatingItems((prev) =>
          prev.filter((id) => id !== itemId)
        );
      }
    },
    [dispatch, updatingItems]
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  return {
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
  };
}