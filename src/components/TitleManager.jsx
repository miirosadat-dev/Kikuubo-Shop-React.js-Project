import { useLocation } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { siteInfo } from "../config/siteInfo";

const staticTitles = {
    "/": siteInfo.name,
    "/cart": "Your cart",
    "/checkout": "Checkout",
    "/order-success": "Order confirmed",
    "/track-order": "Track your order",
    "/contact": "Contact us",
    "/about": "About us",
};

// Sets the tab title for every page from one place, so the pages don't each need to.
// Renders nothing. (The product page sets its own title, the product name.)
const TitleManager = () => {
    const { pathname, search } = useLocation();
    const path = pathname.replace(/\/+$/, "") || "/"; // "/cart/" counts as "/cart"

    let title;
    if (path === "/shop") {
        const params = new URLSearchParams(search);
        const q = params.get("q");
        title = q ? `Results for "${q}"` : params.get("category") || "Shop";
    } else if (path.startsWith("/product/")) {
        title = null;
    } else {
        title = staticTitles[path] ?? "Page not found";
    }

    usePageTitle(title);
    return null;
};

export default TitleManager;