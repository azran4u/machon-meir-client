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
import { Lesson } from "../model/lesson";
import { Link } from "react-router-dom";

export const LessonComponent: React.FC = () => {
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
        <div style={{ textAlign: "right", direction: "rtl" }}>
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
        <div style={{ textAlign: "right", direction: "rtl" }}>
          <Link<{ lesson: Lesson }>
            to={{
              pathname: "media",
              state: {
                lesson: row,
              },
            }}
          >
            {row.title}
          </Link>
        </div>
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

  function datePipe(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <div>
        <h5 key="header">
          השיעורים עודכנו לאחרונה בתאריך {datePipe(snapshot.date)}
        </h5>
        <div key="table">
          {snapshot.lessons && (
            <DataTable
              columns={columns}
              data={data}
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
              keyField="id"
            />
          )}
        </div>
      </div>
    );
  }
};
