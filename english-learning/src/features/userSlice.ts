import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  id: string | null;
  name: string | null;
  email: string | null;
  role: "user" | "admin";
};

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  role: "user",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: { payload: Partial<UserState> }) {
      Object.assign(state, action.payload);
    },
    clearUser(state) {
      state.id = null;
      state.name = null;
      state.email = null;
      state.role = "user";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
