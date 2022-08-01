import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import style from './ReviewPlace.module.css'
import { Box } from '@mui/system';

const createData = (category, name, source, approve, discard) => {
  return { category, name, source, approve, discard };
}

const rows = [
  createData("eatery", "quan an", "auto", "Approve", "Discard"),
  createData("earery", "quan banh beo", "user1", "Approve", "Discard"),
]

const ReviewPlace = () => {
  const [rowsPerPage, setRowsPerPage] = useState()
  return (
    <Container component="main" fullWidth>
      <Typography className={style.titleReview} component="h1" variant="h5"> Review place types</Typography>
      <Box className={style.boxReview}>
        <table className={style.tableReview} >
          <tr className={style.headerTabel}>
            <th>Place type category</th>
            <th>Place type name</th>
            <th>Source</th>
            <th colSpan={2}>Action</th>
          </tr>
          <tbody>
            {(rowsPerPage > 0 ? rows.slice(rowsPerPage) : rows).map((row) => (
              <tr key={row.category}>
                <td>{row.category}</td>
                <td>{row.name}</td>
                <td>{row.source}</td>
                <td>{row.approve}</td>
                <td>{row.discard}</td>
              </tr>
            ))}
            <tr className={style.trEnd}>
              <td colSpan={5} ></td>
            </tr>
          </tbody>
        </table>
      </Box>

    </Container>
  )
}

export default ReviewPlace

