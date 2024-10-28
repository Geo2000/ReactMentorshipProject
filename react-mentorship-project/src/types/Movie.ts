interface Movie {
  id: number;
  name: string;
  title: string;
  overview: string;
  vote_average: number;
  first_air_date: string;
  release_date: string;
  genre_ids: [];
  poster_path: string;
}

export default Movie;
