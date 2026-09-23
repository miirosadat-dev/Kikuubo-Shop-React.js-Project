import { useState } from "react";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Register from "./Register";
import Modal from "./Modal";
import Login from "./Login";
import { setSearchTerm } from "../redux/productSlice";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
  { to: "/about", label: "About" },
];

// NavLink tells us if the link matches the current page, so we can highlight it
const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${isActive
    ? "bg-brand-50 text-brand-600"
    : "text-gray-700 hover:bg-gray-100 hover:text-brand-600"
  }`;

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Total number of items (3 phones + 2 shirts = 5), not the number of product lines
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const term = search.trim();
    if (!term) return;
    dispatch(setSearchTerm(term));
    navigate("/filter-data");
  };

  const openSignUp = () => {
    setIsLogin(false);
    setIsModalOpen(true);
  };

  // Always opens on the Login form (before, it reopened on whichever form was last used)
  const openLogin = () => {
    setIsLogin(true);
    setIsModalOpen(true);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="container-page flex flex-wrap items-center gap-x-3 gap-y-3 py-3 md:flex-nowrap md:gap-x-5">
          {/* Menu button (phones and tablets only) */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="whitespace-nowrap text-lg font-extrabold tracking-tight text-brand-600 md:text-xl"
          >
            KIKUUBO SHOP
          </Link>

          {/* Page links (large screens only) */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Search: sits on its own row on phones, inline from tablet up */}
          <form
            onSubmit={handleSearch}
            role="search"
            className="relative order-last w-full md:order-none md:mx-auto md:max-w-xl md:flex-1"
          >
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <input
              id="site-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
              enterKeyHint="search"
              className="input rounded-lg py-2 pl-4 pr-11"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-gray-500 hover:text-brand-600"
            >
              <FaSearch />
            </button>
          </form>

          {/* Cart and account */}
          <div className="ml-auto flex items-center gap-1 md:ml-0 md:gap-2">
            <Link
              to="/cart"
              aria-label={`Cart, ${totalQuantity} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 hover:text-brand-600"
            >
              <FaShoppingCart className="text-lg" />
              {totalQuantity > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white">
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
              )}
            </Link>

            {/* Tablet and desktop */}
            <div className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={openLogin}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={openSignUp}
              >
                Register
              </button>
            </div>

            {/* Phone */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 hover:text-brand-600 md:hidden"
              onClick={openLogin}
              aria-label="Login or register"
            >
              <FaUser />
            </button>
          </div>
        </div>

        {/* Dropdown menu (phones and tablets) */}
        {menuOpen && (
          <div id="mobile-menu" className="border-t border-gray-100 lg:hidden">
            <nav
              aria-label="Mobile navigation"
              className="container-page flex flex-col gap-1 py-3"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={closeMenu}
                  className={linkClass}
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="mt-2 flex gap-2 border-t border-gray-100 pt-3 md:hidden">
                <button
                  type="button"
                  className="btn btn-outline btn-sm flex-1"
                  onClick={() => {
                    closeMenu();
                    openLogin();
                  }}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm flex-1"
                  onClick={() => {
                    closeMenu();
                    openSignUp();
                  }}
                >
                  Register
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Kept outside <header> on purpose so the pop-up covers the whole screen */}
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        {isLogin ? (
          <Login openSignUp={openSignUp} />
        ) : (
          <Register openLogin={openLogin} />
        )}
      </Modal>
    </>
  );
};

export default Navbar;