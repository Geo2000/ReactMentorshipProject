import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

import Movie from "../types/Movie";

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
    genre,
    poster_path,
  } = movie;

  const navigate = useNavigate();

  const movie_title = name || title;
  const release_year = (first_air_date || release_date).slice(0, 4);
  const movie_description =
    overview.length > 100 ? overview.slice(0, 100) + "..." : overview;

  const handleCardClick = (movie: Movie) => {
    navigate(`/movies/${movie.id}`);
  }

  return (
    <Card sx={{ maxWidth: 260, margin: "20px" }} onClick={() => handleCardClick(movie)}>
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
        <Typography variant="body2">Genre: {genre}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
