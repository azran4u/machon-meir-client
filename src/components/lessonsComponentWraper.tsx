import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectLessonsSnapshot } from "../lessons/lessonsSlice";
import { LastScrapComponent } from "./lastScrapComponent";
import { SearchComponent } from "./searchComponent";
import { LessonsTableComponent } from "./lessonsTableComponent";
import {
  selectLessonsWithSearchTerm,
  selectSearchTerm,
  setSearchTerm,
} from "../lessons/currentPlayingSlice";

export const LessonComponentWraper: React.FC = () => {
  const dispatch = useAppDispatch();
  const { snapshot, loading, error } = useAppSelector(selectLessonsSnapshot);
  const filteredItems = useAppSelector(selectLessonsWithSearchTerm);
  const searchTerm = useAppSelector(selectSearchTerm);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const clearSearch = () => {
    if (searchTerm) {
      setResetPaginationToggle(!resetPaginationToggle);
      dispatch(setSearchTerm(""));
    }
  };

  if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <div>
        <LastScrapComponent date={snapshot.date} />
        <SearchComponent
          onFilter={(e: any) => dispatch(setSearchTerm(e.target.value))}
          onClear={clearSearch}
          filterText={searchTerm}
        />
        <LessonsTableComponent
          data={filteredItems}
          resetPaginationToggle={resetPaginationToggle}
          loading={loading}
        />
      </div>
    );
  }
};
