import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Container,
  Box,
} from "@mui/material";

import Navbar from "../components/Navbar";
import background from "../assets/img/background.avif";
import "../styles/MovieDetails.css";
import { API_KEY } from "../constants";

export default function MovieDetials() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [cast, setCast] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
        );
        const data = await response.json();
        // console.log(data, "data", response);
        if (!response.ok) {
          setError(data.status_message);
        } else {
          setMovie(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
        );
        const data = await response.json();
        if (response.ok) {
          setCast(data.cast);
        }
      } catch (error) {
        console.error("Error fetching cast details:", error);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Navbar />

      <Container className="movie-details-container">
        <Card className="movie-details-card">
          {error ? (
            <Typography variant="h5">Movie not found</Typography>
          ) : (
            <>
              <CardMedia
                className="movie-details-poster"
                component="img"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <CardContent className="movie-details-content">
                <Typography
                  variant="h4"
                  component="div"
                  className="movie-title"
                >
                  {movie.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="movie-overview"
                >
                  {movie.overview}
                </Typography>
                <Box className="movie-details-extra">
                  <Typography variant="body2" color="text.secondary">
                    <strong>Rating:</strong> {movie.vote_average}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Rating count:</strong> {movie.vote_count}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Release Year:</strong>{" "}
                    {new Date(movie.release_date).getFullYear()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Genre:</strong>{" "}
                    {movie.genres &&
                      movie.genres.map((genre: any) => genre.name).join(", ")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Spoken language:</strong>{" "}
                    {movie.spoken_languages &&
                      movie.spoken_languages
                        .map((lang: any) => lang.english_name)
                        .join(", ")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Cast:</strong>{" "}
                    {Array.isArray(cast) &&
                      cast.length &&
                      cast
                        .map(
                          (actor: any) => `${actor.name} as ${actor.character}`
                        )
                        .join(", ")}
                  </Typography>
                </Box>
              </CardContent>
            </>
          )}
        </Card>
      </Container>
    </div>
  );
}
