import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import moviesReducer from './slices/movieSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
