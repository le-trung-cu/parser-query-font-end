import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TablePagination from '@mui/material/TablePagination';
import style from './ListPlace.module.css';
import { getPlaceApi } from '../../api/placeListApi';

const listData = (category, name, source, id) => {
  return { category, name, source, id };
}
// const rows = [
//   listData ("eatery", "quan an", "auto"),
//   listData ("eatery", "quan banh beo", "manual (user1)"),
//   listData ("d", "3", "xs"),
// ];


const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  { id: "category", label: "Place type category" },
  { id: "name", label: "Place type name" },
  { id: "source", label: "Source" },
];

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };


  return (
    <TableHead className={style.tableTitle}>
      <TableRow className={style.tableHeader}>
        {headCells.map(headCell => (
          <TableCell className={style.tableCell}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={style.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export const ListPlace = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const [rows, setRows] = useState([
    listData("eatery", "quan an", "auto", 1),
    listData("eatery", "quan banh beo", "manual (user1)", 2),

  ])
  // call api
  async function getPlaces() {
    const { items, totalCount } = await getPlaceApi();

    const rows = items.map(item => listData(item.placeType, item.name, item.source, item.id));
    setRows(rows);
  }
  useEffect(() => {
    getPlaces();
  }, [])
  // listpage
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //Avoid a layout jump when reaching the last page with empty rows.

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <Container>
      <Typography className={style.titleList} component="h1" variant="h5"> List place type</Typography>
      <TableContainer className={style.tableList} >
        <Table>
          <EnhancedTableHead
            
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody >
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {

                return (
                  <TableRow className={style.tablerow} key={row.id}>
                    <TableCell className={style.tablerow} align="left" >{row.category}</TableCell>
                    <TableCell className={style.tablerow} align="left">{row.name}</TableCell>
                    <TableCell className={style.tablerow} align="left">{row.source}</TableCell>
                  </TableRow>
                );
              }
              )}
            <TableRow>
              <TableCell colSpan={3} className={style.tablerow}>
                <div className={style.buttonExport}>
                  <button>Export</button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  )
}