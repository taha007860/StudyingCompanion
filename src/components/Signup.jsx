import React, { useState } from "react";
import { auth, googleProvider } from "../models/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../models/firebase";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonState, setButtonState] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignUp = async () => {
    setLoading(true);
    setButtonState(true);

    try {
      await addDoc(collection(db, "users"), {
        email: email,
        password: password,
        displayName: displayName,
      }).then((p) => {
        if (p.user) {
          navigate("/Timer");
        } else {
          setLoading(false);
          setButtonState(false);
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((e) => {
        const credential = GoogleAuthProvider.credentialFromResult(e);
        const token = credential.accessToken;
        const user = e.user;
        console.log(user);
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "30rem",
        mt: "1rem",
      }}
    >
      <Typography variant="h2" my="1rem">
        Good Luck!
      </Typography>
      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel htmlFor="outlined-displayName">Display Name</InputLabel>
        <OutlinedInput
          id="outlined-displayName"
          label="Display Name"
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
        />
      </FormControl>
      <FormControl sx={{ m: 1 }} required={true} variant="outlined">
        <InputLabel htmlFor="outlined-email">Email</InputLabel>
        <OutlinedInput
          id="outlined-email"
          label="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl sx={{ m: 1 }} required={true} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "20rem",
          my: "1rem",
        }}
      >
        <Button
          variant="contained"
          onClick={handleSignUp}
          sx={{
            m: 1,
          }}
          disabled={buttonState}
        >
          Sign Up
        </Button>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          sx={{
            m: 1,
          }}
          onClick={handleGoogleSignUp}
        >
          Sign up with Google
        </Button>
      </Container>
    </Container>
  );
};
