import type { Category, Product } from "@/types/product";

const PRODUCTS_URL =
  process.env.NEXT_PUBLIC_PRODUCTS_URL ||
  "http://127.0.0.1:8000/api/products/";

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(
    `${PRODUCTS_URL.replace(/\/$/, "")}/categories/`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

export const getProducts = async (
  categoryId?: number | null
): Promise<Product[]> => {
  let url = PRODUCTS_URL;

  if (categoryId !== null && categoryId !== undefined) {
    url = `${PRODUCTS_URL}?category=${categoryId}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};