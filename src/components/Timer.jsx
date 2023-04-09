import React, {useEffect, useState} from "react";
import {Box, Button, Grid} from '@mui/material'
import '../styles/App.css';
import '../styles/Timer.css';
const Timer = () => {
    const [active, setActive] = useState("");
    const [level , setLevel] = useState("0");
    const [disabled,setDisabled] = useState(false);
    const [inputTime, setInputTime] = useState("0:00");     //Initialise time to 0:00 to show format for user
    const [timerRunning, setTimerRunning] = useState(false);
    const [countdown, setCountdown] = useState(false);
    const [breakTime, setBreakTime] = useState("0:00");
    const [Customed , setCustomed] = useState(false);
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
        } else if (!Customed &&timerRunning && countdown && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
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
    }, [timeLeft, timerRunning, countdown, breakTime,Customed]);

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




    const handleDifficulty = (event) =>{
        switch(event){
            case "novice":
                setLevel("One")
                if(active !== "novice")
                setActive("novice")
                else {
                    setActive("")
                    setLevel("Custom")
                }
                break;
            case "apprentice" :
                setLevel("Two")
                if(active !== "apprentice")
                    setActive("apprentice")
                else {
                    setActive("")
                    setLevel("Custom")
                }

                break;
            case "expert" :
                setLevel("Three")
                if(active !== "expert")
                    setActive("expert")
                else {
                    setActive("")
                    setLevel("Custom")}
                break;
            default :
                break;
        }
    }

    useEffect(() =>{
        switch(level) {
            case "Custom":
                setDisabled(true);
                setInputTime("0:00");
                setCustomed(true);
                break;
            case "One":
                setInputTime("25:00");
                setBreakTime("5:00");
                setCustomed(false);
                break;
            case "Two":
                setInputTime("50:00");
                setBreakTime("10:00");
                setCustomed(false);
                break;
            case "Three":
                setInputTime("75:00");
                setBreakTime("15:00");
                setCustomed(false);
                break;
            default:
                setInputTime("0:00");
            }
        if(level !== "Custom") {
            setDisabled(false);
            }
        },[level]);

    return (
        <div>
            <Box sx={{
                backgroundColor: '#D9D9D9',
                height : '300px',
                width : '600px',
                mx : 'auto',
                mt : '50px',
            }}>
                <div>
                    <Box sx={{
                        mx:'200px',

                    }}>
                        <input
                            className= 'TimeInput'
                            disabled={!disabled}
                            placeholder='Enter Time'
                            value={inputTime}
                            onChange={handleInputChange}
                            />
                        <Grid mt = '50px' display = 'flex' mb = '50px'>
                            <div className="Minutes" >{timeLeft.minutes}</div>
                            <div className="Seconds">:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</div>
                        </Grid >
                        {countdown && timeLeft.minutes === 0 && timeLeft.seconds === 0  && (<div>Take a break, u deserve it!</div>)}
                        <div className='d-flex column-gap-5'>
                        <Button variant = 'contained' size = "medium" color = 'success' onClick={handleStartClick} disabled={timerRunning}>
                            Start
                        </Button>

                        <Button variant = 'contained' size = "large" color = 'error' onClick={handleEndClick} disabled={!timerRunning}>
                            End
                        </Button>
                        </div>
                    </Box>
                </div>
            </Box>
            <Box sx={{
                backgroundColor: '#D9D9D9',
                height : '100px',
                width : '600px',
                mx : 'auto',
                mt : '50px',
            }}>
                <Grid container mt = '50px' display = 'flex' mb = '50px' columnSpacing={25}>
                    <Grid item xs={4}>
                       <button className="but-Change"  onClick={()=> handleDifficulty("novice")}    style={{ backgroundColor: active === "novice" ? "#7AB8BF" : "white" }}>

                       </button>
                       <div className="difficulty">
                                Novice
                       </div>
                    </Grid>
                    <Grid item xs={4}>
                        <button className="but-Change" onClick={()=> handleDifficulty("apprentice")} style={{ backgroundColor: active === "apprentice" ? "#7AB8BF" : "white"}}>

                        </button>
                        <div className="difficulty">
                                Apprentice
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <button className="but-Change" onClick={()=> handleDifficulty("expert")}   style={{ backgroundColor: active === "expert" ? "#7AB8BF" : "white"}}>

                        </button>
                        <div className="difficulty">
                                Expert
                        </div>
                    </Grid>

                </Grid>
            </Box>
        </div>

    );}
export default Timer;