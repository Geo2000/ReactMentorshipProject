import { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import Movie from "../types/Movie";

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const apiKey = "974a00627013d94b001db965122991d5";

    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        console.log(data);
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
