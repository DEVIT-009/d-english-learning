import { createSlice } from "@reduxjs/toolkit";

type Vocab = { id: string; word: string; translation: string };
type VocabState = { items: Vocab[] };

const initialState: VocabState = { items: [] };

const vocabularySlice = createSlice({
  name: "vocabulary",
  initialState,
  reducers: {
    setVocabulary(state, action: { payload: Vocab[] }) {
      state.items = action.payload;
    },
  },
});

export const { setVocabulary } = vocabularySlice.actions;
export const vocabularyReducer = vocabularySlice.reducer;
