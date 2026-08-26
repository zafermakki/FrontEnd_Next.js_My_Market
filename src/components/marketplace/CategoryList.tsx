import type { Category } from "@/types/product";

type CategoryListProps = {
  categories: Category[];
  selectedCategory: number | null;
  loading: boolean;
  error: string;
  onSelectCategory: (categoryId: number | null) => void;
};

const CategoryList = ({
  categories,
  selectedCategory,
  loading,
  error,
  onSelectCategory,
}: CategoryListProps) => {
  return (
    <div className="mb-10">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        Categories
      </h3>

      {loading && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-11 w-28 shrink-0 animate-pulse rounded-xl bg-slate-200"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      {!loading && !error && categories.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          <button
            type="button"
            onClick={() => onSelectCategory(null)}
            className={`shrink-0 rounded-xl border px-6 py-3 text-sm font-medium shadow-sm transition ${
              selectedCategory === null
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
            }`}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              className={`shrink-0 rounded-xl border px-6 py-3 text-sm font-medium shadow-sm transition ${
                selectedCategory === category.id
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {!loading && !error && categories.length === 0 && (
        <p className="text-sm text-slate-500">
          No categories available.
        </p>
      )}
    </div>
  );
};

export default CategoryList;