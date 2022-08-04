import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import style from './ReviewPlace.module.css'
import { Button } from "@mui/material";
import { getPlaceApi, changeStatusApi } from '../../api/placeListApi';

const data = (category, name, source, status, id) => {
    return { category, name, source, status, id }
  }

const Review = () => {
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
    
        // const newItems = rows.map(item => {
        //   if(item.id === id){
        //     return {...item, status}
        //   }
        //   return item;
        // })
        // setRows(newItems);
      }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Review