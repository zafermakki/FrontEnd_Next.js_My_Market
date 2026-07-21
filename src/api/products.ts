const PRODUCTS_URL =
  process.env.NEXT_PUBLIC_PRODUCTS_URL ||
  "http://127.0.0.1:8000/api/products/";

export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  stock: number;
};

export const getProducts = async (): Promise<Product[]> => {
  const accessToken = localStorage.getItem("access_token");

  const response = await fetch(PRODUCTS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }

  return await response.json();
};