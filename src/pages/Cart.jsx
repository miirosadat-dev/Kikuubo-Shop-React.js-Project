import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaShoppingCart, FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa";
import Modal from "../components/Modal";
import ChangeAddress from "../components/ChangeAddress";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/CartSlice";
import { formatCurrency } from "../utils/formatCurrency";

const Cart = () => {
  const { products, totalQuantity, totalPrice, shippingAddress } = useSelector(
    (state) => state.cart,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmingClear, setConfirmingClear] = useState(false);

  // Removing shows a message with an Undo button, so a mis-click is not a disaster
  const handleRemove = (item) => {
    dispatch(removeFromCart(item.id));
    toast((t) => (
      <span className="flex items-center gap-3 text-sm">
        {item.name} removed
        <button
          type="button"
          className="font-semibold text-brand-600 hover:underline"
          onClick={() => {
            dispatch(addToCart(item));
            toast.dismiss(t.id);
          }}
        >
          Undo
        </button>
      </span>
    ));
  };

  const handleClear = () => {
    dispatch(clearCart());
    setConfirmingClear(false);
    toast("Cart cleared");
  };

  if (products.length === 0) {
    return (
      <main className="container-page py-16">
        <div className="card mx-auto max-w-lg px-6 py-14 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-3xl text-brand-600">
            <FaShoppingCart />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Your cart is empty
          </h1>
          <p className="mt-2 text-gray-500">
            Looks like you haven't added anything yet. Browse our products and
            add what you like.
          </p>
          <Link to="/shop" className="btn btn-primary mt-8 px-8">
            Start shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container-page py-10">
      {/* Title and clear cart */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Shopping cart
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
          </p>
        </div>

        {confirmingClear ? (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-gray-600">Remove all items?</span>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleClear}
            >
              Yes, clear cart
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => setConfirmingClear(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-ghost btn-sm text-gray-600"
            onClick={() => setConfirmingClear(true)}
          >
            Clear cart
          </button>
        )}
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Items */}
        <div className="lg:w-2/3">
          <ul className="space-y-4">
            {products.map((item) => (
              <li
                key={item.id}
                className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5"
              >
                <Link
                  to={`/product/${item.id}`}
                  className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gray-50 p-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-gray-900">
                    <Link
                      to={`/product/${item.id}`}
                      className="hover:text-brand-600"
                    >
                      {item.name}
                    </Link>
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {formatCurrency(item.price)} each
                  </p>

                  <div className="mt-3 inline-flex items-center overflow-hidden rounded-xl border border-gray-300">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.name}`}
                      disabled={item.quantity <= 1}
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="flex h-10 w-10 items-center justify-center text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <FaMinus size={11} />
                    </button>
                    <span
                      className="w-10 text-center font-semibold"
                      aria-live="polite"
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="flex h-10 w-10 items-center justify-center text-gray-700 hover:bg-gray-100"
                    >
                      <FaPlus size={11} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-between sm:self-stretch">
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleRemove(item)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-600"
                  >
                    <FaTrashAlt size={13} />
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <Link
            to="/shop"
            className="mt-6 inline-block text-sm font-semibold text-brand-600 hover:underline"
          >
            Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:w-1/3">
          <div className="card overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-900">Order summary</h2>
            </div>

            <div className="space-y-5 p-6">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    Delivery address
                  </h3>
                  <button
                    type="button"
                    className="text-sm font-semibold text-brand-600 hover:underline"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Change
                  </button>
                </div>
                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <p className="font-medium text-gray-900">
                    {shippingAddress.name}
                  </p>
                  <p>{shippingAddress.phone}</p>
                  <p>{shippingAddress.address}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>
                    Subtotal ({totalQuantity}{" "}
                    {totalQuantity === 1 ? "item" : "items"})
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-700">Free</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-5">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">
                  {formatCurrency(totalPrice)}
                </span>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-block py-4"
                onClick={() => navigate("/checkout")}
              >
                Proceed to checkout
              </button>

              <p className="text-center text-xs text-gray-500">
                Pay with MTN MoMo, Airtel Money or cash on delivery.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <ChangeAddress
          address={shippingAddress}
          dispatch={dispatch}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </main>
  );
};

export default Cart;