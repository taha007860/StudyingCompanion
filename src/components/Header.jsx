import React, { useState } from "react";
import { Fragment, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
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
            justifyContent: "right",
          }}
        >
          {user == null ? (
            <Fragment>
              <Typography>Not Signed In</Typography>
            </Fragment>
          ) : (
            <Fragment>
              <IconButton>
                <PlaylistAddCheckIcon sx={{ fontSize: 45 }} />
              </IconButton>
              <IconButton>
                <TimerIcon sx={{ fontSize: 45 }} />
              </IconButton>
              <IconButton>
                <AccountCircleIcon
                  sx={{ fontSize: 45, marginBottom: "1.5rem" }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{
                    marginTop: "3rem",
                    fontWeight: "bold",
                    marginLeft: "-2.85rem",
                  }}
                >
                  Adam
                </Typography>
              </IconButton>
              <IconButton>
                <LogoutIcon
                  sx={{ fontSize: 45, marginBottom: "1.5rem" }}
                  onClick={handleLogout}
                />
                <Typography
                  variant="subtitle1"
                  sx={{
                    marginTop: "3rem",
                    fontWeight: "bold",
                    marginLeft: "-2.85rem",
                  }}
                >
                  Logout
                </Typography>
              </IconButton>
            </Fragment>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
