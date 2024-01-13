import { useEffect, useState } from "react";
import axios from "axios";

let URL;

export function useAuthentication(url, setMessagesObject, cookies, setCookie, removeCookie, userName=null, password=null) {
    URL = url
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [token, setToken] = useState(null)
    const [messageOptions, setMessageOptions] = useState(null)
    const [credentials, setCredentials] = useState({
        userName: cookies['token-cookie'] ? cookies['token-cookie'].userName : userName,
        password: password
    })

    useEffect(() => {
        if (cookies['token-cookie']) {
            authenticateWithToken(cookies['token-cookie'].token, setIsAuthenticated, setToken, setIsAdmin, setMessageOptions, setCredentials)
        }
    }, [])

    useEffect(() => {
        if ((credentials.password != null && credentials.userName != null) || (credentials.password == null && credentials.userName == null)) {
            requestToken(credentials, setIsAuthenticated, token, setToken, setMessageOptions, setIsAdmin, cookies, setCookie, removeCookie)
        }
    }, [credentials])

    useEffect(() => {
        if (messageOptions != null) {
            setMessagesObject(messageOptions)
        }
    }, [messageOptions])

    return [isAuthenticated, isAdmin, token, credentials, setCredentials]
}

function requestToken(credentials, setIsAuthenticated, token, setToken, setMessageOptions, setIsAdmin, cookies, setCookie, removeCookie) {
    if (credentials.userName != null) {
        let userName = credentials.userName
        let password = credentials.password
        axios.post(`${URL}token/`, {
            username: userName,
            password: password
        }).then(res => {
            // login successful
            setCookie('token-cookie', {
                userName: userName,
                token: res.data.token,
            })
            setIsAuthenticated(true)
            setToken(res.data.token)
            isAdminFunc(userName, setIsAdmin, setMessageOptions)
        }).catch(e => {
            // login failed
            setCookie('token-cookie', null, {maxAge: 30*60*60})
            setIsAuthenticated(false)
            setToken(null)
            sendMessage(setMessageOptions, 'error', e.message)
        })
    } else {
        if (token != null) {
            // logging out
            removeCookie('token-cookie')
            setIsAuthenticated(false)
            setToken(null)
            setIsAdmin(false)
            sendMessage(setMessageOptions, 'success', 'Logged Out :/')
        }
    }
}

export async function isAdminFunc(userName, setIsAdmin, setMessageOptions) {
    try {
        let res = await axios.post(`${URL}user`, {username: userName}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        setIsAdmin(res.data.isAdmin)
        sendMessage(setMessageOptions, 'success', `Welcome ${res.data.isAdmin ? 'Admin' : 'User'} '${userName}'`)
    } catch (err) {
        setIsAdmin(false)
        sendMessage(setMessageOptions, 'success', `Welcome User '${userName}'`)
    }
}

function sendMessage(setMessageOptions, status, message) {
    setMessageOptions({
        status: status,
        message: message
    })
}

export async function authenticateWithToken(token, setIsAuthenticated, setToken, setIsAdmin, setMessageOptions, setCredentials) {
    try {
        let res = await axios.post(`${URL}user/get-with-token`, {token: token}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    
        setIsAuthenticated(true)
        setToken(token)
        isAdminFunc(res.data.username, setIsAdmin, setMessageOptions)
        setCredentials({
            userName: res.data.username,
            password: null
        })      

    } catch (err) {
        console.log(err.message);
    }
}
