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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import TimerIcon from "@mui/icons-material/Timer";
import { auth } from "../models/firebase";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

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
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Typography
            component="a"
            variant="h4"
            href="/Home"
            sx={{
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                color: "inherit",
                textShadow: "0 0 0.5rem black",
              },
            }}
          >
            Studying Companion
          </Typography>
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
              <Tooltip title="My Account" onClick={() => navigate("/Account")}>
                <IconButton>
                  <Avatar
                    src={auth.currentUser?.photoURL}
                    sx={{
                      fontSize: 25,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {auth.currentUser?.displayName?.charAt(0)}
                  </Avatar>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      marginTop: "3rem",
                      fontWeight: "bold",
                      marginLeft: "-2.85rem",
                    }}
                  >
                    {auth.currentUser?.displayName}
                  </Typography>
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
