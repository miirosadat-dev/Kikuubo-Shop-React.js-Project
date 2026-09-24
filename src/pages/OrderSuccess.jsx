import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDateTime } from "../utils/formatDate";

const OrderSuccess = () => {
  const order = useSelector((state) => state.cart.currentOrder);

  // Someone who opens this address directly, without ordering, sees this instead
  if (!order) {
    return (
      <main className="container-page py-16">
        <div className="card mx-auto max-w-lg px-6 py-14 text-center">
          <h1 className="text-2xl font-bold text-gray-900">No order found</h1>
          <p className="mt-2 text-gray-500">You haven't placed an order yet.</p>
          <Link to="/shop" className="btn btn-primary mt-8 px-8">
            Start shopping
          </Link>
        </div>
      </main>
    );
  }

  const paymentLabel =
    order.paymentMethod === "mobile"
      ? `Mobile Money${order.mobileMoneyNumber ? ` (${order.mobileMoneyNumber})` : ""
      }`
      : "Cash on delivery";

  return (
    <main className="container-page max-w-4xl py-12">
      {/* Thank you */}
      <div className="mb-10 text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <FaCheckCircle size={56} className="text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Thank you!</h1>
        <p className="mt-3 text-lg text-gray-600">
          Your order has been placed successfully.
        </p>
        <p className="mt-2 text-gray-500">
          Order number
          <span className="ml-2 font-semibold text-gray-900">
            {order.orderNumber}
          </span>
        </p>
      </div>

      {/* Summary (this card is what gets printed) */}
      <div className="card overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-5 md:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Order summary</h2>
        </div>

        <div className="grid gap-6 border-b border-gray-100 p-6 sm:grid-cols-2 md:p-8">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-500">
              Deliver to
            </h3>
            <div className="space-y-1 text-gray-700">
              <p className="font-semibold text-gray-900">{order.customer.name}</p>
              <p>{order.customer.phone}</p>
              <p>{order.customer.address}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-500">
              Order details
            </h3>
            <div className="space-y-1 text-gray-700">
              <p>
                <span className="text-gray-500">Placed:</span>{" "}
                {formatDateTime(order.orderedAt)}
              </p>
              <p>
                <span className="text-gray-500">Payment:</span> {paymentLabel}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h3 className="mb-4 text-sm font-semibold text-gray-500">Products</h3>

          <ul className="divide-y divide-gray-100">
            {order.products.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-xl bg-gray-50 object-contain p-2"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium text-gray-900">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-2 border-t border-gray-200 pt-6">
            <div className="flex justify-between text-gray-600">
              <span>Total items</span>
              <span className="font-semibold text-gray-900">
                {order.totalItems}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold text-green-700">Free</span>
            </div>
            <div className="flex justify-between pt-2 text-2xl font-bold text-gray-900">
              <span>Total</span>
              <span>{formatCurrency(order.totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons (hidden when printing) */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row print:hidden">
        <Link to="/track-order" className="btn btn-primary flex-1 py-4">
          Track order
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="btn btn-outline flex-1 py-4"
        >
          Print summary
        </button>
        <Link to="/shop" className="btn btn-outline flex-1 py-4">
          Continue shopping
        </Link>
      </div>
    </main>
  );
};

export default OrderSuccess;