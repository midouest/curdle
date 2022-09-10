import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

const selectReveal = (state: RootState) => state.reveal;

export const selectRevealRunning = createSelector(
  [selectReveal],
  (reveal) => reveal.running > 0
);

export const selectRevealComplete = createSelector(
  [selectRevealRunning],
  (running) => !running
);
