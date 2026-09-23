import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

// Step 3 version: shows all products, or one category when the address
// contains ?category=Electronics. Step 4 adds sorting, price filter and paging.
const Shop = () => {
  const products = useSelector((state) => state.product.products);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const visibleProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  const count = visibleProducts.length;

  return (
    <main className="container-page py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="section-title">{category ?? "All products"}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {count} {count === 1 ? "product" : "products"}
          </p>
        </div>

        {category && (
          <Link to="/shop" className="btn btn-outline btn-sm">
            Show all products
          </Link>
        )}
      </div>

      {count > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        // Only show "not found" once products have loaded
        products.length > 0 && (
          <div className="card py-16 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No products found in "{category}"
            </h2>
            <p className="mt-2 text-gray-500">
              Check the category name, or browse everything we have.
            </p>
            <Link to="/shop" className="btn btn-primary mt-6">
              Browse all products
            </Link>
          </div>
        )
      )}
    </main>
  );
};

export default Shop;