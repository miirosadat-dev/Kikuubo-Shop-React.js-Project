import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/ProductCardSkeleton";
import ShopFilters from "../components/ShopFilters";
import Pagination from "../components/Pagination";
import { matchesSearch, productSorters } from "../utils/product";

const PAGE_SIZE = 12;

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "rating", label: "Top rated" },
  { value: "discount", label: "Biggest discount" },
];

// One page for browsing AND searching. Everything is stored in the address:
//   /shop?q=samsung&category=Electronics&min=100000&max=900000&sort=price-asc&page=2
// so links can be shared and the browser's Back button works.
const Shop = () => {
  const { products, loading } = useSelector((state) => state.product);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const min = searchParams.get("min") ?? "";
  const max = searchParams.get("max") ?? "";
  const sortParam = searchParams.get("sort");
  const sort = productSorters[sortParam] ? sortParam : "featured";
  const page = Math.max(1, parseInt(searchParams.get("page"), 10) || 1);

  const minPrice = min !== "" && !Number.isNaN(Number(min)) ? Number(min) : null;
  const maxPrice = max !== "" && !Number.isNaN(Number(max)) ? Number(max) : null;

  // Change some address parameters. Empty values are removed.
  // Going back to page 1 is automatic unless we are changing the page itself.
  const updateParams = (changes, keepPage = false) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (value === "" || value == null) next.delete(key);
      else next.set(key, value);
    });
    if (!keepPage) next.delete("page");
    setSearchParams(next);
  };

  // 1) products that match the search words
  const searchMatches = useMemo(
    () => products.filter((product) => matchesSearch(product, q)),
    [products, q],
  );

  // Category list with counts (based on the search only, so counts stay useful)
  const categoryCounts = useMemo(() => {
    const counts = new Map();
    searchMatches.forEach((product) => {
      counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
    });
    return [...counts];
  }, [searchMatches]);

  // 2) apply category and price filters, then 3) sort
  const results = useMemo(() => {
    const filtered = searchMatches.filter(
      (product) =>
        (!category || product.category === category) &&
        (minPrice === null || product.price >= minPrice) &&
        (maxPrice === null || product.price <= maxPrice),
    );
    const sorter = productSorters[sort];
    return sorter ? filtered.sort(sorter) : filtered;
  }, [searchMatches, category, minPrice, maxPrice, sort]);

  // 4) pagination
  const total = results.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = results.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const activeFilterCount = [category, min, max].filter(Boolean).length;
  const hasActiveFilters = activeFilterCount > 0;
  const title = q ? `Results for "${q}"` : category || "All products";

  const handleCategory = (name) => updateParams({ category: name });

  const handlePriceApply = (minValue, maxValue) => {
    let low = minValue;
    let high = maxValue;
    // If someone types Min 900000 and Max 100000, swap them instead of showing nothing
    if (low !== "" && high !== "" && Number(low) > Number(high)) {
      [low, high] = [high, low];
    }
    updateParams({ min: low, max: high });
  };

  const handleSort = (e) =>
    updateParams({ sort: e.target.value === "featured" ? "" : e.target.value });

  const clearFilters = () => updateParams({ category: "", min: "", max: "" });

  const handlePageChange = (newPage) => {
    updateParams({ page: newPage === 1 ? "" : String(newPage) }, true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="container-page py-8 md:py-10">
      {/* Title, count, sort */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="section-title">{title}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {loading
              ? "Loading products..."
              : `${total} ${total === 1 ? "product" : "products"}`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="btn btn-outline btn-sm lg:hidden"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
          >
            <FaFilter />
            Filters{hasActiveFilters ? ` (${activeFilterCount})` : ""}
          </button>

          <label htmlFor="sort" className="sr-only">
            Sort by
          </label>
          <select
            id="sort"
            value={sort}
            onChange={handleSort}
            className="input w-auto py-2 text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Filters: always visible on large screens, a toggle panel on smaller ones */}
        <aside
          className={`${filtersOpen ? "block" : "hidden"
            } lg:sticky lg:top-24 lg:block lg:w-64 lg:shrink-0`}
        >
          <ShopFilters
            categories={categoryCounts}
            totalCount={searchMatches.length}
            category={category}
            min={min}
            max={max}
            hasActiveFilters={hasActiveFilters}
            onCategoryChange={handleCategory}
            onPriceApply={handlePriceApply}
            onClear={clearFilters}
          />
        </aside>

        {/* Results */}
        <div className="min-w-0 flex-1">
          {loading ? (
            <ProductGridSkeleton />
          ) : total > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
                {pageItems.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="card px-4 py-16 text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {q ? `No results for "${q}"` : "No products match your filters"}
              </h2>
              <p className="mt-2 text-gray-500">
                {q
                  ? "Check the spelling or try a more general word, like a brand or category."
                  : "Try a different category or a wider price range."}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="btn btn-outline"
                  >
                    Clear filters
                  </button>
                )}
                <Link to="/shop" className="btn btn-primary">
                  Browse all products
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Shop;