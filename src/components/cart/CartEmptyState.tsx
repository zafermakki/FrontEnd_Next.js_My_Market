
import { ShoppingCart } from "lucide-react";

export default function CartEmptyState() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
        <ShoppingCart size={30} className="text-slate-400" />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-slate-900">
        Your cart is empty
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Add some products to your cart to see them here.
      </p>
    </div>
  );
}