import React, {useContext, useEffect, useState} from 'react'
import './AuthPage.css'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {AuthContext} from "../../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        adminPassword: "",
        sessionCode: "",
        sessionType: "Russia",
        isAdmin: false
    })
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
        console.log(form)
    }
    const changeHandler1 = () => {
        if (form.isAdmin) setForm({...form, isAdmin: false})
        else setForm({...form, isAdmin: true})
    }
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    const registerHandler = async () => {
        try {
            const data = await request("api/auth/register", "POST", {...form})
            message(data.message)
        } catch (e) {
        }
    }
    const loginHandler = async () => {
        try {
            const data = await request("api/auth/login", "POST", {...form})
            console.log(data)
            auth.login(data.token, data._id_session, data.isAdmin, data.sessionType)
        } catch (e) {
        }
    }
    return (
        <div className="login">
            <div className="login-wrapper">
                <div className="login-wrapper__content">
                    <div className="login-wrapper__content__left-section">
                        <div className="login-wrapper__content__right-section__login-content">
                            <p className="login-wrapper__content__right-section__login-content__title">
                                Создать игру
                            </p>
                            <div className="input-container">
                                <input
                                    placeholder="Пароль админа"
                                    id="adminPassword"
                                    type="password"
                                    name="adminPassword"
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="input-container another-margin">
                                <input
                                    placeholder="Код сессии"
                                    id="sessionCode"
                                    type="text"
                                    name="sessionCode"
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="input-container another-margin">
                                <select value={form.sessionType} name="sessionType" onChange={changeHandler}>
                                    <option selected value="Russia">Россия</option>
                                    <option value="Usa">Сша</option>
                                </select>
                            </div>
                            <div
                                className="login-wrapper__content__right-section__login-content__button hvr-grow-shadow"
                                onClick={registerHandler}
                            >
                                <p>Создать</p>
                            </div>
                        </div>
                    </div>
                    <div className="registration-wrapper__content__right-section">
                        <div className="registration-wrapper__content__right-section__registration-content">
                            <div className="registration-wrapper__content__right-section__registration-content__title">
                                <p>Войти в игру</p>
                            </div>
                            <div className="input-container">
                                <input
                                    placeholder="Код сессии"
                                    type="text"
                                    id="sessionCode"
                                    name="sessionCode"
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="input-container-only-style">
                                <input
                                    placeholder=""
                                    type="checkbox"
                                    id="isAdmin"
                                    name="isAdmin"
                                    onChange={changeHandler1}
                                />
                                <label htmlFor="isAdmin">Войти как админ</label>
                            </div>
                            <div className="input-container another-margin">
                                <input
                                    placeholder="Пароль админа"
                                    type="password"
                                    id="adminPassword"
                                    name="adminPassword"
                                    onChange={changeHandler}
                                />
                            </div>
                            <div
                                className="login-wrapper__content__right-section__registration-content__button hvr-grow-shadow"
                                onClick={loginHandler}
                            >
                                <p>Войти</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}