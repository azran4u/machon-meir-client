import DataTable, {
  PaginationOptions,
  TableColumn,
} from "react-data-table-component";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchLessonsAsync, selectLessons } from "../lessons/lessonsSlice";
import { dateFormat } from "../utils/dateFormat";
import { FilterComponent } from "./filterComponent";
import { dateSorter } from "../utils/dateSorter";
import { Lesson } from "../lessons/lessonModel";

export const LessonComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLessonsAsync());
  }, [dispatch]);

  const { lessons, loading, error } = useAppSelector(selectLessons);

  useEffect(() => {
    console.log(error);
  }, [error]);

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = lessons.filter(
    (item) =>
      (item.title &&
        item.title.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.tags &&
        item.tags.join(" ").toLowerCase().includes(filterText.toLowerCase()))
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e: any) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const columns: TableColumn<Lesson>[] = [
    {
      name: "תגיות",
      wrap: true,
      right: true,
      cell: (row) => (
        <div>
          {row.tags.map((tag) => {
            return <div onClick={() => setFilterText(tag)}>{tag}</div>;
          })}
        </div>
      ),
      allowOverflow: true,
    },
    {
      name: "כותרת",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
      right: true,
      cell: (row) => (
        <a href={row.mediaUrl} target="_blank" rel="noopener noreferrer">
          {row.title}
        </a>
      ),
    },
    {
      name: "תאריך",
      selector: (row) => dateFormat(row.date),
      sortable: true,
      sortFunction: dateSorter,
      right: true,
      maxWidth: "120px",
    },
  ];

  const paginationComponentOptions: PaginationOptions = {
    selectAllRowsItem: true,
  };

  if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <div>
        {lessons && (
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            paginationComponentOptions={paginationComponentOptions}
            progressPending={loading}
            highlightOnHover
            pointerOnHover
            persistTableHead
            fixedHeader
          />
        )}
      </div>
    );
  }
};
