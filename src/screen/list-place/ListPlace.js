import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import style from './ListPlace.module.css';

const listData = (category, name, source) => {
  return { category, name, source };
}
const rows = [
  listData ("eatery", "quan an", "auto"),
  listData ("eatery", "quan banh beo", "manual (user1)"),
]
const ListPlace = () => {
  const [rowsList, setRowsList] = useState();
  return (
    <Container component="main" fullWidth>
      <Box>
        <Typography className={style.titleList} component="h1" variant="h5">List place types</Typography>
        <Box className={style.boxTable}>
          <table className={style.tableList}>
            <tr className={style.tableTitle}>
              <th>Place type category</th>
              <th>Place type name</th>
              <th>Source</th>
            </tr>
            <tbody>
              {
                (rowsList > 0 ? rows.slice(rowsList) : rows).map((row) => (
                  <tr key={row.category}>
                    <td>{row.category}</td>
                    <td>{row.name}</td>
                    <td>{row.source}</td>
                  </tr>
                ))
              }
              <tr >
                <td colSpan={3} >
                  <div className={style.buttonExport}><button>Export</button></div>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Box>
    </Container>
  )
}

export default ListPlace