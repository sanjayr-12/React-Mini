import React, { useState, useEffect } from "react";
import "./Countdown.css"; 

const CountDownTarget = new Date("2024-06-31T23:59:59");  //fix the target date, 'hardcoded'

const getTimeLeft = () => {
    const total = CountDownTarget - new Date(); //in JavaScript when working with time use milliseconds
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / (1000 * 60)) % 60);
    const seconds = Math.floor((total / 1000) % 60);
    return { days, hours, minutes, seconds };
};

const Countdown = () => {
    const [timeleft, settimeleft] = useState(() => getTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            settimeleft(getTimeLeft());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    //we use object.entries to map the objects because we cant use map funtion directly on the object like array. this object entries will return [key, value] pairs as array. 
    return (
        <div className="countdown-container">
            <h1 className="countdown-title">Countdown</h1>
            <div className="countdown-timer">
                {Object.entries(timeleft).map(([key, value]) => (
                    <div key={key} className="countdown-item">
                        <div className="countdown-label">{key}</div>
                        <div className="countdown-value">{value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Countdown;
