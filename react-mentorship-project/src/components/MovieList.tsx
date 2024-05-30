import { useState, useEffect } from "react";
import { TextField } from "@mui/material";

import MovieCard from "./MovieCard";
import Movie from "../types/Movie";
import { API_KEY } from "../constants";
import "../styles/MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => console.error("Error fetching movies: ", error));
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredFilms =
    Array.isArray(movies) &&
    movies.length &&
    movies.filter(
      (movie: any) =>
        movie.title &&
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      <div className="search-input">
        <TextField
          label="Search Movies"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          sx={{
            input: {
              background: "white",
              borderRadius: '10px',
            }
          }}
        />
      </div>
      {Array.isArray(filteredFilms) && filteredFilms.length && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {filteredFilms.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
};

export default MovieList;
