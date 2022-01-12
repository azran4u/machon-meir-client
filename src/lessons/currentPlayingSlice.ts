import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "../store/store";
import { Lesson } from "../model/lesson";
import { deserialize } from "../utils/deserialize";


export interface CurrentPlayingState {
  currentPlaying: string;
  currentSeries?: string;
}

const currentPlayingInitialState: CurrentPlayingState = {
  currentPlaying: undefined,
  currentSeries: undefined,
};

export const currentPlayingSlice = createSlice<
  CurrentPlayingState,
  SliceCaseReducers<CurrentPlayingState>
>({
  name: "lessons",
  initialState: currentPlayingInitialState,
  reducers: {
    setCurrentLesson: (state, action: PayloadAction<string>) => {
      state.currentPlaying = action.payload;
    },
    setCurrentSeries: (state, action: PayloadAction<string>) => {
      state.currentSeries = action.payload;
    },
  },
});

export const { setCurrentLesson, setCurrentSeries } =
  currentPlayingSlice.actions;

export const selectCurrentLesson = (state: RootState): Lesson => {
  return deserialize(state.currentPlaying.currentPlaying);
};

export const selectCurrentSeries = (state: RootState): string => {
  return state.currentPlaying?.currentSeries ?? "";
};

export default currentPlayingSlice.reducer;
