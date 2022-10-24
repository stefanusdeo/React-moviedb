import { configureStore } from '@reduxjs/toolkit';

import categoryReducer from './slice/categorySlice';
import filmReducer from './slice/filmSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    film: filmReducer,
  },
});
