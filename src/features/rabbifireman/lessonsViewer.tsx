import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Lesson } from "./rabbifiremanSlice";

interface Column {
  id: "date" | "title" | "tags";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: any) => string;
}

const columns: readonly Column[] = [
  {
    id: "date",
    label: "תאריך",
    minWidth: 170,
    format: (dateString: string) => {
      const date = new Date(dateString);

      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },
  },
  { id: "title", label: "כותרת", minWidth: 100 },
  {
    id: "tags",
    label: "תגיות",
    minWidth: 170,
  },
];

// interface Data {
//   name: string;
//   code: string;
//   population: number;
//   size: number;
//   density: number;
// }

// function createData(
//   name: string,
//   code: string,
//   population: number,
//   size: number
// ): Data {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData("India", "IN", 1324171354, 3287263),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("United States", "US", 327167434, 9833520),
//   createData("Canada", "CA", 37602103, 9984670),
//   createData("Australia", "AU", 25475400, 7692024),
//   createData("Germany", "DE", 83019200, 357578),
//   createData("Ireland", "IE", 4857000, 70273),
//   createData("Mexico", "MX", 126577691, 1972550),
//   createData("Japan", "JP", 126317000, 377973),
//   createData("France", "FR", 67022000, 640679),
//   createData("United Kingdom", "GB", 67545757, 242495),
//   createData("Russia", "RU", 146793744, 17098246),
//   createData("Nigeria", "NG", 200962417, 923768),
//   createData("Brazil", "BR", 210147125, 8515767),
// ];

export interface LessonViewerComponentProps {
  lessons: Lesson[];
}

export const LessonViewerComponent: React.FC<LessonViewerComponentProps> = ({
  lessons,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onTagClick = (tag: string) => {
    console.log(`tag ${tag} clicked`);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "none" }}>
      <TableContainer sx={{}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {lessons &&
              lessons
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === "title") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <a href={row.mediaUrl}>
                                {column.format ? column.format(value) : value}
                              </a>
                            </TableCell>
                          );
                        }
                        if (column.id === "tags") {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value.map((tag) => (
                                <div onClick={() => onTagClick(tag)}>{tag}</div>
                              ))}
                            </TableCell>
                          );
                        } else
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? column.format(value) : value}
                            </TableCell>
                          );
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100, 1000]}
        component="div"
        count={lessons.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
