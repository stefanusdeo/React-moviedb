import { Grid, Skeleton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFilm, getDetailFilm } from '../redux/slice/filmSlice';
import StarIcon from '@mui/icons-material/Star';

export default function DetailFilm() {
  const { id } = useParams();
  const [loadingData, setLoadingData] = useState(false);
  const dispatch = useDispatch();
  const detail = useSelector(getFilm);

  const fetchingDetail = async () => {
    setLoadingData(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=2fccde01a371b106b09a241d6d1d5b49`
      )
      .then((res) => {
        dispatch(getDetailFilm(res.data));
        setLoadingData(false);
      });
  };

  useEffect(() => {
    fetchingDetail();
  }, []);

  console.log(detail);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h5'>Detail Film</Typography>
      </Grid>
      <Grid item xs={12} md={4} sx={{ mt: 2 }}>
        {loadingData ? (
          <Skeleton
            variant='rectangular'
            height={500}
            style={{ borderRadius: '20em' }}
          />
        ) : (
          <img
            style={{ borderRadius: '20em' }}
            height={500}
            alt={detail.detail.title}
            src={`https://image.tmdb.org/t/p/w500${detail.detail.poster_path}`}
          />
        )}
      </Grid>
      <Grid item container spacing={1} xs={12} md={8} sx={{ mt: 2 }}>
        <Grid item sx={12}>
          {loadingData ? (
            <Stack direction='column' spacing={1}>
              <Skeleton variant='text' sx={{ fontSize: '10rem' }} width={700} />
              <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
              <Skeleton variant='text' sx={{ fontSize: '5rem' }} />
            </Stack>
          ) : (
            <Stack direction='column' spacing={1}>
              <Typography variant='h3'>{detail.detail.title}</Typography>
              <Typography variant='h5'>{detail.detail.tagline}</Typography>
              <Typography variant='body2'>{detail.detail.overview}</Typography>
            </Stack>
          )}
          <Stack direction='row' spacing={1} sx={{ mt: 2 }}>
            {loadingData ? (
              <Skeleton variant='text' sx={{ fontSize: '5rem' }} width={100} />
            ) : (
              <Typography variant='h5'>
                <StarIcon />
                {`${detail?.detail.vote_average}/10`}
              </Typography>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}
