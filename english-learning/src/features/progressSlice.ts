import { createSlice } from "@reduxjs/toolkit";

type LessonProgress = {
  lessonId: string;
  completed: boolean;
  score?: number;
};

type ProgressState = {
  lessons: Record<string, LessonProgress>;
};

const initialState: ProgressState = { lessons: {} };

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    markCompleted(state, action: { payload: { lessonId: string } }) {
      const { lessonId } = action.payload;
      state.lessons[lessonId] = { lessonId, completed: true };
    },
    setScore(state, action: { payload: { lessonId: string; score: number } }) {
      const { lessonId, score } = action.payload;
      const existing = state.lessons[lessonId] || {
        lessonId,
        completed: false,
      };
      state.lessons[lessonId] = { ...existing, score };
    },
  },
});

export const { markCompleted, setScore } = progressSlice.actions;
export const progressReducer = progressSlice.reducer;
