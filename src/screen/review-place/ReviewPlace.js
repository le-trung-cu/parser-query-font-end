import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import style from './ReviewPlace.module.css'
import { getPlaceApi, changeStatusApi } from '../../api/placeListApi';
import { Button } from "@mui/material";
import TablePagination from '@mui/material/TablePagination';



const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {

  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const getClassNamesFor = (category) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === category ? sortConfig.direction : undefined;
  };
  
  const handleClick = async ({ id, status }) => {
    const response = await changeStatusApi({ id, status });

    /* setRows((currentRows) => {
      return  currentRows.map(item => {
           if(item.id === id){
               return {
                   ...item,
                   status: response.status,
               }
           }
           return item;
       })
   }) */
    
  }
  // listpage
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //Avoid a layout jump when reaching the last page with empty rows.

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <TableContainer className={style.tableReview}>
        <Table>
          <TableHead className={style.tableTitle}>
            <TableRow className={style.tablerow}>
              <TableCell className={style.tableCell} onClick={() => requestSort("category")}>Place type category</TableCell>
              <TableCell className={style.tableCell} onClick={() => requestSort("name")}>Place type name</TableCell>
              <TableCell className={style.tableCell} onClick={() => requestSort("source")}>Source</TableCell>
              <TableCell className={style.tableCell} >Status</TableCell>
              <TableCell className={style.tableCell} colSpan={2}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id} className={style.tablerow}>
                <TableCell className={style.tablerow}>{row.id}</TableCell>
                <TableCell className={style.tablerow}>{row.category}</TableCell>
                <TableCell className={style.tablerow}>{row.name}</TableCell>
                <TableCell className={style.tablerow}>{row.source}</TableCell>
                <TableCell className={style.tablerow}>{row.status}</TableCell>
                <TableCell className={style.tablerow}>
                  <Button onClick={() => handleClick({ id: row.id, status: 1 })} variant={row.status == '1' ? 'text' : 'contained'}>Approval</Button>
                </TableCell>
                <TableCell className={style.tablerow}>
                  <Button onClick={() => handleClick({ id: row.id, status: 2 })} variant={row.status == '2' ? 'text' : 'contained'}>Discard</Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow className={style.tablerow}>
              <TableCell colSpan={5} className={style.tablerow}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
const data = (category, name, source, status, id) => {
  return { category, name, source, status, id }
}
const ReviewPlace = () => {
  const [rows, setRows] = useState(
    [
      data("eatery", "quan an", "Auto", "Approve", "Discard", 1),

    ]
  )
  async function getReviewPlace() {
    const { items, totalCount } = await getPlaceApi();

    const rows = items.map(item => data(item.placeType, item.name, item.source, item.status, item.id));
    setRows(rows);
  }
  useEffect(() => {
    getReviewPlace();
  }, [])

  return (
    <Container>
      <Typography component="h1" variant="h5" className={style.titleReview}>Review place types</Typography>
      <ProductTable
        products={rows}
      />
    </Container>
  );
}
export default ReviewPlace


/* https://codesandbox.io/s/table-sort-lmmib?file=/src/styles.css */
/* https://codesandbox.io/s/sort-table-with-date-forked-4v0c3q?file=/src/index.js */