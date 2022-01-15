import DataTable, {
  PaginationOptions,
  TableColumn,
} from "react-data-table-component";
import { Link } from "react-router-dom";
import {
  setCurrentLesson,
  setSearchTerm,
} from "../lessons/currentPlayingSlice";
import { Lesson } from "../model/lesson";
import { useAppDispatch } from "../store/hooks";
import { dateFormat } from "../utils/dateFormat";
import { dateSorter } from "../utils/dateSorter";
import serialize from "serialize-javascript";

interface Props {
  data: any;
  resetPaginationToggle: any;
  loading: any;
}
export const LessonsTableComponent: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const paginationComponentOptions: PaginationOptions = {
    selectAllRowsItem: true,
  };
  const columns: TableColumn<Lesson>[] = [
    {
      name: "תגיות",
      wrap: true,
      right: true,
      cell: (row) => (
        <div style={{ textAlign: "right", direction: "rtl" }}>
          {row.tags.map((tag) => {
            return (
              <div onClick={() => dispatch(setSearchTerm(tag))}>{tag}</div>
            );
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
      cell: (row) => {
        return (
          <div style={{ textAlign: "right", direction: "rtl" }}>
            <Link<{ lesson: Lesson }>
              to={{
                pathname: `media/${row.id}`,
              }}
              onClick={() => dispatch(setCurrentLesson(serialize(row)))}
            >
              {row.title}
            </Link>
          </div>
        );
      },
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
  return (
    <div>
      {props.data && (
        <DataTable
          columns={columns}
          data={props.data}
          pagination
          paginationResetDefaultPage={props.resetPaginationToggle}
          paginationComponentOptions={paginationComponentOptions}
          progressPending={props.loading}
          highlightOnHover
          pointerOnHover
          persistTableHead
          fixedHeader
          keyField="id"
        />
      )}
    </div>
  );
};
