import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Category, DetailFilm, Film } from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <Container>
        <AppBar component='nav'>
          <Toolbar>
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Movie DB
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Link to='/' style={{ textDecoration: 'none' }}>
                <Button sx={{ color: '#fff' }}>Category</Button>
              </Link>
              <Link to='/film' style={{ textDecoration: 'none' }}>
                <Button sx={{ color: '#fff' }}>Film</Button>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ mt: 10 }}>
          <Routes>
            <Route path='/' element={<Category />} />
            <Route path='/film' element={<Film />} />
            <Route path='/detail/film/:id' element={<DetailFilm />} />
          </Routes>
        </Box>
      </Container>
    </BrowserRouter>
  );
}
