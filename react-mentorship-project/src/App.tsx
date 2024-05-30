import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import NoPage from "./pages/NoPage";
import MovieDetials from "./pages/MovieDetails";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken !== token) {
      setToken(storedToken);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/movies" />
              ) : (
                <Login setTokenProp={setToken} />
              )
            }
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/movies" /> : <Register />}
          />

          <Route
            path="/movies"
            element={
              token ? (
                <Movies handleLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={token ? <MovieDetials /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={token ? <Profile /> : <Navigate to="/" />}
          />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
