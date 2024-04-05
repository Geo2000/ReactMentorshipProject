import MovieList from "../components/MovieList";
import Navbar from "../components/Navbar";
import background from "../assets/img/background.avif";
import { Navigate } from "react-router-dom";

export default function Movies({ token }: any) {
  const tokenLS = localStorage.getItem("token");

  if (!token && !tokenLS) {
    return <Navigate to="/" replace />;
  }
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
