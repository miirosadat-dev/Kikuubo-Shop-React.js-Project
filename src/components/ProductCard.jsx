import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../redux/CartSlice";
import { formatCurrency } from "../utils/formatCurrency";
import { getDiscountPercent } from "../utils/product";
import Rating from "./Rating";

const LOW_STOCK_LIMIT = 5;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const outOfStock = product.stock <= 0;
  const lowStock = !outOfStock && product.stock <= LOW_STOCK_LIMIT;
  const discount = getDiscountPercent(product);
  const detailsPath = `/product/${product.id}`;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="card flex h-full flex-col overflow-hidden transition-shadow duration-200 hover:shadow-md">
      {/* Picture (the name below is the main link, so this one is skipped by keyboards) */}
      <Link
        to={detailsPath}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block bg-gray-50 p-4"
      >
        <img
          src={product.image}
          alt={product.name}
          className={`h-40 w-full object-contain sm:h-44 ${outOfStock ? "opacity-50" : ""
            }`}
        />

        {outOfStock ? (
          <span className="badge absolute left-3 top-3 bg-gray-900 text-white">
            Out of stock
          </span>
        ) : (
          discount > 0 && (
            <span className="badge absolute left-3 top-3 bg-brand-600 text-white">
              -{discount}%
            </span>
          )
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {product.brand && (
          <p className="text-xs font-medium text-gray-500">{product.brand}</p>
        )}

        <h3 className="mt-0.5 line-clamp-2 min-h-12 font-semibold text-gray-900">
          <Link to={detailsPath} className="hover:text-brand-600">
            {product.name}
          </Link>
        </h3>

        <div className="mt-1">
          <Rating value={product.rating} reviews={product.reviews} />
        </div>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
          <span className="font-bold text-gray-900">
            {formatCurrency(product.price)}
          </span>
          {discount > 0 && (
            <span className="text-xs text-gray-400 line-through">
              {formatCurrency(product.oldPrice)}
            </span>
          )}
        </div>

        <p className="mt-1 h-4 text-xs font-medium text-accent-600">
          {lowStock ? `Only ${product.stock} left` : ""}
        </p>

        {outOfStock ? (
          <button
            type="button"
            disabled
            className="btn btn-sm btn-block mt-3 bg-gray-100 text-gray-500"
          >
            Out of stock
          </button>
        ) : (
          <button
            type="button"
            onClick={handleAddToCart}
            className="btn btn-primary btn-sm btn-block mt-3"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;