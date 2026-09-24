import { createSlice } from "@reduxjs/toolkit";
import { loadAuth } from "../utils/authStorage";

const saved = loadAuth();

const initialState = {
    user: saved?.user ?? null, // { id, name, email, phone } or null when signed out
    remember: saved?.remember ?? true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.user = action.payload.user;
            state.remember = action.payload.remember;
        },
        logout(state) {
            state.user = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;