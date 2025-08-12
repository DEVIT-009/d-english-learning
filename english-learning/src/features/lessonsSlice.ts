import { createSlice } from "@reduxjs/toolkit";

type Lesson = { id: string; title: string; duration?: number };
type LessonsState = { items: Lesson[] };

const initialState: LessonsState = { items: [] };

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    setLessons(state, action: { payload: Lesson[] }) {
      state.items = action.payload;
    },
  },
});

export const { setLessons } = lessonsSlice.actions;
export const lessonsReducer = lessonsSlice.reducer;
