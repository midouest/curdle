import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { gameApi } from "../features/games/gameApi";
import { revealReducer } from "../features/games/internal";

export const store = configureStore({
  reducer: {
    reveal: revealReducer,
    [gameApi.reducerPath]: gameApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gameApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
