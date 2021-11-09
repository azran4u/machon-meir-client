import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import lessonsReducer from "../lessons/lessonsSlice";

export const store = configureStore({
  reducer: {
    lessons: lessonsReducer,
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
