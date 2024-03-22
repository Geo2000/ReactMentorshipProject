import MovieList from "../components/MovieList";
import Navbar from "../components/Navbar";
import background from "../assets/img/background.avif";

export default function Movies() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
        }}
      >
        <Navbar />
        <MovieList />
      </div>
    </>
  );
}
