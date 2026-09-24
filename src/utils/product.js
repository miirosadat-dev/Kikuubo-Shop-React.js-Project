// Small helpers shared by the product card and the shop page.

// 3,700,000 -> 3,400,000 gives 8 (percent). Returns 0 when there is no discount.
export const getDiscountPercent = (product) =>
    product.oldPrice && product.oldPrice > product.price
        ? Math.round((1 - product.price / product.oldPrice) * 100)
        : 0;

// Every word typed must appear somewhere in the name, brand, category or subcategory.
// "samsung tv" finds the Samsung Smart TV; "phone" finds phones and headphones.
export const matchesSearch = (product, query) => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return true;

    const text =
        `${product.name} ${product.brand} ${product.category} ${product.subcategory}`.toLowerCase();

    return words.every((word) => text.includes(word));
};

// "featured" has no sorter on purpose: it keeps the original order.
export const productSorters = {
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    "name-asc": (a, b) => a.name.localeCompare(b.name),
    rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
    discount: (a, b) => getDiscountPercent(b) - getDiscountPercent(a),
};