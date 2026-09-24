import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Modal from "./Modal";
import photo from "../assets/images/miiro-sadat.webp";


const DEVELOPER = {
    name: "Miiro Sadat",
    title: "Full-stack developer",
    // Your own WhatsApp number: digits only, with the country code, no + and no spaces
    // (0772 123 456 becomes 256772123456). This is NOT the shop's number.
    whatsapp: "256700000000",
};

const SHOW_ON_EVERY_PAGE = true; // false = only once per visit (per browser tab)
const EXCLUDED_PATHS = ["/checkout"]; // pages where it never appears, so it can't interrupt a payment
const DELAY_MS = 1500; // wait this long after the page has loaded
// ------------------------------------------------------------------

const SEEN_KEY = "kikuubo_developer_popup_seen";

const skills = [
    "React",
    "Tailwind CSS",
    "Redux Toolkit",
    "Spring Boot",
    "PostgreSQL",
];

const hasSeenPopup = () => {
    try {
        return sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
        return false;
    }
};

const markSeen = () => {
    try {
        sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
        // ignore: it will just show again
    }
};

// The message that opens in WhatsApp. *text* becomes bold there.
const buildWhatsappLink = () => {
    const firstName = DEVELOPER.name.split(" ")[0];
    const message = [
        `Hello ${firstName},`,
        "",
        "I just explored Kikuubo Shop and I would like to talk to you about working together.",
        "",
        "*My name:* ",
        "*Company / project:* ",
        "*What I need help with:* ",
        "",
        `Sent from: ${window.location.href}`,
    ].join("\n");

    return `https://wa.me/${DEVELOPER.whatsapp}?text=${encodeURIComponent(message)}`;
};

// A small "about the developer" card. It opens by itself once each page has finished
// loading. It closes with the X, the Escape key, or a click on the dark area.
const DeveloperPopup = () => {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);

    // Runs on the first load and every time the person opens another page
    useEffect(() => {
        const path = pathname.replace(/\/+$/, "") || "/";

        if (EXCLUDED_PATHS.includes(path)) {
            setOpen(false);
            return;
        }
        if (!SHOW_ON_EVERY_PAGE && hasSeenPopup()) return;

        let timer;
        const show = () => {
            timer = setTimeout(() => {
                setOpen(true);
                markSeen();
            }, DELAY_MS);
        };

        // "Loaded successfully" = the browser has finished loading the page
        if (document.readyState === "complete") show();
        else window.addEventListener("load", show, { once: true });

        return () => {
            clearTimeout(timer);
            window.removeEventListener("load", show);
        };
    }, [pathname]);

    return (
        <Modal
            isModalOpen={open}
            setIsModalOpen={setOpen}
            label={`About ${DEVELOPER.name}`}
        >
            <div className="text-center">
                <img
                    src={photo}
                    alt={DEVELOPER.name}
                    width="96"
                    height="96"
                    className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-brand-100"
                />

                <h2 className="mt-5 text-2xl font-bold text-gray-900">
                    Hello, my name is {DEVELOPER.name}
                </h2>
                <p className="mt-1 text-sm font-semibold text-brand-600">
                    {DEVELOPER.title}
                </p>

                <p className="mt-4 leading-7 text-gray-600">
                    This shop is a full-stack e-commerce project I'm building with React
                    and Spring Boot. It shows my skills in responsive interface design,
                    state management, REST APIs and database design with PostgreSQL.
                </p>
                <p className="mt-3 text-gray-600">
                    Have a project or a role in mind? Let's talk.
                </p>

                <ul className="mt-4 flex flex-wrap justify-center gap-2">
                    {skills.map((skill) => (
                        <li key={skill} className="badge bg-gray-100 text-gray-700">
                            {skill}
                        </li>
                    ))}
                </ul>

                <a
                    href={buildWhatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="btn btn-primary btn-block mt-6 py-3.5"
                >
                    <FaWhatsapp size={18} />
                    Hire me
                </a>
            </div>
        </Modal>
    );
};

export default DeveloperPopup;