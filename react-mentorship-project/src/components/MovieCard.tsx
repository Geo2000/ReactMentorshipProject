import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

import Movie from "../types/Movie";
import { movieGenres } from '../constants/genres';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const {
    name,
    title,
    overview,
    vote_average,
    first_air_date,
    release_date,
    genre_ids,
    poster_path,
  } = movie;

  const navigate = useNavigate();

  let movie_title = name || title;
  movie_title = movie_title.length > 20 ? movie_title.slice(0, 20) + "..." : movie_title;
  const release_year = (first_air_date || release_date).slice(0, 4);
  const movie_description = overview.length > 36 ? overview.slice(0, 36) + "..." : overview;
  const genreNames = genre_ids.map(id => {
    const genre = movieGenres.find(genre => genre.id === id);
    return genre ? genre.name : null;
  }).filter(name => name !== null).join(", ");

  const handleCardClick = (movie: Movie) => {
    navigate(`/movies/${movie.id}`);
  }

  return (
    <Card sx={{ maxWidth: 300, width: 300, margin: "20px" }} onClick={() => handleCardClick(movie)}>
      <CardMedia
        component="img"
        height="260"
        image={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={movie_title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie_title}
        </Typography>
        <Typography variant="body2">{movie_description}</Typography>
        <Typography variant="body2">Rating: {vote_average}</Typography>
        <Typography variant="body2">Release Year: {release_year}</Typography>
        <Typography variant="body2">Genre: {genreNames}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
