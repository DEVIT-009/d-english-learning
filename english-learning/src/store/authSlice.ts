import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  token: string | null;
  name: string | null;
  email: string | null;
};

function readInitialAuth(): AuthState {
  if (typeof window === "undefined") {
    return { token: null, name: null, email: null };
  }
  try {
    const token = localStorage.getItem("auth_token");
    const name = localStorage.getItem("auth_name");
    const email = localStorage.getItem("auth_email");
    return { token, name, email };
  } catch {
    return { token: null, name: null, email: null };
  }
}

const initialState: AuthState = readInitialAuth();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{
        token: string;
        name?: string | null;
        email?: string | null;
      }>
    ) {
      const { token, name = null, email = null } = action.payload;
      state.token = token;
      state.name = name;
      state.email = email;
      try {
        localStorage.setItem("auth_token", token);
        if (name !== null) localStorage.setItem("auth_name", name);
        if (email !== null) localStorage.setItem("auth_email", email);
      } catch {}
    },
    logout(state) {
      state.token = null;
      state.name = null;
      state.email = null;
      try {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        localStorage.removeItem("auth_email");
      } catch {}
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
