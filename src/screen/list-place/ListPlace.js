import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import style from './ListPlace.module.css';

const listData = (category, name, source) => {
  return { category, name, source };
}
const rows = [
  listData ("eatery", "quan an", "auto"),
  listData ("eatery", "quan banh beo", "manual (user1)"),
  listData ("d", "3", "xs"),
];

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
  { id: "category", label: "Place type category"},
  { id: "name",  label: "Place type name" },
  { id: "source",  label: "Source" },
];

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort} = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className ={style.tableTitle}>
      <TableRow className ={style.tableHeader}>
        {headCells.map(headCell => (
          <TableCell className={style.tableCell}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
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
const ListPlace = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  return (
    <Container fullWidth>
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
              {stableSort(rows, getComparator(order, orderBy)).map(
                (row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow className={style.tablerow}>
                      <TableCell className={style.tablerow} align="left" id={labelId}>{row.category}</TableCell>
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
    </Container>
  )
}

export default ListPlace