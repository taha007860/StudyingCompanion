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
  Box,
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
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1
          }}
        >
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontFamily: "Roboto",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              Studying Companion
            </Typography>
          
        </Box>
        {!(user === null) && (
          <Fragment>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Tasks">
                <IconButton
                  onClick={() => navigate("/TaskList")}
                  sx={{ color: "#fff", "&:hover": { backgroundColor: "rgba(66, 66, 66, 0.3)" } }}
                >
                  <PlaylistAddCheckIcon sx={{ fontSize: 28 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Timer">
                <IconButton
                  onClick={() => navigate("/Timer")}
                  sx={{ color: "#fff", "&:hover": { backgroundColor: "rgba(66, 66, 66, 0.3)" } }}
                >
                  <TimerIcon sx={{ fontSize: 28 }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="My Account">
              <IconButton
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgba(66, 66, 66, 0.3)",
      borderRadius: "10px",
    },
  }}
>
  <Avatar
    alt={user.displayName}
    src={user.photoURL}
    sx={{ width: 28, height: 28, marginRight: 1 }}
  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Roboto",
                      fontWeight: 500,
                      letterSpacing: "1px",
                      color: "#fff",
                    }}
                  >
                    {user.displayName}
                  </Typography>
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton onClick={handleLogout} sx={{ color: "#fff", "&:hover": { backgroundColor: "rgba(66, 66, 66, 0.3)" } }}>
                  <LogoutIcon sx={{ fontSize: 28 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;