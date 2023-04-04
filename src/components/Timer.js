import React, {useEffect, useState} from "react";
import {Box,TextField,MenuItem,Button} from '@mui/material'
import '../styles/App.css';
const Timer = () => {
    const studLevels = ["Custom","One","Two","Three","Four","Five"];
    const [level , setLevel] = useState("0");
    const [disabled,setDisabled] = useState(false);
    const [inputTime, setInputTime] = useState("0:00");     //Initialise time to 0:00 to show format for user
    const [timerRunning, setTimerRunning] = useState(false);
    const [countdown, setCountdown] = useState(false);
    const [breakTime, setBreakTime] = useState("0:00");
    const [timeLeft, setTimeLeft] = useState({
        minutes: 0,
        seconds: 0,
    });


    useEffect(() => {
        const [inputMinutes, inputSeconds] = inputTime.split(":");  //Split minutes from seconds
        setTimeLeft({
            minutes: parseInt(inputMinutes) || 0,       //Either set minutes left to input minutes or 0 if no minutes before ":"
            seconds: parseInt(inputSeconds) || 0,      //Same for seconds
        });
    }, [inputTime]);    //Each time inputTime changes Run effect.

    useEffect(() => {
        let timer;

        if (timerRunning && (timeLeft.minutes > 0 || timeLeft.seconds > 0)) {
            timer = setTimeout(() => {
                setTimeLeft({
                    minutes: timeLeft.seconds > 0 ? timeLeft.minutes : timeLeft.minutes - 1,
                    seconds: timeLeft.seconds > 0 ? timeLeft.seconds - 1 : 59,
                });
            }, 1000);
        } else if (timerRunning && countdown && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
            // Timer has ended, reset to break time
            setCountdown(false);
            setInputTime(breakTime);
            setTimeLeft({
                minutes: parseInt(breakTime.split(":")[0]) || 0,
                seconds: parseInt(breakTime.split(":")[1]) || 0,
            });
        } else {
            setTimerRunning(false);
            return () => clearTimeout(timer);
        }
    }, [timeLeft, timerRunning, countdown, breakTime]);

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


    const handleSelectChange = (event) =>{
        setLevel((event.target.value));
    }

    useEffect(() =>{
        switch(level) {
            case "Custom":
                setDisabled(true);
                setInputTime("0:00");
                break;
            case "One":
                setInputTime("25:00");
                setBreakTime("5:00");
                break;
            case "Two":
                setInputTime("50:00");
                setBreakTime("10:00");
                break;
            case "Three":
                setInputTime("75:00");
                setBreakTime("15:00");
                break;
            case "Four":
                setInputTime("90:00");
                setBreakTime("20:00");
                break;
            case "Five":
                setInputTime("115:00");
                setBreakTime("25:00");
                break;
            default:
                setInputTime("0:00");
            }
        if(level !== "Custom") {
            setDisabled(false);
            }
        },[level]);

    return (
        <div className= "Marge">
            <form >

            <Box width="200px" htmlFor="level" className="padIt">

                <TextField
                     label = 'Select Pomodoro Level'
                     select
                     fullWidth
                     id = "level"
                     value = {level}
                     onChange={handleSelectChange}
                     disabled={timerRunning}
                >
                    {studLevels.map((level) => (
                        <MenuItem key = {level} value = {level}>
                            {level}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            </form>
            <div>
            <div className="container m-3 ">
                <input
                    disabled={!disabled}
                    size="small"
                    placeholder='Enter Time'
                    value={inputTime}
                    onChange={handleInputChange}
                    />
                <h1 className="TimeLeft">
                    <div className="Minutes">{timeLeft.minutes}</div>
                    <div className="Seconds">{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</div>
                </h1>
                {countdown && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (<div>Take a break, u deserve it!</div>)}
                <div className='d-flex column-gap-4'>
                <Button variant = 'contained' size = "medium" color = 'success' onClick={handleStartClick} disabled={timerRunning}>
                    Start
                </Button>

                <Button variant = 'contained' size = "large" color = 'error' onClick={handleEndClick} disabled={!timerRunning}>
                    End
                </Button>
                </div>
            </div>
            </div>
        </div>

    );}
export default Timer;