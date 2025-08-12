import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { userReducer } from "../features/userSlice";
import { progressReducer } from "../features/progressSlice";
import { lessonsReducer } from "../features/lessonsSlice";
import { quizzesReducer } from "../features/quizzesSlice";
import { vocabularyReducer } from "../features/vocabularySlice";
import { leaderboardReducer } from "../features/leaderboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    progress: progressReducer,
    lessons: lessonsReducer,
    quizzes: quizzesReducer,
    vocabulary: vocabularyReducer,
    leaderboard: leaderboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
