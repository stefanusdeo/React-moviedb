import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableHeader from '../components/TableHeader';
import { categorySelector, getCategory } from '../redux/slice/categorySlice';
const TABLE_HEAD = [
  { align: 'left', lable: 'Id' },
  { align: 'center', lable: 'Name Category' },
];

export default function Category() {
  const dispatch = useDispatch();
  const category = useSelector(categorySelector.selectAll);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant='h5'>List Category</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHeader listHead={TABLE_HEAD} />
            <TableBody>
              {category
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell component='th' align='left' scope='row'>
                        {row.id}
                      </TableCell>
                      <TableCell align='center' scope='row'>
                        {row.name}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  colSpan={3}
                  count={category.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
