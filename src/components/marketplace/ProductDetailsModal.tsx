import { X } from "lucide-react";
import type { Product } from "@/types/product";

type ProductDetailsModalProps = {
  product: Product | null;
  selectedImage: number;
  onSelectImage: (index: number) => void;
  onClose: () => void;
};

const ProductDetailsModal = ({
  product,
  selectedImage,
  onSelectImage,
  onClose,
}: ProductDetailsModalProps) => {
  if (!product) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-md transition hover:bg-slate-100"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Images */}
          <div className="p-6 lg:p-8">
            <div className="h-[350px] overflow-hidden rounded-2xl bg-slate-100 sm:h-[450px]">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[selectedImage]?.image}
                  alt={product.name}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">
                  No image available
                </div>
              )}
            </div>

            {product.images && product.images.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.slice(0, 4).map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => onSelectImage(index)}
                    className={`h-20 overflow-hidden rounded-xl border-2 bg-slate-100 transition sm:h-24 ${
                      selectedImage === index
                        ? "border-slate-900"
                        : "border-transparent hover:border-slate-300"
                    }`}
                  >
                    <img
                      src={image.image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col p-6 lg:p-8">
            <div>
              <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {product.category.name}
              </span>
            </div>

            <h2 className="mt-4 pr-10 text-3xl font-bold text-slate-900">
              {product.name}
            </h2>

            <p className="mt-4 text-3xl font-bold text-slate-900">
              ${product.price}
            </p>

            {/* Description */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Description
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Notes */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Notes
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                {product.notes || "No notes available."}
              </p>
            </div>

            {/* Information */}
            <div className="mt-8 rounded-2xl bg-slate-50 p-5">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
                Product Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                  <span className="text-sm text-slate-500">
                    Category
                  </span>

                  <span className="text-sm font-medium text-slate-900">
                    {product.category.name}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                  <span className="text-sm text-slate-500">
                    Governorate
                  </span>

                  <span className="text-sm font-medium capitalize text-slate-900">
                    {product.governorate}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-500">
                    Phone
                  </span>

                  <span className="text-sm font-medium text-slate-900">
                    {product.phone_number}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 text-xs text-slate-400">
              Added on{" "}
              {new Date(product.created_at).toLocaleDateString()}
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                className="flex-1 rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
              >
                Add to cart
              </button>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;