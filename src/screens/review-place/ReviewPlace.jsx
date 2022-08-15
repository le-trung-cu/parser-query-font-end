import { useState, useEffect, PureComponent, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { PENDING, useApi } from '../../hooks/use-api';
import { fetchPlaceNamesApi, fetchPlaceNamesByStatusApi } from '../../api/api';
import { StatusButton } from './StatusButton';
import { Chip, FormControl, InputLabel, MenuItem, Pagination, Select, Stack, Box, Typography, TableSortLabel } from '@mui/material';
import { LoadingIcon } from '../../components/LoadingIcon';

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

const mapStatusToString = {
    0: 'Pending',
    1: 'Approval',
    2: 'Disapproval'
}
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

    cellRenderer = ({ cellData, columnIndex, rowData: { status, id }, }) => {
        const { columns, rowHeight, onRowClick, updatedPlaceNameStatus } = this.props;
        if (columnIndex === 3) {
            return [
                <TableCell component="div" key="Approve"
                    width={200}
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
                    <StatusButton status={status} updatedPlaceNameStatus={updatedPlaceNameStatus} placeId={id}>Approve</StatusButton>
                </TableCell>,
                <TableCell component="div" key="Discard"
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
                    <StatusButton status={status} variant={2} updatedPlaceNameStatus={updatedPlaceNameStatus} placeId={id}>
                        Discard
                    </StatusButton>
                </TableCell>]
        }
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

    headerRenderer = ({ label, dataKey, columnIndex }) => {
        const { headerHeight, columns, statusType, setStatusType, order, onChangeOrder } = this.props;
        const chipClickHandler = (status) => {
            if (statusType === status) {
                setStatusType(null);
            } else {
                setStatusType(status);
            }
        }
        if (columnIndex === 3) {
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
                    align={columns[columnIndex].numeric || false ? 'center' : 'center'}
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        <span>{label}</span>
                        <Chip style={{ backgroundColor: statusType === 0?'#ffc46b' : '#a0a0a0', color: '#ffffff' }} label="Pending" onClick={() => chipClickHandler(0)} variant={statusType === 0 ? 'filled' : 'outlined'} />
                        <Chip style={{ backgroundColor: statusType === 1? '#69f669': '#a0a0a0', color: '#ffffff' }} label="Approval" onClick={() => chipClickHandler(1)} variant={statusType === 1 ? 'filled' : 'outlined'} />
                        <Chip style={{ backgroundColor: statusType === 2? '#ff6b6b': '#a0a0a0', color: '#ffffff' }} label="Discard" onClick={() => chipClickHandler(2)} variant={statusType === 2 ? 'filled' : 'outlined'} />
                    </Stack>
                </TableCell>
            );
        }
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
                align={columns[columnIndex].numeric || false ? 'center' : 'center'}>
                <TableSortLabel active={order.orderField === dataKey} direction={order.orderField === dataKey ? order.orderDirection : 'asc'}
                    onClick={(e) => onChangeOrder(dataKey)}>
                    <Box component="span">
                        <span>{label}</span>
                    </Box>
                </TableSortLabel>
            </TableCell>
        );
    };

    render() {
        const { columns, rowHeight, headerHeight, ...tableProps } = this.props;
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
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
const fetchPlaceNameApiAdapter = async ({ filter, sorting, currentPage, pageSize }, statusType) => {
    const mapstatusType = {
        'Pending': 0,
        'Approval': 1,
        'Disapproval': 2,
    }

    const fetchApi = statusType === null ? fetchPlaceNamesApi : fetchPlaceNamesByStatusApi;
    const { items, totalCount } = await fetchApi({ filter, sorting, skipCount: (currentPage - 1) * pageSize, maxResultCount: pageSize, statusType: statusType });
    const placeNameIds = items.map(item => item.id);
    const placeNames = items.reduce((result, item) => {
        result[item.id] = { ...item, status: mapstatusType[item.status] };
        return result;
    }, {});

    return {
        placeNameIds,
        placeNames,
        totalCount,
    }
}

function useFetchPlaceNames() {
    const [parameters, setParameters] = useState({
        filter: '',
        sorting: '',
        orderField: '',
        orderDirection: '',
        currentPage: 1,
        pageSize: 20,
    })

    const [totalPage, setTotalPage] = useState(0);
    const [statusType, setStatusType] = useState(null);

    const { data, error, exce, status, setData } = useApi(fetchPlaceNameApiAdapter);
    const fetchTimeoutId = useRef(null);
    useEffect(() => {
        if (fetchTimeoutId.current !== null) {
            clearTimeout(fetchTimeoutId.current);
        }
        fetchTimeoutId.current = setTimeout(() => {
            let sorting = '';
            if (parameters.orderField.length > 0) {
                sorting = parameters.orderField + ' ' + parameters.orderDirection;
            }
            exce({ ...parameters, sorting }, statusType);
            fetchTimeoutId.current = null;
        })

        return () => clearTimeout(fetchTimeoutId.current);
    }, [parameters, exce, statusType]);

    useEffect(() => {
        setParameters(current => ({ ...current, currentPage: 1 }))
    }, [statusType])

    useEffect(() => {
        if (data?.totalCount > 0 && parameters.pageSize > 0 && status !== PENDING) {
            setTotalPage(Math.ceil(data.totalCount / parameters.pageSize))
        }
    }, [parameters, data, status])

    const updatedPlaceNameStatus = (updatePlace) => {
        setData(current => ({
            ...current,
            placeNames: { ...current.placeNames, [updatePlace.id]: updatePlace }
        }))
        // setData((current) => {
        //     const items = current.items.map(item => {
        //         if (item.id === updatePlace.id) {
        //             return updatePlace;
        //         }
        //         return item;
        //     })
        //     return {
        //         ...current,
        //         items,
        //     }
        // })
    }
    return {
        status,
        placeNameData: data ?? {},
        error,
        parameters,
        setParameters,
        updatedPlaceNameStatus,
        totalPage,
        statusType,
        setStatusType,
    }
}

export function ReviewPlace() {

    const {
        error,
        placeNameData,
        parameters,
        setParameters,
        status,
        updatedPlaceNameStatus,
        totalPage,
        statusType,
        setStatusType,
    } = useFetchPlaceNames();

    function orderChangeHandler(orderField) {

        let orderDirection = 'asc';
        if (orderField === parameters.orderField) {
            if (parameters.orderDirection === 'asc') {
                orderDirection = 'desc';
            } else if (parameters.orderDirection === 'desc') {
                orderDirection = 'asc';
            }
        }
        setParameters(current => ({ ...current, orderField, orderDirection }))
    }

    return (
        <div>
            <Typography
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '10px 0 30px 0',
                }}
                component="h1"
                variant="h5"
            >List place type</Typography>
            <Box paddingBottom={5}>
                <Paper elevation={0} style={{ width: 940, margin: "auto", padding: "0 0 20px" }}>
                    <Stack style={{ height: "calc(100vh - 90px)", width: 940, margin: "auto" }}>
                        <LoadingIcon loading={status === PENDING} delay={500}>
                            <Paper elevation={0} style={{flex: "1 1 0"}}>
                                <VirtualizedTable
                                    rowCount={placeNameData?.placeNameIds?.length ?? 0}
                                    rowGetter={({ index }) => placeNameData?.placeNames?.[placeNameData?.placeNameIds?.[index]]}
                                    columns={[
                                        {
                                            width: 220,
                                            label: 'Place type category',
                                            dataKey: 'placeType',
                                        },
                                        {
                                            width: 250,
                                            label: 'Place type name',
                                            dataKey: 'name',
                                        },
                                        {
                                            width: 120,
                                            label: 'Source',
                                            dataKey: 'source',
                                        },
                                        {
                                            width: 350,
                                            label: 'Action',
                                            dataKey: 'action',
                                        },
                                    ]}
                                    updatedPlaceNameStatus={updatedPlaceNameStatus}
                                    statusType={statusType}
                                    setStatusType={setStatusType}
                                    order={{ orderField: parameters.orderField, orderDirection: parameters.orderDirection }}
                                    onChangeOrder={orderChangeHandler}
                                />
                            </Paper>
                        </LoadingIcon>
                        <Stack direction="row" justifyContent="end" marginTop={2}>
                            <FormControl size="small">
                                <InputLabel id="demo-simple-select-label">Size</InputLabel>
                                <Select
                                    size="small"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={parameters.pageSize}
                                    label="Size"
                                    onChange={(e) => setParameters((current) => ({ ...current, currentPage: 1, pageSize: e.target.value }))}>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                    <MenuItem value={50}>50</MenuItem>
                                    <MenuItem value={100}>100</MenuItem>
                                    <MenuItem value={200}>200</MenuItem>
                                    <MenuItem value={1000}>1000</MenuItem>
                                </Select>
                            </FormControl>
                            <Pagination count={totalPage ?? 0} shape="rounded" page={parameters.currentPage}
                                onChange={(e, page) => setParameters((current) => ({ ...current, currentPage: page }))} />
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
        </div>
    );
}
