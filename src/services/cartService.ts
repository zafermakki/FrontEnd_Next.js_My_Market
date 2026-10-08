import type { Product } from "@/types/product";

const CART_URL =
  process.env.NEXT_PUBLIC_CART_URL ||
  "http://127.0.0.1:8000/api/cart";

export type CartItemResponse = {
  id: number;
  product: Product;
  quantity: number;
  subtotal: string;
  created_at: string;
  updated_at: string;
};

export type CartResponse = {
  items: CartItemResponse[];
};

export const getCart = async (): Promise<CartResponse> => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    throw new Error(
      "You must be logged in to view your cart."
    );
  }

  const response = await fetch(`${CART_URL}/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
        data.error ||
        "Failed to fetch cart."
    );
  }

  return data;
};

export const addProductToCart = async (
  productId: number,
  quantity: number = 1
): Promise<CartItemResponse> => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    throw new Error(
      "You must be logged in to add products to cart."
    );
  }

  const response = await fetch(`${CART_URL}/items/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      product_id: productId,
      quantity,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
        data.error ||
        "Failed to add product to cart."
    );
  }

  return data;
};

export const updateCartItemQuantity = async (
  itemId: number,
  quantity: number
  ): Promise<CartItemResponse> => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
  throw new Error("You must be logged in to update your cart.");
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
  throw new Error("Quantity must be at least 1.");
  }

  const response = await fetch(
  `${CART_URL}/items/update/${itemId}/`,
  {
  method: "PATCH",
  headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${accessToken}`,
  },
  body: JSON.stringify({ quantity }),
  }
  );

  const data = await response.json();

  if (!response.ok) {
  throw new Error(
  data.detail ||
  data.error ||
  "Failed to update cart item quantity."
  );
  }

  return data;
};

export const deleteCartItem = async (
  itemId: number
  ): Promise<void> => {
      const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
      throw new Error("You must be logged in to remove items from your cart.");
  }

      const response = await fetch(
      `${CART_URL}/items/delete/${itemId}/`,
    {
      method: "DELETE",
      headers: {
      Authorization: `Bearer ${accessToken}`,
      },
    }
  );

    if (!response.ok) {
    let message = "Failed to remove item from cart.";


  try {
    const data = await response.json();
    message = data.detail || data.error || message;
  } catch {
    // DELETE responses may have an empty body.
  }

    throw new Error(message);
  }
};

