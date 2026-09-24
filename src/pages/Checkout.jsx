import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearCart, saveOrder } from "../redux/CartSlice";
import { formatCurrency } from "../utils/formatCurrency";
import { isValidUgandaPhone, normalizeUgandaPhone } from "../utils/validators";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, totalQuantity, totalPrice, shippingAddress } = useSelector(
    (state) => state.cart,
  );

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [momoNumber, setMomoNumber] = useState(shippingAddress.phone);
  const [momoError, setMomoError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // The delivery details are edited in the cart. Here we only check they are usable.
  const shippingValid = Boolean(
    shippingAddress.name.trim() &&
    shippingAddress.address.trim() &&
    isValidUgandaPhone(shippingAddress.phone),
  );

  const handlePlaceOrder = async () => {
    if (products.length === 0 || !shippingValid) return;

    if (paymentMethod === "mobile" && !isValidUgandaPhone(momoNumber)) {
      setMomoError("Enter a valid MTN or Airtel number, e.g. +256 772 123 456.");
      return;
    }

    const order = {
      orderNumber: "ORD-" + Date.now().toString().slice(-8),
      status: "placed",
      customer: shippingAddress,
      paymentMethod,
      mobileMoneyNumber:
        paymentMethod === "mobile" ? normalizeUgandaPhone(momoNumber) : null,
      products,
      totalItems: totalQuantity,
      totalPrice,
      orderedAt: new Date().toISOString(),
    };

    setIsSubmitting(true);

    try {
      // Pretend to talk to a server. The real API call replaces this line later.
      await new Promise((resolve) => setTimeout(resolve, 1200));

      dispatch(saveOrder(order));
      dispatch(clearCart()); // the items are now in the order, so empty the cart
      navigate("/order-success", { replace: true });
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (products.length === 0) {
    return (
      <main className="container-page py-16">
        <div className="card mx-auto max-w-lg px-6 py-14 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Nothing to check out
          </h1>
          <p className="mt-2 text-gray-500">
            Your cart is empty. Add some products first.
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
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Checkout
      </h1>
      <p className="mt-1 text-gray-500">
        Confirm your delivery details and choose how you will pay.
      </p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="space-y-6 lg:w-2/3">
          {/* Delivery */}
          <section className="card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Delivery details
              </h2>
              <Link
                to="/cart"
                className="text-sm font-semibold text-brand-600 hover:underline"
              >
                Change in cart
              </Link>
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">Full name</dt>
                <dd className="font-medium text-gray-900">
                  {shippingAddress.name}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Phone number</dt>
                <dd className="font-medium text-gray-900">
                  {shippingAddress.phone}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Delivery address</dt>
                <dd className="font-medium text-gray-900">
                  {shippingAddress.address}
                </dd>
              </div>
            </dl>

            {!shippingValid && (
              <p
                role="alert"
                className="mt-5 rounded-xl bg-brand-50 p-3 text-sm text-brand-800"
              >
                Some delivery details are missing or invalid.{" "}
                <Link to="/cart" className="font-semibold underline">
                  Fix them in your cart
                </Link>{" "}
                to place your order.
              </p>
            )}
          </section>

          {/* Payment */}
          <section className="card p-6">
            <h2 className="text-xl font-bold text-gray-900">Payment method</h2>

            <div className="mt-5 space-y-3">
              <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-gray-200 p-4 transition-colors hover:border-gray-400 has-checked:border-brand-600 has-checked:bg-brand-50">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mt-1 h-4 w-4 accent-brand-600"
                />
                <div>
                  <p className="font-semibold text-gray-900">Cash on delivery</p>
                  <p className="text-sm text-gray-500">
                    Pay when your package arrives.
                  </p>
                </div>
              </label>

              <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-gray-200 p-4 transition-colors hover:border-gray-400 has-checked:border-brand-600 has-checked:bg-brand-50">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "mobile"}
                  onChange={() => setPaymentMethod("mobile")}
                  className="mt-1 h-4 w-4 accent-brand-600"
                />
                <div>
                  <p className="font-semibold text-gray-900">Mobile Money</p>
                  <p className="text-sm text-gray-500">
                    MTN & Airtel supported.
                  </p>
                </div>
              </label>

              {paymentMethod === "mobile" && (
                <div className="pt-2">
                  <label htmlFor="momo-number" className="label">
                    Mobile Money number
                  </label>
                  <input
                    id="momo-number"
                    type="tel"
                    inputMode="tel"
                    placeholder="+256 7XX XXX XXX"
                    value={momoNumber}
                    onChange={(e) => {
                      setMomoNumber(e.target.value);
                      setMomoError("");
                    }}
                    aria-invalid={Boolean(momoError)}
                    className={`input ${momoError ? "input-error" : ""}`}
                  />
                  {momoError ? (
                    <p className="field-error">{momoError}</p>
                  ) : (
                    <p className="mt-1 text-xs text-gray-500">
                      The number you will pay with. It can be different from
                      your delivery phone.
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:w-1/3">
          <div className="card overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-900">Order summary</h2>
            </div>

            <div className="space-y-5 p-6">
              <ul className="max-h-64 space-y-3 overflow-y-auto pr-1">
                {products.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt=""
                      className="h-12 w-12 shrink-0 rounded-lg bg-gray-50 object-contain p-1"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 border-t border-dashed border-gray-200 pt-5 text-sm">
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
                onClick={handlePlaceOrder}
                disabled={isSubmitting || !shippingValid}
                className="btn btn-primary btn-block py-4"
              >
                {isSubmitting ? "Placing order..." : "Place order"}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Checkout;