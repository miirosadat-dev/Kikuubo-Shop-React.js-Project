import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import { addToCart } from "../redux/CartSlice";
import { formatCurrency } from "../utils/formatCurrency";
import { getDiscountPercent } from "../utils/product";
import Rating from "../components/Rating";
import ProductSection from "../components/ProductSection";
import { usePageTitle } from "../hooks/usePageTitle";

const LOW_STOCK_LIMIT = 5;

const categoryLink = (name) => `/shop?category=${encodeURIComponent(name)}`;

// The page for one product. It gets a fresh copy (see "key" below) every time the
// product changes, so the quantity always starts again at 1.
const ProductView = ({ product, related }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const inCart = useSelector(
        (state) =>
            state.cart.products.find((item) => item.id === product.id)?.quantity ?? 0,
    );

    const outOfStock = product.stock <= 0;
    const lowStock = !outOfStock && product.stock <= LOW_STOCK_LIMIT;
    const discount = getDiscountPercent(product);

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity }));
        toast.success(`${quantity} × ${product.name} added to cart`);
        setQuantity(1);
    };

    const details = [
        ["Brand", product.brand],
        ["Category", product.category],
        ["Type", product.subcategory],
        [
            "Availability",
            outOfStock ? "Out of stock" : `${product.stock} in stock`,
        ],
    ];

    return (
        <main className="container-page py-8 md:py-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
                <ol className="flex flex-wrap items-center gap-2">
                    <li>
                        <Link to="/" className="hover:text-brand-600">
                            Home
                        </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li>
                        <Link
                            to={categoryLink(product.category)}
                            className="hover:text-brand-600"
                        >
                            {product.category}
                        </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li aria-current="page" className="text-gray-900">
                        {product.name}
                    </li>
                </ol>
            </nav>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                {/* Picture */}
                <div className="relative flex items-center justify-center rounded-2xl bg-gray-50 p-6 md:p-10">
                    <img
                        src={product.image}
                        alt={product.name}
                        className={`max-h-96 w-full object-contain ${outOfStock ? "opacity-50" : ""
                            }`}
                    />
                    {outOfStock ? (
                        <span className="badge absolute left-4 top-4 bg-gray-900 text-white">
                            Out of stock
                        </span>
                    ) : (
                        discount > 0 && (
                            <span className="badge absolute left-4 top-4 bg-brand-600 text-white">
                                -{discount}%
                            </span>
                        )
                    )}
                </div>

                {/* Information */}
                <div>
                    {product.brand && (
                        <p className="text-sm font-medium text-gray-500">{product.brand}</p>
                    )}
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
                        {product.name}
                    </h1>

                    <div className="mt-3">
                        <Rating
                            value={product.rating}
                            reviews={product.reviews}
                            size="text-base"
                        />
                    </div>

                    <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-3xl font-bold text-gray-900">
                            {formatCurrency(product.price)}
                        </span>
                        {discount > 0 && (
                            <>
                                <span className="text-lg text-gray-400 line-through">
                                    {formatCurrency(product.oldPrice)}
                                </span>
                                <span className="badge bg-brand-50 text-brand-700">
                                    Save {formatCurrency(product.oldPrice - product.price)}
                                </span>
                            </>
                        )}
                    </div>

                    <p
                        className={`mt-3 text-sm font-semibold ${outOfStock
                            ? "text-gray-500"
                            : lowStock
                                ? "text-accent-600"
                                : "text-green-700"
                            }`}
                    >
                        {outOfStock
                            ? "Out of stock"
                            : lowStock
                                ? `Only ${product.stock} left in stock`
                                : "In stock"}
                    </p>

                    <p className="mt-5 leading-7 text-gray-700">{product.description}</p>

                    {/* Quantity and add to cart */}
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center overflow-hidden rounded-xl border border-gray-300">
                            <button
                                type="button"
                                aria-label="Decrease quantity"
                                disabled={outOfStock || quantity <= 1}
                                onClick={() => setQuantity((q) => q - 1)}
                                className="flex h-11 w-11 items-center justify-center text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <FaMinus size={12} />
                            </button>
                            <span className="w-12 text-center font-semibold" aria-live="polite">
                                {quantity}
                            </span>
                            <button
                                type="button"
                                aria-label="Increase quantity"
                                disabled={outOfStock || quantity >= product.stock}
                                onClick={() => setQuantity((q) => q + 1)}
                                className="flex h-11 w-11 items-center justify-center text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <FaPlus size={12} />
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={handleAddToCart}
                            disabled={outOfStock}
                            className="btn btn-primary flex-1 py-3 sm:flex-none sm:px-10"
                        >
                            {outOfStock ? "Out of stock" : "Add to cart"}
                        </button>
                    </div>

                    {inCart > 0 && (
                        <p className="mt-3 text-sm text-gray-500">
                            You already have {inCart} in your cart.{" "}
                            <Link
                                to="/cart"
                                className="font-semibold text-brand-600 hover:underline"
                            >
                                View cart
                            </Link>
                        </p>
                    )}

                    <p className="mt-6 text-sm text-gray-500">
                        Pay with MTN MoMo, Airtel Money or cash on delivery.
                    </p>

                    {/* Details */}
                    <dl className="mt-8 divide-y divide-gray-100 rounded-2xl border border-gray-200 text-sm">
                        {details.map(([label, value]) => (
                            <div key={label} className="flex justify-between gap-4 px-4 py-3">
                                <dt className="text-gray-500">{label}</dt>
                                <dd className="font-medium text-gray-900">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            <ProductSection
                title="You may also like"
                products={related}
                viewAllTo={categoryLink(product.category)}
                viewAllLabel={`See all ${product.category}`}
            />
        </main>
    );
};

const ProductDetailsSkeleton = () => (
    <main
        className="container-page animate-pulse py-10"
        role="status"
        aria-label="Loading product"
    >
        <div className="mb-6 h-4 w-64 rounded bg-gray-200" />
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="h-96 rounded-2xl bg-gray-100" />
            <div className="space-y-4">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-8 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-40 rounded bg-gray-200" />
                <div className="h-10 w-1/2 rounded bg-gray-200" />
                <div className="h-24 rounded bg-gray-200" />
                <div className="h-12 w-2/3 rounded-xl bg-gray-200" />
            </div>
        </div>
    </main>
);

const ProductDetails = () => {
    const { id } = useParams();
    const { products, loading } = useSelector((state) => state.product);

    // The address gives us text ("7"), our products use numbers (7)
    const product = products.find((item) => item.id === Number(id));
    usePageTitle(loading ? null : product ? product.name : "Product not found");

    // Same category, same type first, then best rated
    const related = useMemo(() => {
        if (!product) return [];
        return products
            .filter(
                (item) => item.category === product.category && item.id !== product.id,
            )
            .sort(
                (a, b) =>
                    Number(b.subcategory === product.subcategory) -
                    Number(a.subcategory === product.subcategory) ||
                    b.rating - a.rating,
            )
            .slice(0, 4);
    }, [products, product]);

    if (loading) return <ProductDetailsSkeleton />;

    if (!product) {
        return (
            <main className="container-page py-16">
                <div className="card px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Product not found
                    </h1>
                    <p className="mt-2 text-gray-500">
                        This product may have been removed, or the link is wrong.
                    </p>
                    <Link to="/shop" className="btn btn-primary mt-6">
                        Browse all products
                    </Link>
                </div>
            </main>
        );
    }

    return <ProductView key={product.id} product={product} related={related} />;
};

export default ProductDetails;