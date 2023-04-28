import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { auth } from "../models/firebase";
import { signInAnonymously, updateProfile } from "firebase/auth";
import { useEffect } from "react";
import welcomeImage from "../../assets/taskwel.jpg";

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
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mb: "3rem",
        }}
      >
        <Typography align="center" variant="h2" mb="1rem">
          Welcome!
        </Typography>
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
            <Button variant="contained" 
            >Login</Button>
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
      <Container
        sx={{
          backgroundImage: `url(${welcomeImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "57%",
          height: "50vh",
        }}
      ></Container>
    </Container>
  );
};

export default Auth;
