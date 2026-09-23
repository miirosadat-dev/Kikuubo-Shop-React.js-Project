import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

// A titled row of product cards with a "see all" link.
// Reusable anywhere: Home now, Product Details (related products) later.
const ProductSection = ({
    title,
    products,
    viewAllTo = "/shop",
    viewAllLabel = "View all",
}) => {
    if (!products || products.length === 0) return null;

    return (
        <section className="py-8">
            <div className="mb-5 flex items-end justify-between gap-4">
                <h2 className="section-title">{title}</h2>
                <Link
                    to={viewAllTo}
                    className="whitespace-nowrap text-sm font-semibold text-brand-600 hover:underline"
                >
                    {viewAllLabel}
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
                {products.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </section>
    );
};

export default ProductSection;