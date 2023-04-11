import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import "../styles/App.css";
import "../styles/Timer.css";
const Timer = () => {
  const [active, setActive] = useState("");
  const [level, setLevel] = useState("Custom");
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

  useEffect(() => {
    const [inputMinutes, inputSeconds] = inputTime.split(":"); //Split minutes from seconds
    setTimeLeft({
      minutes: parseInt(inputMinutes) || 0, //Either set minutes left to input minutes or 0 if no minutes before ":"
      seconds: parseInt(inputSeconds) || 0, //Same for seconds
    });
  }, [inputTime]); //Each time inputTime changes Run effect.

  useEffect(() => {
    let timer;

    if (timerRunning && (timeLeft.minutes > 0 || timeLeft.seconds > 0)) {
      timer = setTimeout(() => {
        setTimeLeft({
          minutes:
            timeLeft.seconds > 0 ? timeLeft.minutes : timeLeft.minutes - 1,
          seconds: timeLeft.seconds > 0 ? timeLeft.seconds - 1 : 59,
        });
      }, 1000);
    } else if (
      !Customed &&
      timerRunning &&
      countdown &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
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
  }, [timeLeft, timerRunning, countdown, breakTime, Customed]);

  const handleInputChange = (event) => {
    setInputTime(event.target.value);
  };

  const handleStartClick = () => {
    setTimerRunning(true);
    setCountdown(true);
  };
  const handleEndClick = () => {
    setTimerRunning(false);
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
    <div>
      <Box
        sx={{
          backgroundColor: "#D9D9D9",
          height: "300px",
          width: "600px",
          mx: "auto",
          mt: "50px",
        }}
      >
        <Box display="flex" sx={{ flexDirection: "column" }}>
          <TextField
            inputProps={{
              style: { textAlign: "center" },
            }}
            className="TimeInput"
            disabled={!disabled}
            placeholder="Enter Time"
            value={inputTime}
            onChange={handleInputChange}
            sx={{ width: "130px", mx: "auto" }}
          />
          <Grid mt="30px" display="flex" mb="20px" mx="auto">
            <Typography sx={{ fontSize: "40px" }}>
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
              color="success"
              onClick={handleStartClick}
              disabled={timerRunning}
              sx={{ mr: "10px" }}
            >
              Start
            </Button>

            <Button
              variant="contained"
              sx={{
                width: "75px",
              }}
              color="error"
              onClick={handleEndClick}
              disabled={!timerRunning}
            >
              End
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#D9D9D9",
          height: "100px",
          width: "600px",
          mx: "auto",
          mt: "50px",
        }}
      >
        <Grid container mt="50px" display="flex" mb="50px" columnSpacing={25}>
          <Grid item xs={4}>
            <Button
              onClick={() => handleDifficulty("novice")}
              disabled={timerRunning}
              style={{
                backgroundColor: active === "novice" ? "#7AB8BF" : "white",
              }}
              sx={{ ml: "10px" }}
            ></Button>
            <Typography>&nbsp;&nbsp;&nbsp;Novice</Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={() => handleDifficulty("apprentice")}
              style={{
                backgroundColor: active === "apprentice" ? "#7AB8BF" : "white",
              }}
              disabled={timerRunning}
            ></Button>
            <Typography>Apprentice</Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={() => handleDifficulty("expert")}
              style={{
                backgroundColor: active === "expert" ? "#7AB8BF" : "white",
              }}
              disabled={timerRunning}
            ></Button>
            <Typography>&nbsp;&nbsp;Expert</Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default Timer;
