import {useState, useCallback, useEffect} from 'react'

const storageName = 'sessionData'

export const useAuth = () =>{
    const [token, setToken] = useState(null)
    const [sessionId, setSessionId] = useState(null)
    const [isAdmin, setIsAdmin] = useState(null)
    const [sessionType, setSessionType] = useState(null)
    const login = useCallback((jwtToken, id, isAdmin, sessionType) => {
        setToken(jwtToken)
        setSessionId(id)
        setIsAdmin(isAdmin)
        setSessionType(sessionType)
        localStorage.setItem(storageName, JSON.stringify({
            _id_session: id, token: jwtToken, isAdmin, sessionType
        }))
    }, [])
    const logout = useCallback(() => {
        setToken(null)
        setSessionId(null)
        localStorage.removeItem(storageName)
    }, [])
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if(data && data.token){
            login(data.token, data._id_session, data.isAdmin, data.sessionType)
        }
    }, [login])
    return { login, logout, token, sessionId, isAdmin, sessionType}
}