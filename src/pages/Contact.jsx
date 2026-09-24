import { useState } from "react";
import toast from "react-hot-toast";
import PageBanner from "../components/PageBanner";
import DeveloperPopup from "../components/DeveloperPopup";
import contactBanner from "../assets/images/contact.webp";
import {
    FaEnvelope,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaWhatsapp,
} from "react-icons/fa";
import FormField from "../components/FormField";
import { siteInfo } from "../config/siteInfo";

const topics = [
    "Order or delivery",
    "Product question",
    "Payment",
    "Something else",
];

const mapQuery = encodeURIComponent(siteInfo.address);

// All the details come from src/config/siteInfo.js
const details = [
    {
        Icon: FaMapMarkerAlt,
        label: "Visit us",
        value: siteInfo.address,
        href: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
        external: true,
    },
    {
        Icon: FaPhoneAlt,
        label: "Call us",
        value: siteInfo.phone,
        href: `tel:${siteInfo.phone.replace(/\s/g, "")}`,
    },
    {
        Icon: FaWhatsapp,
        label: "WhatsApp",
        value: "Chat with us",
        href: `https://wa.me/${siteInfo.whatsapp}`,
        external: true,
    },
    {
        Icon: FaEnvelope,
        label: "Email",
        value: siteInfo.email,
        href: `mailto:${siteInfo.email}`,
    },
];

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        topic: topics[0],
        message: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    // There is no server yet, so the message is sent through WhatsApp:
    // it opens a chat with your shop number and the text already written.
    // When the backend exists, this function will send the message to the API instead.
    const handleSubmit = (e) => {
        e.preventDefault();

        const found = {};
        if (form.name.trim().length < 2) found.name = "Enter your name.";
        if (form.message.trim().length < 10)
            found.message = "Write a short message (at least 10 characters).";
        setErrors(found);
        if (Object.keys(found).length > 0) return;

        const text = `Hello ${siteInfo.name}, my name is ${form.name.trim()}.\nTopic: ${form.topic}\n\n${form.message.trim()}`;
        window.open(
            `https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent(text)}`,
            "_blank",
            "noopener,noreferrer",
        );

        toast.success("Opening WhatsApp. Press send there to finish.");
        setForm((prev) => ({ ...prev, message: "" }));
    };

    return (
        <main className="container-page pb-10 md:pb-14">
            <DeveloperPopup />
            <div className="pt-4 md:pt-6">
                <PageBanner
                    image={contactBanner}
                    position="72% 8%"
                    title="Contact us"
                    text="Questions about an order, a product or delivery? Send us a message and we will be happy to help."
                />
            </div>

            <div className="mt-8 grid gap-8 md:mt-10 lg:grid-cols-5">
                {/* Form */}
                <section className="card p-6 md:p-8 lg:col-span-3">
                    <h2 className="text-xl font-bold text-gray-900">Send a message</h2>

                    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                        <FormField id="contact-name" label="Your name" error={errors.name}>
                            <input
                                id="contact-name"
                                type="text"
                                autoComplete="name"
                                placeholder="Enter your name"
                                value={form.name}
                                onChange={handleChange("name")}
                                aria-invalid={Boolean(errors.name)}
                                aria-describedby={errors.name ? "contact-name-error" : undefined}
                                className={`input ${errors.name ? "input-error" : ""}`}
                            />
                        </FormField>

                        <FormField id="contact-topic" label="What is it about?">
                            <select
                                id="contact-topic"
                                value={form.topic}
                                onChange={handleChange("topic")}
                                className="input"
                            >
                                {topics.map((topic) => (
                                    <option key={topic} value={topic}>
                                        {topic}
                                    </option>
                                ))}
                            </select>
                        </FormField>

                        <FormField
                            id="contact-message"
                            label="Message"
                            error={errors.message}
                        >
                            <textarea
                                id="contact-message"
                                rows={5}
                                placeholder="How can we help?"
                                value={form.message}
                                onChange={handleChange("message")}
                                aria-invalid={Boolean(errors.message)}
                                aria-describedby={
                                    errors.message ? "contact-message-error" : undefined
                                }
                                className={`input resize-none ${errors.message ? "input-error" : ""
                                    }`}
                            />
                        </FormField>

                        <div>
                            <button type="submit" className="btn btn-primary px-8 py-3.5">
                                <FaWhatsapp size={18} />
                                Send via WhatsApp
                            </button>
                            <p className="mt-3 text-xs text-gray-500">
                                This opens WhatsApp with your message ready to send.
                            </p>
                        </div>
                    </form>
                </section>

                {/* Details and map */}
                <aside className="space-y-6 lg:col-span-2">
                    <ul className="card divide-y divide-gray-100">
                        {details.map(({ Icon, label, value, href, external }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    {...(external
                                        ? { target: "_blank", rel: "noopener noreferrer" }
                                        : {})}
                                    className="flex items-center gap-4 p-4 transition-colors hover:bg-gray-50"
                                >
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                                        <Icon />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-xs font-medium text-gray-500">
                                            {label}
                                        </span>
                                        <span className="block break-words font-semibold text-gray-900">
                                            {value}
                                        </span>
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    <iframe
                        title={`Map showing ${siteInfo.address}`}
                        src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="h-64 w-full rounded-2xl border border-gray-200"
                    />
                </aside>
            </div>
        </main>
    );
};

export default Contact;