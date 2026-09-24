// TEMPORARY "fake server" for accounts, so the forms can be built and tested.
// Every function here will be replaced by a real API call to the Spring Boot
// backend. The forms will not need to change: they only use these functions.
//
// In this demo:
//  - names, emails and phones are saved in the browser
//  - passwords are checked for format ONLY. They are never stored or verified.

import { normalizeUgandaPhone } from "../utils/validators";

const USERS_KEY = "kikuubo_demo_users";

const wait = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

const readUsers = () => {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) ?? [];
    } catch {
        return [];
    }
};

const writeUsers = (users) => {
    try {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch {
        // ignore: the account just won't be remembered
    }
};

export const registerUser = async ({ name, email, phone }) => {
    await wait();

    const users = readUsers();
    const emailKey = email.trim().toLowerCase();

    if (users.some((user) => user.email === emailKey)) {
        throw new Error("An account with this email already exists. Try logging in.");
    }

    const user = {
        id: Date.now(),
        name: name.trim(),
        email: emailKey,
        phone: normalizeUgandaPhone(phone),
    };
    writeUsers([...users, user]);
    return user;
};

export const loginUser = async ({ email }) => {
    await wait();

    const emailKey = email.trim().toLowerCase();
    const user = readUsers().find((item) => item.email === emailKey);

    if (!user) {
        throw new Error("No account found with this email. Please register first.");
    }
    return user;
};

// No email is sent yet. The backend will do that.
export const requestPasswordReset = async () => {
    await wait();
    return true;
};