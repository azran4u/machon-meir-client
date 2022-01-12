import React, { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { selectLessons } from "../lessons/lessonsSlice";
import { LastScrapComponent } from "./lastScrapComponent";
import { SearchComponent } from "./searchComponent";
import { LessonsTableComponent } from "./lessonsTableComponent";

export const LessonComponentWraper: React.FC = () => {
  const { snapshot, loading, error } = useAppSelector(selectLessons);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const [filterText, setFilterText] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState(snapshot.lessons);
  const [data, setData] = React.useState(filteredItems);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  useEffect(() => {
    setData(filteredItems);
  }, [filteredItems]);

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

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
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
          onClear={handleClear}
          filterText={filterText}
          onPlaySeries={() => console.log("play series")}
        />
        <LessonsTableComponent
          data={data}
          resetPaginationToggle={resetPaginationToggle}
          loading={loading}
          setFilterText={setFilterText}
        />
      </div>
    );
  }
};
