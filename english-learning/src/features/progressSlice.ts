import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type QuizAnswerRecord = {
  questionId: string;
  userAnswer: unknown;
  correct: boolean;
};

export type QuizAttempt = {
  quizId: string;
  quizTitle: string;
  score: number; // 0-100
  totalQuestions: number;
  correctCount: number;
  startedAt: string; // ISO
  finishedAt: string; // ISO
  answers: QuizAnswerRecord[];
};

export type LessonCompletion = {
  lessonId: string;
  completedAt: string;
};

export type ProgressState = {
  completedLessons: Record<string, LessonCompletion>;
  quizAttempts: QuizAttempt[];
};

const initialState: ProgressState = {
  completedLessons: {},
  quizAttempts: [],
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    markLessonComplete: (
      state,
      action: PayloadAction<{ lessonId: string; completedAt?: string }>
    ) => {
      const { lessonId, completedAt } = action.payload;
      state.completedLessons[lessonId] = {
        lessonId,
        completedAt: completedAt ?? new Date().toISOString(),
      };
    },
    addQuizAttempt: (state, action: PayloadAction<QuizAttempt>) => {
      state.quizAttempts.unshift(action.payload);
    },
    clearProgress: () => initialState,
  },
});

export const { markLessonComplete, addQuizAttempt, clearProgress } = progressSlice.actions;
export default progressSlice.reducer;
