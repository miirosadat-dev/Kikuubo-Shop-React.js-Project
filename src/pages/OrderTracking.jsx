import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDateTime } from "../utils/formatDate";

// The steps of an order. An order's "status" says which one it has reached.
// For now every order stays on "placed". When the backend exists, the server
// will move it forward and this page will show the change with no edits.
const STEPS = [
    { key: "placed", label: "Order placed", text: "We have received your order." },
    { key: "preparing", label: "Being prepared", text: "Your items are being packed." },
    { key: "out_for_delivery", label: "Out for delivery", text: "Your order is on its way." },
    { key: "delivered", label: "Delivered", text: "Your order has arrived." },
];

const OrderTracking = () => {
    const order = useSelector((state) => state.cart.currentOrder);

    if (!order) {
        return (
            <main className="container-page py-16">
                <div className="card mx-auto max-w-lg px-6 py-14 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">No order to track</h1>
                    <p className="mt-2 text-gray-500">
                        Place an order and you will be able to follow it here.
                    </p>
                    <Link to="/shop" className="btn btn-primary mt-8 px-8">
                        Start shopping
                    </Link>
                </div>
            </main>
        );
    }

    const activeIndex = Math.max(
        0,
        STEPS.findIndex((step) => step.key === order.status),
    );

    return (
        <main className="container-page max-w-3xl py-12">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Track your order
            </h1>
            <p className="mt-2 text-gray-500">
                Order number
                <span className="ml-2 font-semibold text-gray-900">
                    {order.orderNumber}
                </span>
            </p>

            <div className="card mt-8 p-6 md:p-8">
                <ol>
                    {STEPS.map((step, index) => {
                        const done = index <= activeIndex;
                        const isLast = index === STEPS.length - 1;

                        return (
                            <li key={step.key} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    {done ? (
                                        <FaCheckCircle size={24} className="text-green-600" />
                                    ) : (
                                        <FaRegCircle size={24} className="text-gray-300" />
                                    )}
                                    {!isLast && (
                                        <div
                                            className={`my-1 w-0.5 flex-1 ${index < activeIndex ? "bg-green-600" : "bg-gray-200"
                                                }`}
                                        />
                                    )}
                                </div>

                                <div className={isLast ? "" : "pb-8"}>
                                    <p
                                        className={`font-semibold ${done ? "text-gray-900" : "text-gray-400"
                                            }`}
                                    >
                                        {step.label}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {index === 0
                                            ? `${step.text} ${formatDateTime(order.orderedAt)}`
                                            : step.text}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ol>

                <p className="mt-8 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                    Live status updates will appear here once order tracking is connected
                    to our system. For now, your order is shown as placed.
                </p>
            </div>

            <div className="card mt-6 p-6 text-sm md:p-8">
                <h2 className="text-lg font-bold text-gray-900">Order details</h2>
                <div className="mt-4 space-y-1 text-gray-700">
                    <p className="font-semibold text-gray-900">{order.customer.name}</p>
                    <p>{order.customer.phone}</p>
                    <p>{order.customer.address}</p>
                </div>
                <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 text-gray-600">
                    <span>
                        {order.totalItems} {order.totalItems === 1 ? "item" : "items"}
                    </span>
                    <span className="font-bold text-gray-900">
                        {formatCurrency(order.totalPrice)}
                    </span>
                </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/shop" className="btn btn-primary flex-1 py-3">
                    Continue shopping
                </Link>
                <Link to="/order-success" className="btn btn-outline flex-1 py-3">
                    View order summary
                </Link>
            </div>
        </main>
    );
};

export default OrderTracking;