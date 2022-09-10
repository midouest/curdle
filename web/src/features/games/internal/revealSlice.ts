import { createSlice } from "@reduxjs/toolkit";

export interface RevealState {
  running: number;
}

const initialState: RevealState = {
  running: 0,
};

const revealSlice = createSlice({
  name: "reveal",
  initialState,
  reducers: {
    beginReveal(state) {
      state.running += 1;
    },
    endReveal(state) {
      state.running -= 1;
    },
  },
});

export const { beginReveal, endReveal } = revealSlice.actions;

export const revealReducer = revealSlice.reducer;
