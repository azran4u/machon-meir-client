import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectLessons } from "../lessons/lessonsSlice";
import { LastScrapComponent } from "./lastScrapComponent";
import { SearchComponent } from "./searchComponent";
import { LessonsTableComponent } from "./lessonsTableComponent";
import {
  setCurrentLesson,
  setCurrentSeries,
  setCurrentSeriesLesson,
} from "../lessons/currentPlayingSlice";
import serialize from "serialize-javascript";
import { useHistory } from "react-router-dom";

export const LessonComponentWraper: React.FC = () => {
  const { snapshot, loading, error } = useAppSelector(selectLessons);
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const [filterText, setFilterText] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState(snapshot.lessons);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  useEffect(() => {
    setFilteredItems(
      snapshot.lessons.filter(
        (item) =>
          (item.title &&
            item.title.toLowerCase().includes(filterText.toLowerCase())) ||
          (item.tags &&
            item.tags
              .join(" ")
              .toLowerCase()
              .includes(filterText.toLowerCase()))
      )
    );
  }, [snapshot, filterText]);

  const clearSearch = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  const playSeries = () => {
    if (filterText) {
      const currentSeriesLesson = filteredItems.reduce((acc, current) => {
        if (!acc) return current;
        if (!current.date) return acc;
        if (current.date < acc.date) return current;
      }, undefined);
      dispatch(setCurrentSeriesLesson(serialize(currentSeriesLesson)));
      dispatch(setCurrentSeries(filterText));
      dispatch(setCurrentLesson(serialize(currentSeriesLesson)));
      history.push("/media");
      console.log(filterText);
      console.log(JSON.stringify(currentSeriesLesson));
    }
  };

  if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <div>
        <LastScrapComponent date={snapshot.date} />
        <SearchComponent
          onFilter={(e: any) => setFilterText(e.target.value)}
          onClear={clearSearch}
          filterText={filterText}
          onPlaySeries={playSeries}
        />
        <LessonsTableComponent
          data={filteredItems}
          resetPaginationToggle={resetPaginationToggle}
          loading={loading}
          setFilterText={setFilterText}
        />
      </div>
    );
  }
};
