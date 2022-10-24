import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getCategory = createAsyncThunk(
  'category/getCategory',
  async () => {
    const response = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=2fccde01a371b106b09a241d6d1d5b49'
    );

    return response.data.genres;
  }
);

const categoryEntity = createEntityAdapter({
  selectId: (category) => category.id,
});

const categorySlice = createSlice({
  name: 'category',
  initialState: categoryEntity.getInitialState(),
  extraReducers: {
    [getCategory.fulfilled]: (state, action) => {
      categoryEntity.setAll(state, action.payload);
    },
  },
});

export const categorySelector = categoryEntity.getSelectors(
  (state) => state.category
);
export default categorySlice.reducer;
