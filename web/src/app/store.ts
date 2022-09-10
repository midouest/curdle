import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { revealReducer } from "../features/games/internal";

export const store = configureStore({
  reducer: {
    reveal: revealReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
