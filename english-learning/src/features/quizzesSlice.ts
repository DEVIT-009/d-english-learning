import { createSlice } from "@reduxjs/toolkit";

type Quiz = { id: string; title: string; questions: number };
type QuizzesState = { items: Quiz[] };

const initialState: QuizzesState = { items: [] };

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes(state, action: { payload: Quiz[] }) {
      state.items = action.payload;
    },
  },
});

export const { setQuizzes } = quizzesSlice.actions;
export const quizzesReducer = quizzesSlice.reducer;
