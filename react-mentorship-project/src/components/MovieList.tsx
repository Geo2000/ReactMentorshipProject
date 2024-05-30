import { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import Movie from "../types/Movie";
import { API_KEY } from "../constants";

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => console.error("Error fetching movies: ", error));
  }, []);

  return (
    <>
      {Array.isArray(movies) && movies.length && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
};

export default MovieList;
