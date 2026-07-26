"use client";

import { Search, ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "PlayStation 5",
    description: "Next-generation gaming console",
    price: 499,
    image: "https://placehold.co/600x400",
  },
  {
    id: 2,
    name: "DualSense Wireless Controller",
    description: "Immersive gaming experience",
    price: 69,
    image: "https://placehold.co/600x400",
  },
  {
    id: 3,
    name: "Gaming Headset",
    description: "High-quality sound for gaming",
    price: 89,
    image: "https://placehold.co/600x400",
  },
  {
    id: 4,
    name: "PlayStation 5 Controller",
    description: "Wireless DualSense controller",
    price: 69,
    image: "https://placehold.co/600x400",
  },
];

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              MarketHub
            </h1>
            <p className="text-xs text-slate-500">
              Find what you need
            </p>
          </div>

          {/* Search */}
          <div className="hidden w-full max-w-md md:block">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Cart */}
            <button className="relative rounded-2xl border border-slate-200 p-3 text-slate-700 transition hover:bg-slate-100">
              <ShoppingCart size={21} />

              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-xs text-white">
                0
              </span>
            </button>



          </div>
        </div>

        {/* Mobile Search */}
        <div className="px-6 pb-4 md:hidden">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-900 outline-none focus:border-slate-900"
            />
          </div>
        </div>
      </header>

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

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* Image */}
              <div className="h-56 overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="p-5">

                <h3 className="text-lg font-semibold text-slate-900">
                  {product.name}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {product.description}
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <span className="text-xl font-bold text-slate-900">
                    ${product.price}
                  </span>

                  <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                    Add to cart
                  </button>

                </div>
              </div>
            </div>
          ))}

        </div>
      </section>
    </main>
  );
};

export default Dashboard;