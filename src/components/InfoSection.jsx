import { FaHeadset, FaLock, FaShippingFast, FaTag } from "react-icons/fa";

// Same messages as before. Make sure each one is true for your shop.
const infoItems = [
  {
    Icon: FaShippingFast,
    title: "Free shipping",
    description: "Get your orders delivered with no extra cost",
  },
  {
    Icon: FaHeadset,
    title: "Support 24/7",
    description: "We are here to assist you anytime",
  },
  {
    Icon: FaLock,
    title: "Secure payment",
    description: "Your payment information is safe with us",
  },
  {
    Icon: FaTag,
    title: "Discounts",
    description: "Enjoy the best prices on our products",
  },
];

const InfoSection = () => (
  <section aria-label="Why shop with us" className="py-4">
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {infoItems.map(({ Icon, title, description }) => (
        <div
          key={title}
          className="card flex flex-col items-center p-4 text-center sm:p-5"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-xl text-brand-600">
            <Icon />
          </span>
          <p className="mt-3 font-semibold text-gray-900">{title}</p>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default InfoSection;