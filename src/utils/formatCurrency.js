// Formats a number as Uganda Shillings, e.g. 3400000 -> "UGX 3,400,000"
// UGX has no cents, so we never show decimals.
export const formatCurrency = (amount) => {
    const value = Math.round(Number(amount) || 0);
    return `UGX ${value.toLocaleString("en-US")}`;
};