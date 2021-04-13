import React from 'react'
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";

function App() {
    const {token, login, logout, sessionId, isAdmin, sessionType} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated, sessionType)
    return (
        <AuthContext.Provider value={{
            token, login, logout, _id_session: sessionId, isAuthenticated, isAdmin, sessionType
        }}>
            <Router>
                <div>
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App;