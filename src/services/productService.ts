import type { Category, Product } from "@/types/product";

const PRODUCTS_URL =
  process.env.NEXT_PUBLIC_PRODUCTS_URL ||
  "http://127.0.0.1:8000/api/products/";

// =========================
// Get Categories
// =========================

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(
    `${PRODUCTS_URL.replace(/\/$/, "")}/categories/`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

// =========================
// Get Products
// =========================

export const getProducts = async (
  categoryId?: number | null,
  searchQuery?: string
): Promise<Product[]> => {
  const params = new URLSearchParams();

  // Filter by category
  if (categoryId !== null && categoryId !== undefined) {
    params.append("category", categoryId.toString());
  }

  // Search by product name
  if (searchQuery && searchQuery.trim() !== "") {
    params.append("search", searchQuery.trim());
  }

  const queryString = params.toString();

  const url = queryString
    ? `${PRODUCTS_URL}?${queryString}`
    : PRODUCTS_URL;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};