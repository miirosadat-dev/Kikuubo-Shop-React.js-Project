import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import banner1 from "../assets/images/banner1.png";
import InfoSection from "../components/InfoSection";
import CategorySection from "../components/CategorySection";
import ProductSection from "../components/ProductSection";
import DeveloperPopup from "../components/DeveloperPopup";

// Categories that get their own product row on the home page
const SHOWCASE_CATEGORIES = ["Electronics", "Fashion"];

const categoryLink = (name) => `/shop?category=${encodeURIComponent(name)}`;

// Best rated first; more reviews break a tie
const byRating = (a, b) => b.rating - a.rating || b.reviews - a.reviews;

const Home = () => {
  const products = useSelector((state) => state.product.products);

  // [["Electronics", 10], ["Fashion", 8], ...] for the sidebar
  const categories = useMemo(() => {
    const counts = new Map();
    products.forEach((product) => {
      counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
    });
    return [...counts];
  }, [products]);

  const topRated = useMemo(
    () =>
      products
        .filter((product) => product.stock > 0)
        .sort(byRating)
        .slice(0, 4),
    [products],
  );

  const showcases = useMemo(
    () =>
      SHOWCASE_CATEGORIES.map((name) => ({
        name,
        items: products
          .filter((product) => product.category === name)
          .sort(byRating)
          .slice(0, 4),
      })),
    [products],
  );

  return (
    <main className="container-page pb-12">
      <DeveloperPopup />
      {/* Sidebar + hero */}
      <section className="flex flex-col gap-6 py-4 md:flex-row md:py-6">
        <aside className="hidden md:block md:w-1/4 lg:w-1/5">
          <div className="card overflow-hidden">
            <h2 className="bg-brand-600 px-4 py-3 text-sm font-semibold text-white">
              Categories
            </h2>
            <ul className="divide-y divide-gray-100">
              {categories.map(([name, count]) => (
                <li key={name}>
                  <Link
                    to={categoryLink(name)}
                    className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
                  >
                    <span>{name}</span>
                    <span className="text-xs text-gray-400">{count}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/shop"
                  className="block px-4 py-3 text-sm font-semibold text-brand-600 hover:bg-brand-50"
                >
                  All products
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <div className="relative min-h-72 flex-1 overflow-hidden rounded-2xl bg-gray-100 md:min-h-80">
          <img
            src={banner1}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative flex min-h-72 items-center p-4 md:min-h-80 md:p-8">
            <div className="max-w-md rounded-2xl bg-white/85 p-6 shadow-sm md:p-8">
              <h1 className="text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
                Welcome to Kikuubo Shop
              </h1>
              <p className="mt-3 text-gray-700">
                Phones, laptops, fashion, home essentials and more, all in one
                place.
              </p>
              <Link to="/shop" className="btn btn-primary mt-6 px-8">
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InfoSection />

      <CategorySection />

      <ProductSection title="Top rated products" products={topRated} />

      {showcases.map(({ name, items }) => (
        <ProductSection
          key={name}
          title={name}
          products={items}
          viewAllTo={categoryLink(name)}
          viewAllLabel={`See all ${name}`}
        />
      ))}

      <div className="pt-6 text-center">
        <Link to="/shop" className="btn btn-primary px-10">
          Browse all products
        </Link>
      </div>
    </main>
  );
};

export default Home;