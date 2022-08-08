import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import style from './ReviewPlace.module.css'
import { Button } from "@mui/material";
import TablePagination from '@mui/material/TablePagination';
import { getPlaceApi, changeStatusApi } from '../../api/placeListApi';

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


      const handleClick = async ({ id, status }) => {
        const response = await changeStatusApi({ id, status });

        setRows((currentRows) => {
           return  currentRows.map(item => {
                if(item.id === id){
                    return {
                        ...item,
                        status: response.status,
                    }
                }
                return item;
            })
        })
      }

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
    <Typography className={style.titleReview} component="h1" variant="h5"> List place type</Typography>
    <TableContainer>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell className={style.tableCell} >Place type category</TableCell>
            <TableCell className={style.tableCell}>Place type name</TableCell>
            <TableCell className={style.tableCell}>Source</TableCell>
            <TableCell className={style.tableCell} colSpan={2}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} className={style.tablerow}>
                <TableCell className={style.tablerow}>{row.category}</TableCell>
                <TableCell className={style.tablerow}>{row.name}</TableCell>
                <TableCell className={style.tablerow}>{row.source}</TableCell>
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
export default ReviewPlace