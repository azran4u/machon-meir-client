import {
  createSelector,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "../store/store";
import { Lesson } from "../model/lesson";
import { deserialize } from "../utils/deserialize";
import { selectLessons } from "./lessonsSlice";

export interface CurrentPlayingState {
  lessonSerialized: string;
  searchTerm: string;
}

const currentPlayingInitialState: CurrentPlayingState = {
  lessonSerialized: undefined,
  searchTerm: "",
};

export const currentPlayingSlice = createSlice<
  CurrentPlayingState,
  SliceCaseReducers<CurrentPlayingState>
>({
  name: "lessons",
  initialState: currentPlayingInitialState,
  reducers: {
    setCurrentLesson: (state, action: PayloadAction<string>) => {
      state.lessonSerialized = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setCurrentLesson, setSearchTerm } = currentPlayingSlice.actions;

export const selectCurrentPlayingInitialState = (state: RootState) =>
  state.currentPlaying;

export const selectCurrentLesson = createSelector(
  selectCurrentPlayingInitialState,
  (state) => deserialize<Lesson>(state.lessonSerialized)
);

export const selectSearchTerm = createSelector(
  selectCurrentPlayingInitialState,
  (state) => state.searchTerm
);

export const selectLessonsWithSearchTerm = createSelector(
  selectSearchTerm,
  selectLessons,
  (searchTerm, lessons) =>
    lessons.filter(
      (item) =>
        (item.title &&
          item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.tags &&
          item.tags.join(" ").toLowerCase().includes(searchTerm.toLowerCase()))
    )
);

export const selectSeriesNextLesson = createSelector(
  selectCurrentLesson,
  selectLessonsWithSearchTerm,
  (lesson, lessons) => {
    const res = lessons.reduce<{
      diff: number;
      lesson: Lesson;
    }>(
      (acc, curr) => {
        const diff = curr.date.getTime() - lesson.date.getTime();
        if (diff > 0 && diff < acc.diff) return { diff, lesson: curr };
        else return acc;
      },
      { diff: Infinity, lesson: null }
    );
    return res.lesson ?? lesson;
  }
);

export const selectSeriesPrevLesson = createSelector(
  selectCurrentLesson,
  selectLessonsWithSearchTerm,
  (lesson, lessons) => {
    const res = lessons.reduce<{
      diff: number;
      lesson: Lesson;
    }>(
      (acc, curr) => {
        const diff = curr.date.getTime() - lesson.date.getTime();
        if (diff < 0 && diff > acc.diff) return { diff, lesson: curr };
        else return acc;
      },
      { diff: -Infinity, lesson: null }
    );
    return res.lesson ?? lesson;
  }
);

export default currentPlayingSlice.reducer;
