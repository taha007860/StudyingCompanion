import React, { useState } from "react";
import { Fragment, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Tooltip,
  Avatar,
} from "@mui/material";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import TimerIcon from "@mui/icons-material/Timer";
import { auth } from "../models/firebase";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(auth.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const update = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
    return () => {
      update();
    };
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
      navigate("/Home");
    });
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "5rem",
        }}
      >
        <Container
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Link to="/Home" style={{ textDecoration: "none" }}>
            <Typography
              variant="h4"
              sx={{
                color: "white",
                textDecoration: "none",
                "&:hover": {
                  textShadow: "0 0 0.5rem black",
                },
              }}
            >
              Studying Companion
            </Typography>
          </Link>
        </Container>
        <Container
          disableGutters
          sx={{
            display: "flex",
            flexDirecton: "row",
            justifyContent: "space-between",
          }}
        >
          {!(user === null) && (
            <Fragment>
              <Tooltip title="Tasks">
                <IconButton onClick={() => navigate("/TaskList")}>
                  <PlaylistAddCheckIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Timer">
                <IconButton onClick={() => navigate("/Timer")}>
                  <TimerIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="My Account">
                <IconButton
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => navigate("/Account")}
                >
                  <Avatar
                    src={auth.currentUser?.photoURL}
                    sx={{ width: "30px", height: "30px" }}
                  >
                    {auth.currentUser?.displayName?.charAt(0)}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton onClick={handleLogout}>
                  <LogoutIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </Tooltip>
            </Fragment>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
