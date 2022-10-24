import {
  createSlice,
} from '@reduxjs/toolkit';

const initialState = {
  films: [],
  total: 0,
  detail: {},
};

const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    addFilm: (state, action) => {
      state.films = action.payload;
    },
    getTotalFilm: (state, action) => {
      state.total = action.payload;
    },
    getDetailFilm: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const { addFilm, getTotalFilm, getDetailFilm } = filmSlice.actions;
export const getFilm = (state) => state.film;
export default filmSlice.reducer;
