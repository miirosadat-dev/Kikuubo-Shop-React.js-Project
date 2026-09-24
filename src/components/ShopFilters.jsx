import { useState } from "react";

// Min / Max boxes with an Apply button. It keeps its own typing state, and the
// parent gives it a new "key" whenever the address changes so it resets itself.
const PriceFilter = ({ min, max, onApply }) => {
    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);

    const handleSubmit = (e) => {
        e.preventDefault();
        onApply(minValue.trim(), maxValue.trim());
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2">
                <label htmlFor="price-min" className="sr-only">
                    Minimum price
                </label>
                <input
                    id="price-min"
                    type="number"
                    min="0"
                    inputMode="numeric"
                    placeholder="Min"
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value)}
                    className="input px-3 py-2 text-sm"
                />
                <span className="text-gray-400">-</span>
                <label htmlFor="price-max" className="sr-only">
                    Maximum price
                </label>
                <input
                    id="price-max"
                    type="number"
                    min="0"
                    inputMode="numeric"
                    placeholder="Max"
                    value={maxValue}
                    onChange={(e) => setMaxValue(e.target.value)}
                    className="input px-3 py-2 text-sm"
                />
            </div>
            <button type="submit" className="btn btn-dark btn-sm btn-block mt-3">
                Apply
            </button>
        </form>
    );
};

const CategoryButton = ({ active, label, count, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${active
            ? "bg-brand-50 font-semibold text-brand-600"
            : "text-gray-700 hover:bg-gray-100"
            }`}
    >
        <span>{label}</span>
        <span className="text-xs text-gray-400">{count}</span>
    </button>
);

const ShopFilters = ({
    categories, // [["Electronics", 10], ["Fashion", 8], ...]
    totalCount,
    category,
    min,
    max,
    hasActiveFilters,
    onCategoryChange,
    onPriceApply,
    onClear,
}) => (
    <div className="card divide-y divide-gray-100">
        <div className="p-4">
            <h2 className="mb-3 text-sm font-semibold text-gray-900">Category</h2>
            <ul className="space-y-1">
                <li>
                    <CategoryButton
                        active={!category}
                        label="All categories"
                        count={totalCount}
                        onClick={() => onCategoryChange("")}
                    />
                </li>
                {categories.map(([name, count]) => (
                    <li key={name}>
                        <CategoryButton
                            active={category === name}
                            label={name}
                            count={count}
                            onClick={() => onCategoryChange(name)}
                        />
                    </li>
                ))}
            </ul>
        </div>

        <div className="p-4">
            <h2 className="mb-3 text-sm font-semibold text-gray-900">Price (UGX)</h2>
            <PriceFilter
                key={`${min}-${max}`}
                min={min}
                max={max}
                onApply={onPriceApply}
            />
        </div>

        {hasActiveFilters && (
            <div className="p-4">
                <button
                    type="button"
                    onClick={onClear}
                    className="btn btn-outline btn-sm btn-block"
                >
                    Clear filters
                </button>
            </div>
        )}
    </div>
);

export default ShopFilters;