import DataTable, {
  PaginationOptions,
  TableColumn,
} from "react-data-table-component";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchLessonsAsync, Lesson, selectLessons } from "../lessons/lessonsSlice";
import { dateFormat } from "../utils/dateFormat";
import { Spinner } from "react-bootstrap";
import { ButtonComponent } from "./buttonComponent";
import styled from "styled-components";

const TextField = styled.input`
  height: 32px;
  width: 60%;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
  text-align: right;
  &:hover {
    cursor: pointer;
  }
  justify-content: center;
`;

const ClearButton = styled(ButtonComponent)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #212529;
`;

// eslint-disable-next-line react/prop-types
const FilterComponent = ({ filterText, onFilter, onClear }: any) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="הקלד מילות חיפוש"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);

const dateSorter = (rowA: Lesson, rowB: Lesson) => {
  const a = new Date(rowA.date).getTime();
  const b = new Date(rowB.date).getTime();

  if (a > b) {
    return 1;
  }

  if (b > a) {
    return -1;
  }

  return 0;
};

const paginationComponentOptions: PaginationOptions = {
  selectAllRowsItem: true,
};

export const LessonComponent: React.FC = () => {
  const columns: TableColumn<Lesson>[] = [
    {
      name: "תגיות",
      // selector: (row) => row.tags.join(","),
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

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLessonsAsync());
  }, [dispatch]);

  const { lessons, loading, error } = useAppSelector(selectLessons);

  const showSpinner = loading;

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

  if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <div>
        {showSpinner && (
          <div className="container_horizontal">
            <Spinner
              animation="border"
              role="status"
              className="spinner item_horizontal"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
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
