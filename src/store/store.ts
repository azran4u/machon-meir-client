import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import rabbifiremanReducer from "../lessons/lessonsSlice";

export const store = configureStore({
  reducer: {
    rabbifireman: rabbifiremanReducer,
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
