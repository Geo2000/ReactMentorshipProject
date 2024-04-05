import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Profile(props: any) {
  const token = localStorage.getItem("token");

  if (!props.token && token) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Navbar />
      <h2>This is Profile</h2>
    </>
  );
}
