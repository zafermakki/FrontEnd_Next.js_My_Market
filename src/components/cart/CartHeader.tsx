
import { ShoppingCart } from "lucide-react";

export default function CartHeader() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <ShoppingCart size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              My Cart
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Review your items before checkout.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}