import React, { useState } from "react";
import { auth, googleProvider } from "../models/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  FormHelperText,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { db } from "../models/firebase";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("User");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignUp = async () => {
    console.log(Timestamp.fromDate(new Date()).toDate());
    const sampleTask = {
      name: `Sample Task`,
      status: "Not completed",
      date: Timestamp.fromDate(new Date()).toDate(),
      priority: "1",
      public: false,
      content: "This is a sample task. You can delete it.",
      sharedWith: [],
    };

    setLoading(true);
    setEmailError(null);
    setPasswordError(null);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (displayName === "User") {
          const s = email.substring(0, email.lastIndexOf("@"));
          setDisplayName(s);
        }
        updateProfile(auth.currentUser, {
          displayName: displayName,
        })
          .then(() => {
            const taskRef = addDoc(collection(db, "tasks"), sampleTask)
              .then((taskID) => {
                console.log("Sample task written with ID: ", taskID.id);
                const docRef = addDoc(collection(db, "TaskList"), {
                  public: false,
                  userID: auth.currentUser.uid,
                  tasks: [taskID.id],
                }).then((docid) => {
                  console.log("Document written with ID: ", docid.id);
                  const settingRef = addDoc(collection(db, "settings"), {
                    userID: auth.currentUser.uid,
                    pomdoroLevel: "",
                    settingOne: "false",
                  })
                    .then(() => {
                      console.log("Default settings applied.");
                      setEmailError(null);
                      setPasswordError(null);
                      navigate("/Timer");
                      console.log(auth);
                    })
                    .catch((e) => {
                      setLoading(false);
                      console.error(e);
                    });
                });
              })
              .catch((e) => {
                setLoading(false);
                console.error(e);
              });
          })
          .catch((e) => {
            setLoading(false);
            console.error(e);
          });
      })
      .catch((e) => {
        if (e.code === "auth/invalid-email") {
          setEmailError("Invalid email!");
        }
        if (e.code === "auth/email-already-in-use") {
          setEmailError("Email already in use!");
        }
        if (e.code === "auth/weak-password") {
          setPasswordError("Weak password!");
        }
        if (e.code === "auth/missing-password") {
          setPasswordError("Invalid password!");
        }
        setLoading(false);
        console.error(e);
      });
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
      <Typography variant="h6" my="1rem" align="center">
        Fun fact: Video games can lessen disruptive behaviors and enhance
        positive development in ADHD children.
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
          error={!!emailError}
          id="outlined-email"
          label="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {emailError != null && (
          <FormHelperText error={true}> {emailError} </FormHelperText>
        )}
      </FormControl>
      <FormControl sx={{ m: 1 }} required={true} variant="outlined">
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
          onClick={handleSignUp}
          sx={{
            m: 1,
          }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size="1.5rem" />
          ) : (
            <Typography>Sign Up</Typography>
          )}
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
