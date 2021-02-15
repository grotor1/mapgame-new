import React from 'react'
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";

function App() {
    const {token, login, logout, sessionId, isAdmin} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    return (
        <AuthContext.Provider value={{
            token, login, logout, _id_session: sessionId, isAuthenticated, isAdmin
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