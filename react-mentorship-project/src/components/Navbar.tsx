import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Button,
} from "@mui/material";

import logo from "../assets/logo-transparent.png";

const Navbar = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#ffff",
      }}
    >
      <Toolbar>
        <IconButton
          component={Link}
          to="/movies"
          color="inherit"
          edge="start"
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <img src={logo} alt="Logo" style={{ height: 50 }} />
        </IconButton>

        <Tabs value={false}>
          <Tab label="Movies" component={Link} to="/movies" />
          <Tab label="Profile" component={Link} to="/profile" />
        </Tabs>

        <Typography sx={{ flexGrow: 1 }} />

        {username && (
          <>
            <Tab
              label={username}
              component="div"
              sx={{ flexGrow: 0, color: "#ec6435", textTransform: "none" }}
            />

            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
