import MovieList from "../components/MovieList";
import Navbar from "../components/Navbar";
import background from "../assets/img/background.avif";

export default function Movies({ handleLogout }: any) {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          height: "100%",
          minHeight: '100vh'
        }}
      >
        <Navbar handleLogout={handleLogout} />
        <MovieList />
      </div>
    </>
  );
}
