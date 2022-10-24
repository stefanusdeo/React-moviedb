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
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TableHeader from '../components/TableHeader';
import {
  addFilm,
  getFilm,
  getTotalFilm,
} from '../redux/slice/filmSlice';

const TABLE_HEAD = [
  { align: 'left', lable: 'Id' },
  { align: 'center', lable: 'Poster' },
  { align: 'center', lable: 'Title' },
  { align: 'center', lable: 'Ratting' },
];

export default function Film() {
  const dispatch = useDispatch();
  const films = useSelector(getFilm);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
    fetchingFilm(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchingFilm = async (onPage) => {
    const payload = {
      api_key: '2fccde01a371b106b09a241d6d1d5b49',
      page: onPage || page + 1,
    };
    await axios
      .get(`https://api.themoviedb.org/3/movie/upcoming`, {
        params: payload,
      })
      .then((res) => {
        dispatch(addFilm(res.data.results));
        dispatch(getTotalFilm(res.data.total_results));
      });
  };
  useEffect(() => {
    fetchingFilm();
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant='h5'>List Film</Typography>
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHeader listHead={TABLE_HEAD} />
            <TableBody>
              {films.films.map((row, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell component='th' align='left' scope='row'>
                      {row.id}
                    </TableCell>
                    <TableCell align='center' scope='row'>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${row.poster_path}`}
                        alt={row.title}
                        height='150'
                        weight='50'
                        loading='lazy'
                      />
                    </TableCell>
                    <TableCell align='center' scope='row'>
                      <Typography
                        style={{ textDecoration: 'none', boxShadow: 'none' }}
                        variant='h6'
                        noWrap
                        component={Link}
                        to={`/detail/film/${row.id}`}
                        color='textPrimary'
                        underline='none'
                      >
                        {row.title}
                      </Typography>
                    </TableCell>
                    <TableCell align='center' scope='row'>
                      {row.vote_average}
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
                  count={films.total}
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
    // {films.map((data) => (

    //     ))}
  );
}
