import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// One tile per real category. The picture is the first product of that category,
// and each tile opens the shop filtered to that category.
const CategorySection = () => {
  const products = useSelector((state) => state.product.products);

  const categories = useMemo(() => {
    const map = new Map();
    products.forEach((product) => {
      if (!map.has(product.category)) {
        map.set(product.category, {
          name: product.category,
          image: product.image,
          count: 0,
        });
      }
      map.get(product.category).count++;
    });
    return [...map.values()];
  }, [products]);

  if (categories.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="section-title mb-5">Shop by category</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/shop?category=${encodeURIComponent(category.name)}`}
            className="group card flex flex-col items-center p-4 text-center transition-shadow hover:shadow-md"
          >
            <div className="flex h-28 w-full items-center justify-center rounded-xl bg-gray-50">
              <img
                src={category.image}
                alt=""
                className="h-24 object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-brand-600">
              {category.name}
            </h3>
            <p className="text-sm text-gray-500">
              {category.count} {category.count === 1 ? "product" : "products"}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;