import React, { useState } from "react";
import { auth, googleProvider } from "../models/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignIn = async () => {
    setLoading(true);
    setEmailError(null);
    setPasswordError(null);
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmailError(null);
        setPasswordError(null);
        navigate("/Timer");
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.code);
        if (e.code === "auth/invalid-email") {
          setEmailError("Invalid email!");
        }
        if (e.code === "auth/wrong-password") {
          setPasswordError("Wrong password!");
        }
        if (e.code === "auth/missing-password") {
          setPasswordError("Invalid password!");
        }
        if (e.code === "auth/user-not-found") {
          setEmailError("User not found!");
        }
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then(() => {
        navigate("/Timer");
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
      <Typography variant="h2" my="1rem" align="center">
        Welcome back!
      </Typography>
      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel htmlFor="outlined-email">Email</InputLabel>
        <OutlinedInput
          id="outlined-email"
          label="Email"
          error={!!emailError}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {emailError != null && (
          <FormHelperText error={true}> {emailError} </FormHelperText>
        )}
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          error={!!passwordError}
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
        {passwordError != null && (
          <FormHelperText error={true}> {passwordError} </FormHelperText>
        )}
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
          onClick={handleSignIn}
          sx={{
            m: 1,
          }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size="1.5rem" />
          ) : (
            <Typography>Sign In</Typography>
          )}
        </Button>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          sx={{
            m: 1,
          }}
          onClick={handleGoogleSignIn}
        >
          Login with Google
        </Button>
      </Container>
    </Container>
  );
};
