import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { DataGrid } from '@mui/x-data-grid';
import style from './ReviewPlace.module.css'


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
  return (
    <TableContainer className={style.tableReview}>
      <Table>
      <TableHead className={style.tableTitle}>
        <TableRow className={style.tablerow}>
          <TableCell className={style.tableCell} onClick={() => requestSort("category")}>Place type category</TableCell>
          <TableCell className={style.tableCell} onClick={() => requestSort("name")}>Place type name</TableCell>
          <TableCell className={style.tableCell} onClick={() => requestSort("source")}>Source</TableCell>
          <TableCell className={style.tableCell} colSpan={2}>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id} className={style.tablerow}>
            <TableCell className={style.tablerow}>{item.category}</TableCell>
            <TableCell className={style.tablerow}>{item.name}</TableCell>
            <TableCell className={style.tablerow}>{item.source}</TableCell>
            <TableCell className={style.tablerow}>{item.approve}</TableCell>
            <TableCell className={style.tablerow}>{item.discard}</TableCell>
          </TableRow>
        ))}
        <TableRow  className={style.tablerow}>
          <TableCell colSpan={5} className={style.tablerow}></TableCell>
        </TableRow>
      </TableBody>
      </Table>
    </TableContainer>
  );
};

const ReviewPlace = () => {
  return (
    <Container fullWidth>
    <Typography component="h1" variant="h5" className={style.titleReview}>Review place types</Typography>
      <ProductTable
        products={[
          { id: 1, category: "eatery", name: "quan an", source: "Auto", approve: "Approve", discard: "Discard" },
          { id: 2, category: "eatery", name: "quan banh beo", source: "manual (user1)", approve: "Approve", discard: "Discard" },
          { id: 3, category: "Yoghurt", name: "atm", source: "hi", approve: "Approve", discard: "Discard" },
          { id: 4, category: "eatery", name: "quan an", source: "Auto", approve: "Approve", discard: "Discard" },
          { id: 5, category: "eatery", name: "quan banh beo", source: "manual (user1)", approve: "Approve", discard: "Discard" },
          { id: 6, category: "Yoghurt", name: "atm", source: "hi", approve: "Approve", discard: "Discard" },
        ]}
      />
    </Container>
  );
}
export default ReviewPlace


/* https://codesandbox.io/s/table-sort-lmmib?file=/src/styles.css */