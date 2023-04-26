import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Popover,
} from "@mui/material";
import "../styles/App.css";
import "../styles/Timer.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TuneIcon from "@mui/icons-material/Tune";
import CustomizableDialog from "./Popup.jsx";
import {
  updateDoc,
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../models/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Timer = () => {
  const [buttonText, setButtonText] = useState("start");
  const [total, setTotal] = useState(0);
  const [showTotal, setShow] = useState(false);
  const [active, setActive] = useState("");
  const [level, setLevel] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [inputTime, setInputTime] = useState("0:00"); //Initialise time to 0:00 to show format for user
  const [timerRunning, setTimerRunning] = useState(false);
  const [countdown, setCountdown] = useState(false);
  const [breakTime, setBreakTime] = useState("0:00");
  const [breaks, setBreaks] = useState(false);
  const [Customed, setCustomed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [breakString, setBreakString] = useState("");
  
 const [workTime, setWorkTime] = useState(0); //for firestore
  const [breakTimer, setBreakTimer] = useState(0); //For fireStore

  const theme = createTheme({
    typography: { fontFamily: ["Space Grotesk", "sans serif"].join(",") },
  });
=======
  
  useEffect(() => {
    const [inputMinutes, inputSeconds] = inputTime.split(":"); //Split minutes from seconds
    setTimeLeft({
      minutes: parseInt(inputMinutes) || 0, //Either set minutes left to input minutes or 0 if no minutes before ":"
      seconds: parseInt(inputSeconds) || 0, //Same for seconds
    });
  }, [inputTime]); //Each time inputTime changes Run effect.

  useEffect(() => {
    setLevel("One");
    setActive("novice");
  }, []);
  const updateFireStore = async (Time, userid) => {
    const document = doc(db, "Timer", userid);
    const docSnap = await getDoc(document);
    let usertime = 0;

    if (docSnap.exists()) {
      const worktime = docSnap.get("Worktime");
      console.log(worktime);
      usertime = worktime + Time;
      console.log(usertime);
      await updateDoc(document, { Worktime: usertime });
      await setWorkTime(0);
    }
  };
  useEffect(() => {
    let timer;

    if (timerRunning && (timeLeft.minutes > 0 || timeLeft.seconds > 0)) {
      if (timeLeft.minutes > 60) setTimeLeft({ minutes: 60, seconds: 0 });
      if (timeLeft.seconds > 60) setTimeLeft({ seconds: 60 });
      timer = setTimeout(() => {
        setTimeLeft({
          minutes:
            timeLeft.seconds > 0 ? timeLeft.minutes : timeLeft.minutes - 1,
          seconds: timeLeft.seconds > 0 ? timeLeft.seconds - 1 : 59,
        });
        setWorkTime(workTime + 1);
      }, 1000);
    } else if (
      !Customed &&
      timerRunning &&
      countdown &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          updateFireStore(workTime, uid);
        }
      });
      // Timer has ended, reset to break time
      setCountdown(false);
      setInputTime(breakTime);
      setBreaks(true);
      setTimeLeft({
        minutes: parseInt(breakTime.split(":")[0]) || 0,
        seconds: parseInt(breakTime.split(":")[1]) || 0,
      });
    } else {
      setTimerRunning(false);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, timerRunning, countdown, breakTime, Customed, workTime]);
  useEffect(() => {
    const auth = getAuth();
    if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          updateFireStore(workTime, uid);
        }
      });
    }
  }, [timerRunning, timeLeft]);

  const handleTotal = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const document = doc(db, "Timer", uid);
        const docSnap = await getDoc(document);
        if (docSnap.exists()) {
          const worktime = docSnap.get("Worktime");
          setTotal(worktime);
          setShow(true);
          console.log(worktime);
        }
      }
    });
  };
  const handleInputChange = (event) => {
    if (timeLeft.minutes > 60 && timeLeft.seconds > 60) setInputTime("60:00");
    else setInputTime(event.target.value);
  };

  const handleStartClick = () => {
    setButtonText("Pause");
    setTimerRunning(true);
    setCountdown(true);
  };
  const handleEndClick = () => {
    setButtonText("Start");
    setTimerRunning(false);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        updateFireStore(workTime, uid);
      }
    });
  };
  const handleClick = () => {
    if (inputTime !== "0:00")
      if (timerRunning) handleEndClick();
      else handleStartClick();
  };
  const handleClear = () => {
    setDisabled(true);
    setInputTime("0:00");
    setCustomed(true);
    setActive("");
    setLevel("Custom");
  };
  const handleDifficulty = (event) => {
    switch (event) {
      case "novice":
        setLevel("One");
        if (active !== "novice") {
          setActive("novice");
          setBreaks(false);
        } else {
          setActive("");
          setLevel("Custom");
        }
        break;
      case "apprentice":
        setLevel("Two");
        if (active !== "apprentice") {
          setActive("apprentice");
          setBreaks(false);
        } else {
          setActive("");
          setLevel("Custom");
        }

        break;
      case "expert":
        setLevel("Three");
        if (active !== "expert") {
          setActive("expert");
          setBreaks(false);
        } else {
          setActive("");
          setLevel("Custom");
        }
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    switch (level) {
      case "Custom":
        setDisabled(true);
        setInputTime("0:00");
        setCustomed(true);
        break;
      case "One":
        setInputTime("25:00");
        setBreakTime("5:00");
        setBreakString("Drink some water! Grab a snack! You deserve a break.");
        setCustomed(false);
        break;
      case "Two":
        setInputTime("50:00");
        setBreakTime("10:00");
        setBreakString("Go for a walk, Wind down to music, Take a breath."); //Wind down to music has a link to our winding down page
        setCustomed(false);
        break;
      case "Three":
        setInputTime("75:00");
        setBreakTime("15:00");
        setBreakString("Watch a youtube video, Call a loved one, Take a nap!");
        setCustomed(false);
        break;
      default:
        setInputTime("0:00");
    }
    if (level !== "Custom") {
      setDisabled(false);
    }
  }, [level]);

  return (
    <div
      style={{
        backgroundImage: "url('../assets/Nature.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <ThemeProvider theme={theme}>
        <Box sx={{ minHeight: "40vh" }}>
          <Box sx={{ width: "300px", mx: "auto" }}>
            <Grid
              container
              display="flex"
              mb="10px"
              columnSpacing={12}
              sx={{ mr: "20px" }}
            >
              <Grid item xs={3}>
                <Button
                  size="medium"
                  variant="outlined"
                  onClick={() => handleDifficulty("novice")}
                  disabled={timerRunning}
                  style={{
                    backgroundColor:
                      active === "novice" ? "#7AB8BF" : "#EFF7FF",
                  }}
                  sx={{
                    ml: "10px",
                    borderRadius: "50px",
                    borderColor: "White",
                    color: "Black",
                    boxShadow:
                      "0px 1px 1px rgba(0, 0, 0, 0.2),0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  &nbsp;&nbsp;Easy&nbsp;&nbsp;
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  size="medium"
                  variant="outlined"
                  onClick={() => handleDifficulty("apprentice")}
                  style={{
                    backgroundColor:
                      active === "apprentice" ? "#7AB8BF" : "#EFF7FF",
                  }}
                  sx={{
                    borderRadius: "50px",
                    borderColor: "White",
                    color: "Black",
                    boxShadow:
                      "0px 1px 1px rgba(0, 0, 0, 0.2),0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
                  }}
                  disabled={timerRunning}
                >
                  Medium
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  size="medium"
                  variant="outlined"
                  onClick={() => handleDifficulty("expert")}
                  style={{
                    backgroundColor:
                      active === "expert" ? "#7AB8BF" : "#EFF7FF",
                  }}
                  sx={{
                    borderRadius: "50px",
                    borderColor: "White",
                    color: "Black",
                    boxShadow:
                      "0px 1px 1px rgba(0, 0, 0, 0.2),0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
                  }}
                  disabled={timerRunning}
                >
                  expert
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ fontFamily: "Space Grotesk" }}>
            <Box display="flex" sx={{ flexDirection: "column" }}>
              <Grid display="flex" mx="auto">
                <Typography sx={{ fontSize: "80px", color: "White" }}>
                  {timeLeft.minutes}:
                  {timeLeft.seconds < 10
                    ? `0${timeLeft.seconds}`
                    : timeLeft.seconds}
                </Typography>
              </Grid>

              {breaks && (
                <Typography sx={{ width: "400px", mx: "auto" }}>
                  {breakString}
                </Typography>
              )}
              <Box display="flex" sx={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  size="150px"
                  onClick={handleClick}
                  sx={{
                    backgroundColor: "#EFF7FF",
                    mr: "10px",
                    borderRadius: "50px",
                    borderColor: "White",
                    color: "Black",
                    boxShadow:
                      "0px 1px 1px rgba(0, 0, 0, 0.2),0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  {buttonText}
                </Button>
                <CustomizableDialog
                  content={
                    <Box>
                      <TextField
                        inputProps={{
                          style: { textAlign: "center" },
                          maxlength: "5",
                        }}
                        className="TimeInput"
                        disabled={!disabled}
                        placeholder="Enter Time"
                        value={inputTime}
                        onChange={handleInputChange}
                        sx={{
                          width: "130px",
                          mx: "auto",
                          bgcolor: "#FFFFFF",
                        }}
                        size={"small"}
                      ></TextField>
                      <Button sx={{ width: "30px" }} onClick={handleClear}>
                        Clear
                      </Button>
                    </Box>
                  }
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};
export default Timer;
