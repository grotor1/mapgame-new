import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";

export const TimerRussia = () => {
    const auth = useContext(AuthContext)
    const [seconds, setSeconds] = useState(300)
    const [started, setStarted] = useState(false)
    const {loading, request, error, clearError} = useHttp()
    const secondsToMinutes = (seconds) => {
        return {
            minutes: Math.floor(seconds / 60),
            seconds: seconds % 60
        }
    }
    useEffect(() => {
        if (started) {
            if(seconds > 0) {
                const interval = setInterval(() => {
                    setSeconds(seconds - 1)
                }, 1000);
                return () => clearInterval(interval);
            }
        }
    })
    useEffect(()=>{
        if(auth.isAdmin) {
            const interval = setInterval(() => {
                const dataOnServer = async () => {
                    const data = await request(`api/states/timerPut/${auth._id_session}`, 'PUT', {
                        sessionTimer: seconds
                    })
                }
                dataOnServer()
            }, 1000);
            return () => clearInterval(interval);
        }
    })
    useEffect(() => {
        if (!auth.isAdmin) {
            const interval = setInterval(() => {
                const dataFromServer = async () => {
                    const {data} = await request(`api/states/timerGet/${auth._id_session}`, 'GET')
                    setSeconds(data)
                }
                dataFromServer()
            }, 1000);
            return () => clearInterval(interval);
        } else {
            const dataFromServer = async () => {
                const {data} = await request(`api/states/timerGet/${auth._id_session}`, 'GET')
                setSeconds(data)
            }
            dataFromServer()
        }
    }, [request, auth]);
    const resetTimer = () => {
        setStarted(false)
        setSeconds(300)
    }
    const startTimer = () => {
        setStarted(true)
    }
    return (
        <div className="timer-background">
            <h4 className="timer-name">Таймер</h4>
            <h4 className="timer-count">{secondsToMinutes(seconds).minutes}:
                {
                    secondsToMinutes(seconds).seconds >= 10 && secondsToMinutes(seconds).seconds ||
                    secondsToMinutes(seconds).seconds < 10 && secondsToMinutes(seconds).seconds >= 0 && "0" + secondsToMinutes(seconds).seconds ||
                    secondsToMinutes(seconds).seconds === 0 && "00"
                }
            </h4>
            {auth.isAdmin &&
                <div className="timer_use-button" onClick={startTimer}>
                    <div className="timer_button-text">
                        Начать
                    </div>
                </div>
            }
            {auth.isAdmin &&
                <div className="timer_use-button" onClick={resetTimer}>
                    <div className="timer_button-text">
                        Сбросить
                    </div>
                </div>
            }
        </div>
    )
}

