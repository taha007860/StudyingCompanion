import "../styles/App.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { auth } from "../models/firebase";
import { signInAnonymously, updateProfile } from "firebase/auth";
import { useEffect } from "react";

const Auth = () => {
  const navigate = useNavigate();
  const handleGuest = async () => {
    signInAnonymously(auth)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: "Guest",
        }).then(() => navigate("/Timer"));
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/Timer");
    }
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        minHeight: "40vh",
        width: "25rem",
      }}
    >
      <Typography align="center" variant="h2" my="1rem">
        Welcome!
      </Typography>
      <Container>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mb: "1rem",
          }}
        >
          <Link
            to="/auth/Login"
            style={{
              textDecoration: "none",
            }}
          >
            <Button variant="contained">Login</Button>
          </Link>
          <Link
            to="/auth/Signup"
            style={{
              textDecoration: "none",
            }}
          >
            <Button variant="contained">Sign Up</Button>
          </Link>
        </Container>
        <Container>
          <Button
            variant="contained"
            onClick={handleGuest}
            sx={{
              width: "100%",
            }}
          >
            Continue as Guest
          </Button>
        </Container>
      </Container>
    </Container>
  );
};

export default Auth;
