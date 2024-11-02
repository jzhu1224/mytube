import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  history: string[];
}

const initialState: SearchState = {
  history: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addHistoryItem: (state, action: PayloadAction<string>) => {
      // Add to history if the item is not already there
      if (!state.history.includes(action.payload)) {
        state.history = [action.payload, ...state.history];
      }
    },
    deleteHistoryItem: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter((item) => item !== action.payload);
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const { addHistoryItem, deleteHistoryItem, clearHistory } =
  searchSlice.actions;

export default searchSlice.reducer;
