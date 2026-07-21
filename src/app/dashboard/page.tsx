"use client";

import { useEffect, useMemo, useState } from "react";
import { ShoppingCart, Bot, Search } from "lucide-react";

import ProductCard from "@/components/dashboard/ProductCard";

import {
  getProducts,
  Product,
} from "@/api/products";

const Dashboard = () => {
  const [search, setSearch] = useState("");

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const data = await getProducts();

        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unexpected error."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [products, search]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-semibold text-slate-700">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-semibold text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= Navbar ================= */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Logo */}

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              MarketHub
            </h1>

            <p className="text-sm text-slate-500">
              Smart Marketplace
            </p>
          </div>

          {/* Search */}

          <div className="relative mx-10 hidden w-full max-w-xl lg:flex">

            <Search
              className="absolute left-4 top-3.5 text-slate-400"
              size={20}
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-slate-900"
            />

          </div>

          {/* Right Side */}

          <div className="flex items-center gap-5">

            <button className="relative rounded-2xl p-3 transition hover:bg-slate-100">

              <ShoppingCart size={24} />

              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-xs text-white">
                0
              </span>

            </button>

            <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800">

              <Bot size={20} />

              AI Assistant

            </button>

          </div>

        </div>
      </header>

      {/* ================= Hero ================= */}

      <section className="mx-auto max-w-7xl px-6 pt-10">

        <div className="rounded-3xl bg-slate-900 p-10 text-white">

          <h2 className="text-4xl font-bold">
            Welcome Back 👋
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Discover amazing products, manage your shopping cart, and get
            personalized recommendations powered by AI.
          </p>

          <button className="mt-8 rounded-2xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-200">
            Browse Products
          </button>

        </div>

      </section>

      {/* ================= Categories ================= */}

      <section className="mx-auto mt-10 max-w-7xl px-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Categories
        </h2>

        <div className="mt-6 flex flex-wrap gap-4">

          {[
            "All",
            "Electronics",
            "Gaming",
            "Books",
            "Furniture",
            "Fashion",
            "Accessories",
          ].map((category) => (

            <button
              key={category}
              className="rounded-full border border-slate-300 bg-white px-6 py-3 transition hover:bg-slate-900 hover:text-white"
            >
              {category}
            </button>

          ))}

        </div>

      </section>

      {/* ================= Products ================= */}

      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="text-3xl font-bold text-slate-900">
              Featured Products
            </h2>

            <p className="mt-1 text-slate-500">
              {filteredProducts.length} Products Found
            </p>

          </div>

          <button className="text-slate-500 hover:text-slate-900">
            View All
          </button>

        </div>

        <div className="mt-10">

          {filteredProducts.length === 0 ? (

            <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-sm">

              <h3 className="text-2xl font-semibold text-slate-900">
                No products found
              </h3>

              <p className="mt-3 text-slate-500">
                Try searching with another keyword.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {filteredProducts.map((product) => (

                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  stock={product.stock}
                />

              ))}

            </div>

          )}

        </div>

      </section>

    </div>
  );
};

export default Dashboard;