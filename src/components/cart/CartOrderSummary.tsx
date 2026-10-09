
import { ArrowRight } from "lucide-react";

type CartOrderSummaryProps = {
  subtotal: number;
  shipping: number;
  total: number;
};

export default function CartOrderSummary({
  subtotal,
  shipping,
  total,
}: CartOrderSummaryProps) {
  return (
    <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Subtotal</span>

          <span className="font-medium text-slate-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Shipping</span>

          <span
            className={
              shipping === 0
                ? "font-medium text-emerald-600"
                : "font-medium text-slate-900"
            }
          >
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
      </div>

      <div className="my-6 border-t border-slate-200" />

      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-slate-900">
          Total
        </span>

        <span className="text-2xl font-bold text-slate-900">
          ${total.toFixed(2)}
        </span>
      </div>

      <button
        type="button"
        disabled
        title="Checkout is not implemented yet"
        className="mt-6 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 font-medium text-white opacity-60"
      >
        Proceed to Checkout
        <ArrowRight size={18} />
      </button>

      <p className="mt-4 text-center text-xs leading-5 text-slate-400">
        You can review your order before completing your purchase.
      </p>
    </div>
  );
}