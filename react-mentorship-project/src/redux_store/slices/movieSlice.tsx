import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { API_KEY } from '../../constants';
import Movie from '../../types/Movie';

interface MoviesState {
  movies: Movie[];
  popularMovies: Movie[],
  topRatedMovies: Movie[],
  watchlist: Movie[];
  favourites: Movie[];
}

const initialState: MoviesState = {
  movies: [],
  popularMovies: [],
  topRatedMovies: [],
  watchlist: [],
  favourites: [],
};

interface Filters {
  title?: string;
  genre?: string;
  releaseYear?: string;
  actor?: string;
}

export const fetchMovies = createAsyncThunk<Movie[], Filters, { state: RootState }>(
  'movies/fetchMovies',
  async ({ title, genre, releaseYear, actor }) => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

    if (title) {
      url = `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${API_KEY}`;
    }
    if (genre) {
      url += `&with_genres=${genre}`;
    }
    if (releaseYear) {
      url += `&primary_release_year=${releaseYear}`;
    }
    if (actor) {
      url += `&with_cast=${actor}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  }
);

export const fetchPopularMovies = createAsyncThunk<Movie[]>(
  'movies/fetchPopularMovies',
  async () => {
    let url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  }
);

export const fetchTopRatedMovies = createAsyncThunk<Movie[]>(
  'movies/fetchTopRatedMovies',
  async () => {
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  }
);

export const fetchWatchlist = createAsyncThunk('movies/fetchWatchlist', async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRhMDA2MjcwMTNkOTRiMDAxZGI5NjUxMjI5OTFkNSIsIm5iZiI6MTcyMjgwNTg5MC4wNjY5OTgsInN1YiI6IjY1ZmQ3YjdjN2Y2YzhkMDE3YzZmMGZjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BIgmgipfgJFlABU5B1xjp3T1RPxAcSLL_l72sS4MuiE'
    }
  };
  const response = await fetch(`https://api.themoviedb.org/3/account/21128692/watchlist/movies?api_key=${API_KEY}`, options);
  return (await response.json()).results;
});

export const fetchFavourites = createAsyncThunk('movies/fetchFavourites', async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzRhMDA2MjcwMTNkOTRiMDAxZGI5NjUxMjI5OTFkNSIsIm5iZiI6MTcyMjgwNTg5MC4wNjY5OTgsInN1YiI6IjY1ZmQ3YjdjN2Y2YzhkMDE3YzZmMGZjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BIgmgipfgJFlABU5B1xjp3T1RPxAcSLL_l72sS4MuiE'
    }
  };
  const response = await fetch(`https://api.themoviedb.org/3/account/21128692/favorite/movies?api_key=${API_KEY}`, options);
  return (await response.json()).results;
});


const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovieToWatchlist(state, action: PayloadAction<Movie>) {
      state.watchlist.push(action.payload);
    },
    addMovieToFavourites(state, action: PayloadAction<Movie>) {
      state.favourites.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.movies = action.payload;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.popularMovies = action.payload;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.topRatedMovies = action.payload;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.watchlist = action.payload;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.favourites = action.payload;
      })
  },
});

export const { addMovieToWatchlist, addMovieToFavourites } = moviesSlice.actions;

export default moviesSlice.reducer;
