import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar";
import { RootState } from '../redux_store/store';
import { useSelector } from 'react-redux';
import { Grid } from "@mui/material";
import MovieCard from "../components/MovieCard";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user);
  const favouriteMovies = useSelector((state: RootState) => state.movies.favourites);
  const watchlistMovies = useSelector((state: RootState) => state.movies.watchlist);

  return (
    <>
      <Navbar />
      <Typography marginTop={5} marginLeft={2} variant="h6" component="h6">Username: {user.username}</Typography>
      <Typography marginTop={1} marginLeft={2} variant="h6" component="h6">Profile pic:</Typography><img src={user.profilePic} style={{marginLeft: 16}} />
      <div>
        <Typography marginTop={1} marginLeft={2} variant="h6" component="h6">Watchlist</Typography>
        {Array.isArray(watchlistMovies) && watchlistMovies.length && (
          <Grid container wrap="nowrap" spacing={2} style={{ overflowX: 'auto' }}>
          {watchlistMovies.map((movie) => (
            <Grid item key={movie.id} style={{ flex: '0 0 auto' }}>
              <MovieCard key={movie.id} movie={movie} />
            </Grid>
          ))}
        </Grid>
        )}

        <Typography marginTop={1} marginLeft={2} variant="h6" component="h6">Favorites</Typography>
        {Array.isArray(favouriteMovies) && favouriteMovies.length && (
          <Grid container wrap="nowrap" spacing={2} style={{ overflowX: 'auto' }}>
          {favouriteMovies.map((movie) => (
            <Grid item key={movie.id} style={{ flex: '0 0 auto' }}>
              <MovieCard key={movie.id} movie={movie} />
            </Grid>
          ))}
        </Grid>
        )}
      </div>

    </>
  );
}
