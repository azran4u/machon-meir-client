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
  lessonId: string;
  searchTerm: string;
}

const currentPlayingInitialState: CurrentPlayingState = {
  lessonId: undefined,
  searchTerm: "",
};

export const currentPlayingSlice = createSlice<
  CurrentPlayingState,
  SliceCaseReducers<CurrentPlayingState>
>({
  name: "lessons",
  initialState: currentPlayingInitialState,
  reducers: {
    setLessonId: (state, action: PayloadAction<string>) => {
      state.lessonId = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setLessonId, setSearchTerm } = currentPlayingSlice.actions;

export const selectCurrentPlayingInitialState = (state: RootState) =>
  state.currentPlaying;

export const selectSearchTerm = createSelector(
  selectCurrentPlayingInitialState,
  (state) => state.searchTerm
);

export const selectLessonId = createSelector(
  selectCurrentPlayingInitialState,
  (state) => state.lessonId
);

export const selectCurrentLesson = createSelector(
  selectLessonId,
  selectLessons,
  (id, lessons) => lessons.find((x) => x.id === id)
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
