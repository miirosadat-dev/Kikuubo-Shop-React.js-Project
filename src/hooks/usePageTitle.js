import { useEffect } from "react";
import { siteInfo } from "../config/siteInfo";

// Sets the browser tab title, e.g. "Cart | Kikuubo Shop".
// Pass null to leave the title alone.
export const usePageTitle = (title) => {
    useEffect(() => {
        if (!title) return;
        document.title = title === siteInfo.name ? title : `${title} | ${siteInfo.name}`;
    }, [title]);
};