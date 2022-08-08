import { useState, useEffect, PureComponent } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { fetchPlaceNamesApi } from '../../api/api'
import { Pagination, Typography, Container, Stack, FormControl, InputLabel, Select, MenuItem, TableContainer } from '@mui/material'
import style from './ListPlace.module.css';
const classes = {
  flexContainer: 'ReactVirtualizedDemo-flexContainer',
  tableRow: 'ReactVirtualizedDemo-tableRow',
  tableRowHover: 'ReactVirtualizedDemo-tableRowHover',
  tableCell: 'ReactVirtualizedDemo-tableCell',
  noClick: 'ReactVirtualizedDemo-noClick',
};

const styles = ({ theme }) => ({
  // temporary right-to-left patch, waiting for
  // https://github.com/bvaughn/react-virtualized/issues/454
  '& .ReactVirtualized__Table__headerRow': {
    ...(theme.direction === 'rtl' && {
      paddingLeft: '0 !important',
    }),
    ...(theme.direction !== 'rtl' && {
      paddingRight: undefined,
    }),
  },
  [`& .${classes.flexContainer}`]: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  [`& .${classes.tableRow}`]: {
    cursor: 'pointer',
  },
  [`& .${classes.tableRowHover}`]: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  [`& .${classes.tableCell}`]: {
    flex: 1,

  },
  [`& .${classes.noClick}`]: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, rowHeight, onRowClick } = this.props;
    return (
      <TableCell

        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{
          height: rowHeight,
          borderRight: '1px solid #e0e0e0', 
          borderLeft: columnIndex === 0 ? '1px solid #e0e0e0' : '' 
        }}
      >
        {cellData}
      </TableCell>

    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{
          height: headerHeight,
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'rgb(183, 183, 184)',
          fontWeight: 'bold',
          borderRight: '1px solid #e0e0e0',
        }}
        
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={style.table}
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = styled(MuiVirtualizedTable)(styles);

// ---

export function ListPlace() {
  const [pageTotal, setPageTotal] = useState(5)
  const [rows, setRows] = useState([]);
  const [parameters, setParameters] = useState({
    filter: '', sorting: '', currentPage: 1, pageSize: 50
  })
  async function fetchPlaceNames() {
    const { items, totalCount } = await fetchPlaceNamesApi({
      // onclick number change page of Pagination
      filter: '',
      sorting: '',
      skipCount: (parameters.currentPage - 1) * parameters.pageSize,
      maxResultCount: parameters.pageSize,
    })
    setRows(items);
    setPageTotal(Math.ceil(totalCount / parameters.pageSize));
  }
  useEffect(() => {
    fetchPlaceNames();
  }, [parameters])
  const handleChangePage = (e, page) => {
    // parameters.currentPage = page;
    // setParameters(currentPage)
    setParameters((currentParameters) => ({ ...currentParameters, currentPage: page }));
  }
  const handleChangeSelectPage = (event) => {
    setParameters((currentParameters) => ({ ...currentParameters, pageSize: event.target.value, currentPage: 1 }))
  }
  return (
    <div>
      <Typography className={style.titleList} component="h1" variant="h5"> List place type</Typography>
      <Container  >
        <TableContainer elevation={0} className={style.paperList}>
          <VirtualizedTable

            rowCount={rows.length}
            rowGetter={({ index }) => rows[index]}
            columns={[
              {
                width: 380,
                label: 'place type category',
                dataKey: 'placeType',
              },
              {
                width: 380,
                label: 'place type name',
                dataKey: 'name',
                numeric: true,
              },
              {
                width: 380,
                label: 'source',
                dataKey: 'source',
                numeric: true,
              }
            ]}
          />

        </TableContainer>
        <Stack direction="row" justifyContent="end" marginTop={2}>
          <FormControl size="small">
            <InputLabel id="demo-simple-select-label">Size</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={parameters.pageSize}
              label="Size"
              onChange={handleChangeSelectPage}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={200}>200</MenuItem>
              <MenuItem value={1000}>1000</MenuItem>
            </Select>
          </FormControl>
          <Pagination count={pageTotal} page={parameters.currentPage} onChange={handleChangePage} shape="rounded" />
        </Stack>
      </Container>
    </div>
  );
}
