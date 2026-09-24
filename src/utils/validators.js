// Simple checks used by the address form, checkout and (in step 7) login and register.

export const isValidEmail = (value) => /^\S+@\S+\.\S+$/.test(value.trim());

// Removes spaces, dashes and brackets: "+256 (772) 123-456" -> "+256772123456"
const cleanPhone = (value) => value.replace(/[\s\-()]/g, "");

// Ugandan mobile numbers: +256 7XX XXX XXX, 256 7XX XXX XXX or 07XX XXX XXX
export const isValidUgandaPhone = (value) =>
    /^(\+?256|0)7\d{8}$/.test(cleanPhone(value));

// Any accepted format -> "+2567XXXXXXXX" (the form the backend will want)
export const normalizeUgandaPhone = (value) => {
    const phone = cleanPhone(value);
    if (phone.startsWith("+256")) return phone;
    if (phone.startsWith("256")) return `+${phone}`;
    if (phone.startsWith("0")) return `+256${phone.slice(1)}`;
    return phone;
};