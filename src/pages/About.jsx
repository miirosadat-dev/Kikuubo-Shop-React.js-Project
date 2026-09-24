import { Link } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import aboutBanner from "../assets/images/about.webp";
import { FaMobileAlt, FaTruck, FaHeadset } from "react-icons/fa";
import CategorySection from "../components/CategorySection";
import { siteInfo } from "../config/siteInfo";

// DRAFT TEXT: I wrote this from what the shop does. Edit it to tell your real story.
// (Add facts like the year you started, your team or your promise only when they are true.)

const steps = [
    {
        title: "Browse",
        text: "Find what you need by category, or search by name or brand.",
    },
    {
        title: "Add to cart",
        text: "Pick your items and check the delivery address.",
    },
    {
        title: "Choose how to pay",
        text: "Pay with MTN MoMo, Airtel Money or cash on delivery.",
    },
    {
        title: "Get your order",
        text: "We deliver to the address you give at checkout.",
    },
];

const reasons = [
    {
        Icon: FaMobileAlt,
        title: "Simple payments",
        text: "Mobile Money or cash on delivery, whichever suits you.",
    },
    {
        Icon: FaTruck,
        title: "Delivered to you",
        text: "Order from your phone and we bring it to your door.",
    },
    {
        Icon: FaHeadset,
        title: "Help when you need it",
        text: `Reach us on WhatsApp, by phone or by email. We are at ${siteInfo.address}.`,
    },
];

const About = () => (
    <main className="container-page pb-12">
        <div className="pt-4 md:pt-6">
            <PageBanner
                image={aboutBanner}
                position="72% 65%"
                title={`About ${siteInfo.name}`}
            />
        </div>

        {/* Intro */}
        <section className="max-w-3xl py-10 md:py-12">
            <p className="text-lg leading-8 text-gray-600">
                {siteInfo.name} is an online shop for people in Uganda. Phones,
                laptops, fashion, home essentials, beauty, sports gear and car
                accessories, all in one place, with prices in shillings and payment the
                way you already pay.
            </p>
            <p className="mt-4 leading-7 text-gray-600">
                We built it to make shopping simpler: no need to travel around
                comparing shops. Browse from your phone or computer, order in a few
                taps, and have it delivered.
            </p>
        </section>

        {/* What we sell (reuses the category tiles from the home page) */}
        <CategorySection />

        {/* How it works */}
        <section className="py-8">
            <h2 className="section-title mb-6">How it works</h2>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, index) => (
                    <li key={step.title} className="card p-5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 font-bold text-white">
                            {index + 1}
                        </span>
                        <h3 className="mt-4 font-semibold text-gray-900">{step.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{step.text}</p>
                    </li>
                ))}
            </ol>
        </section>

        {/* Why shop with us */}
        <section className="py-8">
            <h2 className="section-title mb-6">Why shop with us</h2>
            <div className="grid gap-4 md:grid-cols-3">
                {reasons.map(({ Icon, title, text }) => (
                    <div key={title} className="card p-6">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-xl text-brand-600">
                            <Icon />
                        </span>
                        <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{text}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Call to action */}
        <section className="mt-6 rounded-2xl bg-gray-900 px-6 py-10 text-center md:py-12">
            <h2 className="text-2xl font-bold text-white">Ready to start shopping?</h2>
            <p className="mt-2 text-gray-300">
                Have a question first? We are happy to help.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/shop" className="btn btn-primary px-8">
                    Browse products
                </Link>
                <Link
                    to="/contact"
                    className="btn border border-gray-600 px-8 text-white hover:border-white"
                >
                    Contact us
                </Link>
            </div>
        </section>
    </main>
);

export default About;