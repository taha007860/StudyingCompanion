import React, {useEffect, useState} from "react";
import "../styles/App.css";

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState({
        minutes: 0,
        seconds: 0,
    });
    const [inputTime, setInputTime] = useState("0:00");
    const [timerRunning, setTimerRunning] = useState(false);
    const [countdownStarted, setCountdownStarted] = useState(false);


    useEffect(() => {
        const [inputMinutes, inputSeconds] = inputTime.split(":");
        setTimeLeft({
            minutes: parseInt(inputMinutes) || 0,
            seconds: parseInt(inputSeconds) || 0,
        });
    }, [inputTime]);

    useEffect(() => {
        let timer;
        if (timerRunning && (timeLeft.minutes > 0 || timeLeft.seconds > 0)) {
            timer = setTimeout(() => {
                setTimeLeft({
                    minutes: timeLeft.seconds > 0 ? timeLeft.minutes : timeLeft.minutes - 1,
                    seconds: timeLeft.seconds > 0 ? timeLeft.seconds - 1 : 59,
                });
            }, 1000);
        } else {
            setTimerRunning(false);

        }
        return () => clearTimeout(timer);
    }, [timeLeft, timerRunning]);

    const handleInputChange = (event) => {
        setInputTime(event.target.value);
    };

    const handleStartClick = () => {
        setTimerRunning(true);
        setCountdownStarted(true);
    };

    let timerState;

    timerState = timeLeft.seconds === 0 && timeLeft.minutes === 0;

    return (
        <div>
            <div className="container m-3">
                <input className="Input" type="text" placeholder="Enter Timer" value={inputTime}
                       onChange={handleInputChange}/>
                <h1 className="TimeLeft">
                    <div className="Minutes">{timeLeft.minutes}</div>
                    <div className="Seconds">{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</div>
                </h1>
                {timerState && countdownStarted && !timerRunning && <p>Time is up! Take a break, you deserve it.</p>}
                <button className="Button" onClick={handleStartClick} disabled={timerRunning}>
                    Start Timer
                </button>
            </div>
        </div>
    );
}
export default Timer;