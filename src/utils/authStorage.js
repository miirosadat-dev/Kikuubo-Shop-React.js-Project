// Keeps the signed-in person across page refreshes.
// "Remember me" ticked  -> saved until they log out (localStorage)
// "Remember me" unticked -> saved only until the browser tab is closed (sessionStorage)

const AUTH_KEY = "kikuubo_user";

export const loadAuth = () => {
    try {
        const remembered = localStorage.getItem(AUTH_KEY);
        if (remembered) return { user: JSON.parse(remembered), remember: true };

        const temporary = sessionStorage.getItem(AUTH_KEY);
        if (temporary) return { user: JSON.parse(temporary), remember: false };
    } catch {
        // Blocked or corrupted storage: start signed out
    }
    return null;
};

export const saveAuth = ({ user, remember }) => {
    try {
        localStorage.removeItem(AUTH_KEY);
        sessionStorage.removeItem(AUTH_KEY);
        if (!user) return;

        const storage = remember ? localStorage : sessionStorage;
        storage.setItem(AUTH_KEY, JSON.stringify(user));
    } catch {
        // Storage full or blocked: they stay signed in until refresh
    }
};