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