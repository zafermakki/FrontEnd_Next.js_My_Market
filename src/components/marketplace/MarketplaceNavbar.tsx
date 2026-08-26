import { Search, ShoppingCart } from "lucide-react";

const MarketplaceNavbar = () => {
  return (
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

        {/* Cart */}
        <button
          type="button"
          className="relative rounded-2xl border border-slate-200 p-3 text-slate-700 transition hover:bg-slate-100"
        >
          <ShoppingCart size={21} />

          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-xs text-white">
            0
          </span>
        </button>
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
  );
};

export default MarketplaceNavbar;