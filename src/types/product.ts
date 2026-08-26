export type Category = {
  id: number;
  name: string;
  description: string;
};

export type ProductImage = {
  id: number;
  image: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  notes: string;
  phone_number: string;
  governorate: string;
  category: Category;
  images: ProductImage[];
  created_at: string;
  updated_at: string;
};