import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "../store/store";
import { Lesson } from "./lessonModel";
import { fetchLessons } from "./lessonsService";

export interface LessonsState {
  lessons: Lesson[];
  loading: boolean;
  error: string | undefined;
}

const initialState: LessonsState = {
  lessons: [],
  loading: false,
  error: undefined,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchLessonsAsync = createAsyncThunk<Lesson[]>(
  "lessons/fetchLessons",
  async () => {
    const lessons = await fetchLessons();
    return lessons;
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
        if (_.isEqual(state.lessons, action.payload)) {
          return {
            ...state,
            error: undefined,
            loading: false,
          };
        }
        return {
          ...state,
          lessons: action.payload,
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

export const selectLessons = (state: RootState) => state.lessons;

export default lessonsSlice.reducer;
