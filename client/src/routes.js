import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import {MainPageUsa} from "./pages/MainPageUsa/MainPageUsa"
import {MainPageRussia} from "./pages/MainPageRussia/MainPageRussia";
import {AuthPage} from "./pages/AuthPage/AuthPage"

export const useRoutes = (isAuth, sessionType) => {
    if (isAuth) {
        return (
            <Switch>
                {sessionType === "Usa" &&
                    <Route path="/main">
                        <MainPageUsa/>
                    </Route>
                }
                {sessionType === "Russia" &&
                    <Route path="/main">
                        <MainPageRussia/>
                    </Route>
                }
                <Redirect to="/main"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}