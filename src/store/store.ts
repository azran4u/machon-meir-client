import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import lessonsReducer from "../lessons/lessonsSlice";
import currentPlayingReducer from "../lessons/currentPlayingSlice";

export const store = configureStore({
  reducer: {
    lessons: lessonsReducer,
    currentPlaying: currentPlayingReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
