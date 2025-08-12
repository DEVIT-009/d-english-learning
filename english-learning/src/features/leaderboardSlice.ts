import { createSlice } from "@reduxjs/toolkit";

type Entry = { userId: string; name: string; score: number };
type LeaderboardState = { entries: Entry[] };

const initialState: LeaderboardState = { entries: [] };

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setEntries(state, action: { payload: Entry[] }) {
      state.entries = action.payload;
    },
  },
});

export const { setEntries } = leaderboardSlice.actions;
export const leaderboardReducer = leaderboardSlice.reducer;
