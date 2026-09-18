"use client";

import { useEffect, useState } from "react";

import MarketplaceNavbar from "@/components/marketplace/MarketplaceNavbar";
import CategoryList from "@/components/marketplace/CategoryList";
import ProductGrid from "@/components/marketplace/ProductGrid";
import ProductDetailsModal from "@/components/marketplace/ProductDetailsModal";

import { getCategories, getProducts } from "@/services/productService";

import type { Category, Product } from "@/types/product";

const Dashboard = () => {
  // =========================
  // Categories
  // =========================

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");

  // =========================
  // Products
  // =========================

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState("");

  // =========================
  // Selected Category
  // =========================

  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    null
  );

  // =========================
  // Search
  // =========================

  const [searchQuery, setSearchQuery] = useState("");

  // =========================
  // Selected Product
  // =========================

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    null
  );

  // =========================
  // Selected Image
  // =========================

  const [selectedImage, setSelectedImage] = useState(0);

  // =========================
  // Fetch Categories
  // =========================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        setCategoriesError("");

        const data = await getCategories();

        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoriesError("Unable to load categories.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // =========================
  // Fetch Products
  // =========================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        setProductsError("");

        const data = await getProducts(
          selectedCategory,
          searchQuery
        );

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductsError("Unable to load products.");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery]);

  // =========================
  // Product Modal
  // =========================

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImage(0);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setSelectedImage(0);
  };

  // =========================
  // Search
  // =========================

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // =========================
  // Category Selection
  // =========================

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navbar */}

      <MarketplaceNavbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* Main Content */}

      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* Heading */}

        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
            Explore our collection
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Featured Products
          </h2>

          <p className="mt-2 text-slate-500">
            Discover the latest products available in our store.
          </p>
        </div>

        {/* Categories */}

        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          loading={loadingCategories}
          error={categoriesError}
          onSelectCategory={handleCategorySelect}
        />

        {/* Products */}

        <ProductGrid
          products={products}
          loading={loadingProducts}
          error={productsError}
          onProductClick={handleProductClick}
        />
      </section>

      {/* Product Details Modal */}

      <ProductDetailsModal
        product={selectedProduct}
        selectedImage={selectedImage}
        onSelectImage={setSelectedImage}
        onClose={handleCloseModal}
      />
    </main>
  );
};

export default Dashboard;