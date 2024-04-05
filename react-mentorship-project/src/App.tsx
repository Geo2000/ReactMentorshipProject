import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import NoPage from "./pages/NoPage";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={token ? <Navigate to="/movies" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/movies" replace /> : <Register />}
          />
          <Route path="/movies" element={<Movies token={token} />} />
          <Route path="/profile" element={<Profile token={token} />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
