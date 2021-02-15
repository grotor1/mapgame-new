import {createContext} from 'react'

function noop() {}

export const AuthContext = createContext({
    token: null,
    _id_session: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
    isAdmin: false
})