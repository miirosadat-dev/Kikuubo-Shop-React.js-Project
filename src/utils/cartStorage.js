// Saves the cart in the browser so it survives a page refresh.
// Temporary: once the backend exists, the cart will live on the server.

const CART_KEY = "kikuubo_cart";

export const loadCart = () => {
    try {
        const raw = localStorage.getItem(CART_KEY);
        if (!raw) return null;

        const saved = JSON.parse(raw);
        if (!Array.isArray(saved.products)) return null;

        return saved;
    } catch {
        // Corrupted or blocked storage: start with an empty cart
        return null;
    }
};

export const saveCart = (cart) => {
    try {
        localStorage.setItem(
            CART_KEY,
            JSON.stringify({
                products: cart.products,
                shippingAddress: cart.shippingAddress,
            }),
        );
    } catch {
        // Storage full or blocked: the cart still works, it just won't persist
    }
};