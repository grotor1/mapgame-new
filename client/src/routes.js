import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {MainPage} from "./pages/MainPage/MainPage";
import {AuthPage} from "./pages/AuthPage/AuthPage"

export const useRoutes = isAuth => {
    if(isAuth){
        return (
            <Switch>
                <Route path="/main">
                    <MainPage/>
                </Route>
                <Redirect to="/main" />
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