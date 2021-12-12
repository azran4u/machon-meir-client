import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { RabbiEnum } from "../model/rabi.enum";
import { Snapshot, SnapshotSerializable } from "../model/snapshot";
import { RootState } from "../store/store";
import { fetchLessonsByRabbi } from "./lessonsService";

export interface LessonsState<T> {
  snapshot: T;
  loading: boolean;
  error: string | undefined;
}

const initialState: LessonsState<SnapshotSerializable> = {
  snapshot: { date: undefined, rabbi: RabbiEnum.RABBI_FIREMAN, lessons: [] },
  loading: false,
  error: undefined,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchLessonsAsync = createAsyncThunk<SnapshotSerializable>(
  "lessons/fetchLessons",
  async () => {
    const snapshot = await fetchLessonsByRabbi(RabbiEnum.RABBI_FIREMAN);
    return {
      ...snapshot,
      date: snapshot.date.getTime(),
      lessons: snapshot.lessons.map((lesson) => {
        return { ...lesson, date: lesson.date.getTime() };
      }),
    };
  }
);

export const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessonsAsync.pending, (state) => {
        return {
          ...state,
          error: undefined,
          loading: true,
        };
      })
      .addCase(fetchLessonsAsync.fulfilled, (state, action) => {
        if (_.isEqual(state.snapshot, action.payload)) {
          return {
            ...state,
            error: undefined,
            loading: false,
          };
        }
        return {
          ...state,
          snapshot: action.payload,
          error: undefined,
          loading: false,
        };
      })
      .addCase(fetchLessonsAsync.rejected, (state, action) => {
        return {
          ...state,
          error: action.error.message,
          loading: false,
        };
      });
  },
});

// export const {} = usersSlice.actions;

export const selectLessons = (state: RootState): LessonsState<Snapshot> => {
  return {
    ...state.lessons,
    snapshot: {
      ...state.lessons.snapshot,
      date: new Date(+state.lessons.snapshot.date),
      lessons: state.lessons.snapshot.lessons.map((lesson) => {
        return { ...lesson, date: new Date(lesson.date) };
      }),
    },
  };
};

export default lessonsSlice.reducer;
