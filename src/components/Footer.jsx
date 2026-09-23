import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { siteInfo } from "../config/siteInfo";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/cart", label: "Cart" },
  { to: "/contact", label: "Contact" },
  { to: "/about", label: "About" },
];

const socials = [
  { label: "Facebook", Icon: FaFacebook, href: siteInfo.social.facebook },
  { label: "Instagram", Icon: FaInstagram, href: siteInfo.social.instagram },
  { label: "TikTok", Icon: FaTiktok, href: siteInfo.social.tiktok },
  { label: "Twitter", Icon: FaTwitter, href: siteInfo.social.twitter },
  {
    label: "WhatsApp",
    Icon: FaWhatsapp,
    href: `https://wa.me/${siteInfo.whatsapp}`,
  },
];

const paymentMethods = ["MTN MoMo", "Airtel Money", "Cash on Delivery"];

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    const value = email.trim();

    if (!/^\S+@\S+\.\S+$/.test(value)) {
      toast.error("Enter a valid email address.");
      return;
    }

    // TODO (backend): send this email to the API so it is really saved
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold text-white">{siteInfo.name}</h3>
          <p className="mt-4 text-sm leading-6">
            Your one-stop shop for electronics, fashion, home essentials and
            more. Shop with us and enjoy an easy online shopping experience.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {socials.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition-colors hover:bg-brand-600 hover:text-white"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-base font-semibold text-white">Quick links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-base font-semibold text-white">Contact us</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 shrink-0 text-brand-400" />
              <span>{siteInfo.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <FaPhoneAlt className="mt-1 shrink-0 text-brand-400" />
              <a
                href={`tel:${siteInfo.phone.replace(/\s/g, "")}`}
                className="hover:text-white hover:underline"
              >
                {siteInfo.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <FaWhatsapp className="mt-1 shrink-0 text-brand-400" />
              <a
                href={`https://wa.me/${siteInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline"
              >
                Chat on WhatsApp
              </a>
            </li>
            <li className="flex items-start gap-3">
              <FaEnvelope className="mt-1 shrink-0 text-brand-400" />
              <a
                href={`mailto:${siteInfo.email}`}
                className="break-all hover:text-white hover:underline"
              >
                {siteInfo.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter and payments */}
        <div>
          <h4 className="text-base font-semibold text-white">
            Get offers by email
          </h4>
          <form onSubmit={handleSubscribe} noValidate className="mt-4 flex">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full min-w-0 rounded-l-xl border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-brand-500"
            />
            <button
              type="submit"
              className="btn btn-primary rounded-l-none rounded-r-xl px-4 py-2.5"
            >
              Subscribe
            </button>
          </form>

          <h4 className="mt-8 text-base font-semibold text-white">
            Ways to pay
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {paymentMethods.map((method) => (
              <li
                key={method}
                className="rounded-full border border-gray-700 px-3 py-1 text-xs font-medium text-gray-200"
              >
                {method}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container-page py-5 text-center text-sm text-gray-400 sm:text-left">
          &copy; {new Date().getFullYear()} {siteInfo.name}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;