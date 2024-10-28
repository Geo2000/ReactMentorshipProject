import { useState, useEffect } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchPopularMovies, fetchTopRatedMovies } from '../redux_store/slices/movieSlice';
import { RootState, AppDispatch } from '../redux_store/store';

import MovieCard from "./MovieCard";
import "../styles/MovieList.css";

const MovieList = () => {
  const dispatch: AppDispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const popularMovies = useSelector((state: RootState) => state.movies.popularMovies);
  const topRatedMovies = useSelector((state: RootState) => state.movies.topRatedMovies);

  const [searchCriterion, setSearchCriterion] = useState('title');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const filters: { [key: string]: string } = {};
    if (inputValue) {
      filters[searchCriterion] = inputValue;
    }
    dispatch(fetchMovies(filters));
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies());
    
  }, [inputValue, searchCriterion, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCriterionChange = (e: any) => {
    setSearchCriterion(e.target.value);
    setInputValue('');
  };

  return (
    <>
      <div className="search-input">
        <FormControl >
          <InputLabel id="search-label"></InputLabel>
          <Select value={searchCriterion} onChange={handleCriterionChange}>
            <MenuItem value="title">Movie Name</MenuItem>
            <MenuItem value="genre">Genre</MenuItem>
            <MenuItem value="releaseYear">Release Year</MenuItem>
            <MenuItem value="actor">Actor</MenuItem>
        </Select>
        </FormControl>
        
        <TextField
          label={`Search by ${searchCriterion}`}
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          sx={{
            input: {
              background: "white",
              borderRadius: '10px',
            }
          }}
        />
      </div>
      <Typography marginLeft={2} variant="h5" component="h1" >Discover movies</Typography>
      {Array.isArray(movies) && movies.length && (
        <Grid container wrap="nowrap" spacing={2} style={{ overflowX: 'auto' }}>
        {movies.map((movie) => (
          <Grid item key={movie.id} style={{ flex: '0 0 auto' }}>
            <MovieCard key={movie.id} movie={movie} />
          </Grid>
        ))}
      </Grid>
      )}

      <Typography marginTop={8} marginLeft={2} variant="h5" component="h1" >Top rated</Typography>
      {Array.isArray(topRatedMovies) && topRatedMovies.length && (
        <Grid container wrap="nowrap" spacing={2} style={{ overflowX: 'auto' }}>
        {topRatedMovies.map((movie) => (
          <Grid item key={movie.id} style={{ flex: '0 0 auto' }}>
            <MovieCard key={movie.id} movie={movie} />
          </Grid>
        ))}
      </Grid>
      )}

      <Typography marginTop={8} marginLeft={2} variant="h5" component="h1" >Trending</Typography>
      {Array.isArray(popularMovies) && popularMovies.length && (
        <Grid container wrap="nowrap" spacing={2} style={{ overflowX: 'auto' }}>
        {popularMovies.map((movie) => (
          <Grid item key={movie.id} style={{ flex: '0 0 auto' }}>
            <MovieCard key={movie.id} movie={movie} />
          </Grid>
        ))}
      </Grid>
      )}
    </>
  );
};

export default MovieList;
