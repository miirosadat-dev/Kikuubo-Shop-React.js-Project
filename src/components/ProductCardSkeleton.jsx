// Grey placeholder cards shown while products are loading.
export const ProductCardSkeleton = () => (
    <div className="card animate-pulse overflow-hidden" aria-hidden="true">
        <div className="h-48 bg-gray-100" />
        <div className="space-y-3 p-4">
            <div className="h-3 w-1/3 rounded bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-200" />
            <div className="h-5 w-2/5 rounded bg-gray-200" />
            <div className="h-9 rounded-xl bg-gray-200" />
        </div>
    </div>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
    <div
        className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4"
        role="status"
        aria-label="Loading products"
    >
        {Array.from({ length: count }, (_, i) => (
            <ProductCardSkeleton key={i} />
        ))}
    </div>
);

export default ProductCardSkeleton;